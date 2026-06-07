"use client";

import { MountainScene } from "./MountainScene";
import { LottieRunner } from "./LottieRunner";
import { HeroHeadline } from "./HeroHeadline";
import runnerAnimation from "@/data/runner-animation.json";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { useT } from "@/lib/i18n";

/**
 * Context to share the hero scroll progress with all children.
 * All hero sub-components read from this instead of creating their own useScroll.
 */
export const HeroScrollContext = createContext<MotionValue<number> | null>(null);

export function useHeroScroll(): MotionValue<number> {
  const ctx = useContext(HeroScrollContext);
  if (!ctx) throw new Error("useHeroScroll must be used inside HeroSection");
  return ctx;
}

/**
 * Full-viewport hero section with sticky scroll animation.
 * The 200vh height gives ~1 screen of scroll distance for the animation
 * before content appears.
 */
export function HeroSection() {
  const t = useT();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <HeroScrollContext.Provider value={scrollYProgress}>
      <section ref={containerRef} className="relative h-[200vh]" id="hero">
        {/* Sticky viewport — stays pinned while user scrolls through 200vh */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <MountainScene />
          <LottieRunner animationData={runnerAnimation} />
          <HeroHeadline />

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
            style={{ opacity: indicatorOpacity }}
          >
            <span className="text-xs text-text-muted tracking-widest uppercase">
              {t("hero.scroll")}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-text-muted" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </HeroScrollContext.Provider>
  );
}
