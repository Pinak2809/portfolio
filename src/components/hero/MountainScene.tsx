"use client";

import { motion, useTransform } from "framer-motion";
import { useHeroScroll } from "./HeroSection";
import Image from "next/image";

/**
 * Mountain scene using PNG images for realistic cliff plateaus,
 * background peaks with snow, and a V-shaped canyon.
 *
 * Layer order (back to front):
 *   1. Sky gradient (CSS)
 *   2. Stars
 *   3. Background peaks left + right (parallax fast)
 *   4. Canyon V-shape (parallax medium)
 *   5. Left cliff + Right cliff (parallax slow, foreground)
 *
 * All images are 1536x1024 with transparent backgrounds.
 *
 * Cliff flat-top positions (from image analysis):
 *   Left cliff top:  ~37% from top of image
 *   Right cliff top: ~33% from top of image
 * We position both so their flat tops align at the same viewport height.
 */
export function MountainScene() {
  const scrollYProgress = useHeroScroll();

  // Parallax: freeze at 0.80 (when runner reaches rightmost position)
  const bgY = useTransform(scrollYProgress, [0, 0.8, 1], [0, 80, 80]);
  const canyonY = useTransform(scrollYProgress, [0, 0.8, 1], [0, 40, 40]);
  const cliffY = useTransform(scrollYProgress, [0, 0.8, 1], [0, 20, 20]);

  // Darken mountains — hold at 70% from 0.8 onward
  const darkenOpacity = useTransform(scrollYProgress, [0.3, 0.8, 1], [0, 0.7, 0.7]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#0c1220] to-[#131d2e]" />

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${(i * 31 + 17) % 100}%`,
              top: `${(i * 19 + 3) % 40}%`,
              opacity: 0.1 + (i % 5) * 0.08,
              width: i % 8 === 0 ? "2px" : "1px",
              height: i % 8 === 0 ? "2px" : "1px",
            }}
          />
        ))}
      </div>

      {/* ===== Background peaks ===== */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex justify-between items-end"
        style={{ y: bgY }}
      >
        {/* Left background peak */}
        <div className="relative w-[45%] -ml-[2%] mb-[240px]">
          <Image
            src="/mountains/bg-peak-left.png"
            alt=""
            width={1536}
            height={1024}
            className="w-full h-auto"
            priority
          />
        </div>
        {/* Right background peak */}
        <div className="relative w-[45%] -mr-[2%] mb-[265px]">
          <Image
            src="/mountains/bg-peak-right.png"
            alt=""
            width={1536}
            height={1024}
            className="w-full h-auto"
            priority
          />
        </div>
      </motion.div>

      

      {/* ===== Foreground cliffs ===== */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ y: cliffY }}
      >
        {/* Left cliff — positioned on the left, flat top aligned */}
        <div className="absolute bottom-0 left-0 w-[50%] -ml-[2%]">
          <Image
            src="/mountains/cliff-left.png"
            alt=""
            width={1536}
            height={1024}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Right cliff — positioned on the right, flat top aligned */}
        <div className="absolute bottom-0 right-0 w-[45%] -mr-[2%]">
          <Image
            src="/mountains/cliff-right.png"
            alt=""
            width={1536}
            height={1024}
            className="w-full h-auto"
            priority
          />
        </div>
      </motion.div>

      {/* Darkening overlay — increases with scroll to highlight text */}
      <motion.div
        className="absolute inset-0 bg-[#09090B] pointer-events-none z-[5]"
        style={{ opacity: darkenOpacity }}
      />

      {/* Bottom fade into page background */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#09090B] to-transparent z-10" />
    </div>
  );
}
