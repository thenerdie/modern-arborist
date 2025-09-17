import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useState } from "react";
import { useScrollProgress } from "~/components/ScrollAnimation";

import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";

function TreeRemovalContent() {
  const p = useScrollProgress();

  const emphasisOpacity = useTransform(p, [0.8, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.8, 0.9], [40, 0]);

  const typePct1 = useTransform(p, [0, 0.8], [0, 1]);

  return (
    <motion.div className="relative z-10 max-w-4xl space-y-8 will-change-transform">
      <Typewriter
        pct={typePct1}
        className="relative text-3xl tracking-tight text-white/80 leading-snug text-shadow-md"
        mountPromptTo="tree-removal"
      >
        Tree removal is never our first choice, but sometimes it’s the best
        option for safety and property protection. Whether due to storm damage,
        disease, or structural concerns, we provide safe, efficient removals
        using modern equipment and industry best practices. Every removal is
        handled with care—from protecting nearby landscaping to ensuring
        complete cleanup when the job is done. As ISA Certified professionals,
        we follow strict safety standards so you can have peace of mind knowing
        your property is in good hands.
      </Typewriter>

      <GetAQuote
        text="Discuss your options"
        className={`md:mt-4 md:text-left text-center`}
        style={{ opacity: emphasisOpacity.get() }}
      />
    </motion.div>
  );
}

export function TreeRemovalSection() {
  return (
    <Section id="tree-removal" className="text-left" height={25}>
      {() => <TreeRemovalContent />}
    </Section>
  );
}
