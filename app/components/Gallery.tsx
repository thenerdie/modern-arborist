import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export type GalleryItem = {
  src: string;
  alt?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GalleryGrid({
  items,
  className,
  gridClassName,
  gap = "gap-4",
  enableLightbox = true,
}: {
  items: GalleryItem[];
  className?: string;
  gridClassName?: string;
  gap?: string;
  enableLightbox?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i + items.length - 1) % items.length)), [items.length]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
          gap,
          gridClassName
        )}
      >
        {items.map((item, i) => (
          <button
            key={item.src + i}
            className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl overflow-hidden"
            onClick={enableLightbox ? () => open(i) : undefined}
          >
            <motion.img
              src={item.src}
              alt={item.alt || "Gallery image"}
              loading="lazy"
              decoding="async"
              className="h-36 sm:h-40 md:h-48 lg:h-56 w-full object-cover rounded-xl shadow-md"
              initial={{ scale: 1.02 }}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 dark:ring-white/10" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
      {enableLightbox && (
        <Lightbox
          items={items}
          index={index}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

export function Lightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = index === null ? null : items[index];

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative max-w-[95vw] max-h-[85vh] p-2 sm:p-4"
            initial={{ scale: 0.98, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
          >
            <img
              src={item.src}
              alt={item.alt || "Expanded image"}
              className="max-h-[80vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
            />
            {/* Controls */}
            <div className="absolute inset-x-0 -bottom-12 flex items-center justify-center gap-4">
              <button
                onClick={onPrev}
                className="px-3 py-1.5 rounded-md bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow ring-1 ring-black/5 dark:ring-white/10 hover:bg-white"
              >
                Prev
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-md bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow ring-1 ring-black/5 dark:ring-white/10 hover:bg-white"
              >
                Close
              </button>
              <button
                onClick={onNext}
                className="px-3 py-1.5 rounded-md bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow ring-1 ring-black/5 dark:ring-white/10 hover:bg-white"
              >
                Next
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function GalleryMasonry({
  items,
  className,
  columns = 3,
  gap = 16,
  enableLightbox = true,
}: {
  items: GalleryItem[];
  className?: string;
  columns?: number;
  gap?: number;
  enableLightbox?: boolean;
}) {
  const columnClass = useMemo(() => `columns-${columns}`, [columns]);
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i + items.length - 1) % items.length)), [items.length]);
  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(columnClass)} style={{ columnGap: gap }}>
        {items.map((item, i) => (
          <button
            key={item.src + i}
            onClick={enableLightbox ? () => open(i) : undefined}
            className="mb-4 w-full break-inside-avoid rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <motion.img
              src={item.src}
              alt={item.alt || "Gallery image"}
              loading="lazy"
              decoding="async"
              className="w-full h-auto rounded-xl shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
            />
          </button>
        ))}
      </div>
      {enableLightbox && (
        <Lightbox
          items={items}
          index={index}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

export default GalleryGrid;

