"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-12 md:mb-16"
    >
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-muted text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-px w-16 bg-accent/40" />
    </motion.div>
  );
}
