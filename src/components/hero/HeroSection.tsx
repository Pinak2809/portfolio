"use client";

import { MountainScene } from "./MountainScene";
import { HeroHeadline } from "./HeroHeadline";
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

/**
 * Hero section with two modes:
 * - Mobile (<md): Static headline + subtitle over starfield. No mountains, no runner,
 *   no sticky scroll. User scrolls straight into the About section.
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
      {/* ===== Mobile: static hero ===== */}
      <section className="md:hidden relative h-screen flex items-center justify-center overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-[#0c1220] to-[#131d2e]" />

        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
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

        {/* Static headline */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text leading-tight">
            {t("hero.headline1")}
            <br />
            <span className="text-accent">{t("hero.headline2")}</span> {t("hero.headline3")}{" "}
            <span className="text-accent">{t("hero.headline4")}</span>.
          </h1>
          <p className="mt-4 text-base text-text-muted max-w-xl mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30">
          <span className="text-xs text-text-muted tracking-widest uppercase">
            {t("hero.scroll")}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-text-muted" />
          </motion.div>
        </div>

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
