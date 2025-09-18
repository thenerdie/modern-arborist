import { motion } from "motion/react";

import PreservationSection from "./sections/PreservationSection";
import { TreeRemovalSection } from "./sections/TreeRemovalSection";
import CertificationsSection from "./sections/CertificationsSection";
import EmergencyServicesSection from "./sections/EmergencyServicesSection";
import StumpGrindingSection from "./sections/StumpGrindingSection";

export default function Services() {
  return (
    <div className="mx-auto bg-white dark:bg-black">
      <motion.header
        className="relative flex min-h-screen flex-col items-center text-center px-4 pb-24"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        {/* Wrapper grows to fill height so content can be centered excluding the bottom scroll hint */}
        <div className="flex flex-1 w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <h1 className="md:text-6xl text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-green-200 to-lime-200 bg-clip-text text-transparent">
              Tree care that's tailored to you.
            </h1>
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="p-2 md:text-2xl text-md bg-gradient-to-r from-emerald-500 via-yellow-800 to-purple-800 bg-clip-text text-transparent max-w-4xl"
            >
              We deliver comprehensive, sustainable tree care combining
              science‑driven diagnostics with precision fieldwork.
            </motion.p>
            <p>This is what we do, and we're proud of it.</p>
          </div>
        </div>

        <p className="animate-bounce absolute bottom-4 left-1/2 -translate-x-1/2 text-neutral-400">
          Scroll to learn more...
        </p>
      </motion.header>

      <PreservationSection />
      <CertificationsSection />
      <TreeRemovalSection />
      <EmergencyServicesSection />
      <StumpGrindingSection />
    </div>
  );
}
