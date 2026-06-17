"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useT } from "@/lib/i18n";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLenisInstance } from "@/components/layout/SmoothScroll";

const NAV_HEIGHT = 56; // h-14 = 3.5rem = 56px

export function Navbar() {
  const t = useT();
  const lenis = useLenisInstance();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.experience"), href: "#experience" },
  ];

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    menuBtnRef.current?.focus();
  }, []);

  const scrollToSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(href, { offset: -NAV_HEIGHT, duration: 1.2 });
      } else {
        // Fallback if Lenis isn't ready
        const el = document.querySelector(href);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    },
    [lenis]
  );

  const scrollToTop = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [lenis]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-5xl px-6 md:px-8 flex items-center justify-between h-14">
          <a
            href="#"
            onClick={scrollToTop}
            className="text-sm font-medium text-text hover:text-accent transition-colors"
          >
            Pinak Ganatra
          </a>

          {/* Desktop links + toggle */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-sm text-text-muted hover:text-text transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <LanguageToggle />
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageToggle />
            <button
              ref={menuBtnRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-text-muted hover:text-text transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 bg-background/95 backdrop-blur-md border-b border-white/5 md:hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    scrollToSection(e, link.href);
                    closeMobile();
                  }}
                  className="text-sm text-text-muted hover:text-text transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
