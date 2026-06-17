"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologies } from "@/data/technologies";
import { useT } from "@/lib/i18n";
import Image from "next/image";
import { Github, Linkedin, Mail, Download } from "lucide-react";

export function AboutSection() {
  const t = useT();

  const techCategoryKeys: Record<string, string> = {
    Languages: "tech.languages",
    "Embedded & Hardware": "tech.embedded",
    "Automation & Industry": "tech.automation",
    "ML & Data": "tech.ml",
    Infrastructure: "tech.infra",
    Web: "tech.web",
  };

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <SectionHeading
          title={t("about.title")}
          subtitle={t("about.subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
          {/* Profile + Bio */}
          <motion.div
            className="md:col-span-2 space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div className="flex items-start gap-6" variants={fadeInUp}>
              <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/10">
                <Image
                  src="/profile.png"
                  alt="Pinak Ganatra"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-medium text-text">Pinak Ganatra</h3>
                <p className="text-text-muted text-sm mt-1">
                  {t("about.tagline")}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <a
                    href="https://de.linkedin.com/in/pinak-ganatra-74a125227"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-text/70 hover:text-accent hover:bg-white/5 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/Pinak2809?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-md text-text/70 hover:text-accent hover:bg-white/5 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:pinakganatra10@gmail.com"
                    className="p-1.5 rounded-md text-text/70 hover:text-accent hover:bg-white/5 transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <a
                    href="/Lebenslauf_Ganatra__.pdf"
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {t("about.downloadCV")}
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-text-muted leading-relaxed"
              variants={fadeInUp}
            >
              {t("about.bio1")}
            </motion.p>

            <motion.p
              className="text-text-muted leading-relaxed"
              variants={fadeInUp}
            >
              {t("about.bio2")}
            </motion.p>

            <motion.div
              className="rounded-xl bg-surface/60 border border-white/5 p-5 mt-4"
              variants={fadeInUp}
            >
              <h4 className="text-sm font-medium text-accent uppercase tracking-wider mb-2">
                {t("about.focusTitle")}
              </h4>
              <p className="text-text-muted text-sm leading-relaxed">
                {t("about.focusText")}
              </p>
            </motion.div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            className="space-y-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {technologies.map((cat) => (
              <motion.div key={cat.category} variants={fadeInUp}>
                <h4 className="text-xs font-semibold text-text/70 uppercase tracking-wider mb-2">
                  {t(techCategoryKeys[cat.category] ?? cat.category)}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded-md bg-surface border border-white/5 text-text/70 hover:text-text hover:border-accent/30 transition-colors duration-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
