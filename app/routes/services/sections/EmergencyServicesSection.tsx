import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";
import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";

function EmergencyServicesContent() {
  const p = useScrollProgress();
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const containerTransform = useTransform(p, [0, 1], ["translateY(30%)", "translateY(0%)"]);
  const emphasisOpacity = useTransform(p, [0.5, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.5, 0.9], [40, 0]);
  const typePct = useTransform(p, [0, 0.6], [0, 1]);

  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-6 will-change-transform"
      style={{ opacity: containerOpacity, transform: containerTransform }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">Emergency Services</h2>
      <p className="text-base sm:text-xl text-white/90 leading-relaxed text-shadow-xs">
        <Typewriter pct={typePct}>
          Storms and unexpected events can leave trees damaged, dangerous, or blocking access to your property. When that happens, you need quick, professional help. We provide emergency tree services to safely remove hazardous limbs and downed trees, restoring safety and peace of mind.
        </Typewriter>
      </p>
      <motion.b className="text-red-200 pr-4 block" style={{ opacity: emphasisOpacity, y: emphasisY }}>
        Our team is equipped to respond promptly, even in difficult conditions. With safety as our top priority, we work efficiently to protect your home, family, and property from further damage.
      </motion.b>
      <GetAQuote text="Request emergency help" />
    </motion.div>
  );
}

export default function EmergencyServicesSection() {
  return (
    <Section className="text-left bg-red-700 dark:bg-red-900" height={6}>
      {() => <EmergencyServicesContent />}
    </Section>
  );
}
