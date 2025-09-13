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
  pct,
}: {
  children: string;
  pct: MotionValue<number>;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const reserveText = useMemo(() => {
    // Pick the longest sentence to reserve space for stable layout.
    const sentences = (function split(t: string): string[] {
      try {
        if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
          const seg = new (Intl as any).Segmenter(undefined, {
            granularity: "sentence",
          });
          const out: string[] = [];
          for (const { segment } of (seg as any).segment(t)) {
            const s = String(segment);
            if (s) out.push(s);
          }
          if (out.length) return out;
        }
      } catch {}
      const matches = t.match(/[^.!?]+(?:[.!?]+|$)/g) || [];
      return matches.filter(Boolean);
    })(text);
    if (!sentences.length) return text;
    return sentences.reduce(
      (longest, s) => (s.length > longest.length ? s : longest),
      sentences[0]
    );
  }, [text]);

  // Split text into sentences, preferring Intl.Segmenter if available
  function splitIntoSentences(t: string): string[] {
    try {
      if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
        const seg = new (Intl as any).Segmenter(undefined, {
          granularity: "sentence",
        });
        const out: string[] = [];
        for (const { segment } of (seg as any).segment(t)) {
          const s = String(segment).trim();
          if (s) out.push(s);
        }
        if (out.length) return out;
      }
    } catch {
      // ignore and fall back to regex
    }
    const matches = t.match(/[^.!?]+(?:[.!?]+|$)/g) || [];
    return matches.map((s) => s.trim()).filter(Boolean);
  }

  function compute(tProgress: number) {
    const sentences = splitIntoSentences(text);
    const n = sentences.length || 1;
    const raw = Math.max(0, Math.min(1, tProgress)) * n;
    let s = Math.floor(raw);
    if (s >= n) s = n - 1;
    const r = Math.min(1, Math.max(0, raw - s));
    const sentence = sentences[s] || "";
    return truncateText(sentence, r);
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
    <span className="font-mono relative inline-block align-top">
      <span aria-hidden className="invisible">
        {reserveText}
      </span>
      <span className="absolute inset-0">{displayedText}</span>
    </span>
  );
}