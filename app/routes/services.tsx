import ScrollAnimation, {
  useScrollProgress,
} from "../components/ScrollAnimation";

import { motion, useTransform, useMotionValueEvent } from "motion/react";
import type { MotionValue } from "motion/react";
import React, { useState, useEffect, useMemo } from "react";

import { toRadians } from "~/utils/math";

type SectionChild = React.ReactNode | ((progress: number) => React.ReactNode);

function truncateText(text: string, pct: number) {
  const maxLength = Math.floor(text.length * pct);
  if (maxLength <= 0) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, Math.max(0, maxLength - 1)) + "|";
}

function Section({
  className,
  height,
  children,
}: {
  children: SectionChild;
  className?: string;
  height?: number;
}) {
  return (
    <ScrollAnimation
      heightMultiplier={height ? height : 2}
      render={(progress: number) => (
        <div
          className={`relative overflow-hidden flex items-center justify-center min-h-screen px-6 ${className || ""}`}
        >
          {typeof children === "function"
            ? (children as (p: number) => React.ReactNode)(progress)
            : children}
        </div>
      )}
    />
  );
}

function Typewriter({
  children: text,
  pct,
}: {
  children: string;
  pct: MotionValue<number>;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const reserveText = useMemo(() => {
    // Pick the longest sentence to reserve space for stable layout.
    const sentences = (function split(t: string): string[] {
      try {
        if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
          const seg = new (Intl as any).Segmenter(undefined, {
            granularity: "sentence",
          });
          const out: string[] = [];
          for (const { segment } of (seg as any).segment(t)) {
            const s = String(segment).trim();
            if (s) out.push(s);
          }
          if (out.length) return out;
        }
      } catch {}
      const matches = t.match(/[^.!?]+(?:[.!?]+|$)/g) || [];
      return matches.map((s) => s.trim()).filter(Boolean);
    })(text);
    if (!sentences.length) return text;
    return sentences.reduce(
      (longest, s) => (s.length > longest.length ? s : longest),
      sentences[0]
    );
  }, [text]);

  // Split text into sentences, preferring Intl.Segmenter if available
  function splitIntoSentences(t: string): string[] {
    try {
      if (typeof Intl !== "undefined" && (Intl as any).Segmenter) {
        const seg = new (Intl as any).Segmenter(undefined, {
          granularity: "sentence",
        });
        const out: string[] = [];
        for (const { segment } of (seg as any).segment(t)) {
          const s = String(segment).trim();
          if (s) out.push(s);
        }
        if (out.length) return out;
      }
    } catch {
      // ignore and fall back to regex
    }
    const matches = t.match(/[^.!?]+(?:[.!?]+|$)/g) || [];
    return matches.map((s) => s.trim()).filter(Boolean);
  }

  function compute(tProgress: number) {
    const sentences = splitIntoSentences(text);
    const n = sentences.length || 1;
    const raw = Math.max(0, Math.min(1, tProgress)) * n;
    let s = Math.floor(raw);
    if (s >= n) s = n - 1;
    const r = Math.min(1, Math.max(0, raw - s));
    const sentence = sentences[s] || "";
    return truncateText(sentence, r);
  }

  // Initialize on mount or if text changes
  useEffect(() => {
    setDisplayedText(compute(pct.get()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Update as the MotionValue changes
  useMotionValueEvent(pct, "change", (latest) => {
    setDisplayedText(compute(latest));
  });

  return (
    <span className="relative inline-block align-top">
      <span aria-hidden className="invisible">
        {reserveText}
      </span>
      <span className="absolute inset-0">{displayedText}</span>
    </span>
  );
}

function GetAQuote({ text = "Get a Quote" }: { text?: string }) {
  return (
    <motion.a
      href="/quote"
      className="mt-6 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  );
}

function CertificationBadge({
  title,
  image,
  className,
}: {
  title: string;
  image: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative isolate group flex flex-col items-center text-center rounded-2xl p-5 md:p-6 shadow-xl ring-1 ring-black/5 dark:ring-white/10 bg-gradient-to-br from-white/80 via-white/70 to-emerald-50/60 dark:from-gray-900/60 dark:via-gray-900/40 dark:to-emerald-900/20 backdrop-blur-md"
      aria-label={title}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(50%_50%_at_50%_0%,rgba(16,185,129,0.22),transparent_70%)] opacity-60 group-hover:opacity-90 transition-opacity"
      />

      <motion.img
        src={image}
        alt={title}
        className={`h-28 md:h-32 w-auto rounded-md shadow-lg mb-3 md:mb-4 object-contain ${
          className || ""
        }`}
        initial={{ filter: "saturate(0.9)" }}
        whileHover={{ filter: "saturate(1.05)" }}
      />
      <div className="relative z-[1]">
        <h3 className="text-base md:text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-700 dark:from-emerald-200 dark:via-green-200 dark:to-lime-200">
          {title}
        </h3>
        <div className="mt-1 h-px w-10 mx-auto bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent dark:via-emerald-300/40" />
      </div>
    </motion.div>
  );
}

function PreservationSection() {
  return (
    <Section className="text-left bg-blue-500 dark:bg-blue-900" height={4}>
      {() => <PreservationContent />}
    </Section>
  );
}

function TreeRemovalSection() {
  return (
    <Section className="text-left will-change-auto" height={7}>
      {() => <TreeRemovalContent />}
    </Section>
  );
}

function CertificationsSection() {
  return (
    <Section
      className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-shadow-lg"
      height={5}
    >
      {() => <CertificationsContent />}
    </Section>
  );
}

function StumpGrindingSection() {
  return (
    <Section className="text-left bg-amber-700 dark:bg-amber-900" height={3}>
      {() => <StumpGrindingContent />}
    </Section>
  );
}

function EmergencyServicesSection() {
  return (
    <Section className="text-left bg-red-700 dark:bg-red-900" height={3}>
      {() => <EmergencyServicesContent />}
    </Section>
  );
}

// Motion-driven content components that consume scroll progress via context
function PreservationContent() {
  const p = useScrollProgress();
  const grassPos = useTransform(p, (v) => `${-Math.round(v * 200)}px 100%`);
  const sunTransform = useTransform(
    p,
    (v) =>
      `translate(${v * 100}vw, ${Math.cos(toRadians(v * 360)) * 100}px) translateX(-50%) translateY(30vh)`
  );
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateY(-50%)", "translateY(0%)"]
  );
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const emphasisOpacity = useTransform(p, [0.4, 0.7], [0, 1]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24"
        style={{
          backgroundImage: "url('/services/grass.png')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: grassPos,
          backgroundSize: "auto 700%",
        }}
      />
      <motion.img
        src="/services/sun.png"
        alt="A sun shining"
        className="absolute inset-0 object-cover w-60 h-60 will-change-transform"
        style={{ transform: sunTransform }}
      />
      <motion.div
        className="relative z-10 max-w-4xl space-y-2 will-change-transform"
        style={{ transform: containerTransform, opacity: containerOpacity }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">
          We love trees.
        </h2>
        <p className="text-base sm:text-lg text-white/80 leading-relaxed text-shadow-xs">
          We precision prune, proactively manage health, and eco‑focus on
          preservation.
        </p>
        <motion.b
          className="text-green-200"
          style={{ opacity: emphasisOpacity }}
        >
          Removal is never our first choice. We will always prioritize tree
          health and preservation before destruction.
        </motion.b>
        <GetAQuote />
      </motion.div>
    </>
  );
}

function TreeRemovalContent() {
  const p = useScrollProgress();
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateX(-50%)", "translateX(0%)"]
  );
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const emphasisOpacity = useTransform(p, [0.7, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.7, 0.9], [40, 0]);

  const typePct1 = useTransform(p, [0, 0.8], [0, 1]);
  const typePct2 = useTransform(p, [0.5, 0.85], [0, 1]);

  const TEXTS = [
    "You can't save them all.",
    "In some cases, removal is necessary.",
    "It is what it is.",
    "Safety first, always.",
    "When removal is the only option.",
    "Your safety is our priority.",
    "Trust the experts.",
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-8 will-change-transform"
      style={{ opacity: containerOpacity }}
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-white text-shadow-lg"
        whileHover={{
          x: [0, -5, 5, -5, 5, 0, 0, -5, 5, -5, 5, 0],
          y: [0, -2, 2, -2, 2, 0, 0, -2, 2, -2, 2, 0],
          color: ["#ffffff", "#ffaaaa", "#ffffff"],
          transition: { duration: 0.2 },
        }}
        onHoverStart={() => {
          setCurrentTextIndex((currentTextIndex + 1) % TEXTS.length);
        }}
      >
        {TEXTS[currentTextIndex]}
      </motion.h2>
      <p className="text-base sm:text-2xl text-white/80 leading-relaxed text-shadow-xs">
        <Typewriter pct={typePct1}>
          Tree removal is never our first choice, but sometimes it’s the best
          option for safety and property protection. Whether due to storm
          damage, disease, or structural concerns, we provide safe, efficient
          removals using modern equipment and industry best practices. Every
          removal is handled with care—from protecting nearby landscaping to
          ensuring complete cleanup when the job is done. As ISA Certified
          professionals, we follow strict safety standards so you can have peace
          of mind knowing your property is in good hands.
        </Typewriter>
      </p>
      <motion.b
        className="text-red-200 block"
        style={{ opacity: emphasisOpacity, y: emphasisY }}
      >
        We assess each situation carefully, prioritizing safety and offering
        alternatives whenever possible before proceeding with removal.
      </motion.b>

      <GetAQuote text="Discuss your options" />
    </motion.div>
  );
}

function CertificationsContent() {
  const p = useScrollProgress();
  const containerOpacity = useTransform(p, [0.5, 0.8], [0, 1]);
  const headingOpacity = useTransform(p, [0, 0.5], [0, 1]);
  const headingRotate = useTransform(
    p,
    [0, 0.3, 0.5],
    ["50deg", "20deg", "0deg"]
  );

  return (
    <div className="relative z-10 max-w-3xl space-y-6">
      <motion.h2
        className="text-left text-6xl md:text-8xl font-bold text-foreground dark:text-green-300"
        style={{ opacity: headingOpacity, rotate: headingRotate }}
      >
        We're certified.
      </motion.h2>
      <motion.h1
        className="text-left text-2xl md:text-3xl font-semibold text-green-100"
        style={{ opacity: containerOpacity }}
      >
        We've got the accolades so you have peace of mind.
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-10"
        style={{ opacity: containerOpacity }}
      >
        <CertificationBadge
          title="ISA Certified Arborists"
          image="/services/isa.png"
          className="pl-2"
        />
        <CertificationBadge
          title="TRAQ Qualified"
          image="/services/traq_t.png"
          className="pl-3"
        />
      </motion.div>
    </div>
  );
}

function StumpGrindingContent() {
  const p = useScrollProgress();
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateY(20%)", "translateY(0%)"]
  );
  const emphasisOpacity = useTransform(p, [0.5, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.5, 0.9], [40, 0]);
  const typePctS1 = useTransform(p, [0, 0.5], [0, 1]);
  const typePctS2 = useTransform(p, [0.5, 0.85], [0, 1]);

  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-6 will-change-transform"
      style={{ opacity: containerOpacity, transform: containerTransform }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">
        Stump Grinding
      </h2>
      <p className="text-base sm:text-xl text-white/90 leading-relaxed text-shadow-xs">
        <Typewriter pct={typePctS1}>
          After a tree is removed, the stump left behind can be more than just
          an eyesore — it can also be a tripping hazard, attract pests, and make
          future planting difficult. Our professional stump grinding service
          safely and efficiently removes stumps of all sizes, restoring your
          yard to a clean, usable space. We grind stumps below ground level,
          leaving the area ready for grass, landscaping, or even replanting.
          Every job includes thorough cleanup so your property looks neat and
          finished when we’re done.
        </Typewriter>
      </p>
      <motion.b
        className="text-amber-200 pr-4 block"
        style={{ opacity: emphasisOpacity, y: emphasisY }}
      >
        Clean finish, ready for what’s next.
      </motion.b>
      <GetAQuote text="Get a stump grinding quote" />
    </motion.div>
  );
}

function EmergencyServicesContent() {
  const p = useScrollProgress();
  const containerOpacity = useTransform(p, [0, 0.2], [0, 1]);
  const containerTransform = useTransform(
    p,
    [0, 1],
    ["translateY(30%)", "translateY(0%)"]
  );
  const emphasisOpacity = useTransform(p, [0.5, 0.9], [0, 1]);
  const emphasisY = useTransform(p, [0.5, 0.9], [40, 0]);
  const typePct = useTransform(p, [0, 0.6], [0, 1]);

  return (
    <motion.div
      className="relative z-10 max-w-4xl space-y-6 will-change-transform"
      style={{ opacity: containerOpacity, transform: containerTransform }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white text-shadow-lg">
        Emergency Services
      </h2>
      <p className="text-base sm:text-xl text-white/90 leading-relaxed text-shadow-xs">
        <Typewriter pct={typePct}>
          Storms and unexpected events can leave trees damaged, dangerous, or
          blocking access to your property. When that happens, you need quick,
          professional help. We provide emergency tree services to safely remove
          hazardous limbs and downed trees, restoring safety and peace of mind.
        </Typewriter>
      </p>
      <motion.b
        className="text-red-200 pr-4 block"
        style={{ opacity: emphasisOpacity, y: emphasisY }}
      >
        Our team is equipped to respond promptly, even in difficult conditions.
        With safety as our top priority, we work efficiently to protect your
        home, family, and property from further damage.
      </motion.b>
      <GetAQuote text="Request emergency help" />
    </motion.div>
  );
}

export default function Services() {
  return (
    <div className="mx-auto bg-white dark:bg-black">
      <motion.header
        className="flex flex-col items-center justify-center text-center h-screen"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
      >
        <h1 className="md:text-6xl text-4xl font-bold tracking-tight pb-2 bg-gradient-to-r from-emerald-300 via-green-200 to-lime-200 bg-clip-text text-transparent">
          Tree care that's tailored to you.
        </h1>
        <motion.p
          whileHover={{ scale: 1.05 }}
          className="mt-6 p-2 md:text-2xl text-md bg-gradient-to-r bg-clip-text text-transparent from-emerald-500 via-yellow-800 to-purple-800 max-w-8xl"
        >
          We deliver comprehensive, sustainable tree care combining
          science‑driven diagnostics with precision fieldwork.
        </motion.p>
        <p className="pt-10">This is what we do, and we're proud of it.</p>
        <p className="animate-bounce absolute bottom-[1vh] left-1/2 transform -translate-x-1/2 text-neutral-400">
          Scroll to learn more...
        </p>
      </motion.header>

      <PreservationSection />
      <CertificationsSection />
      <TreeRemovalSection />
      <EmergencyServicesSection />
      <StumpGrindingSection />
    </div>
  );
}
