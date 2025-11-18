import Section from "../Section";

import { motion } from "framer-motion";
import GetAQuote from "~/components/GetAQuote";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function PreservationSection() {
  return (
    <Section className="text-left bg-blue-500 dark:bg-blue-900">
      <motion.div
        className="space-y-3 text-white"
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold">We love trees.</h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed">
          We precision prune, proactively manage tree health, and focus on
          long-term preservation so your trees stay safe, healthy, and
          beautiful.
        </p>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          From diagnostics to maintenance, we approach every tree with care,
          not guesswork.
        </p>
        <p className="text-green-100 font-semibold">
          Removal is never our first choice. We always prioritize tree health
          and preservation before removal.
        </p>
        <GetAQuote className="mt-4" />
      </motion.div>
    </Section>
  );
}
