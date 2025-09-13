import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";
import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";

function StumpGrindingContent() {
  const p = useScrollProgress();
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const containerTransform = useTransform(p, [0, 1], ["translateY(20%)", "translateY(0%)"]);
  const emphasisOpacity = useTransform(p, [0.5, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.5, 0.9], [40, 0]);
  const typePctS1 = useTransform(p, [0, 0.5], [0, 1]);

  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-6 will-change-transform"
      style={{ opacity: containerOpacity, transform: containerTransform }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">Stump Grinding</h2>
      <p className="text-base sm:text-xl text-white/90 leading-relaxed text-shadow-xs">
        <Typewriter pct={typePctS1}>
          After a tree is removed, the stump left behind can be more than just an eyesore — it can also be a tripping hazard, attract pests, and make future planting difficult. Our professional stump grinding service safely and efficiently removes stumps of all sizes, restoring your yard to a clean, usable space. We grind stumps below ground level, leaving the area ready for grass, landscaping, or even replanting. Every job includes thorough cleanup so your property looks neat and finished when we’re done.
        </Typewriter>
      </p>
      <motion.b className="text-amber-200 pr-4 block" style={{ opacity: emphasisOpacity, y: emphasisY }}>
        Clean finish, ready for what’s next.
      </motion.b>
      <GetAQuote text="Get a stump grinding quote" />
    </motion.div>
  );
}

export default function StumpGrindingSection() {
  return (
    <Section className="text-left bg-amber-700 dark:bg-amber-900" height={3}>
      {() => <StumpGrindingContent />}
    </Section>
  );
}
