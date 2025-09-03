import ScrollAnimation from "../components/ScrollAnimation";

import { motion } from "motion/react";
import React from "react";

export default function Services() {
  const serviceItems = [
    {
      title: "Pruning & Canopy Management",
      body:
        "Structural pruning, crown thinning, deadwood removal, and vista pruning—executed with ANSI A300 standards for long‑term tree vitality.",
      accent: "🌿",
    },
    {
      title: "Tree Health Diagnostics",
      body:
        "Soil analysis, pest / disease identification, nutrient management plans, and non‑invasive decay detection.",
      accent: "🩺",
    },
    {
      title: "Preservation & Risk Mitigation",
      body:
        "Cabling & bracing, load distribution strategies, risk assessments, and construction impact mitigation.",
      accent: "🛡️",
    },
    {
      title: "Removals & Technical Rigging",
      body:
        "Precision dismantling, crane-assisted removals, and low‑impact lowering systems to protect surrounding assets.",
      accent: "🪓",
    },
    {
      title: "Planting & Species Selection",
      body:
        "Right tree, right place. Site evaluation, species matching for resilience, and long‑term establishment care.",
      accent: "🌱",
    },
    {
      title: "Soil & Root Zone Care",
      body:
        "Air spading, root collar excavation, biochar / compost amendment, mulching strategies, and compaction relief.",
      accent: "🪴",
    },
  ];

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

      {/* Enhanced scroll-driven service cards with unique creative animations */}
      <div>
        {serviceItems.map((svc, i) => (
          <React.Fragment key={svc.title}>
            <ScrollAnimation
              heightMultiplier={1.5}
              render={(p) => {
                const baseOpacity = 0.08 + p * 0.92;
                let transform = '';
                let extra: React.CSSProperties = {};
                switch (i % 6) {
                  case 0: // Rise + subtle counter-rotate
                    transform = `translateY(${(1 - p) * 140}px) rotate(${(1 - p) * -4}deg) scale(${0.85 + p * 0.15})`;
                    break;
                  case 1: // Sweep in from left w/ depth
                    transform = `translate3d(${(1 - p) * -50}vw, ${(1 - p) * 40}px, 0) scale(${0.7 + p * 0.3}) rotateY(${(1 - p) * 25}deg)`;
                    extra = { transformStyle: 'preserve-3d', perspective: '1200px' };
                    break;
                  case 2: // Flip forward
                    transform = `rotateX(${(1 - p) * 65}deg) translateY(${(1 - p) * 120}px) scale(${0.75 + p * 0.25})`;
                    extra = { transformOrigin: '50% 0%' };
                    break;
                  case 3: // Skew drift + glow intensity
                    transform = `translateY(${(1 - p) * 90}px) skewY(${(1 - p) * 8}deg) scale(${0.8 + p * 0.2})`;
                    break;
                  case 4: // Spiral grow
                    transform = `translateY(${(1 - p) * 160}px) rotate(${(1 - p) * 18}deg) scale(${0.6 + p * 0.4})`;
                    break;
                  case 5: // Pop zoom w/ slight wobble
                    const wobble = Math.sin(p * Math.PI * 3) * (1 - p) * 4;
                    transform = `translateY(${(1 - p) * 110}px) rotate(${wobble}deg) scale(${0.65 + p * 0.35})`;
                    break;
                }

                const accentGlow = 0.15 + p * 0.55;
                const lineWidth = `${p * 100}%`;

                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Ambient field */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at ${50 + p * 25}% ${40 + p * 20}%, rgba(52,211,153,${0.05 + p * 0.25}), transparent 70%)`,
                        filter: `blur(${28 + p * 18}px)`,
                        opacity: 0.6,
                        transition: 'background 0.25s linear',
                      }}
                    />

                    <motion.div
                      className="relative max-w-3xl w-full mx-auto rounded-3xl p-[2px]"
                      style={{ opacity: baseOpacity }}
                      initial={false}
                    >
                      {/* Animated border shell */}
                      <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: `linear-gradient(140deg, rgba(52,211,153,${accentGlow}) 0%, rgba(163,230,53,${accentGlow * 0.55}) 40%, rgba(52,211,153,${accentGlow * 0.4}) 80%)`,
                          filter: 'blur(6px)',
                          opacity: 0.6,
                        }}
                      />
                      <div
                        className="relative rounded-3xl border border-emerald-500/15 bg-gradient-to-br from-emerald-950/70 via-emerald-900/40 to-emerald-800/10 backdrop-blur-md p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]"
                        style={{ transform, ...extra }}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-5xl drop-shadow-md select-none" style={{ filter: `saturate(${0.6 + p * 0.4}) brightness(${0.9 + p * 0.2})` }}>{svc.accent}</span>
                          <h3
                            className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-emerald-200 via-lime-200 to-emerald-100 bg-clip-text text-transparent"
                            style={{ letterSpacing: `${(1 - p) * 1.5}px`, filter: `blur(${(1 - p) * 2.5}px)` }}
                          >
                            {svc.title}
                          </h3>
                        </div>
                        <p
                          className="text-neutral-300 leading-relaxed text-lg"
                          style={{
                            transform: `translateY(${(1 - p) * 25}px)`,
                            opacity: 0.2 + p * 0.8,
                            filter: `blur(${(1 - p) * 3}px)`,
                          }}
                        >
                          {svc.body}
                        </p>
                        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-300 via-lime-300 to-emerald-200" style={{ width: lineWidth }} />
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3 text-[10px] font-mono tracking-widest text-emerald-300/70">
                          {['QUALITY','SAFETY','SUSTAIN'].map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 rounded bg-emerald-700/20 border border-emerald-500/20"
                              style={{
                                transform: `translateY(${(1 - p) * 12}px)`,
                                opacity: 0.3 + p * 0.7,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {/* Floating accent orb */}
                        <motion.div
                          className="pointer-events-none absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-tr from-emerald-400/40 to-lime-300/30 blur-2xl"
                          style={{ opacity: p * 0.7, transform: `scale(${0.4 + p * 0.6}) translate(${(1 - p) * 40}px, ${(1 - p) * -30}px)` }}
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              }}
              reducedMotionFallback={
                <div className="max-w-3xl mx-auto p-10 border border-emerald-700/30 rounded-xl bg-emerald-900/40">
                  <h3 className="text-2xl font-semibold text-emerald-300 mb-4 flex items-center gap-3">
                    <span>{svc.accent}</span> {svc.title}
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">{svc.body}</p>
                </div>
              }
            />
            {i < serviceItems.length - 1 && <div className="h-screen" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}