import { useEffect, useRef, useState } from "react";
import { useSpring, useMotionValueEvent } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";

import { cn } from "~/lib/utils";

export default function ScrubbableVideo({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const progress = useScrollProgress(); // MotionValue in [0,1]
  const smooth = useSpring(progress, { stiffness: 140, damping: 28 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const blobUrlRef = useRef<string | null>(null);
  // Keep track of last rendered frame index to avoid excessive decodes
  const lastFrameIndexRef = useRef<number>(-1);
  const assumedFpsRef = useRef<number>(30); // fallback if we can't detect
  const detectedRef = useRef(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let aborted = false;
    const controller = new AbortController();

    // Always do a full fetch -> blob for perfectly seekable buffer
    (async () => {
      try {
        const res = await fetch(src, {
          cache: "force-cache",
          signal: controller.signal,
        });
        const blob = await res.blob();
        if (aborted) return;
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        v.src = url;
        v.load();
        v.onloadedmetadata = () => {
          if (!v.duration || isNaN(v.duration)) return;
          setDuration(v.duration);
          setReady(true);
        };
      } catch (e) {
        if ((e as any)?.name === "AbortError") return;
        // Fallback: use original src if fetch fails
        v.src = src;
        v.onloadedmetadata = () => {
          if (!v.duration || isNaN(v.duration)) return;
          setDuration(v.duration);
          setReady(true);
        };
      }
    })();

    v.pause();
    v.playbackRate = 0;

    return () => {
      aborted = true;
      controller.abort();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [src]);

  useMotionValueEvent(smooth, "change", (p) => {
    const v = videoRef.current;
    if (!v || !duration) return;

    // Attempt to infer FPS once (after ready). Some browsers expose it; most don't, so we infer by duration/readyState.
    if (!detectedRef.current && ready) {
      // Heuristic: if duration < 8s and naturalWidth exists, assume 30; else 24 or 60 for longer clips could be tested.
      // Allow caller later to override via data attribute if needed.
      if (duration <= 12) assumedFpsRef.current = 30;
      else assumedFpsRef.current = 24;
      detectedRef.current = true;
    }

    const fps = assumedFpsRef.current;
    const targetTime = Math.max(0, Math.min(duration, p * duration));
    // Quantize to frame boundary
    const frameIndex = Math.round(targetTime * fps);
    if (frameIndex === lastFrameIndexRef.current) return; // same frame -> skip
    lastFrameIndexRef.current = frameIndex;
    const quantizedTime = frameIndex / fps;

    // Only seek if significant delta to avoid micro adjustments
    if (Math.abs(v.currentTime - quantizedTime) > 0.005) {
      v.currentTime = quantizedTime;
    }
  });

  return (
    <video
      ref={videoRef}
      className={cn("w-full h-auto", className)}
      playsInline
      muted
      // we control loading manually
      preload="metadata"
      crossOrigin="anonymous"
      data-ready={ready ? "true" : "false"}
    />
  );
}
