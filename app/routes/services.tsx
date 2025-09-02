import { useRef, useEffect } from 'react';

function ScrollHtmlSequence() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // amount of scroll inside this component (excluding the sticky viewport itself)
      const totalScrollable = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const p = totalScrollable > 0 ? scrolled / totalScrollable : 0;
      el.style.setProperty('--p', p.toString());
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[300vh] [--p:0]">
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center justify-center">
        <div className="relative w-full h-full">{/* Stage */}
          {/* Background layer with subtle zoom / pan */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[url('/trimming.jpg')] bg-cover bg-center will-change-transform"
            style={{
              transform: 'scale(calc(1 + var(--p)*0.35)) translateY(calc(var(--p)*-6%))',
              filter: 'brightness(calc(1.05 - var(--p)*0.15))',
              transition: 'filter 0.2s linear',
            }}
          />
          {/* Gradient overlay that intensifies */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none will-change-opacity"
            style={{
              background: 'radial-gradient(circle at 50% 60%, rgba(16,82,52,calc(var(--p)*0.55)) 0%, rgba(0,0,0,calc(var(--p)*0.75)) 70%)',
            }}
          />
          {/* Animated focal element */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen will-change-transform will-change-opacity"
              style={{
                background: 'linear-gradient(135deg,#34d399,#059669)',
                transform: 'translate(-50%, -50%) translateY(calc(var(--p)*-120px)) rotate(calc(var(--p)*180deg)) scale(calc(0.7 + var(--p)*0.6))',
                opacity: 'calc(0.15 + var(--p)*0.85)',
              }}
            />
          {/* Text reveal */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-6">
            <h2
              className="text-4xl md:text-5xl font-bold text-white will-change-transform will-change-opacity"
              style={{
                transform: 'translateY(calc((1 - var(--p))*40px))',
                opacity: 'calc(var(--p))',
              }}
            >
              Sustainable Tree Care
            </h2>
            <p
              className="mt-4 max-w-xl text-white/80 mx-auto will-change-transform will-change-opacity"
              style={{
                transform: 'translateY(calc((1 - var(--p))*60px))',
                opacity: 'calc(var(--p)*0.9)',
              }}
            >
              Precision pruning, proactive health management, and eco‑focused preservation.
            </p>
          </div>
          <div className="absolute top-3 right-4 text-[10px] tracking-wide text-white/60 bg-black/40 px-2 py-1 rounded">
            Scroll
          </div>
        </div>
      </div>
      {/* Reduced motion fallback (shown when prefers-reduced-motion) */}
      <div className="hidden motion-reduce:block sticky top-0 h-screen bg-black items-center justify-center">
        <img src="/trimming.jpg" alt="Tree trimming" className="w-full h-full object-cover opacity-80" />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-32">
      <header className="max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-300 via-green-200 to-lime-200 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="mt-6 text-lg text-neutral-300">
          We deliver comprehensive, sustainable tree care combining science‑driven diagnostics with precision fieldwork.
        </p>
      </header>

      <ScrollHtmlSequence />

      <section className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-semibold text-emerald-300">Pruning & Canopy Management</h3>
          <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
            Structural pruning, crown thinning, deadwood removal, and vista pruning—executed with ANSI A300 standards for long‑term tree vitality.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-emerald-300">Tree Health Diagnostics</h3>
          <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
            Soil analysis, pest / disease identification, nutrient management plans, and non‑invasive decay detection.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-emerald-300">Preservation & Risk Mitigation</h3>
          <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
            Cabling & bracing, load distribution strategies, risk assessments, and construction impact mitigation.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-emerald-300">Removals & Technical Rigging</h3>
          <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
            Precision dismantling, crane-assisted removals, and low‑impact lowering systems to protect surrounding assets.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-emerald-300">Planting & Species Selection</h3>
          <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
            Right tree, right place. Site evaluation, species matching for resilience, and long‑term establishment care.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-emerald-300">Soil & Root Zone Care</h3>
          <p className="mt-2 text-neutral-300 text-sm leading-relaxed">
            Air spading, root collar excavation, biochar / compost amendment, mulching strategies, and compaction relief.
          </p>
        </div>
      </section>
    </div>
  );
}