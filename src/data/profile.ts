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
  role: "Software Developer & Data Analyst",
  headline: "Building the future, one project at a time.",
  bio: "I navigate between logic and data to bring digital ideas to life. From robust enterprise backend systems to data analytics pipelines and modern web apps, I love turning complex problems into elegant solutions.",
  secondaryBio: "What motivates me the most is the opportunity to work on projects that address real-world issues while pushing the boundaries of innovation.",
  location: "Berlin, Germany",
  email: "castelloulises1420@gmail.com",
  github: "https://github.com/Ulx7",
  linkedin: "https://linkedin.com/in/ulysse-castello",
  status: "Available for new projects",
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
