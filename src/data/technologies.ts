export interface TechCategory {
  category: string;
  items: string[];
}

export const technologies: TechCategory[] = [
  {
    category: "Languages",
    items: ["Python", "C/C++", "C#/.NET", "Java", "SystemC", "HTML/CSS"],
  },
  {
    category: "Embedded & Hardware",
    items: ["STM32", "Raspberry Pi", "Arduino", "UART", "SPI", "CAN", "RS485/Modbus"],
  },
  {
    category: "Automation & Industry",
    items: ["Siemens TIA Portal", "Schneider Machine Expert", "PLC-SCADA", "OCPP", "Node-RED"],
  },
  {
    category: "ML & Data",
    items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "YOLO", "CLIP/FAISS", "Pandas", "NumPy"],
  },
  {
    category: "Infrastructure",
    items: ["Git", "Docker", "CI/CD", "MySQL", "SQLite", "MATLAB/Simulink", "Linux"],
  },
  {
    category: "Web",
    items: ["Flask", "FastAPI", "React", "Blazor"],
  },
];
