import type { Route } from "./+types/home";
import { Hero } from "../components/Hero";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Process } from "../components/Process";
import { CTA } from "../components/CTA";
import { Reviews } from "../components/Reviews";
import { MissionStatement } from "~/components/MissionStatement";
import type { Review } from "../components/Reviews";
import scrapedReviews from "~/data/reviews.json";
import { useLoaderData } from "react-router";

const SAMPLE_REVIEWS: Review[] = [
  {
    id: "sample1",
    author: "Sarah L.",
    rating: 5,
    text: "Incredibly professional team. They saved our storm‑damaged oak and explained every step.",
    relativeTime: "1 week ago",
  },
  {
    id: "sample2",
    author: "Daniel P.",
    rating: 5,
    text: "Fast emergency response after a lightning strike. Cleanup was spotless.",
    relativeTime: "2 weeks ago",
  },
  {
    id: "sample3",
    author: "Emily R.",
    rating: 5,
    text: "They think like tree scientists — our maples have never looked better.",
    relativeTime: "1 month ago",
  },
  {
    id: "sample4",
    author: "Miguel A.",
    rating: 5,
    text: "Clear communication, fair pricing, and impeccable safety practices.",
    relativeTime: "1 month ago",
  },
];

export async function loader() {
  try {
    const fromFile = (scrapedReviews as Review[]) ?? [];
    const reviews = fromFile.length ? fromFile : SAMPLE_REVIEWS;
    return { reviews };
  } catch (e) {
    return { reviews: SAMPLE_REVIEWS };
  }
}

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
  const { reviews } = useLoaderData<typeof loader>() as { reviews: Review[] };
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <MissionStatement />
      <Reviews reviews={reviews} />
      <Process />
      <CTA />
    </>
  );
}
