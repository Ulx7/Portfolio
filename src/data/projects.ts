export interface Project {
  id: string;
  title: string;
  tag: "Client" | "Academic" | "Personal";
  badge?: string;
  shortDescription: string;
  overview?: string;
  architecture?: string;
  highlights?: string[];
  image?: string;
  images?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  isComingSoon?: boolean;
  // Compatibility properties
  category?: string;
  contextBadge?: string;
  statusBadge?: string;
  problemStatement?: string;
  fullDescription?: string;
  keyHighlights?: string[];
  metrics?: string;
  featured?: boolean;
  color?: string;
  year?: string;
}

export const projects: Project[] = [
  {
    id: "vivi",
    title: "Vivi",
    tag: "Personal",
    badge: "In Development",
    isComingSoon: true,
    shortDescription: "Mobile and web application currently in active product design and core architecture development.",
    image: "/vivi-logo.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Product Design"],
    color: "#f97316",
    year: "2025"
  },
  {
    id: "vivero-belgrano",
    title: "Vivero Belgrano Norte",
    tag: "Client",
    shortDescription: "A high-performance digital catalog bridging traditional botany with modern, magazine-style editorial design.",
    overview: "Traditional botanical catalogs suffered from slow load times, bloated WordPress plugins, and difficult inventory updates across hundreds of exotic plant varieties. Vivero Belgrano Norte was engineered as an ultra-fast digital publication that blends botanical cataloging with editorial elegance.",
    architecture: "Static site generation with Astro for zero-runtime JavaScript overhead, paired with React islands for interactive search/filters and Sanity Headless CMS for real-time editorial publishing.",
    highlights: [
      "Sub-second TTFB with globally distributed Edge CDN caching",
      "Headless CMS integration with real-time schema validation",
      "Responsive typography and fluid botanical catalog layout"
    ],
    image: "/projects/vivero.jpeg",
    images: ["/projects/vivero.jpeg"],
    technologies: ["Astro", "React", "Sanity CMS", "Tailwind CSS"],
    githubUrl: "https://github.com/Ulx7",
    liveUrl: "https://ulysse-dev.vercel.app/#projects",
    color: "#10b981",
    year: "2025"
  },
  {
    id: "football-bigdata",
    title: "Big Data: Professional Football Analytics",
    tag: "Academic",
    shortDescription: "Distributed data processing architecture handling massive historical sports datasets with PySpark, Hadoop, and Hive.",
    overview: "Analyzing granular match events (passes, pressure zones, xG) across multiple European football leagues generates millions of semi-structured records that overwhelm standard relational queries. Developed as the final degree project for the IT Analyst degree.",
    architecture: "Multi-stage Big Data pipeline utilizing Apache Hadoop HDFS for raw event ingestion, Apache Hive for schema-on-read cataloging, and PySpark for distributed transformations and metric computations.",
    highlights: [
      "10,000+ match events aggregated and normalized",
      "Distributed map-reduce computations with PySpark DataFrames",
      "Advanced player profiling algorithms and tactical clusters"
    ],
    image: "/projects/bigdata.jpeg",
    images: ["/projects/bigdata.jpeg"],
    technologies: ["Python", "PySpark", "Pandas", "Apache Hive", "Hadoop"],
    githubUrl: "https://github.com/Ulx7",
    color: "#6366f1",
    year: "2024"
  },
  {
    id: "real-estate-system",
    title: "Real Estate Management System",
    tag: "Academic",
    shortDescription: "Enterprise management platform digitizing property records, contracts, and notary client dossiers with Spring Boot and React.",
    overview: "Paper-based property deeds, fragmented title verifications, and unindexed notary records caused regulatory compliance risks and transaction delays for real estate firms.",
    architecture: "Layered Spring Boot microservice architecture adhering to Domain-Driven Design (DDD), Spring Security JWT authentication, Hibernate/JPA ORM with MS SQL Server, and a reactive React admin dashboard.",
    highlights: [
      "End-to-end audit trail for legal contract signatures",
      "Role-based access control (RBAC) for notaries, agents, and auditors",
      "Automated dossier verification pipelines"
    ],
    image: "/projects/realestate.jpeg",
    images: ["/projects/realestate.jpeg"],
    technologies: ["Java", "Spring Boot", "React", "SQL Server"],
    githubUrl: "https://github.com/Ulx7",
    color: "#3b82f6",
    year: "2024"
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    tag: "Academic",
    shortDescription: "Centralized property management system with C# ASP.NET Core Web API and transactional SQL Server.",
    overview: "Booking collisions, unsynchronized housekeeping states, and manual invoice calculations created friction during peak seasonal occupancy.",
    architecture: "C# / ASP.NET Core Web API with Entity Framework Core, structured Repository pattern, SQL Server transactional locking for zero-overbooking guarantees, and an ASP.NET MVC management client.",
    highlights: [
      "ACID transactional consistency for concurrent reservations",
      "Comprehensive RESTful endpoints with OpenAPI/Swagger docs",
      "Automated folio generation and billing reconciliation"
    ],
    image: "/projects/hotel.jpeg",
    images: ["/projects/hotel.jpeg"],
    technologies: ["C#", ".NET Core", "SQL Server", "ASP.NET MVC"],
    githubUrl: "https://github.com/Ulx7",
    color: "#ec4899",
    year: "2023"
  },
  {
    id: "roulette-simulator",
    title: "Roulette Game Engine",
    tag: "Academic",
    shortDescription: "Casino roulette simulation implementing strict Object-Oriented Design and GoF design patterns in Java.",
    overview: "Simulating complex stateful casino betting rules with real-time probability payouts requires decoupling game rules, user bankroll state, and random generation mechanics.",
    architecture: "Strict Gang of Four (GoF) design patterns implementation: State pattern for betting phases, Observer pattern for wheel payout broadcasts, and Factory pattern for polymorph bet types.",
    highlights: [
      "Rigorous unit testing covering 100% of game outcome edge cases",
      "Decoupled MVC architecture supporting CLI and GUI renderers",
      "Monte Carlo bankroll risk probability analysis"
    ],
    image: "/projects/ruleta.jpeg",
    images: ["/projects/ruleta.jpeg"],
    technologies: ["Java", "Design Patterns", "MVC Architecture"],
    githubUrl: "https://github.com/Ulx7",
    color: "#f59e0b",
    year: "2023"
  }
];
