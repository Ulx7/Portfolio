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
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML/CSS" },
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
    name: "Backend & Runtimes",
    skills: [
      { name: "Spring Boot" },
      { name: ".NET Core" },
      { name: "Node.js" },
    ],
  },
  {
    name: "Data & Cloud Infrastructure",
    skills: [
      { name: "PySpark" },
      { name: "Pandas" },
      { name: "SQL Server" },
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "Apache Hive" },
      { name: "Azure" },
      { name: "AWS Cloud" },
      { name: "Docker" },
      { name: "Git" },
    ],
  },
];
