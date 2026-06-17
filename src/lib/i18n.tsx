"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type Locale = "en" | "de";

interface I18nContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}

/**
 * Flat key-value translations.
 * Access nested keys with dot notation: "nav.about" \u2192 "About Me"
 */
const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.about": "About Me",
    "nav.projects": "Projects",
    "nav.experience": "Experience",

    // Hero
    "hero.headline1": "Crossing the gap between",
    "hero.headline2": "ideas",
    "hero.headline3": "and",
    "hero.headline4": "real-world systems",
    "hero.subtitle": "Engineering Embedded AI Systems.",
    "hero.scroll": "Scroll",

    // About
    "about.title": "About Me",
    "about.subtitle": "Engineer, builder, systems thinker.",
    "about.tagline": "Intelligent Systems Design | Embedded Systems & Industrial AI/ML",
    "about.bio1": "I build systems that bridge hardware and intelligence \u2014 from high-frequency vibration data acquisition on industrial machines to real-time computer vision on drones. My work spans embedded firmware, machine learning pipelines, PLC/SCADA commissioning, and full-stack software.",
    "about.bio2": "Currently finishing my B.Eng. in Intelligent Systems Design at Hochschule Hamm-Lippstadt while working as a working student in R&D Software at SOMIC. I care about building things that work reliably in the real world, not just in the lab.",
    "about.focusTitle": "Current Focus",
    "about.focusText": "Real-time object detection with YOLO for industrial automation, drone-based visual inspection, and edge ML deployment on embedded hardware.",
    "about.downloadCV": "Download CV",

    // Tech categories
    "tech.languages": "Languages",
    "tech.embedded": "Embedded & Hardware",
    "tech.automation": "Automation & Industry",
    "tech.ml": "ML & Data",
    "tech.infra": "Infrastructure",
    "tech.web": "Web",

    // Projects
    "projects.title": "Projects",
    "projects.subtitle": "Selected work across embedded systems, ML, and software engineering.",
    "projects.more": "More details",
    "projects.less": "Less",
    "projects.viewRepo": "View Repository",

    // Experience
    "experience.title": "Experience",
    "experience.subtitle": "Where I\u2019ve built, shipped, and learned.",
    "experience.highlights": "Key highlights",
    "experience.less": "Less",

    // Experience entries
    "exp1.role": "Working Student \u2014 R&D Software",
    "exp1.company": "SOMIC Verpackungsmaschinen GmbH & Co. KG",
    "exp1.duration": "Nov 2025 \u2013 Present",
    "exp1.location": "Rosenheim, Germany",
    "exp1.desc": "Building real-time computer vision systems for industrial packaging machinery, from drone-based live feeds to production line analysis.",
    "exp1.h1": "Built a YOLOv8-based detection system for automatic identification of format parts from live camera feeds.",
    "exp1.h2": "Trained a YOLO11n-OBB model for precise product detection and localization under varying environmental conditions.",
    "exp1.h3": "Optimized the model for robust product detection from live drone camera video feeds.",
    "exp1.h4": "Developed a Python & JavaScript/React web application for capturing drone live feeds and real-time product analysis on a running assembly line.",

    "exp2.role": "Project Engineer \u2014 PLC-SCADA Commissioning",
    "exp2.company": "Triad Ltd. | Luxury Yacht Clelia III",
    "exp2.duration": "Apr 2026",
    "exp2.location": "Athens, Greece \u2014 Onboard Commissioning",
    "exp2.desc": "Onboard commissioning of PLC-SCADA automation infrastructure on a 34.95m motor yacht using Siemens TIA Portal.",
    "exp2.h1": "Contributed to the implementation and commissioning of PLC-SCADA automation infrastructure in Siemens TIA Portal on the 34.95m motor yacht Clelia III.",
    "exp2.h2": "Set up, configured, and debugged the communication architecture between Siemens PLCs, SCADA, Distributed I/O, industrial switches, and multiple panel/network nodes.",
    "exp2.h3": "Commissioned safety-critical systems including Power Management, Propulsion Monitoring, Fire Suppression, Bilge Separators, Pumps, and Safety Alarms in collaboration with Chief Engineer, Second Engineer, and onboard technicians.",
    "exp2.h4": "Calibrated sensors, corrected zero/span settings, and validated 800+ I/O signals including signal tagging and SCADA mapping.",

    "exp3.role": "Bachelor Thesis \u2014 R&D Embedded ML",
    "exp3.company": "SOMIC Verpackungsmaschinen GmbH & Co. KG",
    "exp3.duration": "Mar 2025 \u2013 Sep 2025",
    "exp3.location": "Rosenheim, Germany \u2014 Thesis Grade: 1.0",
    "exp3.desc": "Developed a high-frequency vibration data acquisition and ML-based parameter optimization system for industrial packaging machines.",
    "exp3.h1": "Developed a high-frequency vibration data acquisition system at 71.8 kHz including MCU, external RAM, accelerometer, Raspberry Pi, and PLC integration with a scalable microservices architecture.",
    "exp3.h2": "Used an optimized windowing strategy to synchronize different frequencies and extract 15 combined motion and vibration features.",
    "exp3.h3": "Automated the pipeline from data acquisition through processing to storage with Node-RED flows.",
    "exp3.h4": "Trained a multi-output Random Forest model for industrial motion parameter optimization, serving as the foundation for real-time parameter tuning and early fault detection.",

    "exp4.role": "Working Student \u2014 Full-Stack Software Development",
    "exp4.company": "Kaldewei GmbH & Co. KG",
    "exp4.duration": "Jul 2024 \u2013 Feb 2025",
    "exp4.location": "Ahlen, Germany",
    "exp4.desc": "Designed and independently developed a web-based inventory management application from requirements analysis through production deployment.",
    "exp4.h1": "Designed and independently developed a web-based inventory management application using Flask, Python, C#, and Blazor.",
    "exp4.h2": "Implemented a microservices architecture and automated processes to improve warehouse management efficiency.",
    "exp4.h3": "Managed the full development lifecycle from requirements analysis through implementation to production deployment.",
    "exp4.h4": "Built CI/CD pipelines for continuous integration and deployment of the application.",

    "exp5.role": "Intern \u2014 Information Systems Engineering / Automated Energy Control",
    "exp5.company": "Innocept Mobility",
    "exp5.duration": "Oct 2023 \u2013 Feb 2024",
    "exp5.location": "Frankfurt, Germany",
    "exp5.desc": "Developed load management systems for EV charging stations and Raspberry Pi-based energy metering solutions.",
    "exp5.h1": "Designed and optimized load management systems for Level-2 charging stations through analysis of the OCPP protocol.",
    "exp5.h2": "Developed a Raspberry Pi-based energy metering system for real-time capture and analysis of charging data.",
    "exp5.h3": "Integrated energy meters and Raspberry Pi via RS485/Modbus for reliable data transmission.",

    // Footer
    "footer.rights": "All rights reserved.",

    // Projects
    "proj1.title": "Drone FHSS Command Link Testbed",
    "proj1.summary": "Research testbed for simulating and attacking frequency-hopping drone command links with a 12-attack security toolkit.",
    "proj1.desc": "Built a complete FHSS drone communication stack from scratch \u2014 deterministic HMAC-SHA256 hop scheduling, NTP-style clock synchronization, overlap-binding channel switching, and hop-aware link quality monitoring with hysteresis. Implemented 12 categorized attacks (flood, injection, reactive jamming, handshake exploits, LQM manipulation) for systematic vulnerability analysis. Cross-device validated on isolated Ethernet at 0.19% control packet loss. Transport layer designed to port directly to HopeRF/nRF24L01+ modules and HackRF SDR.",

    "proj2.title": "Skyview Search",
    "proj2.summary": "Semantic image search engine for 12,000 aerial landscape images using CLIP embeddings and FAISS vector search.",
    "proj2.desc": "Natural language search across 12,000 aerial images spanning 15 landscape categories. Offline pipeline preprocesses, captions (BLIP), and embeds (OpenCLIP ViT-B-32) all images into a 512-dimensional FAISS index. At runtime, text queries are encoded with CLIP and matched via cosine similarity in under 100ms. Achieved 98.3% Recall@5 and 0.952 MRR on evaluation benchmark. REST API served via FastAPI with interactive Swagger documentation.",

    "proj3.title": "Smartcard-Based Security System",
    "proj3.summary": "Embedded security system using physical smartcards for micropayments, access control, and encrypted file storage.",
    "proj3.desc": "Three integrated security subsystems running on physical smartcard hardware: a micropayment system with fund management and transaction logging, an access control system with RSA challenge-response authentication, and a secure file system using AES encryption with two-factor authentication (smartcard + PIN). Built with pyscard for hardware communication and the Python cryptography library for RSA and AES operations.",

    "proj4.title": "Phishing Website Detection",
    "proj4.summary": "ML pipeline comparing 6 models for phishing URL detection, achieving 99.9% test accuracy with Random Forest and MLP.",
    "proj4.desc": "End-to-end machine learning pipeline for phishing website detection. Collected 10,000+ URLs from PhishTank, Tranco, and Majestic Million. Extracted address-bar, domain, and HTML/JavaScript features. Trained and benchmarked 6 models \u2014 Decision Tree, Random Forest, MLP, XGBoost, SVM, and Autoencoder. Random Forest and Multilayer Perceptron both hit 99.9% test accuracy. Best model serialized for deployment.",

    "proj5.title": "Personal Finance Tracker",
    "proj5.summary": "WPF desktop application for tracking income, expenses, savings goals, assets, and liabilities with visual dashboards.",
    "proj5.desc": "Full-featured personal finance desktop app built with C# and WPF following MVVM architecture. Features a real-time dashboard with net worth calculation, monthly budget tracking with customizable expense categories, financial goal setting with progress visualization and estimated completion dates, and comprehensive asset/liability management with interest rate tracking. Data persistence via JSON serialization with dependency injection throughout.",
  },
  de: {
    // Nav
    "nav.about": "\u00dcber mich",
    "nav.projects": "Projekte",
    "nav.experience": "Erfahrung",

    // Hero
    "hero.headline1": "Die Br\u00fccke zwischen",
    "hero.headline2": "Ideen",
    "hero.headline3": "und",
    "hero.headline4": "realen Systemen",
    "hero.subtitle": "Engineering Embedded AI Systems.",
    "hero.scroll": "Scrollen",

    // About
    "about.title": "\u00dcber mich",
    "about.subtitle": "Ingenieur, Entwickler, Systemdenker.",
    "about.tagline": "Intelligent Systems Design | Embedded Systems & Industrial AI/ML",
    "about.bio1": "Ich baue Systeme, die Hardware und Intelligenz verbinden \u2014 von Hochfrequenz-Vibrationsdatenerfassung an Industriemaschinen bis hin zu Echtzeit-Computer-Vision auf Drohnen. Meine Arbeit umfasst Embedded-Firmware, Machine-Learning-Pipelines, PLC/SCADA-Inbetriebnahme und Full-Stack-Softwareentwicklung.",
    "about.bio2": "Aktuell schlie\u00dfe ich meinen B.Eng. in Intelligent Systems Design an der Hochschule Hamm-Lippstadt ab und arbeite als Werkstudent in der F&E Software bei SOMIC. Mir ist wichtig, Dinge zu bauen, die in der realen Welt zuverl\u00e4ssig funktionieren \u2014 nicht nur im Labor.",
    "about.focusTitle": "Aktueller Fokus",
    "about.focusText": "Echtzeit-Objekterkennung mit YOLO f\u00fcr industrielle Automatisierung, drohnenbasierte visuelle Inspektion und Edge-ML-Deployment auf Embedded-Hardware.",
    "about.downloadCV": "Lebenslauf herunterladen",

    // Tech categories
    "tech.languages": "Sprachen",
    "tech.embedded": "Embedded & Hardware",
    "tech.automation": "Automatisierung & Industrie",
    "tech.ml": "ML & Daten",
    "tech.infra": "Infrastruktur",
    "tech.web": "Web",

    // Projects
    "projects.title": "Projekte",
    "projects.subtitle": "Ausgew\u00e4hlte Arbeiten aus Embedded Systems, ML und Softwareentwicklung.",
    "projects.more": "Mehr Details",
    "projects.less": "Weniger",
    "projects.viewRepo": "Repository ansehen",

    // Experience
    "experience.title": "Erfahrung",
    "experience.subtitle": "Wo ich gebaut, geliefert und gelernt habe.",
    "experience.highlights": "Kernpunkte",
    "experience.less": "Weniger",

    // Experience entries
    "exp1.role": "Werkstudent \u2014 F&E Software",
    "exp1.company": "SOMIC Verpackungsmaschinen GmbH & Co. KG",
    "exp1.duration": "Nov. 2025 \u2013 heute",
    "exp1.location": "Rosenheim",
    "exp1.desc": "Aufbau von Echtzeit-Computer-Vision-Systemen f\u00fcr industrielle Verpackungsmaschinen, von drohnenbasierten Live-Feeds bis zur Produktionslinienanalyse.",
    "exp1.h1": "Aufbau eines YOLOv8-basierten Erkennungssystems zur automatischen Identifikation von Formatteilen aus Live-Kamerafeeds.",
    "exp1.h2": "Training eines YOLO11n-OBB-Modells zur pr\u00e4zisen Erkennung und Lokalisierung von Produkten unter variierenden Umgebungsbedingungen.",
    "exp1.h3": "Optimierung des Modells f\u00fcr robuste Produkterkennung aus Live-Videofeeds einer fliegenden Drohnenkamera.",
    "exp1.h4": "Entwicklung einer Python- und JavaScript/React-basierten Webanwendung zur Erfassung des Drohnen-Livefeeds und Echtzeitanalyse von Produkten auf einer laufenden Montagelinie.",

    "exp2.role": "Projektmitarbeiter \u2014 PLC-SCADA Inbetriebnahme",
    "exp2.company": "Triad Ltd. | Luxusyacht Clelia III",
    "exp2.duration": "Apr. 2026",
    "exp2.location": "Athen, Griechenland \u2014 Inbetriebnahme an Bord",
    "exp2.desc": "Inbetriebnahme der PLC-SCADA-Automatisierungsinfrastruktur auf einer 34,95 m Motoryacht im Siemens TIA Portal.",
    "exp2.h1": "Mitwirkung bei der Implementierung und Inbetriebnahme einer PLC-SCADA-Automatisierungsinfrastruktur im Siemens TIA Portal auf der 34,95 m langen Motoryacht Clelia III.",
    "exp2.h2": "Aufbau, Konfiguration und Debugging der Kommunikationsarchitektur zwischen Siemens-PLCs, SCADA, Distributed I/O, industriellen Switches und mehreren Schaltschrank-/Netzwerkknoten.",
    "exp2.h3": "Inbetriebnahme sicherheitskritischer Systeme wie Power Management, Propulsion Monitoring, Feuerl\u00f6schsysteme, Bilge Separatoren, Pumpen und Sicherheitsalarme in Zusammenarbeit mit Chief Engineer, Second Engineer und Technikern an Bord.",
    "exp2.h4": "Kalibrierung von Sensoren, Korrektur von Zero-/Span-Einstellungen und Validierung von \u00fcber 800 I/O-Signalen inklusive Signal-Tagging und SCADA-Mapping.",

    "exp3.role": "Bachelorand \u2014 F&E Embedded ML",
    "exp3.company": "SOMIC Verpackungsmaschinen GmbH & Co. KG",
    "exp3.duration": "M\u00e4rz 2025 \u2013 Sept. 2025",
    "exp3.location": "Rosenheim \u2014 Bachelorarbeit: 1,0",
    "exp3.desc": "Entwicklung eines Hochfrequenz-Vibrationsdatenerfassungssystems und ML-basierter Parameteroptimierung f\u00fcr industrielle Verpackungsmaschinen.",
    "exp3.h1": "Entwicklung eines Hochfrequenz-Vibrationsdatenerfassungssystems mit 71,8 kHz inklusive MCU, externem RAM, Beschleunigungsmesser, Raspberry Pi und PLC-Anbindung sowie Implementierung einer skalierbaren Microservices-Architektur.",
    "exp3.h2": "Verwendung einer optimierten Windowing-Strategie zur Synchronisierung unterschiedlicher Frequenzen und Extraktion von 15 kombinierten Bewegungs- und Vibrationsmerkmalen.",
    "exp3.h3": "Automatisierung der Pipeline von Datenerfassung \u00fcber Verarbeitung bis Speicherung mit Node-RED-Flows.",
    "exp3.h4": "Training eines Multi-Output-Random-Forest-Modells zur Optimierung industrieller Bewegungsparameter und als Grundlage f\u00fcr Echtzeit-Parameteroptimierung sowie fr\u00fchzeitige Fehlererkennung.",

    "exp4.role": "Werkstudent \u2014 Full-Stack-Softwareentwicklung",
    "exp4.company": "Kaldewei GmbH & Co. KG",
    "exp4.duration": "Juli 2024 \u2013 Feb. 2025",
    "exp4.location": "Ahlen",
    "exp4.desc": "Konzeption und eigenst\u00e4ndige Entwicklung einer webbasierten Inventarverwaltungsanwendung vom Anforderungsanalyse bis Produktivschaltung.",
    "exp4.h1": "Konzeption und eigenst\u00e4ndige Entwicklung einer webbasierten Inventarverwaltungsanwendung mit Flask, Python, C# und Blazor.",
    "exp4.h2": "Implementierung einer Microservices-Architektur sowie automatisierter Prozesse zur Effizienzsteigerung in der Lagerverwaltung.",
    "exp4.h3": "Begleitung des vollst\u00e4ndigen Entwicklungszyklus von Anforderungsanalyse \u00fcber Implementierung bis Produktivschaltung.",
    "exp4.h4": "Aufbau von CI/CD-Pipelines f\u00fcr kontinuierliche Integration und Deployment der Anwendung.",

    "exp5.role": "Praktikant \u2014 Informationssystemtechnik / Automated Energy Control",
    "exp5.company": "Innocept Mobility",
    "exp5.duration": "Okt. 2023 \u2013 Feb. 2024",
    "exp5.location": "Frankfurt",
    "exp5.desc": "Konzeption und Optimierung von Lastmanagement-Systemen f\u00fcr Ladestationen und Raspberry-Pi-basierte Energieerfassung.",
    "exp5.h1": "Konzeption und Optimierung von Lastmanagement-Systemen f\u00fcr Level-2-Ladestationen durch Analyse des OCPP-Protokolls.",
    "exp5.h2": "Entwicklung eines Raspberry-Pi-basierten Energiez\u00e4hler-Systems zur Echtzeiterfassung und Analyse von Ladedaten.",
    "exp5.h3": "Integration von Energiez\u00e4hlern und Raspberry Pi \u00fcber RS485/Modbus f\u00fcr zuverl\u00e4ssige Daten\u00fcbertragung.",

    // Footer
    "footer.rights": "Alle Rechte vorbehalten.",

    // Projects
    "proj1.title": "Drone FHSS Command Link Testbed",
    "proj1.summary": "Forschungstestbed zur Simulation und Angriffstestung frequenzspringender Drohnen-Kommandoverbindungen mit einem 12-Angriffs-Toolkit.",
    "proj1.desc": "Vollst\u00e4ndiger FHSS-Drohnen-Kommunikationsstack von Grund auf entwickelt \u2014 deterministisches HMAC-SHA256-Hop-Scheduling, NTP-basierte Uhrzeitsynchronisation, Overlap-Binding-Kanalwechsel und hop-aware Link-Quality-Monitoring mit Hysterese. 12 kategorisierte Angriffe implementiert (Flood, Injection, Reactive Jamming, Handshake-Exploits, LQM-Manipulation) zur systematischen Schwachstellenanalyse. Cross-Device-Validierung \u00fcber isoliertes Ethernet mit 0,19 % Kontrollpaketverlust. Transport-Schicht portierbar auf HopeRF/nRF24L01+-Module und HackRF SDR.",

    "proj2.title": "Skyview Search",
    "proj2.summary": "Semantische Bildsuchmaschine f\u00fcr 12.000 Luftbildaufnahmen mittels CLIP-Embeddings und FAISS-Vektorsuche.",
    "proj2.desc": "Nat\u00fcrlichsprachliche Suche \u00fcber 12.000 Luftbilder aus 15 Landschaftskategorien. Offline-Pipeline verarbeitet, beschriftet (BLIP) und bettet (OpenCLIP ViT-B-32) alle Bilder in einen 512-dimensionalen FAISS-Index ein. Zur Laufzeit werden Textanfragen mit CLIP encodiert und per Kosinusähnlichkeit in unter 100 ms abgeglichen. 98,3 % Recall@5 und 0,952 MRR im Evaluations-Benchmark erreicht. REST-API \u00fcber FastAPI mit interaktiver Swagger-Dokumentation.",

    "proj3.title": "Smartcard-basiertes Sicherheitssystem",
    "proj3.summary": "Embedded-Sicherheitssystem mit physischen Smartcards f\u00fcr Mikrozahlungen, Zutrittskontrolle und verschl\u00fcsselte Dateispeicherung.",
    "proj3.desc": "Drei integrierte Sicherheitssubsysteme auf physischer Smartcard-Hardware: ein Mikrozahlungssystem mit Fondsverwaltung und Transaktionsprotokollierung, ein Zutrittskontrollsystem mit RSA-Challenge-Response-Authentifizierung und ein sicheres Dateisystem mit AES-Verschl\u00fcsselung und Zwei-Faktor-Authentifizierung (Smartcard + PIN). Implementiert mit pyscard f\u00fcr die Hardwarekommunikation und der Python-Cryptography-Bibliothek f\u00fcr RSA- und AES-Operationen.",

    "proj4.title": "Phishing-Website-Erkennung",
    "proj4.summary": "ML-Pipeline zum Vergleich von 6 Modellen zur Phishing-URL-Erkennung mit 99,9 % Testgenauigkeit bei Random Forest und MLP.",
    "proj4.desc": "End-to-End-Machine-Learning-Pipeline zur Erkennung von Phishing-Websites. \u00dcber 10.000 URLs von PhishTank, Tranco und Majestic Million gesammelt. Adressleisten-, Domain- und HTML/JavaScript-Features extrahiert. 6 Modelle trainiert und verglichen \u2014 Decision Tree, Random Forest, MLP, XGBoost, SVM und Autoencoder. Random Forest und Multilayer Perceptron erreichten beide 99,9 % Testgenauigkeit. Bestes Modell zur Bereitstellung serialisiert.",

    "proj5.title": "Personal Finance Tracker",
    "proj5.summary": "WPF-Desktopanwendung zur Verwaltung von Einnahmen, Ausgaben, Sparzielen, Verm\u00f6genswerten und Verbindlichkeiten mit visuellen Dashboards.",
    "proj5.desc": "Vollst\u00e4ndige pers\u00f6nliche Finanz-Desktopanwendung in C# mit WPF nach MVVM-Architektur. Enth\u00e4lt ein Echtzeit-Dashboard mit Nettoverm\u00f6gensberechnung, monatliche Budgetverfolgung mit anpassbaren Ausgabenkategorien, Finanzzielplanung mit Fortschrittsvisualisierung und gesch\u00e4tzten Abschlussdaten sowie umfassende Verm\u00f6gens-/Verbindlichkeitsverwaltung mit Zinssatzverfolgung. Datenpersistierung \u00fcber JSON-Serialisierung mit Dependency Injection.",
  },
};

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/(?:^|; )locale=(en|de)/);
  return (match?.[1] as Locale) ?? "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  // Keep <html lang> in sync with the current locale
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "en" ? "de" : "en";
      // Persist manual choice so middleware doesn\'t override it
      document.cookie = `locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[locale][key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, toggleLocale, t }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={locale}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </I18nContext.Provider>
  );
}
