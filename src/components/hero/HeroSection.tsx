"use client";

import { MountainScene } from "./MountainScene";
import { HeroHeadline } from "./HeroHeadline";
import { CircuitAnimation } from "./CircuitAnimation";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, createContext, useContext } from "react";

const LottieRunner = dynamic(() => import("./LottieRunner"), { ssr: false });
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

/* Stagger variants for the mobile headline words */
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const wordContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.6 },
  },
};

const wordChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

/**
 * Hero section with two modes:
 * - Mobile (<md): Animated circuit network background with staggered text reveal.
 * - Desktop (md+): Full cinematic scroll animation with mountains, Lottie runner,
 *   parallax, and 200vh sticky viewport.
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
    <div id="hero">
      {/* ===== Mobile: animated circuit hero ===== */}
      <section className="md:hidden relative h-screen flex items-center justify-center overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#0c1220] to-[#131d2e]" />

        {/* Circuit network animation */}
        <CircuitAnimation />

        {/* Staggered headline */}
        <motion.div
          className="relative z-10 text-center px-6"
          variants={wordContainer}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text leading-tight">
            <motion.span variants={wordChild} className="inline-block">
              {t("hero.headline1")}
            </motion.span>
            <br />
            <motion.span variants={wordChild} className="inline-block text-accent">
              {t("hero.headline2")}
            </motion.span>{" "}
            <motion.span variants={wordChild} className="inline-block">
              {t("hero.headline3")}
            </motion.span>{" "}
            <motion.span variants={wordChild} className="inline-block text-accent">
              {t("hero.headline4")}
            </motion.span>
            <motion.span variants={wordChild} className="inline-block">
              .
            </motion.span>
          </h1>
          <motion.p
            className="mt-4 text-base text-text-muted max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {t("hero.subtitle")}
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
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

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#09090B] to-transparent z-10" />
      </section>

      {/* ===== Desktop: full scroll animation ===== */}
      <HeroScrollContext.Provider value={scrollYProgress}>
        <section ref={containerRef} className="hidden md:block relative h-[200vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <MountainScene />
            <LottieRunner />
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
    </div>
  );
}
