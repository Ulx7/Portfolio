export interface Project {
  id: string;
  title: string;
  category: "Full Stack" | "Big Data" | "Enterprise" | "Software Architecture";
  shortDescription: string;
  fullDescription: string;
  problemStatement?: string;
  architecture?: string;
  keyHighlights?: string[];
  image: string;
  metrics?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  color: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "vivero-belgrano",
    title: "Vivero Belgrano Norte",
    category: "Full Stack",
    shortDescription: "A high-performance digital catalog bridging traditional botany with modern, magazine-style editorial design.",
    fullDescription: "A high-performance digital botanical catalog bridging traditional botany with modern magazine-style editorial design. Features dynamic content modeling with headless CMS, image optimization pipelines, and sub-second page loads.",
    problemStatement: "Traditional botanical catalogs suffered from slow load times, bloated WordPress plugins, and difficult inventory updates across hundreds of exotic plant varieties.",
    architecture: "Static site generation with Astro for zero-runtime JavaScript overhead, paired with React islands for interactive search/filters and Sanity Headless CMS for real-time editorial publishing.",
    keyHighlights: [
      "Sub-second TTFB with Edge CDN caching",
      "Headless CMS integration with real-time schema validation",
      "Responsive typography and fluid layout design"
    ],
    image: "/projects/vivero.jpeg",
    metrics: "Sub-second TTFB & Headless CMS",
    technologies: ["Astro", "React", "Sanity CMS", "Tailwind CSS"],
    githubUrl: "https://github.com/Ulx7",
    liveUrl: "https://ulysse-dev.vercel.app/#projects",
    featured: true,
    color: "#10b981",
    year: "2025"
  },
  {
    id: "football-bigdata",
    title: "Big Data: Professional Football Analytics",
    category: "Big Data",
    shortDescription: "Comprehensive Big Data research developed as the final requirement for the IT Analyst degree.",
    fullDescription: "End-to-end distributed data processing architecture handling massive historical sports datasets. Implemented distributed data transformations, pattern extraction, player tactical evaluation, and predictive analytics using PySpark and Pandas on Apache Hadoop & Hive.",
    problemStatement: "Analyzing granular match events (passes, pressure zones, xG) across multiple European leagues generates millions of semi-structured records that overwhelm standard relational queries.",
    architecture: "Multi-stage Big Data pipeline utilizing Apache Hadoop HDFS for raw event ingestion, Apache Hive for schema-on-read cataloging, and PySpark for distributed transformations and metric computations.",
    keyHighlights: [
      "10,000+ match events aggregated and normalized",
      "Distributed map-reduce computations with PySpark DataFrames",
      "Advanced player profiling algorithms and tactical clusters"
    ],
    image: "/projects/bigdata.jpeg",
    metrics: "10,000+ match events aggregated",
    technologies: ["Python", "PySpark", "Pandas", "Apache Hive", "Hadoop"],
    githubUrl: "https://github.com/Ulx7",
    featured: true,
    color: "#6366f1",
    year: "2024"
  },
  {
    id: "real-estate-system",
    title: "Real Estate Management System",
    category: "Enterprise",
    shortDescription: "End-to-end digital transformation for a professional notary and real estate firm, featuring a Java/Spring backend and React frontend.",
    fullDescription: "Enterprise management platform digitizing property records, contracts, notary client dossiers, and transaction pipelines. Built with layered architecture, Spring Security, transactional persistence with SQL Server, and an intuitive management UI.",
    problemStatement: "Paper-based property deeds, fragmented title verifications, and unindexed notary records caused regulatory compliance risks and transaction delays.",
    architecture: "Layered Spring Boot microservice architecture adhering to Domain-Driven Design (DDD), Spring Security JWT authentication, Hibernate/JPA ORM with MS SQL Server, and a reactive React admin dashboard.",
    keyHighlights: [
      "End-to-end audit trail for legal contract signatures",
      "Role-based access control (RBAC) for notaries, agents, and auditors",
      "Automated dossier verification pipelines"
    ],
    image: "/projects/realestate.jpeg",
    metrics: "Multi-role notary workflows & audit trail",
    technologies: ["Java", "Spring Boot", "React", "SQL Server"],
    githubUrl: "https://github.com/Ulx7",
    featured: true,
    color: "#3b82f6",
    year: "2024"
  },
  {
    id: "hotel-management",
    title: "Hotel Management System",
    category: "Enterprise",
    shortDescription: "A full-stack hotel management solution featuring a Web API backend and an MVC web application client.",
    fullDescription: "Centralized property management system managing room inventory, customer check-in/out schedules, billing, and reservations. Features clean separation between business logic, data access layers, and responsive web views.",
    problemStatement: "Booking collisions, unsynchronized housekeeping states, and manual invoice calculations created friction during peak seasonal occupancy.",
    architecture: "C# / ASP.NET Core Web API with Entity Framework Core, structured Repository pattern, SQL Server transactional locking for zero-overbooking guarantees, and an ASP.NET MVC management client.",
    keyHighlights: [
      "ACID transactional consistency for concurrent reservations",
      "Comprehensive RESTful endpoints with OpenAPI/Swagger docs",
      "Automated folio generation and billing reconciliation"
    ],
    image: "/projects/hotel.jpeg",
    metrics: "Full Web API & Relational database",
    technologies: ["C#", ".NET Core", "SQL Server", "ASP.NET MVC"],
    githubUrl: "https://github.com/Ulx7",
    featured: true,
    color: "#ec4899",
    year: "2023"
  },
  {
    id: "roulette-simulator",
    title: "Roulette Game Engine",
    category: "Software Architecture",
    shortDescription: "Developed as part of the mandatory 'Application Design and Development' course at Universidad ORT Uruguay.",
    fullDescription: "Casino roulette simulation implementing strict Object-Oriented Design and design patterns (MVC, State, Observer, Factory). Models complex probability distributions, betting strategies, and real-time bankroll simulations with a modular Java architecture.",
    problemStatement: "Simulating complex stateful casino betting rules with real-time probability payouts requires decoupling game rules, user bankroll state, and random generation mechanics.",
    architecture: "Strict Gang of Four (GoF) design patterns implementation: State pattern for betting phases, Observer pattern for wheel payout broadcasts, and Factory pattern for polymorph bet types.",
    keyHighlights: [
      "Rigorous unit testing covering 100% of game outcome edge cases",
      "Decoupled MVC architecture supporting CLI and GUI renderers",
      "Monte Carlo bankroll risk probability analysis"
    ],
    image: "/projects/ruleta.jpeg",
    metrics: "Strict MVC & GoF Design Patterns",
    technologies: ["Java", "Design Patterns", "MVC Architecture"],
    githubUrl: "https://github.com/Ulx7",
    featured: true,
    color: "#f59e0b",
    year: "2023"
  }
];
