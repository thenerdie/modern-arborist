import React from "react";
import { GalleryGrid, GalleryMasonry } from "~/components/Gallery";
import { galleryItems } from "~/data/gallery";
import { motion } from "motion/react";

export default function Gallery() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <motion.header
        className="py-10 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300">
          Our Work, In Focus
        </h1>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300">
          A selection of recent projects and snapshots from the field.
        </p>
      </motion.header>

      <section className="pb-12">
        <h2 className="sr-only">Grid</h2>
        <GalleryGrid items={galleryItems} className="" />
      </section>

      <section className="pb-20">
        <motion.h2
          className="mb-6 text-center text-2xl font-semibold text-emerald-700 dark:text-emerald-300"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          More moments
        </motion.h2>
        <GalleryMasonry items={galleryItems} columns={3} className="" />
      </section>
    </div>
  );
}
