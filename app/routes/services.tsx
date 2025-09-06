import ScrollAnimation from "../components/ScrollAnimation";

import { motion } from "motion/react";
import React from "react";

import { inverseLerp, lerp, toRadians } from "~/utils/math";

type SectionChild = React.ReactNode | ((progress: number) => React.ReactNode);

function Section({
  className,
  height,
  children,
}: {
  children: SectionChild;
  className?: string;
  height?: number;
}) {
  return (
    <ScrollAnimation
      heightMultiplier={height ? height : 2}
      render={(progress: number) => (
        <div
          className={`relative overflow-hidden flex items-center justify-center min-h-screen px-6 ${className || ""}`}
        >
          {typeof children === "function"
            ? (children as (p: number) => React.ReactNode)(progress)
            : children}
        </div>
      )}
    />
  );
}

function CertificationBadge({
  title,
  image,
}: {
  title: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center space-x-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
      <img src={image} alt={title} className="h-40 w-auto pb-2" />
      <b className="text-lg font-semibold">{title}</b>
    </div>
  );
}

function PreservationSection() {
  return (
    <Section className="text-left bg-blue-500 dark:bg-blue-900" height={4}>
      {(p) => {
        return (
          <>
            {/* Tiled grass strip pinned to bottom, repeating along X, parallax with progress */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24"
              style={{
                backgroundImage: "url('/services/grass.png')",
                backgroundRepeat: "repeat-x",
                backgroundPosition: `${-Math.round(p * 200)}px 100%`,
                backgroundSize: "auto 700%",
              }}
            />
            <img
              src="/services/sun.png"
              alt="A healthy tree"
              className="absolute inset-0 object-cover w-60 h-60 will-change-transform"
              style={{
                transform: `translate(${p * 100}vw, ${Math.cos(toRadians(p * 360)) * 100}px) translateX(-50%) translateY(30vh)`,
              }}
            />
            <div
              className="relative z-10 max-w-4xl space-y-2 will-change-transform"
              style={{
                transform: "translateY(calc(-50% + var(--progress) * 50%))",
                opacity: `${inverseLerp(0, 0.2, p)}`,
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">
                We love trees.
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed text-shadow-xs">
                We precision prune, proactively manage health, and eco‑focus on
                preservation.
              </p>
              <b
                className="text-green-200"
                style={{ opacity: inverseLerp(0.5, 0.9, p) }}
              >
                Removal is never our first choice. We will always prioritize
                tree health and preservation before destruction.
              </b>
            </div>
          </>
        );
      }}
    </Section>
  );
}

function CertificationsSection() {
  return (
    <Section
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-shadow-lg"
      height={5}
    >
      {(p) => (
        <>
          <div
            className="relative z-10 max-w-3xl space-y-6 will-change-transform"
            style={{
              opacity: `${inverseLerp(0, 0.3, p)}`,
            }}
          >
            <h2
              className="text-left text-6xl md:text-8xl font-bold text-green-800 dark:text-green-300"
              style={{
                opacity: `${Math.min(1, p * 2)}`,
                rotate: `${inverseLerp(0, 0.3, p) * 360}deg`,
              }}
            >
              We're certified.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pt-10">
              <CertificationBadge
                title="ISA Certified Arborists"
                image="/services/isa.png"
              />
              <CertificationBadge
                title="TRAQ Qualified"
                image="/services/traq_t.png"
              />
            </div>
          </div>
        </>
      )}
    </Section>
  );
}

export default function Services() {
  return (
    <div className="mx-auto bg-white dark:bg-black">
      <motion.header
        className="flex flex-col items-center justify-center text-center h-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="md:text-6xl text-4xl font-bold tracking-tight pb-2 bg-gradient-to-r from-emerald-300 via-green-200 to-lime-200 bg-clip-text text-transparent">
          Tree care that's tailored to you.
        </h1>
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="mt-6 p-2 md:text-2xl text-md bg-gradient-to-r bg-clip-text text-transparent from-emerald-500 via-yellow-800 to-purple-800 max-w-8xl"
        >
          We deliver comprehensive, sustainable tree care combining
          science‑driven diagnostics with precision fieldwork.
        </motion.p>
        <p className="pt-10">This is what we do, and we're proud of it.</p>
        <p className="animate-bounce absolute bottom-[1vh] left-1/2 transform -translate-x-1/2 text-neutral-400">
          Scroll to learn more...
        </p>
      </motion.header>

      <PreservationSection />
      <CertificationsSection />
    </div>
  );
}
