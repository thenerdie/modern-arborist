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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onMeta = () => {
      if (!v.duration || isNaN(v.duration)) return; // wait for real metadata
      setDuration(v.duration || 0);
    };
    const onCanPlayThrough = () => {
      setReady(true);
    };
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("canplaythrough", onCanPlayThrough, { once: true });

    // Freeze playback; we’ll drive currentTime manually
    v.pause();
    v.playbackRate = 0;

    // If metadata already there (cache), capture immediately
    onMeta();

    // Fallback: after short delay, fetch whole file -> blob to guarantee seekable buffer (esp Safari/iOS)
    let aborted = false;
    const fallbackTimer = setTimeout(async () => {
      if (ready || aborted) return;
      try {
        const res = await fetch(src, { cache: "force-cache" });
        const blob = await res.blob();
        if (aborted) return;
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;
        v.src = url; // swap to fully local blob
        v.load();
        v.onloadedmetadata = () => {
          onMeta();
          setReady(true);
        };
      } catch {
        // swallow; network errors will just leave normal streaming path
      }
    }, 800);

    return () => {
      aborted = true;
      clearTimeout(fallbackTimer);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("canplaythrough", onCanPlayThrough);
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [src, ready]);

  useMotionValueEvent(smooth, "change", (p) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    // Clamp for safety
    const t = Math.max(0, Math.min(duration, p * duration));
    v.currentTime = t;
  });

  return (
    <video
      ref={videoRef}
      className={cn("w-full h-auto", className)}
      playsInline
      muted
      preload="auto"
      // Provide both; browsers will pick the first they support
      // You can also use <source> children if you prefer
      src={src}
      crossOrigin="anonymous"
      onCanPlay={() => {
        videoRef.current?.pause();
        setReady(true);
      }}
      onLoadedMetadata={() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.duration && !isNaN(v.duration)) setDuration(v.duration);
      }}
      data-ready={ready ? "true" : "false"}
    />
  );
}
