import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";
import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";
import ScrubbableVideo from "~/components/ScrubVideo";
import { useLowPerfMode } from "~/utils/perf";

function EmergencyServicesContent() {
  const p = useScrollProgress();
  const lowPerf = useLowPerfMode();

  const typePct = useTransform(p, [0, 0.6], [0, 1]);
  const quoteOpacity = useTransform(p, [0.7, 0.9], [0, 1]);
  const quoteY = useTransform(p, [0.7, 0.9], [20, 0]);

  return (
    <motion.div className="relative z-10 max-w-4xl space-y-6 will-change-transform">
      <p className="text-3xl md:text-4xl text-red-200 leading-relaxed text-shadow-lg">
        <Typewriter pct={typePct} optimizeForLowPerf>
          Storms and unexpected events can leave trees damaged, dangerous, or
          blocking access to your property. When that happens, you need quick,
          professional help. We provide emergency tree services to safely remove
          hazardous limbs and downed trees, restoring safety and peace of mind.
        </Typewriter>
      </p>
      <motion.b
        className="block pr-4 text-emerald-200 font-semibold"
        style={{ opacity: quoteOpacity, y: quoteY }}
      >
        We respond fast for your peace of mind.
      </motion.b>
      <GetAQuote
        style={{ opacity: quoteOpacity.get() }}
        text={lowPerf ? "Get emergency help" : "Request emergency help"}
      />
    </motion.div>
  );
}

export default function EmergencyServicesSection() {
  // We must derive transforms from the progress inside the Section's render cycle
  return (
    <Section className="text-left bg-red-700 dark:bg-red-900" height={12}>
      {(progress: number) => {
        // Create a transient motion value via hook usingScrollProgress (already provided by Section context)
        const mv = useScrollProgress();
        const clip = useTransform(mv, (v) => `circle(${v * 400}% at 30% 30%)`);
        return (
          <>
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 w-full h-full opacity-50 z-0"
              style={{ clipPath: clip }}
            >
              <ScrubbableVideo
                src="scrub_gop10.mp4"
                className="pointer-events-none absolute inset-0 object-cover w-full h-full"
                degradeOnLowPerf
              />
            </motion.div>
            <EmergencyServicesContent />
          </>
        );
      }}
    </Section>
  );
}
