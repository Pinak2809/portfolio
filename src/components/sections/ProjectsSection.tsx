"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, type Project } from "@/data/projects";
import { ExternalLink, ChevronDown, Github } from "lucide-react";
import { useT } from "@/lib/i18n";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useT();
  const p = `proj${index + 1}`;

  return (
    <motion.div
      variants={fadeInUp}
      className="group rounded-xl bg-surface/40 border border-white/5 hover:border-white/10 transition-colors duration-300"
    >
      {project.image && (
        <div className="h-48 rounded-t-xl overflow-hidden bg-surface-light">
          <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
            Project Image
          </div>
        </div>
      )}

      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-text group-hover:text-accent transition-colors duration-200">
              {t(`${p}.title`)}
            </h3>
            <p className="mt-1 text-sm text-text-muted">{t(`${p}.summary`)}</p>
          </div>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-text transition-colors"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs rounded bg-accent/10 text-accent border border-accent/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mt-4 flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
        >
          <span>{isOpen ? t("projects.less") : t("projects.more")}</span>
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
              <div className="pt-4 border-t border-white/5 mt-4">
                <p className="text-sm text-text-muted leading-relaxed">
                  {t(`${p}.desc`)}
                </p>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm text-accent hover:text-accent-dim transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {t("projects.viewRepo")}
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const t = useT();

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6 md:px-8">
        <SectionHeading
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
