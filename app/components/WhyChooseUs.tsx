import React from "react";

const points = [
  { icon: "🌳", text: "ISA Certified Arborists" },
  { icon: "🛡️", text: "Fully insured & safety focused" },
  { icon: "🧪", text: "Science-based tree health care" },
  { icon: "♻️", text: "Sustainable, low‑impact practices" },
  { icon: "⚡", text: "Rapid storm & severe weather response" },
];

export function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="relative isolate overflow-hidden py-20"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-950 via-green-900 to-emerald-950" />
      <div className="absolute inset-0 -z-10 opacity-25 mix-blend-overlay bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.12),transparent_55%)]" />
      <div className="mx-auto max-w-5xl px-6 text-center text-white">
        <h2 id="why-choose-us-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
          Why choose us?
        </h2>
        <p className="mt-4 text-base text-green-100 max-w-2xl mx-auto">
          Modern Arborist blends scientific expertise with precision field work to care for your trees responsibly.
        </p>
    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {points.map((p) => (
            <li
              key={p.text}
      className="group rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-inset ring-white/15 px-4 py-6 flex flex-col items-center text-sm font-medium shadow transition transform-gpu hover:-translate-y-2 hover:scale-[1.04] hover:bg-white/15 hover:ring-white/30 hover:shadow-xl"
            >
              <span className="text-2xl mb-2 drop-shadow">{p.icon}</span>
              <span className="text-green-50 group-hover:text-white text-center leading-snug">
                {p.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WhyChooseUs;
