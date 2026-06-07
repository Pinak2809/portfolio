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
    id: "project-1",
    title: "Project Title One",
    summary: "A one-line summary of this project and what it accomplishes.",
    description:
      "Detailed description of the project. Explain the problem it solves, the approach taken, key technical decisions, and the outcome. Replace this placeholder with real content.",
    tags: ["Python", "Embedded C", "MQTT", "Docker"],
    github: "https://github.com/username/project-1",
  },
  {
    id: "project-2",
    title: "Project Title Two",
    summary: "A one-line summary of this project and what it accomplishes.",
    description:
      "Detailed description of the project. Explain the problem it solves, the approach taken, key technical decisions, and the outcome. Replace this placeholder with real content.",
    tags: ["TypeScript", "Next.js", "TensorFlow", "AWS"],
    github: "https://github.com/username/project-2",
  },
  {
    id: "project-3",
    title: "Project Title Three",
    summary: "A one-line summary of this project and what it accomplishes.",
    description:
      "Detailed description of the project. Explain the problem it solves, the approach taken, key technical decisions, and the outcome. Replace this placeholder with real content.",
    tags: ["Rust", "RTOS", "CAN Bus", "SPI"],
    github: "https://github.com/username/project-3",
  },
  {
    id: "project-4",
    title: "Project Title Four",
    summary: "A one-line summary of this project and what it accomplishes.",
    description:
      "Detailed description of the project. Explain the problem it solves, the approach taken, key technical decisions, and the outcome. Replace this placeholder with real content.",
    tags: ["Go", "Kubernetes", "gRPC", "PostgreSQL"],
  },
];
