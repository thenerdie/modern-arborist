import { useContext, useEffect, useRef, useState } from "react";
import { motion, animate, inView } from "motion/react";

import Tenet from "./Tenet";
import Elaboration from "./Elaboration";

import { ElaborationContext } from "./ElaborationContext";

interface ITenet {
  title: string;
  body: string;
  elaboration?: string;
}

const TENETS: ITenet[] = [
  {
    title: "Faith & Integrity",
    body: "We honor God through honest work, transparency, and ethical practices.",
  },
  {
    title: "Family Legacy",
    body: "Built on hard work since 2003, we empower the next generation of modern arborists.",
  },
  {
    title: "Safety First",
    body: "Protecting people, property, and trees is our top priority on every job.",
  },
  {
    title: "Excellence in Craft",
    body: "Decades of experience paired with modern techniques deliver the best results.",
  },
  {
    title: "Stewardship of Creation",
    body: "We care for trees and the environment responsibly, with long-term health in mind.",
  },
  {
    title: "Innovation & Growth",
    body: "By embracing technology and fresh ideas, we stay at the cutting edge of arboriculture.",
  },
  {
    title: "Customer Care",
    body: "Every client is treated with respect, clear communication, and dependable service.",
  },
  {
    title: "Community Commitment",
    body: "Proud to serve local families, neighborhoods, and businesses.",
  },
];

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [elaborate, setElaborate] = useState<false | ITenet>(false);

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

  const api = {
    setElaborate,
    elaborate,
  };

  return (
    <ElaborationContext.Provider value={api}>
      <section
        ref={sectionRef}
        className="max-w-5xl mx-auto px-6 py-16"
        style={{ transform: "translateY(20px)" }}
      >
        <h1
          ref={headingRef}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-emerald-800 dark:text-emerald-300 opacity-1"
          style={{ transform: "translateY(-30px)" }}
        >
          Our Values
        </h1>
        <div
          ref={contentRef}
          className="grid gap-8 md:gap-10 md:grid-cols-2 text-left"
        >
          {TENETS.map((v, i) => (
            <Tenet key={v.title} title={v.title} body={v.body} />
          ))}
        </div>

        {elaborate && <Elaboration {...elaborate} />}
      </section>
    </ElaborationContext.Provider>
  );
}
