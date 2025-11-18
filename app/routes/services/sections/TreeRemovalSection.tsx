import Section from "../Section";

import { motion } from "framer-motion";
import GetAQuote from "~/components/GetAQuote";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export function TreeRemovalSection() {
  return (
    <Section id="tree-removal" className="text-left bg-gray-900">
      <motion.div
        className="space-y-6 text-white"
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold">
          Tree removal when it's truly needed.
        </h2>
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Tree removal is never our first choice, but sometimes it is the best
          option for safety and property protection. Whether due to storm
          damage, disease, or structural concerns, we provide safe, efficient
          removals using modern equipment and industry best practices.
        </p>
        <p className="text-base md:text-lg text-white/80 leading-relaxed">
          Every removal is handled with care—from protecting nearby landscaping
          to making sure the site is cleaned up when the job is done. As ISA
          Certified professionals, we follow strict safety standards so you can
          have peace of mind knowing your property is in good hands.
        </p>
        <GetAQuote
          text="Discuss your options"
          className="md:mt-4 md:text-left text-center"
        />
      </motion.div>
    </Section>
  );
}
