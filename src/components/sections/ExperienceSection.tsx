"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronDown, MapPin } from "lucide-react";
import { useT } from "@/lib/i18n";

interface ExpEntry {
  id: string;
  prefix: string; // translation key prefix e.g. "exp1"
  highlightCount: number;
}

const expEntries: ExpEntry[] = [
  { id: "exp-1", prefix: "exp1", highlightCount: 4 },
  { id: "exp-2", prefix: "exp2", highlightCount: 4 },
  { id: "exp-3", prefix: "exp3", highlightCount: 4 },
  { id: "exp-4", prefix: "exp4", highlightCount: 4 },
  { id: "exp-5", prefix: "exp5", highlightCount: 3 },
];

function ExperienceCard({ entry, isLast }: { entry: ExpEntry; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useT();
  const p = entry.prefix;

  const highlights = Array.from({ length: entry.highlightCount }, (_, i) =>
    t(`${p}.h${i + 1}`)
  );

  return (
    <motion.div variants={fadeInUp} className="relative flex gap-6">
      {/* Timeline line + dot */}
      <div className="hidden md:flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-accent/60 border-2 border-background shrink-0 mt-1.5" />
        {!isLast && <div className="w-px flex-1 bg-white/5 mt-1" />}
      </div>

      {/* Card */}
      <div className="flex-1 pb-10 md:pb-12">
        <div className="rounded-xl bg-surface/40 border border-white/5 hover:border-white/10 transition-colors duration-300 p-5 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-medium text-text">{t(`${p}.role`)}</h3>
              <p className="text-accent text-sm">{t(`${p}.company`)}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1 text-xs text-text-muted shrink-0">
              <span>{t(`${p}.duration`)}</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {t(`${p}.location`)}
              </span>
            </div>
          </div>

          <p className="mt-3 text-sm text-text-muted leading-relaxed">
            {t(`${p}.desc`)}
          </p>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mt-3 flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
          >
            <span>{isOpen ? t("experience.less") : t("experience.highlights")}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="overflow-hidden"
              >
                <ul className="pt-3 mt-3 border-t border-white/5 space-y-2">
                  {highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-text-muted"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/60 mt-2 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const t = useT();

  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <SectionHeading
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {expEntries.map((entry, i) => (
            <ExperienceCard
              key={entry.id}
              entry={entry}
              isLast={i === expEntries.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
