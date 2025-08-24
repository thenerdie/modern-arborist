import React from "react";

const services = [
  {
    title: "Pruning & Structural Care",
    desc: "Health-focused pruning to improve structure, longevity, and safety.",
  },
  {
    title: "Tree Removal & Crane Work",
    desc: "Safe, efficient removals with minimal landscape impact.",
  },
  {
    title: "Plant Health Care",
    desc: "Diagnostics, soil improvement, fertilization, and pest management.",
  },
  {
    title: "Tree Risk Assessment",
    desc: "Professional evaluation to reduce hazards and liability.",
  },
  {
    title: "Cabling & Bracing",
    desc: "Support systems to preserve valuable, compromised trees.",
  },
  {
    title: "Emergency Storm Response",
    desc: "Rapid mitigation and cleanup after severe weather.",
  },
];

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-base font-semibold leading-7 text-green-600">What we do</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Comprehensive, science‑based tree care
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          We combine modern arboricultural research with practical field expertise to protect and enhance your trees.
        </p>
      </div>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
