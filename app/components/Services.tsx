import React from "react";

const services = [
  { title: "Trimming, Pruning, & Structural Care", desc: "Health-focused pruning to improve structure, longevity, and safety." },
  { title: "Tree Removal & Crane Work", desc: "Safe, efficient removals with minimal landscape impact." },
  { title: "Stump Removal", desc: "Remove dead stumps and roots to restore your landscape." },
  { title: "Tree Risk Assessment", desc: "Professional evaluation to reduce hazards and liability." },
  { title: "Cabling & Bracing", desc: "Support systems to preserve valuable, compromised trees." },
  { title: "Our Clean-Up Promise ❤️", desc: "We will leave your property looking better than we found it." },
];

export function Services() {
  return (
    <section id="services" className="relative isolate py-24 overflow-hidden">
      {/* Background image layer (full bleed) */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/cutting.jpg"
          alt="Tree cutting in progress"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
      {/* Overlay tint (separate element for better control, like Hero) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-neutral-950/80 via-neutral-900/55 to-neutral-800/65" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center text-white">
          <h2 className="text-base font-semibold leading-7 text-green-300">What we do</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Comprehensive, science‑based tree care
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-200">
            We combine modern arboricultural research with practical field expertise to protect and enhance your trees.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border border-white/15 bg-white/90 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
