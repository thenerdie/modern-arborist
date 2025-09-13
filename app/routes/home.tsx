import type { Route } from "./+types/home";
import { Hero } from "../components/Hero";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { Services } from "../components/services";
import { Process } from "../components/Process";
import { CTA } from "../components/CTA";
import { Reviews } from "../components/Reviews";
import { MissionStatement } from "~/components/MissionStatement";
import type { Review } from "../components/Reviews";
import { useLoaderData } from "react-router";

// Loader to fetch Google reviews server-side with simple in-memory caching.
let _cache: { ts: number; data: Review[] } | null = null;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

export async function loader() {
  if (_cache && Date.now() - _cache.ts < CACHE_TTL_MS) {
    return { reviews: _cache.data };
  }

  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    let reviews: Review[] = [];
    if (apiKey && placeId) {
      // Use Places Details API (Fields: reviews)
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&reviews_no_translations=true&key=${apiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        const raw = json?.result?.reviews as any[] | undefined;
        if (Array.isArray(raw)) {
          reviews = raw.slice(0, 10).map((r) => ({
            id: r.time?.toString() ?? Math.random().toString(36).slice(2),
            author: r.author_name ?? "Anonymous",
            rating: r.rating ?? 5,
            text: r.text ?? "",
            relativeTime: r.relative_time_description ?? "recently",
            profilePhotoUrl: r.profile_photo_url,
          }));
        }
      }
    }
    // Fallback sample reviews if API not configured or empty
    if (!reviews.length) {
      reviews = SAMPLE_REVIEWS;
    }
    _cache = { ts: Date.now(), data: reviews };
    return { reviews };
  } catch (e) {
    return { reviews: SAMPLE_REVIEWS };
  }
}

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
      <Services />
      <Process />
      <CTA />
    </>
  );
}
