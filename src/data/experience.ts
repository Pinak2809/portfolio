export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "Company Name",
    role: "Job Title",
    duration: "Jan 2024 - Present",
    location: "City, State",
    description:
      "Brief overview of your role and responsibilities. Replace with real content.",
    highlights: [
      "Key achievement or responsibility one",
      "Key achievement or responsibility two",
      "Key achievement or responsibility three",
    ],
  },
  {
    id: "exp-2",
    company: "Previous Company",
    role: "Previous Role",
    duration: "Jun 2022 - Dec 2023",
    location: "City, State",
    description:
      "Brief overview of your role and responsibilities. Replace with real content.",
    highlights: [
      "Key achievement or responsibility one",
      "Key achievement or responsibility two",
    ],
  },
  {
    id: "exp-3",
    company: "Earlier Company",
    role: "Earlier Role",
    duration: "Jan 2020 - May 2022",
    location: "City, State",
    description:
      "Brief overview of your role and responsibilities. Replace with real content.",
    highlights: [
      "Key achievement or responsibility one",
      "Key achievement or responsibility two",
      "Key achievement or responsibility three",
    ],
  },
];
