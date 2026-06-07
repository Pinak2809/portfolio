"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

/**
 * EN/DE toggle button. Pill-shaped with a sliding indicator.
 */
export function LanguageToggle() {
  const { locale, toggleLocale } = useI18n();

  return (
    <button
      onClick={toggleLocale}
      className="relative flex items-center h-8 rounded-full bg-surface border border-white/10 px-0.5 text-xs font-medium transition-colors hover:border-white/20"
      aria-label={`Switch to ${locale === "en" ? "German" : "English"}`}
    >
      {/* Sliding background pill */}
      <motion.div
        className="absolute top-0.5 h-7 w-8 rounded-full bg-accent/20"
        animate={{ left: locale === "en" ? "2px" : "calc(100% - 34px)" }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* EN label */}
      <span
        className={`relative z-10 w-8 text-center transition-colors duration-200 ${
          locale === "en" ? "text-accent" : "text-text-muted"
        }`}
      >
        EN
      </span>

      {/* DE label */}
      <span
        className={`relative z-10 w-8 text-center transition-colors duration-200 ${
          locale === "de" ? "text-accent" : "text-text-muted"
        }`}
      >
        DE
      </span>
    </button>
  );
}
