import type React from "react";

import { cn } from "~/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Retained for backwards compatibility but no longer used */
  height?: number;
};

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex items-center justify-center min-h-[70vh] px-6 py-16",
        className
      )}
    >
      <div className="w-full max-w-5xl">{children}</div>
    </section>
  );
}
