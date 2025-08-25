import type { Route } from "./+types/home";
import { Hero } from "../components/Hero";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Modern Arborist | Professional Tree Care" },
    {
      name: "description",
      content:
        "Modern Arborist provides expert, science-based tree care: pruning, removals, plant health, risk assessment, and emergency response.",
    },
    { name: "og:title", content: "Modern Arborist" },
    {
      name: "og:description",
      content:
        "Professional, sustainable arborist services focused on tree health and safety.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
  <WhyChooseUs />
      <Services />
      <Process />
      <CTA />
      <Footer />
    </>
  );
}
