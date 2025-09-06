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

      <ScrollAnimation
        heightMultiplier={3}
        render={(p) => {
          // Eased progress for smoother spacing translation
          const ease = (t: number) => 1 - Math.pow(1 - t, 2);
          const ep = ease(p);
          return (
            <div className="relative w-full h-full bg-black">
              {/* Ambient gradient backdrop */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none will-change-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 55%, rgba(16,82,52,${ep * 0.55}) 0%, rgba(0,0,0,${ep * 0.8}) 70%)`,
                  opacity: 0.6 + ep * 0.4,
                  transition: 'opacity .3s linear',
                }}
              />
              {/* Decorative orb */}
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 w-44 h-44 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen will-change-transform will-change-opacity"
                style={{
                  background: 'linear-gradient(135deg,#34d399,#059669)',
                  transform: `translate(-50%, -50%) translateY(${(1 - ep) * -40}px) rotate(${ep * 220}deg) scale(${0.55 + ep * 0.55})`,
                  opacity: 0.1 + ep * 0.9,
                }}
              />
              {/* Content wrapper with consistent vertical rhythm */}
              <div className="relative mx-auto flex min-h-screen flex-col items-center justify-center px-4 sm:px-8">
                <div
                  className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-3xl md:max-w-4xl"
                  style={{
                    transform: `translateY(${(1 - ep) * 18}vh) scale(${0.9 + ep * 0.1})`,
                    opacity: 0.2 + ep * 0.8,
                    willChange: 'transform,opacity',
                  }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                    We love trees.
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed [text-wrap:balance]">
                    Anything green under the sun is our forte—except grass. We precision prune, proactively manage health, and eco‑focus on preservation.
                  </p>
                  <div
                    className="h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
                    style={{
                      transform: `scaleX(${Math.min(1, ep * 1.2)})`,
                      transformOrigin: '50% 50%',
                      opacity: ep,
                    }}
                  />
                  <p
                    className="text-xs tracking-wide uppercase text-emerald-300/60"
                    style={{
                      letterSpacing: `${(1 - ep) * 9 }px`,
                      opacity: 0.2 + ep * 0.8,
                      transform: `translateY(${(1 - ep) * 20}px)`,
                      transition: 'letter-spacing .2s linear',
                    }}
                  >
                    Scroll to explore our capabilities
                  </p>
                </div>
              </div>
              <div className="absolute top-3 right-4 text-[10px] tracking-wide text-white/60 bg-black/40 px-2 py-1 rounded">
                Scroll
              </div>
            </div>
          );
        }}
        reducedMotionFallback={
          <div className="flex items-center justify-center min-h-screen px-6 text-center">
            <div className="max-w-3xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white">We love trees.</h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Anything green under the sun is our forte—except grass. We precision prune, proactively manage health, and eco‑focus on preservation.
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}