import { motion } from "motion/react";

export default function Elaboration({
  title,
  body,
  elaboration,
}: {
  title: string;
  body: string;
  elaboration?: string;
}) {
  return (
    <motion.section
      className="fixed max-w-3xl mx-auto text-center"
      whileInView={{ y: [50, 0], opacity: [0, 1] }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{body}</p>
      {elaboration && <p className="text-sm text-gray-500">{elaboration}</p>}
    </motion.section>
  );
}
