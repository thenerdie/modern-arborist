import React from "react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Darkened overlay gradient for legibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-950/95 via-emerald-950/70 to-teal-900/90" />
      <div className="mx-auto max-w-7xl px-6 py-28 flex flex-col items-center text-center">
        <img
          src="/logo.png"
          alt="Modern Arborist Logo"
          className="w-[420px] max-w-full h-auto drop-shadow-xl"
          loading="eager"
          decoding="async"
        />
        <p className="mt-4 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium leading-tight tracking-tight text-green-100 w-full md:whitespace-nowrap">
          Expert tree care focused on <span className="text-emerald-300 font-semibold">health</span>, <span className="text-yellow-300 font-semibold">safety</span>, and <span className="text-lime-300 font-semibold">sustainability</span>.
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-md bg-white px-8 py-3 text-sm font-semibold text-green-800 shadow hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Request a Quote
          </a>
          <a
            href="#services"
            className="text-sm font-semibold leading-6 text-green-100 hover:text-white"
          >
            Our Services <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
