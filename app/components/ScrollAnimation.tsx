import React, { useRef, useEffect, useState, useCallback } from "react";

interface ScrollAnimationProps {
  /** How many viewport heights tall the scrolling container should be */
  heightMultiplier?: number; // e.g. 3 => 300vh
  /** Render prop receiving progress 0..1 */
  render: (progress: number) => React.ReactNode;
  /** Optional class names for outer wrapper */
  className?: string;
  /** Optional fallback node for prefers-reduced-motion */
  reducedMotionFallback?: React.ReactNode;
}

/**
 * A reusable scroll-driven stage that exposes a 0..1 progress value
 * via a render callback and mirrors it to a CSS variable `--progress`.
 */
export function ScrollAnimation({
  heightMultiplier = 3,
  render,
  className = "",
  reducedMotionFallback,
}: ScrollAnimationProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const update = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = rect.height - vh;
    const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
    const p = totalScrollable > 0 ? scrolled / totalScrollable : 0;
    el.style.setProperty("--progress", p.toString());
    // only re-render if meaningful change
    if (Math.abs(p - progressRef.current) > 0.001) {
      progressRef.current = p;
      setProgress(p);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <div
      ref={wrapRef}
      className={`relative [--progress:0] h-[${heightMultiplier * 100}vh] ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="w-full h-full">
          {render(progress)}
        </div>
      </div>
      {reducedMotionFallback && (
        <div className="hidden motion-reduce:block sticky top-0 h-screen">
          {reducedMotionFallback}
        </div>
      )}
    </div>
  );
}

export default ScrollAnimation;