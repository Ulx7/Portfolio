export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  secondaryBio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  status: string;
  certifications: {
    title: string;
    institution: string;
    icon: string;
  }[];
}

export const profile: Profile = {
  name: "Ulysse Castello",
  role: "Software Developer • Backend Systems • Data Pipelines",
  headline: "Building the future, one project at a time.",
  bio: "Software developer with a strong foundation in backend architecture, data pipelines, and scalable software systems. Experienced in building robust solutions with Java (Spring Boot), C# (.NET), Python, and SQL, with the versatility to work across the full stack. Driven by solving logical problems, automating workflows, and writing clean, reliable code from the ground up.",
  secondaryBio: "What motivates me the most is the opportunity to work on projects that address real-world issues while pushing the boundaries of innovation.",
  location: "Berlin, Germany",
  email: "castelloulises1420@gmail.com",
  github: "https://github.com/Ulx7",
  linkedin: "https://linkedin.com/in/ulysse-castello",
  status: "Available for full-time opportunities and freelance projects",
  certifications: [
    {
      title: "IT Analyst",
      institution: "Universidad ORT Uruguay",
      icon: "shield-check"
    },
    {
      title: "Systems Analyst",
      institution: "Universidad ORT Uruguay",
      icon: "cpu"
    },
    {
      title: "Web Development",
      institution: "Universidad ORT Uruguay",
      icon: "code"
    }
  ]
};
