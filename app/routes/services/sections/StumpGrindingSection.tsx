import Section from "../Section";
import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";
import Typewriter from "~/components/Typewriter";
import GetAQuote from "~/components/GetAQuote";
import Progress from "../Progress";

function StumpGrindingContent() {
  const p = useScrollProgress();

  // Match TreeRemoval timing philosophy: long typewriter, late emphasis reveal
  const emphasisOpacity = useTransform(p, [0.8, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.8, 0.9], [40, 0]);
  const typePct = useTransform(p, [0, 0.8], [0, 1]);

  return (
    <motion.div className="relative z-10 max-w-4xl space-y-8 will-change-transform">
      <Typewriter
        pct={typePct}
        className="relative text-3xl tracking-tight text-white/80 leading-snug text-shadow-md"
        mountPromptTo="stump-grinding"
      >
        Stump grinding is the final step that lets your landscape move forward.
        Leftover stumps can harbor pests, create trip hazards, and block
        replanting or hardscape plans. We grind each stump below grade so the
        area can be reclaimed — whether you want turf, new plantings, mulch
        beds, or a fresh design. Our process is clean and contained: we protect
        adjacent root zones, manage chips, and leave you with a site that’s
        actually ready for what’s next instead of a half-finished project.
      </Typewriter>

      <motion.b
        className="block pr-4 text-emerald-200 font-semibold"
        style={{ opacity: emphasisOpacity, y: emphasisY }}
      >
        Clean finish. Clear future.
      </motion.b>

      <GetAQuote
        text="Get a stump grinding quote"
        className="md:mt-4 md:text-left text-center"
        style={{ opacity: emphasisOpacity.get() }}
      />
    </motion.div>
  );
}

export default function StumpGrindingSection() {
  return (
    <Section
      id="stump-grinding"
      className="text-left bg-gradient-to-br from-amber-900 via-amber-700 to-amber-600"
      height={20}
    >
      {() => (
        <>
          <Progress />
          <StumpGrindingContent />
        </>
      )}
    </Section>
  );
}
