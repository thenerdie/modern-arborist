import Section from "../Section";

import { motion, useTransform } from "framer-motion";
import { useScrollProgress } from "~/components/ScrollAnimation";

function CertificationBadge({
  title,
  image,
  className,
}: {
  title: string;
  image: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative isolate group flex md:flex-col flex-row items-center gap-2 justify-center text-center rounded-2xl p-2 md:p-6 shadow-xl ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-white/80 via-white/70 to-emerald-50/60 dark:from-gray-900/60 dark:via-gray-900/40 dark:to-emerald-900/20 backdrop-blur-md"
      aria-label={title}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.22),transparent_70%)] opacity-60 group-hover:opacity-90 transition-opacity"
      />

      <motion.img
        src={image}
        alt={title}
        className={`h-15 md:h-32 w-auto rounded-md shadow-lg mb-4 object-contain ${
          className || ""
        }`}
        initial={{ filter: "saturate(0.9)" }}
        whileHover={{ filter: "saturate(1.05)" }}
        loading="lazy"
        decoding="async"
      />
      <div className="relative z-[1]">
        <h3 className="text-base md:text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-700 dark:from-emerald-200 dark:via-green-200 dark:to-lime-200">
          {title}
        </h3>
        {/* <div className="mt-1 h-px w-10 mx-auto bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent dark:via-emerald-300/40" /> */}
      </div>
    </motion.div>
  );
}

function CertificationsContent() {
  const p = useScrollProgress();
  const containerOpacity = useTransform(p, [0.5, 0.8], [0, 1]);
  const headingOpacity = useTransform(p, [0, 0.5], [0, 1]);

  return (
    <div className="relative z-10 max-w-3xl space-y-6">
      <motion.h2
        className="text-center text-3xl md:text-5xl font-bold text-foreground dark:text-green-300"
        style={{ opacity: headingOpacity }}
      >
        We're certified. And insured.
      </motion.h2>
      <motion.h1
        className="text-center text-lg md:text-2xl font-semibold text-green-100"
        style={{ opacity: containerOpacity }}
      >
        We've got the accolades so you have peace of mind.
      </motion.h1>
      {/* Using flex-wrap so that an incomplete final row is centered. */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 pt-2 md:gap-10 md:pt-5"
        style={{ opacity: containerOpacity }}
      >
        <CertificationBadge
          title="ISA Certified Arborists"
          image="/services/isa.png"
          className="pl-2"
        />
        <CertificationBadge
          title="TRAQ Qualified"
          image="/services/traq_t.png"
          className="pl-3"
        />
        <CertificationBadge
          title="Fully Licensed & Insured"
          image="/services/traq.png"
        />
      </motion.div>
    </div>
  );
}

export default function CertificationsSection() {
  return (
    <Section
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-shadow-lg"
      height={5}
    >
      {() => <CertificationsContent />}
    </Section>
  );
}
