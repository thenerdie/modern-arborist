import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useState } from "react";
import { useScrollProgress } from "~/components/ScrollAnimation";

import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";

function TreeRemovalContent() {
  const p = useScrollProgress();
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateX(-50%)", "translateX(0%)"]
  );
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const emphasisOpacity = useTransform(p, [0.7, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.7, 0.9], [40, 0]);

  const typePct1 = useTransform(p, [0, 0.8], [0, 1]);
  const typePct2 = useTransform(p, [0.5, 0.85], [0, 1]);

  const TEXTS = [
    "You can't save them all.",
    "In some cases, removal is necessary.",
    "It is what it is.",
    "Safety first, always.",
    "When removal is the only option.",
    "Your safety is our priority.",
    "Trust the experts.",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-8 will-change-transform"
      style={{ opacity: containerOpacity }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white text-shadow-lg"
        whileHover={{
          x: [0, -5, 5, -5, 5, 0, 0, -5, 5, -5, 5, 0],
          y: [0, -2, 2, -2, 2, 0, 0, -2, 2, -2, 2, 0],
          color: ["#ffffff", "#ffaaaa", "#ffffff"],
          transition: { duration: 0.2 },
        }}
        onHoverStart={() => {
          setCurrentTextIndex((currentTextIndex + 1) % TEXTS.length);
        }}
      >
        {TEXTS[currentTextIndex]}
      </motion.h2>
      <p className="text-base sm:text-2xl text-white/80 leading-relaxed text-shadow-xs">
        <Typewriter pct={typePct1}>
          Tree removal is never our first choice, but sometimes it’s the best
          option for safety and property protection. Whether due to storm
          damage, disease, or structural concerns, we provide safe, efficient
          removals using modern equipment and industry best practices. Every
          removal is handled with care—from protecting nearby landscaping to
          ensuring complete cleanup when the job is done. As ISA Certified
          professionals, we follow strict safety standards so you can have peace
          of mind knowing your property is in good hands.
        </Typewriter>
      </p>
      <motion.b
        className="text-red-200 block"
        style={{ opacity: emphasisOpacity, y: emphasisY }}
      >
        We assess each situation carefully, prioritizing safety and offering
        alternatives whenever possible before proceeding with removal.
      </motion.b>

      <GetAQuote text="Discuss your options" />
    </motion.div>
  );
}

export function TreeRemovalSection() {
  return (
    <Section className="text-left will-change-auto" height={7}>
      {() => <TreeRemovalContent />}
    </Section>
  );
}