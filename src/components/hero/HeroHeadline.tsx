"use client";

import { motion, useTransform } from "framer-motion";
import { useHeroScroll } from "./HeroSection";
import { useT } from "@/lib/i18n";

export function HeroHeadline() {
  const scrollYProgress = useHeroScroll();
  const t = useT();

  const opacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.80, 1.0],
    [0, 1, 1, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.80, 1.0],
    [30, 0, 0, 0]
  );

  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.50, 0.60, 0.80, 1.0],
    [0, 1, 1, 1]
  );

  const subtitleY = useTransform(
    scrollYProgress,
    [0.50, 0.60, 0.80, 1.0],
    [20, 0, 0, 0]
  );

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="text-center px-6">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text leading-tight"
          style={{ opacity, y }}
        >
          {t("hero.headline1")}
          <br />
          <span className="text-accent">{t("hero.headline2")}</span> {t("hero.headline3")}{" "}
          <span className="text-accent">{t("hero.headline4")}</span>.
        </motion.h1>

        <motion.p
          className="mt-4 md:mt-6 text-base md:text-lg text-text-muted max-w-xl mx-auto"
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>
    </div>
  );
}
