import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { toRadians } from "~/utils/math";
import { useScrollProgress } from "~/components/ScrollAnimation";
import GetAQuote from "~/components/GetAQuote";

// Motion-driven content components that consume scroll progress via context
function PreservationContent() {
  const p = useScrollProgress();
  const grassPos = useTransform(p, (v) => `${-Math.round(v * 200)}px 100%`);
  const sunTransform = useTransform(
    p,
    (v) =>
      `translate(${v * 100}vw, ${Math.cos(toRadians(v * 360)) * 100}px) translateX(-50%) translateY(30vh)`
  );
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateY(-50%)", "translateY(0%)"]
  );
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const emphasisOpacity = useTransform(p, [0.4, 0.7], [0, 1]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24"
        style={{
          backgroundImage: "url('/services/grass.png')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: grassPos,
          backgroundSize: "auto 700%",
        }}
      />
      <motion.img
        src="/services/sun.png"
        alt="A sun shining"
        className="absolute inset-0 object-cover w-60 h-60 will-change-transform"
        style={{ transform: sunTransform }}
      />
      <motion.div
        className="relative z-10 max-w-4xl space-y-2 will-change-transform"
        style={{ transform: containerTransform, opacity: containerOpacity }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">
          We love trees.
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed text-shadow-xs">
          We precision prune, proactively manage health, and eco‑focus on
          preservation.
        </p>
        <motion.b
          className="text-green-200"
          style={{ opacity: emphasisOpacity }}
        >
          Removal is never our first choice. We will always prioritize tree
          health and preservation before destruction.
        </motion.b>
        <GetAQuote />
      </motion.div>
    </>
  );
}

export default function PreservationSection() {
  return (
    <Section className="text-left bg-blue-500 dark:bg-blue-900" height={4}>
      {() => <PreservationContent />}
    </Section>
  );
}