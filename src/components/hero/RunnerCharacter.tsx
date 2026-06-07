"use client";

import { motion, useTransform } from "framer-motion";
import { useHeroScroll } from "./HeroSection";
import { useEffect, useRef, useState } from "react";

/**
 * Runner character — will be replaced with Lottie animation.
 * Currently renders a detailed SVG silhouette as a placeholder.
 *
 * The cliff tops are at y=220 in a 500-height SVG that occupies 50vh.
 * So cliff top is at roughly 50vh * (1 - 220/500) = 50vh * 0.56 = 28% from bottom.
 * With the cliffsY parallax offset, we approximate bottom: 50%.
 *
 * Canyon spans from 630 to 810 out of 1440 viewport width:
 *   Left cliff edge:  630/1440 = ~43.75%
 *   Right cliff edge: 810/1440 = ~56.25%
 *   Canyon center:    720/1440 = 50%
 *
 * Scroll phases:
 *   0.00 - 0.05  idle, standing on left cliff
 *   0.05 - 0.35  running right across left cliff top
 *   0.35 - 0.65  jump arc across the canyon
 *   0.65 - 0.80  landing on right cliff, settling
 *   0.80 - 1.00  idle on right cliff, fading out
 */
export function RunnerCharacter() {
  const scrollYProgress = useHeroScroll();

  // Horizontal: vw percentage
  // Start at ~20vw, run to ~42vw (left cliff edge), jump to ~58vw, settle ~65vw
  const xPercent = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35, 0.42, 0.50, 0.58, 0.65, 0.80, 1.0],
    [20, 20, 42, 46, 50, 54, 58, 65, 65]
  );

  // Jump arc: negative = up
  const jumpY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.40, 0.45, 0.50, 0.55, 0.60, 0.65, 1.0],
    [0, 0, -50, -100, -140, -100, -50, 0, 0]
  );

  // Lean
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35, 0.45, 0.50, 0.55, 0.65, 0.80],
    [0, -3, -3, -10, -12, -10, -3, 0]
  );

  // Landing squash
  const scaleY = useTransform(
    scrollYProgress,
    [0, 0.63, 0.67, 0.72, 1.0],
    [1, 1, 0.85, 1, 1]
  );
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.63, 0.67, 0.72, 1.0],
    [1, 1, 1.15, 1, 1]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.03, 0.85, 1.0],
    [0, 1, 1, 0]
  );

  const leftPos = useTransform(xPercent, (v) => `${v}vw`);

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <motion.div
        className="absolute"
        style={{
          left: leftPos,
          bottom: "50%",
          x: "-50%",
          y: jumpY,
          rotate,
          scaleX,
          scaleY,
          opacity,
          transformOrigin: "center bottom",
        }}
      >
        {/* Placeholder silhouette — will be replaced by Lottie */}
        <svg
          width="52"
          height="78"
          viewBox="0 0 52 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <circle cx="26" cy="10" r="8" fill="#111827" />

          {/* Torso */}
          <path d="M26 18 L26 44" stroke="#111827" strokeWidth="5" strokeLinecap="round" />

          {/* Shoulders */}
          <path d="M16 24 L36 24" stroke="#111827" strokeWidth="4" strokeLinecap="round" />

          {/* Left arm — back swing */}
          <path
            d="M16 24 L6 36 L10 44"
            stroke="#111827"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right arm — forward swing */}
          <path
            d="M36 24 L44 32 L40 42"
            stroke="#111827"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hips */}
          <path d="M21 44 L31 44" stroke="#111827" strokeWidth="4" strokeLinecap="round" />

          {/* Left leg — back stride */}
          <path
            d="M21 44 L10 60 L6 74"
            stroke="#111827"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right leg — front stride */}
          <path
            d="M31 44 L42 58 L46 74"
            stroke="#111827"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Feet */}
          <path d="M3 74 L10 74" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
          <path d="M43 74 L50 74" stroke="#111827" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}
