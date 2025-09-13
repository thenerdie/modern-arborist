import { motion } from "motion/react";

export default function GetAQuote({ text = "Get a Quote" }: { text?: string }) {
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