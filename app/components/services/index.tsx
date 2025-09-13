import { motion } from "motion/react";

export function Services() {
	return (
		<section className="py-16 px-6 text-center">
			<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
				Our Services
			</h2>
			<p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				From preservation and pruning to safe removals and emergency response,
				explore how we keep your trees healthy and your property safe.
			</p>
			<motion.a
				href="/services"
				className="inline-block mt-6 px-6 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg transition"
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				View Services
			</motion.a>
		</section>
	);
}

export default Services;

