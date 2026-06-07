"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useT } from "@/lib/i18n";

const socialLinks = [
  { icon: Github, href: "https://github.com/Pinak2809?tab=repositories", label: "GitHub" },
  { icon: Linkedin, href: "https://de.linkedin.com/in/pinak-ganatra-74a125227", label: "LinkedIn" },
  { icon: Mail, href: "mailto:pinakganatra10@gmail.com", label: "Email" },
];

export function Footer() {
  const t = useT();

  return (
    <footer className="border-t border-white/5 py-10 md:py-12">
      <div className="mx-auto max-w-5xl px-6 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Pinak Ganatra. {t("footer.rights")}
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith("mailto:")
                ? { onClick: (e: React.MouseEvent) => { e.preventDefault(); window.open(link.href, "_self"); } }
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="p-2 text-text-muted hover:text-text transition-colors duration-200"
              aria-label={link.label}
            >
              <link.icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
