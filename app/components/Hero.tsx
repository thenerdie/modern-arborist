import React from "react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-green-900/90 text-white">
      <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&w=1400&q=60')] bg-cover bg-center opacity-40" />
      <div className="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-x-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Modern Arborist</h1>
          <p className="mt-6 text-lg leading-8 text-green-100">
            Expert tree care focused on health, safety, and sustainability. We help your landscape thrive through science‑based pruning, preservation, and risk management.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#contact" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-green-800 shadow hover:bg-green-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              Request a Quote
            </a>
            <a href="#services" className="text-sm font-semibold leading-6 text-green-100 hover:text-white">
              Our Services <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mt-16 w-full max-w-md lg:mt-0 lg:flex-shrink-0">
          <div className="rounded-xl bg-white/10 ring-1 ring-white/20 backdrop-blur p-6 shadow-lg">
            <h2 className="text-xl font-semibold">Why choose us</h2>
            <ul className="mt-4 space-y-3 text-sm text-green-100">
              <li className="flex gap-2"><span>🌳</span><span>ISA Certified Arborists</span></li>
              <li className="flex gap-2"><span>🛡️</span><span>Fully insured & safety focused</span></li>
              <li className="flex gap-2"><span>🧪</span><span>Science-based tree health care</span></li>
              <li className="flex gap-2"><span>♻️</span><span>Sustainable, low‑impact practices</span></li>
              <li className="flex gap-2"><span>⚡</span><span>Rapid storm damage response</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
