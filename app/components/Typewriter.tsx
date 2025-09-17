import { MotionValue } from "framer-motion";
import { motion } from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useScrollProgress } from "./ScrollAnimation";
import { cn } from "~/lib/utils";

function renderText(text: string, pct: number): ReactNode {
  const maxLength = Math.floor(text.length * pct);
  if (maxLength <= 0) return null;

  // Take only the portion of text that should be visible at this progress
  const visible = text.slice(0, Math.min(text.length, maxLength));

  // Tokenize into whitespace and non-whitespace (words/punctuation) so we can
  // prevent wrapping inside words but still allow wrapping at spaces
  const tokens = visible.match(/(\s+|\S+)/g) ?? [visible];

  return tokens.map((tok, ti) => {
    if (/^\s+$/.test(tok)) {
      // Preserve whitespace tokens as-is. With whitespace-pre-wrap on the container,
      // sequences of spaces and newlines render and wrap naturally between words.
      return <span key={`ws-${ti}`}>{tok}</span>;
    }

    // Non-whitespace token (a word or punctuation). Wrap in a no-wrap container
    // so the browser won't break lines in the middle of the word. Characters
    // inside still animate individually.
    return (
      <span key={`w-${ti}`} className="inline-block whitespace-nowrap">
        {tok.split("").map((char, ci) => (
          <motion.span
            key={`c-${ti}-${ci}`}
            className="inline-block will-change-transform"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  });
}

export default function Typewriter({
  children: text,
  className,
  pct,
  mountPromptTo,
}: {
  children: any;
  className?: string;
  pct: MotionValue<number>;
  mountPromptTo?: string;
}) {
  const progress = useScrollProgress();

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

    return [renderText(sentence, r * SPEED), r * SPEED >= 1];
  }, [pct.get(), text]);

  // Mount flag for safe portal usage (avoids SSR document reference errors)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const prompt = (
    <motion.span
      className={cn(
        "pointer-events-none select-none text-xs md:text-sm font-medium z-50 left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 text-gray-500 dark:text-gray-400 tracking-wide flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 shadow-lg",
        progress.get() >= 1 ? "absolute" : "fixed"
      )}
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26, delay: 0.25 }}
    >
      <span className="animate-bounce text-emerald-500 dark:text-emerald-400">
        ↓
      </span>
      Continue scrolling
    </motion.span>
  );

  return (
    <span
      className={`relative font-mono font-bold inline-block align-top ${className}`}
    >
      <span aria-hidden className="invisible">
        {longestSentence}
      </span>
      <span className="absolute inset-0 whitespace-pre-wrap">
        {computedText}
      </span>
      {/* The scrolling prompt is portaled so transforms on ancestors don't affect fixed positioning */}
      {mounted &&
        endOfSentence &&
        createPortal(
          prompt,
          mountPromptTo
            ? document.getElementById(mountPromptTo)!
            : document.body
        )}
    </span>
  );
}
