import Section from "../Section";

import { motion } from "framer-motion";
import GetAQuote from "~/components/GetAQuote";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

function EmergencyServicesContent() {
  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-6 text-white"
      initial={fadeInUp.initial}
      whileInView={fadeInUp.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-4xl font-semibold">
        Emergency tree services when storms hit.
      </h2>
      <p className="text-base md:text-lg text-white/80 leading-relaxed">
        Storms and unexpected events can leave trees damaged, dangerous, or
        blocking access to your property. When that happens, you need quick,
        professional help. We provide emergency tree services to safely remove
        hazardous limbs and downed trees, restoring safety and peace of mind.
      </p>
      <p className="text-emerald-200 font-semibold">
        We respond fast for your peace of mind.
      </p>
      <GetAQuote text="Request emergency help" />
    </motion.div>
  );
}

export default function EmergencyServicesSection() {
  return (
    <Section className="text-left bg-red-700 dark:bg-red-900">
      <EmergencyServicesContent />
    </Section>
  );
}
