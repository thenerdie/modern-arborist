import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";
import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";
import ScrubbableVideo from "~/components/ScrubVideo";

function EmergencyServicesContent() {
  const p = useScrollProgress();

  const typePct = useTransform(p, [0, 0.6], [0, 1]);

  return (
    <motion.div className="relative z-10 max-w-4xl space-y-6 will-change-transform">
      <p className="text-base md:text-4xl text-red-200 leading-relaxed text-shadow-lg">
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
    <Section className="text-left bg-red-700 dark:bg-red-900" height={20}>
      {() => (
        <>
          <ScrubbableVideo
            src="scrub_intra.mp4"
            className="pointer-events-none absolute inset-0 object-cover w-full h-full opacity-30 z-0"
          />
          <EmergencyServicesContent />
        </>
      )}
    </Section>
  );
}
