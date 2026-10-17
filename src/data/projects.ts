export interface WhatItDoesItem {
  bold: string;
  text: string;
}

export interface FeatureItem {
  title: string;
  description?: string;
}

export interface ProjectLink {
  label: string;
  url: string;
  type?: "external" | "download";
  downloadFilename?: string;
}

export interface ArchitectureDecision {
  title: string;
  explanation: string;
}

export interface Project {
  id: string;
  title: string;
  tag: "Client" | "Academic" | "Personal";
  category: string;
  categoryKicker: string;
  contextObjective: string;
  keyFeatures: (string | FeatureItem)[];
  technologies: string[];
  links: ProjectLink[];
  shortDescription: string;
  image: string;
  images: string[];
  isComingSoon?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  documentUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  color?: string;
  year?: string;
  badge?: string;
  kicker?: string;
  subtitle?: string;
  synthesis?: string;
  overview?: string;
  architecture?: string;
  highlights?: string[];
  whatItDoes?: WhatItDoesItem[];
  architectureDecisions?: ArchitectureDecision[];
  fullDescription?: string;
  metrics?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "vivi",
    title: "Vivi",
    tag: "Personal",
    category: "PERSONAL · IN DEVELOPMENT",
    categoryKicker: "PERSONAL · IN DEVELOPMENT",
    badge: "⚡ Personal Venture · In Development",
    contextObjective: "Mobile and web application currently in active product design and core architecture development.",
    keyFeatures: [
      "Distraction-Free Focus Workflow",
      "Zero-Latency Local State Pipelines",
      "Keyboard-First Desktop Navigation",
      "Fluid Gesture Control on Mobile"
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Product Design"],
    links: [],
    shortDescription: "Mobile and web application currently in active product design and core architecture development.",
    fullDescription: "Mobile and web application currently in active product design and core architecture development.",
    image: "/projects/vivi.png",
    images: ["/projects/vivi.png", "/projects/Vivi-logo.png"],
    isComingSoon: true,
    color: "#f97316",
    year: "2025"
  },
  {
    id: "vivero-belgrano",
    title: "Vivero Belgrano Norte",
    tag: "Client",
    category: "COMMERCIAL CLIENT WORK",
    categoryKicker: "COMMERCIAL CLIENT WORK",
    badge: "🌱 Commercial Client Work",
    contextObjective: "Built with a focus on Visual Storytelling and Atomic Design, this platform provides a seamless, high-end experience for discovering botanical species. The project prioritizes clean aesthetics and technical efficiency through a decoupled headless architecture.",
    keyFeatures: [
      {
        title: "Headless CMS",
        description: "Sanity.io integration for professional content management."
      },
      {
        title: "Atomic Design",
        description: "Modular component system styled with Tailwind CSS JIT."
      },
      {
        title: "Editorial UI",
        description: "Premium glassmorphism and earth-tone design tokens."
      },
      {
        title: "Edge Deployment",
        description: "Optimized via Vercel Edge Functions for global performance."
      }
    ],
    technologies: ["Astro", "React", "Sanity CMS", "Tailwind CSS", "Vercel"],
    links: [
      { label: "Live Demo", url: "https://ulysse-dev.vercel.app/#projects", type: "external" }
    ],
    shortDescription: "Built with a focus on Visual Storytelling and Atomic Design, this platform provides a seamless, high-end experience for discovering botanical species.",
    fullDescription: "Built with a focus on Visual Storytelling and Atomic Design, this platform provides a seamless, high-end experience for discovering botanical species. The project prioritizes clean aesthetics and technical efficiency through a decoupled headless architecture.",
    image: "/projects/vivero.png",
    images: [
      "/projects/vivero.png",
      "/projects/Vivero2.jpeg",
      "/projects/Vivero3.jpeg",
      "/projects/Vivero4.jpeg"
    ],
    liveUrl: "https://ulysse-dev.vercel.app/#projects",
    color: "#10b981",
    year: "2025"
  },
  {
    id: "football-bigdata",
    title: "Big Data: Professional Football Analytics",
    tag: "Academic",
    category: "CAPSTONE PROJECT · UNIVERSIDAD ORT URUGUAY",
    categoryKicker: "CAPSTONE PROJECT · UNIVERSIDAD ORT URUGUAY",
    badge: "🏛️ Capstone — Universidad ORT Uruguay",
    contextObjective: "A comprehensive technical case study analyzing over 1.7M professional football records. This research involved developing a full ETL pipeline to process massive datasets, validating 8 critical business inquiries through a comparative performance study between Pandas and PySpark.",
    keyFeatures: [
      "Scoring Efficiency (Goals/Matches ratio)",
      "Net Spend & Transfer Balance Analysis",
      "Global Nationality Distribution (Heatmaps)",
      "League Comparison: Premier League vs Eredivisie",
      "Market Value Evolution (Case Study: FC Barcelona)"
    ],
    technologies: ["Python (Pandas)", "PySpark", "Apache Hive", "ETL Pipelines", "Tableau", "Data Modeling"],
    links: [
      {
        label: "Download Document",
        url: "/BD.pdf",
        type: "download",
        downloadFilename: "Ulysse_Castello_BigData_Football_Analytics.pdf"
      }
    ],
    shortDescription: "A comprehensive technical case study analyzing over 1.7M professional football records using PySpark and Pandas ETL pipelines.",
    fullDescription: "A comprehensive technical case study analyzing over 1.7M professional football records. This research involved developing a full ETL pipeline to process massive datasets, validating 8 critical business inquiries through a comparative performance study between Pandas and PySpark.",
    image: "/projects/bigdata.png",
    images: [
      "/projects/bigdata.png",
      "/projects/BigData2.jpeg",
      "/projects/BigData3.jpeg",
      "/projects/BigData4.jpeg"
    ],
    documentUrl: "/BD.pdf",
    color: "#6366f1",
    year: "2024"
  },
  {
    id: "real-estate-system",
    title: "Real Estate Management System",
    tag: "Academic",
    category: "CAPSTONE PROJECT · UNIVERSIDAD ORT URUGUAY",
    categoryKicker: "CAPSTONE PROJECT · UNIVERSIDAD ORT URUGUAY",
    badge: "🏛️ Capstone — Universidad ORT Uruguay",
    contextObjective: "This Capstone Project involved the full digitalization of a traditional firm. I developed a robust internal management system for contracts and clients using Spring Boot, and a public-facing property catalog using React and Tailwind CSS, all deployed on AWS infrastructure.",
    keyFeatures: [
      "Automated PDF receipt generation and email notifications.",
      "Integrated property filtering and real-time WhatsApp contact.",
      "Complete Software Development Life Cycle (SDLC) documentation.",
      "Secure database architecture for legal and real estate records."
    ],
    technologies: ["Java", "Spring Boot", "React", "AWS Cloud", "SQL Server", "Tailwind CSS"],
    links: [
      {
        label: "Download Document",
        url: "/RealEstate.pdf",
        type: "download",
        downloadFilename: "Ulysse_Castello_RealEstate_Management_System.pdf"
      }
    ],
    shortDescription: "Full digitalization of a real estate firm featuring a Spring Boot backend, React public catalog, and AWS deployment.",
    fullDescription: "This Capstone Project involved the full digitalization of a traditional firm. I developed a robust internal management system for contracts and clients using Spring Boot, and a public-facing property catalog using React and Tailwind CSS, all deployed on AWS infrastructure.",
    image: "/projects/realestate.png",
    images: [
      "/projects/realestate.png",
      "/projects/RealEstate3.jpeg"
    ],
    documentUrl: "/RealEstate.pdf",
    color: "#3b82f6",
    year: "2024"
  },
  {
    id: "roulette-simulator",
    title: "Roulette Game Engine",
    tag: "Academic",
    category: "UNIVERSIDAD ORT URUGUAY",
    categoryKicker: "UNIVERSIDAD ORT URUGUAY",
    badge: "🏛️ Degree Project — Universidad ORT Uruguay",
    contextObjective: "A complete casino logic implementation focusing on Object-Oriented Programming (OOP) excellence and clean architecture. The system simulates a real-world roulette environment with multiple players and automated dealer logic.",
    keyFeatures: [
      {
        title: "Design Patterns",
        description: "Implementation of Facade, Singleton, and Observer."
      },
      {
        title: "Behavioral Logic",
        description: "Used Strategy and Template Method for algorithm variants."
      },
      {
        title: "Core OOP",
        description: "Advanced use of Inheritance, Polymorphism, and Interfaces."
      },
      {
        title: "Reliability",
        description: "Integrated Exception Handling to manage runtime errors."
      }
    ],
    technologies: ["Java", "Design Patterns", "MVC Architecture", "UML Modeling"],
    links: [
      { label: "Source Code", url: "https://github.com/Ulx7/Roulette-System", type: "external" }
    ],
    shortDescription: "A complete casino logic implementation focusing on Object-Oriented Programming (OOP) excellence and clean architecture.",
    fullDescription: "A complete casino logic implementation focusing on Object-Oriented Programming (OOP) excellence and clean architecture. The system simulates a real-world roulette environment with multiple players and automated dealer logic.",
    image: "/projects/ruleta.png",
    images: [
      "/projects/ruleta.png",
      "/projects/Ruleta2.jpeg",
      "/projects/Ruleta3.jpeg",
      "/projects/Ruleta4.jpeg"
    ],
    githubUrl: "https://github.com/Ulx7/Roulette-System",
    color: "#f59e0b",
    year: "2023"
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    tag: "Academic",
    category: "PROGRAMACIÓN 3 · UNIVERSIDAD ORT URUGUAY",
    categoryKicker: "PROGRAMACIÓN 3 · UNIVERSIDAD ORT URUGUAY",
    badge: "🏛️ Degree Project — Universidad ORT Uruguay",
    contextObjective: "This project implements a cabin reservation system for a hotel management suite. It was developed in two main parts: a robust Web API acting as the business logic engine and a Model-View-Controller (MVC) web application for user interaction.",
    keyFeatures: [
      {
        title: "Web API & MVC",
        description: "Developed a dual-system client-server architecture."
      },
      {
        title: "Entity Framework",
        description: "Used as the primary ORM for efficient SQL mapping."
      },
      {
        title: "Clean Architecture",
        description: "Organized code into Domain, Application, and Infrastructure layers."
      },
      {
        title: "Dependency Injection",
        description: "Implemented to manage class lifecycles and decoupling."
      }
    ],
    technologies: ["C#", ".NET Core", "ASP.NET Web API", "SQL Server", "Entity Framework"],
    links: [
      { label: "Front-end Code", url: "https://github.com/Ulx7/Hotel-Management-System", type: "external" },
      { label: "Back-end Code", url: "https://github.com/Ulx7/Hotel-Management-System-API", type: "external" }
    ],
    shortDescription: "Cabin reservation system with C# ASP.NET Web API and MVC web application following clean architecture.",
    fullDescription: "This project implements a cabin reservation system for a hotel management suite. It was developed in two main parts: a robust Web API acting as the business logic engine and a Model-View-Controller (MVC) web application for user interaction.",
    image: "/projects/hotel.png",
    images: [
      "/projects/hotel.png",
      "/projects/Cabana2.jpeg",
      "/projects/Cabana3.jpeg",
      "/projects/Cabana4.jpeg"
    ],
    frontendUrl: "https://github.com/Ulx7/Hotel-Management-System",
    backendUrl: "https://github.com/Ulx7/Hotel-Management-System-API",
    githubUrl: "https://github.com/Ulx7/Hotel-Management-System",
    color: "#ec4899",
    year: "2023"
  }
];
