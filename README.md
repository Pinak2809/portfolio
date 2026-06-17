# pinakbuilds.work — Personal Engineering Portfolio

A premium single-page portfolio website showcasing embedded systems, industrial AI/ML, and full-stack software engineering work.

**Live:** [pinakbuilds.work](https://pinakbuilds.work)

## Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Animations:** Framer Motion 12 (scroll-driven parallax), Lottie (character animation)
- **Smooth Scrolling:** Lenis
- **Deployment:** Vercel with Analytics + Speed Insights
- **Internationalization:** Custom EN/DE i18n with geo-based locale detection (DACH region)

## Features

- **Cinematic Hero Section** — Scroll-driven mountain parallax with Lottie runner animation on desktop; clean static hero on mobile
- **Bilingual (EN/DE)** — Full i18n with animated locale transitions. Auto-detects German/Austrian/Swiss visitors via Vercel edge middleware
- **Responsive Design** — Mobile-first with desktop enhancements. No heavy animations shipped to mobile
- **5 Real Projects** — Drone FHSS security, CLIP-based image search, smartcard security, phishing detection ML, WPF finance tracker
- **5 Work Experiences** — From EV charging internship to PLC-SCADA yacht commissioning
- **CV Download** — Direct PDF download from the About section
- **Production-Hardened** — Security headers, dynamic OG/Twitter metadata, sitemap, robots.txt, error boundaries, skip-to-content link

## Project Structure

```
src/
├── app/                    # Next.js App Router pages + metadata
│   ├── layout.tsx          # Root layout (server component, metadata, fonts)
│   ├── page.tsx            # Server component → renders ClientShell
│   ├── not-found.tsx       # Custom 404
│   ├── error.tsx           # Error boundary
│   ├── robots.ts           # SEO robots.txt
│   └── sitemap.ts          # SEO sitemap.xml
├── components/
│   ├── hero/               # Cinematic scroll animation (mountains, runner, headline)
│   ├── sections/           # About, Projects, Experience sections
│   ├── layout/             # Navbar, Footer, ClientShell, SmoothScroll, Analytics
│   └── ui/                 # LanguageToggle, SectionHeading
├── data/                   # Projects, technologies, Lottie animation JSON
├── hooks/                  # Lenis smooth scroll hook
├── lib/                    # i18n provider, animation variants, cn utility
└── middleware.ts           # DACH geo-detection for locale
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Deployed on Vercel via Git integration. Push to `main` triggers automatic production deployment.

```bash
git add -A && git commit -m "your message" && git push
```

## License

All rights reserved. This is a personal portfolio — not open source.
