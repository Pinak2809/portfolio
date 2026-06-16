"use client";

import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { HeroSection } from "@/components/hero";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

export function ClientShell() {
  return (
    <I18nProvider>
      <SmoothScroll>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md focus:outline-none"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
        </main>
        <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}
