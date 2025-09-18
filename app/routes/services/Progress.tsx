import { useState } from "react";
import { motion, useSpring, useMotionValueEvent } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";

export default function Progress() {
  const progress = useScrollProgress();
  const smooth = useSpring(progress, { stiffness: 2000, damping: 50 });

  // React state for rendering text
  const [percent, setPercent] = useState(0);

  // Subscribe to MotionValue changes
  useMotionValueEvent(smooth, "change", (v) => {
    setPercent(v * 100);
  });

  return (
    <>
      <span
        className="fixed bottom-5 left-0 font-bold"
        style={{
          marginLeft: `${percent - 2}vw`,
          scale: 1 + Math.abs(smooth.getVelocity()) * 1.1,
        }}
      >
        {percent.toFixed(0)}%
      </span>
      <motion.div
        className="fixed bottom-0 left-0 w-full h-5 bg-black/20 backdrop-blur-md text-white text-center py-1 font-mono z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute bg-gray-700 h-full"
          style={{ width: `${percent}%` }}
        ></div>
      </motion.div>
    </>
  );
}
