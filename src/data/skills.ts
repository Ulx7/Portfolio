export interface SkillCategory {
  name: string;
  icon?: string;
  description?: string;
  skills: {
    name: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: [
      { name: "C#" },
      { name: "Java" },
      { name: "Python" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML/CSS" },
    ],
  },
  {
    name: "Backend & Systems",
    skills: [
      { name: ".NET Core (C#)" },
      { name: "Spring Boot (Java)" },
      { name: "Node.js" },
      { name: "REST APIs / Microservices" },
    ],
  },
  {
    name: "Frontend & Frameworks",
    skills: [
      { name: "React" },
      { name: "Next.js" },
      { name: "Astro" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    name: "Data & Cloud Infrastructure",
    skills: [
      { name: "SQL (SQL Server & MySQL)" },
      { name: "MongoDB" },
      { name: "PySpark" },
      { name: "Pandas" },
      { name: "Apache Hive" },
      { name: "Azure" },
      { name: "AWS Cloud" },
      { name: "Docker" },
      { name: "Git" },
    ],
  },
];
