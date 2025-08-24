import React from "react";

const steps = [
  {
    title: "Consultation",
    text: "On‑site assessment by a certified arborist to understand goals and tree health.",
  },
  {
    title: "Plan & Proposal",
    text: "Clear recommendations with scope, methods, and safety considerations.",
  },
  {
    title: "Professional Execution",
    text: "Skilled crew performs the work with precision, care, and minimal disruption.",
  },
  {
    title: "Stewardship",
    text: "Ongoing monitoring, maintenance, and proactive health strategies.",
  },
];

export function Process() {
  return (
    <section className="bg-gray-50 dark:bg-gray-950/40 border-y border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-green-600">How it works</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Our Process</p>
        </div>
        <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-8">
              <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-semibold">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold mt-2">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
