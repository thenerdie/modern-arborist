import { useEffect, useRef } from "react";
import { motion, animate, inView } from "motion/react";

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      animate(
        sectionRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.8, ease: "easeOut" }
      );
    }
    if (headingRef.current) {
      animate(
        headingRef.current,
        { opacity: [0, 1], y: [-30, 0] },
        { duration: 0.6, ease: "easeOut", delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    return inView("section p, section ul", (el) => {
      animate(
        el,
        { opacity: [0, 1], x: [-20, 0] },
        { duration: 0.5, ease: "easeOut", delay: 0.1 }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="max-w-4xl mx-auto px-6 py-12" style={{ transform: "translateY(20px)" }}>
      <h1 ref={headingRef} className="text-5xl font-bold text-center mb-8 text-green-800 dark:text-green-300 opacity-0" style={{ transform: "translateY(-30px)" }}>
        What is our mission?
      </h1>
      <div ref={contentRef} className="prose prose-lg mx-auto text-center">
        <p className="text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 opacity-0" style={{ transform: "translateX(-20px)" }}>
          Our mission is simple enough to fit in a small, olde scroll. Seriously.
        </p>
        <div className="font-royal relative mx-auto max-w-3xl">
          <div className="relative">
            {/* Scroll background image */}
            <img
              src="scroll.png"
              alt=""
              role="presentation"
              aria-hidden="true"
              className="w-full h-auto select-none pointer-events-none opacity-90 drop-shadow-xl"
              style={{ filter: 'contrast(1.05) saturate(1.1)', transform: 'translateX(-20px)' }}
            />
            {/* Overlay gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/0 to-black/20 pointer-events-none rounded" />
            {/* Text content overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 py-10">
              <p
                className="text-xl md:text-2xl font-semibold text-emerald-800 dark:text-emerald-200 drop-shadow-sm leading-relaxed mb-6 opacity-0"
                style={{ transform: 'translateX(-20px)' }}
              >
                We are committed to:
              </p>
              <ul
                className="list-none text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed space-y-3 md:space-y-4 opacity-0"
                style={{ transform: 'translateX(-20px)' }}
              >
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-2xl">✅</span>
                  <span>Delivering expert arboricultural services with integrity and professionalism</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-2xl">🌱</span>
                  <span>Promoting sustainable practices that benefit both urban and natural landscapes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-2xl">📚</span>
                  <span>Educating our clients about proper tree care and maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-2xl">🛡️</span>
                  <span>Ensuring the safety of our team, clients, and the community</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 dark:text-green-400 text-2xl">🌍</span>
                  <span>Contributing to greener, healthier communities through responsible tree management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed opacity-0" style={{ transform: "translateX(-20px)" }}>
          With years of experience and a passion for arboriculture, we strive to be your trusted partner in maintaining beautiful, healthy trees that enhance your property and contribute to a sustainable future.
        </p>
      </div>
    </section>
  );
}
