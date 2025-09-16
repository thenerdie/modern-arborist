import { MotionValue, animate, useMotionValueEvent } from "framer-motion";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "~/lib/utils";

function truncateText(text: string, pct: number) {
  const maxLength = Math.floor(text.length * pct);
  if (maxLength <= 0) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, Math.max(0, maxLength - 1)) + "|";
}

export default function Typewriter({
  children: text,
  className,
  pct,
}: {
  children: any;
  className?: string;
  pct: MotionValue<number>;
}) {
  const sentences = useMemo(() => {
    return text.split(/(?<=[.!?])\s+/);
  }, [text]);

  // Find the longest sentence to reserve space for stable layout
  const longestSentence = useMemo(() => {
    return sentences.reduce(
      (longest: string, s: string) => (s.length > longest.length ? s : longest),
      sentences[0]
    );
  }, [text]);

  const [computedText, endOfSentence] = useMemo(() => {
    const tProgress = pct.get();

    const count = sentences.length || 1;
    const raw = Math.max(0, Math.min(1, tProgress)) * count;

    let index = Math.floor(raw);
    if (index >= count) index = count - 1;

    const r = Math.min(1, Math.max(0, raw - index));
    const sentence = sentences[index] || "";

    const SPEED = 1.5;

    return [truncateText(sentence, r * SPEED), r * SPEED >= 1];
  }, [pct.get(), text]);

  return (
    <span className={`font-mono font-bold inline-block align-top ${className}`}>
      <span aria-hidden className="invisible">
        {longestSentence}
      </span>
      <span className="absolute inset-0">{computedText}</span>
      <br />
      {endOfSentence && (
        <motion.span
          className={
            "text-lg pt-2 will-change-transform absolute top-full text-gray-400"
          }
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 460,
            damping: 20,
            delay: 0.2,
          }}
        >
          Continue scrolling...
        </motion.span>
      )}
    </span>
  );
}
