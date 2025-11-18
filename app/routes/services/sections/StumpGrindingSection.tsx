import Section from "../Section";

import { motion } from "framer-motion";
import GetAQuote from "~/components/GetAQuote";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function StumpGrindingContent() {
  return (
    <motion.div
      className="space-y-6 text-white"
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-4xl font-semibold">
        Stump grinding for a clean finish.
      </h2>
      <p className="text-base md:text-lg text-white/80 leading-relaxed">
        Stump grinding is the final step that lets your landscape move
        forward. Leftover stumps can harbor pests, create trip hazards, and
        block replanting or hardscape plans. We grind each stump below grade
        so the area can be reclaimed—whether you want turf, new plantings,
        mulch beds, or a fresh design.
      </p>
      <p className="text-base md:text-lg text-white/80 leading-relaxed">
        Our process is clean and contained: we protect adjacent root zones,
        manage chips, and leave you with a site that is actually ready for
        what is next, instead of a half-finished project.
      </p>
      <p className="text-emerald-200 font-semibold">Clean finish. Clear future.</p>
      <GetAQuote
        text="Get a stump grinding quote"
        className="md:mt-4 md:text-left text-center"
      />
    </motion.div>
  );
}

export default function StumpGrindingSection() {
  return (
    <Section
      id="stump-grinding"
      className="text-left bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600"
    >
      <StumpGrindingContent />
    </Section>
  );
}
