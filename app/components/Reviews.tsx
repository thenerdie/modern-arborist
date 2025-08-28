import React, { useMemo } from "react";

export type Review = {
  id: string;
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl?: string;
};

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews?.length) {
    return null;
  }

  const average = useMemo(
    () =>
      reviews.reduce((sum, r) => sum + (typeof r.rating === "number" ? r.rating : 0), 0) /
      reviews.length,
    [reviews]
  );

  // Duplicate list for seamless marquee effect
  const marqueeItems = [...reviews, ...reviews];

  return (
    <section
      aria-labelledby="reviews-heading"
      className="relative isolate overflow-hidden py-24 bg-gradient-to-br from-emerald-50 via-white to-green-50 dark:from-green-950 dark:via-gray-950 dark:to-emerald-950"
    >
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(circle_at_center,black,transparent_85%)] opacity-40" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <h2 id="reviews-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            What customers say
          </h2>
          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <Stars rating={average} />
            <span className="font-medium">{average.toFixed(1)}</span>
            <span className="opacity-60">Google Reviews</span>
          </div>
        </div>

        <div className="relative mt-14 group">
          {/* gradient edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-emerald-50 via-emerald-50/90 to-transparent dark:from-green-950 dark:via-green-950/90" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-emerald-50 via-emerald-50/90 to-transparent dark:from-green-950 dark:via-green-950/90" />
          <ul
            className="flex gap-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            aria-label="Customer reviews carousel"
          >
            <li className="flex animate-[marquee_40s_linear_infinite] group-hover:[animation-play-state:paused]" aria-hidden="true">
              {marqueeItems.map((r, idx) => (
                <ReviewCard key={r.id + "-marquee-" + idx} review={r} />
              ))}
            </li>
          </ul>
        </div>
        <p className="mt-10 text-xs text-gray-500 dark:text-gray-400 text-center">
          Reviews are fetched from Google and may be truncated for brevity.
        </p>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-80 shrink-0 rounded-2xl border border-emerald-900/10 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        {review.profilePhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.profilePhotoUrl}
            alt={review.author}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-emerald-600/20"
            loading="lazy"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-emerald-600 text-white grid place-items-center font-semibold">
            {review.author.charAt(0) || "?"}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight truncate">
            {review.author}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-700 dark:text-emerald-300">
            <Stars rating={review.rating} small />
            <span className="opacity-70">{review.relativeTime}</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 line-clamp-6">
        {review.text}
      </p>
    </div>
  );
}

function Stars({ rating, small = false }: { rating: number; small?: boolean }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const size = small ? "text-[10px]" : "text-sm";
  const stars: React.ReactElement[] = [];
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push(<span key={i}>★</span>);
    else if (i === full && half) stars.push(<span key={i}>☆</span>);
    else stars.push(<span key={i}>✩</span>);
  }
  return <span className={`flex text-amber-500 ${size}`}>{stars}</span>;
}

export default Reviews;
