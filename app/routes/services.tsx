import ScrollAnimation from "../components/ScrollAnimation";

import { motion } from "motion/react";
import React from "react";

import { inverseLerp } from "~/utils/lerp";

type SectionChild = React.ReactNode | ((progress: number) => React.ReactNode);

function Section({ className, height, children }: { children: SectionChild; className?: string; height?: number }) {
  return (
    <ScrollAnimation
      heightMultiplier={height ? height : 2}
      render={(progress: number) => (
        <div className={`relative overflow-hidden flex items-center justify-center min-h-screen px-6 ${className || ""}`}>
          {typeof children === "function" ? (children as (p: number) => React.ReactNode)(progress) : children}
        </div>
      )}
    />
  );
}

export default function Services() {
  return (
    <div className="mx-auto bg-black">
      <motion.header
        className="flex flex-col items-center justify-center text-center h-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <h1
            className="md:text-6xl text-4xl font-bold tracking-tight pb-2 bg-gradient-to-r from-emerald-300 via-green-200 to-lime-200 bg-clip-text text-transparent"
        >
          Tree care that's tailored to you.
        </h1>
        <motion.p
            whileHover={{ scale: 1.05 }}
            className="mt-6 p-2 md:text-2xl text-md bg-gradient-to-r bg-clip-text text-transparent from-emerald-500 via-yellow-800 to-purple-800 max-w-8xl"
        >
          We deliver comprehensive, sustainable tree care combining science‑driven diagnostics with precision fieldwork.
        </motion.p>
        <p className="pt-10">This is what we do, and we're proud of it.</p>
        <p className="animate-bounce absolute bottom-[1vh] left-1/2 transform -translate-x-1/2 text-neutral-400">Scroll to learn more...</p>
      </motion.header>

      <Section className="text-left bg-blue-500" height={3}>
        {(p) => {
          return (
            <>
              {/* Tiled grass strip pinned to bottom, repeating along X, parallax with progress */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24"
              style={{
                backgroundImage: "url('/services/grass.png')",
                backgroundRepeat: 'repeat-x',
                backgroundPosition: `${-Math.round(p * 200)}px 100%`,
                backgroundSize: 'auto 700%',
              }}
            />
            <img
              src="/services/sun.png"
              alt="A healthy tree"
              className="absolute inset-0 object-cover w-60 h-60 will-change-transform"
              style={{ transform: `translate(${inverseLerp(0.2, 0.5, p) * 600}px, ${inverseLerp(0.2, 0.5, p)}px)` }}
            />
            <div
              className="relative z-10 max-w-4xl space-y-2 will-change-transform"
              style={{ transform: "translateY(calc(-50% + var(--progress) * 50%))", opacity: `${inverseLerp(0, 0.2, p)}` }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">We love trees.</h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed text-shadow-xs">
                We precision prune, proactively manage health, and eco‑focus on preservation.
              </p>
              <b className="text-green-200" style={{ opacity: inverseLerp(0.5, 0.9, p) }}>Removal is never our first choice. We will always prioritize tree health and preservation before destruction.</b>
            </div>
          </>
        )
        }}
      </Section>

      <Section className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-shadow-lg">
        {(p) => (
          <>
            <div className="relative z-10 max-w-3xl space-y-6 will-change-transform" style={{ transform: "translateY(calc(-50% + var(--progress) * 50%))", opacity: `${Math.min(1, p * 2)}` }}>
              <h2 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-green-300">Our services</h2>
              <ul className="list-disc list-inside space-y-2 text-lg sm:text-xl leading-relaxed">
                <li>Tree Pruning & Trimming</li>
                <li>Tree Removal & Stump Grinding</li>
                <li>Tree Health Assessments & Diagnostics</li>
                <li>Integrated Pest Management (IPM)</li>
                <li>Cabling & Bracing for Structural Support</li>
                <li>Emergency Tree Services</li>
                <li>Consultation & Customized Tree Care Plans</li>
              </ul>
            </div>
          </>
        )}
      </Section>
    </div>
  );
}