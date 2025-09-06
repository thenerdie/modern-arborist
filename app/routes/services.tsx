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

      <div className="flex items-center justify-center min-h-screen px-6 text-left">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white">We love trees.</h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            Anything green under the sun is our forte—except grass. We precision prune, proactively manage health, and eco‑focus on preservation.
          </p>
        </div>
      </div>
    </div>
  );
}