import ScrollAnimation from "../components/ScrollAnimation";

import { motion } from "motion/react";
import React from "react";

export default function Services() {
  return (
    <div className="mx-auto px-6 space-y-32 bg-black">
      <motion.header
        className="flex flex-col items-center justify-center text-center h-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <h1
            className="text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-green-200 to-lime-200 bg-clip-text text-transparent"
        >
          Our Services
        </h1>
        <motion.p
            whileHover={{ scale: 1.05 }}
            className="mt-6 p-2 text-2xl bg-gradient-to-r from-emerald-800 via-green-800 to-lime-800 max-w-8xl"
        >
          We deliver comprehensive, sustainable tree care combining science‑driven diagnostics with precision fieldwork.
        </motion.p>
        <p className="pt-10">This is what we do, and we're proud of it.</p>
        <p className="animate-bounce absolute bottom-10 left-1/2 transform -translate-x-1/2 text-neutral-400">Scroll to learn more...</p>
      </motion.header>

      <ScrollAnimation
        heightMultiplier={3}
        render={(p) => (
          <div className="relative w-full h-full bg-black flex">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none will-change-opacity"
              style={{
                background: `radial-gradient(circle at 50% 60%, rgba(16,82,52,${p * 0.55}) 0%, rgba(0,0,0,${p * 0.75}) 70%)`,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen will-change-transform will-change-opacity"
              style={{
                background: 'linear-gradient(135deg,#34d399,#059669)',
                transform: `translate(-50%, -50%) translateY(${p * -120}px) rotate(${p * 180}deg) scale(${0.7 + p * 0.6})`,
                opacity: 0.15 + p * 0.85,
              }}
            />
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-90">
              <h2
                className="text-4xl md:text-5xl font-bold text-white will-change-transform will-change-opacity"
                style={{
                  transform: `translateY(${(1 - p) * 50}vh)`,
                  opacity: p,
                }}
              >
                We love trees.
              </h2>
              <p
                className="text-xl mt-4 max-w-3xl text-white/80 mx-auto will-change-transform will-change-opacity"
                style={{
                  transform: `translateY(${(1 - p) * 60}vh)`,
                  opacity: p * 0.9,
                }}
              >
                Anything under the green sun is our forte. We'll precision prune, proactively manage health, and eco‑focus on preservation.
              </p>
            </div>
            <div className="absolute top-3 right-4 text-[10px] tracking-wide text-white/60 bg-black/40 px-2 py-1 rounded">
              Scroll
            </div>
          </div>
        )}
        reducedMotionFallback={
          <img src="/trimming.jpg" alt="Tree trimming" className="w-full h-full object-cover opacity-80" />
        }
      />
    </div>
  );
}