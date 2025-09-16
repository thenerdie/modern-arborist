import { useContext } from "react";
import { motion } from "motion/react";

import { ElaborationContext } from "./ElaborationContext";

export default function Tenet({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const { setElaborate } = useContext(ElaborationContext);

  return (
    <motion.div
      key={title}
      className="relative rounded-xl p-6 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md ring-1 ring-emerald-500/10 dark:ring-emerald-300/10 shadow-lg overflow-hidden"
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ y: 0, scale: 0.95 }}
      onTap={() => setElaborate({ title, body })}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-transparent to-emerald-200/30 dark:from-emerald-950/30 dark:via-transparent dark:to-emerald-900/20 pointer-events-none" />
      <h3 className="text-xl font-semibold mb-2 text-emerald-700 dark:text-emerald-300 tracking-tight">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-gray-300 dark:text-gray-300">
        {body}
      </p>
    </motion.div>
  );
}
