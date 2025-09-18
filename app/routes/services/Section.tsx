import ScrollAnimation, {
  useScrollProgress,
} from "../../components/ScrollAnimation";

import { cn } from "~/lib/utils";

type SectionChild = React.ReactNode | ((progress: number) => React.ReactNode);

export default function Section({
  id,
  className,
  height,
  children,
}: {
  id?: string;
  children: SectionChild;
  className?: string;
  height?: number;
}) {
  return (
    <ScrollAnimation
      id={id}
      heightMultiplier={height ? height : 2}
      render={(progress: number) => (
        <div
          className={cn(
            "relative bg-gray-900 overflow-hidden flex items-center justify-center min-h-screen px-6",
            className
          )}
        >
          {typeof children === "function"
            ? (children as (p: number) => React.ReactNode)(progress)
            : children}
        </div>
      )}
    />
  );
}
