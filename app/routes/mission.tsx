import { useEffect, useRef } from "react";
import { animate, inView } from "motion";

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
    <section ref={sectionRef} className="max-w-4xl mx-auto px-6 py-12 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-lg opacity-0" style={{ transform: "translateY(20px)" }}>
      <h1 ref={headingRef} className="text-5xl font-bold text-center mb-8 text-green-800 dark:text-green-300 opacity-0" style={{ transform: "translateY(-30px)" }}>
        🌳 Our Mission 🌳
      </h1>
      <div ref={contentRef} className="prose prose-lg mx-auto text-center">
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 opacity-0" style={{ transform: "translateX(-20px)" }}>
          At Modern Arborist, our mission is to provide exceptional tree care services that prioritize the health, safety, and sustainability of your trees and the environment.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 opacity-0" style={{ transform: "translateX(-20px)" }}>
          We are committed to:
        </p>
        <ul className="list-none text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 space-y-4 opacity-0" style={{ transform: "translateX(-20px)" }}>
          <li className="flex items-center gap-3">
            <span className="text-green-600 text-2xl">✅</span>
            Delivering expert arboricultural services with integrity and professionalism
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-600 text-2xl">🌱</span>
            Promoting sustainable practices that benefit both urban and natural landscapes
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-600 text-2xl">📚</span>
            Educating our clients about proper tree care and maintenance
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-600 text-2xl">🛡️</span>
            Ensuring the safety of our team, clients, and the community
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-600 text-2xl">🌍</span>
            Contributing to greener, healthier communities through responsible tree management
          </li>
        </ul>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed opacity-0" style={{ transform: "translateX(-20px)" }}>
          With years of experience and a passion for arboriculture, we strive to be your trusted partner in maintaining beautiful, healthy trees that enhance your property and contribute to a sustainable future.
        </p>
      </div>
    </section>
  );
}
