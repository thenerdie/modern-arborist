import { MotionValue, animate, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";

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
  children: string;
  className?: string;
  pct: MotionValue<number>;
}) {
  const [displayedText, setDisplayedText] = useState("");

  const sentences = useMemo(() => {
    return text.split(/(?<=[.!?])\s+/);
  }, [text]);

  // Find the longest sentence to reserve space for stable layout
  const longestSentence = useMemo(() => {
    return sentences.reduce(
      (longest, s) => (s.length > longest.length ? s : longest),
      sentences[0]
    );
  }, [text]);

  function compute(tProgress: number) {
    const count = sentences.length || 1;
    const raw = Math.max(0, Math.min(1, tProgress)) * count;

    let index = Math.floor(raw);
    if (index >= count) index = count - 1;

    const r = Math.min(1, Math.max(0, raw - index));
    const sentence = sentences[index] || "";

    return truncateText(sentence, r * 2);
  }

  // Initialize on mount or if text changes
  useEffect(() => {
    setDisplayedText(compute(pct.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Update as the MotionValue changes
  useMotionValueEvent(pct, "change", (latest) => {
    setDisplayedText(compute(latest));
  });

  return (
    <span
      className={`font-mono font-bold inline-block align-top relative ${className}`}
    >
      <span aria-hidden className="invisible">
        {longestSentence}
      </span>
      <span className="absolute inset-0">{displayedText}</span>
    </span>
  );
}
