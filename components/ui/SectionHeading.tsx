"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

// Consistent "system readout" heading: a mono index + a display title.
export function SectionHeading({
  index,
  title,
  blurb,
}: {
  index: string;
  title: string;
  blurb?: string;
}) {
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-12 sm:mb-16"
    >
      <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
        <span className="mono-label text-[10px] text-cyan">{index}</span>
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl"
      >
        {title}
      </motion.h2>
      {blurb && (
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl text-sm leading-relaxed text-ink-dim sm:text-base"
        >
          {blurb}
        </motion.p>
      )}
    </motion.div>
  );
}
