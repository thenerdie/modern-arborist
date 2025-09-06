import ScrollAnimation, {
  useScrollProgress,
} from "../components/ScrollAnimation";

import { motion, useTransform } from "motion/react";
import React from "react";

import { toRadians } from "~/utils/math";

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
      {() => <PreservationContent />}
    </Section>
  );
}

function TreeRemovalSection() {
  return (
    <Section className="text-left bg-red-500 dark:bg-red-900" height={4}>
      {() => <TreeRemovalContent />}
    </Section>
  );
}

function CertificationsSection() {
  return (
    <Section
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-shadow-lg"
      height={5}
    >
      {() => <CertificationsContent />}
    </Section>
  );
}

// Motion-driven content components that consume scroll progress via context
function PreservationContent() {
  const p = useScrollProgress();
  const grassPos = useTransform(p, (v) => `${-Math.round(v * 200)}px 100%`);
  const sunTransform = useTransform(
    p,
    (v) =>
      `translate(${v * 100}vw, ${Math.cos(toRadians(v * 360)) * 100}px) translateX(-50%) translateY(30vh)`
  );
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateY(-50%)", "translateY(0%)"]
  );
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const emphasisOpacity = useTransform(p, [0.4, 0.7], [0, 1]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24"
        style={{
          backgroundImage: "url('/services/grass.png')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: grassPos,
          backgroundSize: "auto 700%",
        }}
      />
      <motion.img
        src="/services/sun.png"
        alt="A sun shining"
        className="absolute inset-0 object-cover w-60 h-60 will-change-transform"
        style={{ transform: sunTransform }}
      />
      <motion.div
        className="relative z-10 max-w-4xl space-y-2 will-change-transform"
        style={{ transform: containerTransform, opacity: containerOpacity }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">
          We love trees.
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed text-shadow-xs">
          We precision prune, proactively manage health, and eco‑focus on
          preservation.
        </p>
        <motion.b
          className="text-green-200"
          style={{ opacity: emphasisOpacity }}
        >
          Removal is never our first choice. We will always prioritize tree
          health and preservation before destruction.
        </motion.b>
      </motion.div>
    </>
  );
}

function TreeRemovalContent() {
  const p = useScrollProgress();
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateY(-50%)", "translateY(0%)"]
  );
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const emphasisOpacity = useTransform(p, [0.5, 0.9], [0, 1]);

  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-8 will-change-transform"
      style={{ transform: containerTransform, opacity: containerOpacity }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white text-shadow-lg"
        whileHover={{
          x: [0, -5, 5, -5, 5, 0, 0, -5, 5, -5, 5, 0],
          transition: { duration: 0.2 },
        }}
      >
        You can't save them all.
      </motion.h2>
      <p className="text-base sm:text-xl text-white/80 leading-relaxed text-shadow-xs">
        In cases where a tree poses a significant risk to property, safety, or
        health, we perform expert tree removal services. Our team uses advanced
        techniques to ensure safe, efficient, and environmentally responsible
        removals, minimizing impact on the surrounding area.
        <br /> <br /> Tree removal is never our first choice, but sometimes it’s
        the best option for safety and property protection. Whether due to storm
        damage, disease, or structural concerns, we provide safe, efficient
        removals using modern equipment and industry best practices. Every
        removal is handled with care—from protecting nearby landscaping to
        ensuring complete cleanup when the job is done. As ISA Certified
        professionals, we follow strict safety standards so you can have peace
        of mind knowing your property is in good hands.
      </p>
      <motion.b className="text-red-200" style={{ opacity: emphasisOpacity }}>
        We assess each situation carefully, prioritizing safety and offering
        alternatives whenever possible before proceeding with removal.
      </motion.b>
    </motion.div>
  );
}

function CertificationsContent() {
  const p = useScrollProgress();
  const containerOpacity = useTransform(p, [0, 0.3], [0, 1]);
  const headingOpacity = useTransform(p, [0, 0.5], [0, 1]);
  const headingRotate = useTransform(p, [0, 0.3], ["0deg", "360deg"]);

  return (
    <motion.div
      className="relative z-10 max-w-3xl space-y-6 will-change-transform"
      style={{ opacity: containerOpacity }}
    >
      <motion.h2
        className="text-left text-6xl md:text-8xl font-bold text-green-800 dark:text-green-300"
        style={{ opacity: headingOpacity, rotate: headingRotate }}
      >
        We're certified.
      </motion.h2>
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
    </motion.div>
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
      <TreeRemovalSection />
    </div>
  );
}
