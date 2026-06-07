export interface TechCategory {
  category: string;
  items: string[];
}

export const technologies: TechCategory[] = [
  {
    category: "Languages",
    items: ["Python", "TypeScript", "C/C++", "Rust", "Go"],
  },
  {
    category: "Embedded & Hardware",
    items: ["ARM Cortex", "RTOS", "SPI/I2C/UART", "CAN Bus", "MQTT"],
  },
  {
    category: "ML & Data",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Kubernetes", "AWS", "Linux", "CI/CD"],
  },
  {
    category: "Web",
    items: ["Next.js", "React", "Node.js", "PostgreSQL", "REST/gRPC"],
  },
];
