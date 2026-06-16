export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  github?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "drone-fhss",
    title: "Drone FHSS Command Link Testbed",
    summary: "",
    description: "",
    tags: ["Python", "AsyncIO", "UDP", "HMAC-SHA256", "Raspberry Pi", "Security"],
    github: "https://github.com/Pinak2809/drone-fhss",
  },
  {
    id: "skyview-search",
    title: "Skyview Search",
    summary: "",
    description: "",
    tags: ["Python", "CLIP", "FAISS", "FastAPI", "PyTorch", "BLIP"],
    github: "https://github.com/Pinak2809/skyview-search",
  },
  {
    id: "smartcard-security",
    title: "Smartcard-Based Security System",
    summary: "",
    description: "",
    tags: ["Python", "Smartcard", "RSA", "AES", "pyscard", "Embedded"],
    github: "https://github.com/Pinak2809/smartcard-security",
  },
  {
    id: "phishing-detection",
    title: "Phishing Website Detection",
    summary: "",
    description: "",
    tags: ["Python", "scikit-learn", "XGBoost", "TensorFlow", "Keras"],
    github: "https://github.com/Pinak2809/phishing-detection",
  },
  {
    id: "finance-tracker",
    title: "Personal Finance Tracker",
    summary: "",
    description: "",
    tags: ["C#", ".NET 8", "WPF", "MVVM", "JSON"],
    github: "https://github.com/Pinak2809/Personal-Finance-Tracker",
  },
];
