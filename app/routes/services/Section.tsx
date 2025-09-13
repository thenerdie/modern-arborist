import ScrollAnimation, {
  useScrollProgress,
} from "../../components/ScrollAnimation";

type SectionChild = React.ReactNode | ((progress: number) => React.ReactNode);

export default function Section({
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