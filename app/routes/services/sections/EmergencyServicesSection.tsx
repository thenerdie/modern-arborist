import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";
import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";

function EmergencyServicesContent() {
  const p = useScrollProgress();

  const typePct = useTransform(p, [0, 0.6], [0, 1]);

  return (
    <motion.div className="relative z-10 max-w-4xl space-y-6 will-change-transform">
      <p className="text-base md:text-2xl text-white/90 leading-relaxed text-shadow-xs">
        <Typewriter pct={typePct}>
          Storms and unexpected events can leave trees damaged, dangerous, or
          blocking access to your property. When that happens, you need quick,
          professional help. We provide emergency tree services to safely remove
          hazardous limbs and downed trees, restoring safety and peace of mind.
        </Typewriter>
      </p>
      <GetAQuote text="Request emergency help" />
    </motion.div>
  );
}

export default function EmergencyServicesSection() {
  return (
    <Section className="text-left bg-red-700 dark:bg-red-900" height={10}>
      {() => <EmergencyServicesContent />}
    </Section>
  );
}
