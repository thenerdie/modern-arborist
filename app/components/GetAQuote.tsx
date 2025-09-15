import { motion } from "motion/react";
import { cn } from "~/lib/utils";

export default function GetAQuote({
  text = "Get a Quote",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <motion.a
      href="/quote"
      className={cn(
        "inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition will-change-transform",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.a>
  );
}
