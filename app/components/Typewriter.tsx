import { MotionValue, AnimatePresence } from "framer-motion";
import { motion } from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useScrollProgress } from "./ScrollAnimation";
import { cn } from "~/lib/utils";
import { useLowPerfMode } from "~/utils/perf";

function renderText(text: string, pct: number, sentenceKey: number): ReactNode {
  const cap = Math.floor(text.length * pct);
  if (cap <= 0) return null;

  // Tokenize the FULL sentence so word wrappers remain mounted even when their
  // current visible char count drops to 0. This lets inner characters animate
  // out instead of being removed instantly when a whole word falls out of view.
  const tokens = text.match(/(\s+|\S+)/g) ?? [text];

  let remaining = cap;
  return tokens.map((tok, ti) => {
    const take = Math.max(0, Math.min(tok.length, remaining));
    // Advance remaining by the full token length so only one token gets a partial take
    remaining = Math.max(0, remaining - tok.length);

    if (/^\s+$/.test(tok)) {
      // Render whitespace explicitly so spacing doesn't collapse or wrap oddly
      const slice = tok.slice(0, take);
      const wsParts: ReactNode[] = [];
      for (let i = 0; i < slice.length; i++) {
        const ch = slice[i];
        if (ch === " ") {
          // Use a safe, breakable Unicode space that doesn't collapse: FOUR-PER-EM SPACE (U+2005)
          wsParts.push(
            <span key={`sp-${sentenceKey}-${ti}-${i}`}>{"\u2005"}</span>
          );
        } else if (ch === "\t") {
          // Represent a tab as multiple U+2005 spaces
          wsParts.push(
            <span key={`tb-${sentenceKey}-${ti}-${i}`}>
              {"\u2005\u2005\u2005\u2005"}
            </span>
          );
        } else if (ch === "\n") {
          wsParts.push(<br key={`br-${sentenceKey}-${ti}-${i}`} />);
        } else {
          // Fallback for any other whitespace char
          wsParts.push(
            <span
              key={`ws-${sentenceKey}-${ti}-${i}`}
              className="inline-block"
              aria-hidden
            >
              {ch}
            </span>
          );
        }
      }
      return (
        <span key={`ws-${sentenceKey}-${ti}`} className="inline">
          {wsParts}
        </span>
      );
    }

    // Word/punctuation token: keep wrapper mounted always; only render up to 'take' chars.
    return (
      <span
        key={`w-${sentenceKey}-${ti}`}
        className="inline-block whitespace-nowrap"
      >
        <AnimatePresence>
          {tok
            .slice(0, take)
            .split("")
            .map((char, ci) => (
              <motion.span
                key={`c-${sentenceKey}-${ti}-${ci}`}
                className="inline-block will-change-transform"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: 40,
                  x: Math.random() * 20 - 10,
                  rotate: Math.random() * 200 - 100,
                  scale: 0.25,
                  transition: { duration: 0.45 },
                }}
              >
                {char}
              </motion.span>
            ))}
        </AnimatePresence>
      </span>
    );
  });
}

export default function Typewriter({
  children: text,
  className,
  pct,
  mountPromptTo,
  optimizeForLowPerf = true,
}: {
  children: any;
  className?: string;
  pct: MotionValue<number>;
  mountPromptTo?: string;
  /** Whether to auto-degrade animation on low-end devices */
  optimizeForLowPerf?: boolean;
}) {
  const progress = useScrollProgress();
  const lowPerf = useLowPerfMode();

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

  // Standard (animated) rendering path
  const [computedText, endOfSentence] = useMemo(() => {
    const tProgress = pct.get();

    const count = sentences.length || 1;
    const raw = Math.max(0, Math.min(1, tProgress)) * count;

    let index = Math.floor(raw);
    if (index >= count) index = count - 1;

    const r = Math.min(1, Math.max(0, raw - index));
    const curSentence = sentences[index] || "";

    const SPEED = 3;
    const curPct = Math.min(1, Math.max(0, r * SPEED));

    // Compute previous sentence contribution to smooth fast scroll direction changes
    const prevIndex = Math.max(0, index - 1);
    const prevSentence = sentences[prevIndex] || "";
    const prevPct =
      prevIndex === index ? 0 : Math.min(1, Math.max(0, 1 - curPct));

    const layered = (
      <span key={`blend-${index}`} className="relative block">
        {prevPct > 0 && (
          <span className="absolute inset-0 opacity-0">
            {renderText(prevSentence, prevPct, prevIndex)}
          </span>
        )}
        <span className="absolute inset-0">
          {renderText(curSentence, curPct, index)}
        </span>
      </span>
    );

    return [layered, curPct >= 1];
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

  // Low performance simplified path: a single span with substring, no per-char elements
  if (optimizeForLowPerf && lowPerf) {
    const tProgress = pct.get();
    const count = sentences.length || 1;
    const raw = Math.max(0, Math.min(1, tProgress)) * count;
    let index = Math.floor(raw);
    if (index >= count) index = count - 1;
    const r = Math.min(1, Math.max(0, raw - index));
    const curSentence = sentences[index] || "";
    const SPEED = 3; // keep same pacing intention
    const curPct = Math.min(1, Math.max(0, r * SPEED));

    // Build output: all previous sentences fully + partial current sentence
    const previous = sentences.slice(0, index).join(" ");
    const partialLen = Math.floor(curSentence.length * curPct);
    const partial = curSentence.slice(0, partialLen);
    // Add a trailing space between prior and current if needed
    const combined = previous
      ? previous + (partial.length ? " " + partial : "")
      : partial;
    const isEnd = index === count - 1 && curPct >= 1;
    return (
      <span
        className={cn(
          "relative font-mono font-bold inline-block align-top",
          className
        )}
        data-low-perf
      >
        <span aria-hidden className="invisible">
          {longestSentence}
        </span>
        <span className="absolute inset-0 whitespace-pre-wrap transition-opacity">
          {combined}
        </span>
        {mounted &&
          isEnd &&
          createPortal(
            prompt,
            mountPromptTo
              ? document.getElementById(mountPromptTo)!
              : document.body
          )}
      </span>
    );
  }

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
