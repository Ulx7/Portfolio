import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  X,
  Layers,
  Zap,
  Brain,
  FileText,
  Database,
  Cloud,
  Network,
  ZoomIn,
} from "lucide-react";
import {
  SiAstro, SiTailwindcss, SiPython, SiSpringboot, SiDotnet, SiNextdotjs, SiPandas, SiApachespark, SiGit, SiMysql, SiNodedotjs, SiDocker
} from 'react-icons/si';
import { DiMsqlServer, DiJava } from 'react-icons/di';
import { VscAzure } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";
import { FaReact, FaAws, FaGithub } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

import BigData1 from "../images/BigData1.jpeg";
import BigData2 from "../images/BigData2.jpeg";
import BigData3 from "../images/BigData3.jpeg";
import BigData4 from "../images/BigData4.jpeg";
import Vivero1 from "../images/Vivero1.jpeg";
import Vivero2 from "../images/Vivero2.jpeg";
import Vivero3 from "../images/Vivero3.jpeg";
import Vivero4 from "../images/Vivero4.jpeg";
import Cabana1 from "../images/Cabana1.jpeg";
import Cabana2 from "../images/Cabana2.jpeg";
import Cabana3 from "../images/Cabana3.jpeg";
import Cabana4 from "../images/Cabana4.jpeg";
import Ruleta1 from "../images/Ruleta1.jpeg";
import Ruleta2 from "../images/Ruleta2.jpeg";
import Ruleta3 from "../images/Ruleta3.jpeg";
import Ruleta4 from "../images/Ruleta4.jpeg";
import RealEstate1 from "../images/RealEstate1.jpeg";
import RealEstate2 from "../images/RealEstate2.jpeg";
import RealEstate3 from "../images/RealEstate3.jpeg";

const techIcons = {
  "Astro": <SiAstro size={14} />,
  "React": <FaReact size={14} />,
  "Tailwind CSS": <SiTailwindcss size={14} />,
  "Next.js": <SiNextdotjs size={14} />,
  "Sanity CMS": <Database size={14} />,
  "Vercel": <Cloud size={14} />,

  "Python (Pandas)": <SiPython size={14} />,
  "Pandas": <SiPandas size={14} />,
  "PySpark": <SiApachespark size={14} />,
  "Big Data": <Brain size={14} />,
  "Hive": <Database size={14} />,
  "Tableau": <Zap size={14} />,
  "ETL": <Zap size={14} />,
  "Data Modeling": <Brain size={14} />,

  "Java": <DiJava size={14} />,
  "Spring Boot": <SiSpringboot size={14} />,
  "Node.js": <SiNodedotjs size={14} />,
  "AWS": <FaAws size={14} />,
  "Azure": <VscAzure size={14} />,
  "SQL Server": <DiMsqlServer size={14} />,
  "MySQL": <SiMysql size={14} />,
  "Entity Framework": <TbBrandCSharp size={16} />,
  "C#": <TbBrandCSharp size={16} />,
  ".NET Core": <SiDotnet size={14} />,
  "RESTful APIs": <Layers size={14} />,

  "Web API": <Network size={14} />,
  "Design Patterns": <Brain size={14} />,
  "MVC": <Layers size={14} />,
  "UML": <FileText size={14} />,
  "Docker": <SiDocker size={14} />,
  "Git": <SiGit size={14} />
};

const projects = [
  {
    id: 1,
    title: "Vivero Belgrano Norte",
    subtitle: "Digital Catalog • Editorial Botany Design",
    shortDesc: "A high-performance digital catalog bridging traditional botany with modern, magazine-style editorial design.",
    longDesc: "Built with a focus on Visual Storytelling and Atomic Design, this platform provides a seamless, high-end experience for discovering botanical species. The project prioritizes clean aesthetics and technical efficiency through a decoupled headless architecture.",
    images: [Vivero1.src, Vivero2.src, Vivero3.src, Vivero4.src],
    sectionTitle: "Engineering Stack",
    tags: ["Astro", "React", "Sanity CMS", "Tailwind CSS", "Vercel"],
    details: [
      {
        icon: <Layers size={24} strokeWidth={1.5} />,
        label: "Architecture",
        content: "Decoupled Headless CMS approach using Sanity.io for flexible content scaling and independent frontend logic."
      },
      {
        icon: <Zap size={24} strokeWidth={1.5} />,
        label: "Performance",
        content: "Leveraged Astro’s Islands Architecture to deliver zero-bundle-size HTML, hydrating only interactive elements with React."
      },
      {
        icon: <Brain size={24} strokeWidth={1.5} />,
        label: "Filtering Engine",
        content: "Custom client-side state management for real-time search and multi-criteria botanical filtering."
      }
    ],
    highlights: [
      "Headless CMS: Sanity.io integration for professional content management.",
      "Atomic Design: Modular component system styled with Tailwind CSS JIT.",
      "Editorial UI: Premium glassmorphism and earth-tone design tokens.",
      "Edge Deployment: Optimized via Vercel Edge Functions for global performance."
    ],
    links: {
      demo: "https://viverobelgranonorte.com",
      github: "https://github.com/Ulx7/ViveroBelgranoNorte.git",
    }
  },
  {
    id: 2,
    title: "Big Data: Professional Football Analytics",
    subtitle: "Capstone Project • Universidad ORT Uruguay",
    shortDesc: "Comprehensive Big Data research developed as the final requirement for the IT Analyst degree.",
    longDesc: "A comprehensive technical case study analyzing over 1.7M professional football records. This research involved developing a full ETL pipeline to process massive datasets, validating 8 critical business inquiries through a comparative performance study between Pandas and PySpark.",
    images: [BigData1.src, BigData2.src, BigData3.src, BigData4.src],
    sectionTitle: "Key Insights",
    tags: ["Python (Pandas)", "PySpark", "Hive", "ETL", "Tableau", "Data Modeling"],
    details: [
      {
        icon: <Layers size={24} strokeWidth={1.5} />,
        label: "Architecture",
        content: "End-to-end data pipeline design, focusing on distributed processing and schema scalability for massive datasets."
      },
      {
        icon: <Zap size={24} strokeWidth={1.5} />,
        label: "Challenges",
        content: "Optimizing latency during ETL of 1.7M records. Benchmarking engine performance (Pandas vs PySpark)."
      },
      {
        icon: <Brain size={24} strokeWidth={1.5} />,
        label: "Impact",
        content: "Validated 8 complex business hypotheses using advanced statistical data modeling and interactive visualization."
      }
    ],
    highlights: [
      "Scoring Efficiency (Goals/Matches ratio)",
      "Net Spend & Transfer Balance Analysis",
      "Global Nationality Distribution (Heatmaps)",
      "League Comparison: Premier League vs Eredivisie",
      "Market Value Evolution (Case Study: FC Barcelona)"
    ],
    links: {
      download: "/BD.pdf",
      nameDownload: "Big Data - Ulysse Castello.pdf"
    }
  },
  {
    id: 3,
    title: "Real Estate Management System",
    subtitle: "Universidad ORT Uruguay",
    shortDesc: "End-to-end digital transformation for a professional notary and real estate firm, featuring a Java/Spring backend and React frontend.",
    longDesc: "This Capstone Project involved the full digitalization of a traditional firm. I developed a robust internal management system for contracts and clients using Spring Boot, and a public-facing property catalog using React and Tailwind CSS, all deployed on AWS infrastructure.",
    images: [RealEstate1.src, RealEstate2.src, RealEstate3.src],
    sectionTitle: "Academic & Technical Achievements",
    tags: ["Java", "Spring Boot", "React", "AWS", "SQL Server", "Tailwind CSS"],
    details: [
      {
        icon: <Layers size={24} strokeWidth={1.5} />,
        label: "Full-Stack System",
        content: "Developed both the internal management logic (Spring Boot) and the client-side catalog (React)."
      },
      {
        icon: <Zap size={24} strokeWidth={1.5} />,
        label: "Deployment",
        content: "Configured and managed cloud infrastructure on AWS for hosting the integrated solution."
      },
      {
        icon: <Brain size={24} strokeWidth={1.5} />,
        label: "Documentation",
        content: "Produced a comprehensive 190+ page technical thesis covering SCM, Testing, and Software Architecture."
      }
    ],
    highlights: [
      "Automated PDF receipt generation and email notifications.",
      "Integrated property filtering and real-time WhatsApp contact.",
      "Complete Software Development Life Cycle (SDLC) documentation.",
      "Secure database architecture for legal and real estate records."
    ],
    links: {
      download: "/RealEstate.pdf",
      nameDownload: "Real Estate Management System - Ulysse Castello.pdf"
    }
  },
  {
    id: 4,
    title: "Roulette",
    subtitle: "Universidad ORT Uruguay",
    shortDesc: "Developed as part of the mandatory 'Application Design and Development' course at Universidad ORT Uruguay.",
    longDesc: "A complete casino logic implementation focusing on Object-Oriented Programming (OOP) excellence and clean architecture. The system simulates a real-world roulette environment with multiple players and automated dealer logic.",
    images: [Ruleta1.src, Ruleta2.src, Ruleta3.src, Ruleta4.src],
    sectionTitle: "Technical Implementation",
    tags: ["Java", "Design Patterns", "MVC", "UML"],
    details: [
      {
        icon: <Layers size={24} strokeWidth={1.5} />,
        label: "Architecture",
        content: "Layered system following the MVC pattern. Separates business logic from presentation for high maintainability."
      },
      {
        icon: <Zap size={24} strokeWidth={1.5} />,
        label: "Challenges",
        content: "Implementing a cohesive system using the Expert Principle and managing complex interactions through Interfaces."
      },
      {
        icon: <Brain size={24} strokeWidth={1.5} />,
        label: "Impact",
        content: "Successfully integrated 5+ Design Patterns (Facade, Singleton, Observer, etc.) to create a flexible, decoupled codebase."
      }
    ],
    highlights: [
      "Design Patterns: Implementation of Facade, Singleton, and Observer.",
      "Behavioral Logic: Used Strategy and Template Method for algorithm variants.",
      "Core OOP: Advanced use of Inheritance, Polymorphism, and Interfaces.",
      "Reliability: Integrated Exception Handling to manage errors."
    ],
    links: {
      github: "https://github.com/Ulx7/Roulette-System.git",
    }
  },
  {
    id: 5,
    title: "Hotel Management System",
    subtitle: "Programación 3 • Universidad ORT Uruguay",
    shortDesc: "A full-stack hotel management solution featuring a Web API backend and an MVC web application client.",
    longDesc: "This project implements a cabin reservation system for a hotel management suite. It was developed in two main parts: a robust Web API acting as the business logic engine and a Model-View-Controller (MVC) web application for user interaction.",
    images: [Cabana1.src, Cabana2.src, Cabana3.src, Cabana4.src],
    sectionTitle: "Technical Implementation",
    tags: ["C#", ".NET Core", "SQL Server", "Entity Framework", "Web API"],
    details: [
      {
        icon: <Layers size={24} strokeWidth={1.5} />,
        label: "Architecture",
        content: "Implementation of Clean Architecture principles, separating business logic from UI and data access."
      },
      {
        icon: <Zap size={24} strokeWidth={1.5} />,
        label: "Data & Logic",
        content: "Leveraged Entity Framework ORM for database management and Dependency Injection."
      },
      {
        icon: <Brain size={24} strokeWidth={1.5} />,
        label: "Core Patterns",
        content: "Applied Repository Pattern through Interfaces and strict Exception Handling."
      }
    ],
    highlights: [
      "Web API & MVC: Developed a dual-system architecture.",
      "Entity Framework: Used as the primary ORM for efficient SQL mapping.",
      "Clean Architecture: Organized code into Domain, Application, and Infrastructure layers.",
      "Dependency Injection: Implemented to manage class lifecycles."
    ],
    links: {
      frontend: "https://github.com/Ulx7/Hotel-Management-System-MVC.git",
      backend: "https://github.com/Ulx7/Hotel-Management-System-API.git"
    }
  }
];

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  const handleCloseModal = () => {
    setSelectedProject(null);
    setExpandedImage(null);
  };

  useEffect(() => {
    document.body.style.overflow = (selectedProject || expandedImage) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject, expandedImage]);

  return (
    <section id="projects" className="py-32 px-4 dark:bg-[#030712] bg-transparent dark:text-white text-foreground relative min-h-screen">
      <div className="container mx-auto max-w-6xl relative z-10">
        <header className="mb-20 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Featured <span className="text-primary">Projects</span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects && projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-[#111827] border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-500 cursor-pointer flex flex-col h-full shadow-2xl"
            >
              <div className="h-56 overflow-hidden relative">
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mt-3 line-clamp-2 italic">{project.shortDesc}</p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-medium text-gray-400 italic">
                      {techIcons[tag] && <span className="text-primary/70">{techIcons[tag]}</span>}
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-lg text-[10px] font-bold text-primary">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#0f172a] w-full max-w-5xl h-full max-h-[90vh] rounded-[2.5rem] shadow-[0_0_60px_rgba(0,0,0,1)] flex flex-col border border-white/10 overflow-hidden z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-none px-8 py-6 md:px-12 md:py-8 border-b border-white/5 flex justify-between items-center bg-[#0f172a]">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">{selectedProject.title}</h2>
                  <span className="text-primary font-bold text-[10px] uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {selectedProject.subtitle}
                  </span>
                </div>
                <button onClick={handleCloseModal} className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 bg-[#0f172a] custom-scrollbar-minimal">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProject.images.map((img, i) => (
                    <div key={i} className="relative group overflow-hidden rounded-3xl cursor-pointer">
                      <img
                        src={img}
                        className="w-full aspect-video object-cover border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                        alt="Detail"
                        onClick={() => setExpandedImage(img)}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <ZoomIn className="text-white/70" size={32} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
                  <div className="lg:col-span-2 space-y-6">
                    <h4 className="text-xl font-bold flex items-center gap-3 italic">
                      <span className="w-8 h-[2px] bg-primary" /> About Project
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg whitespace-pre-line">{selectedProject.longDesc}</p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-white/30 uppercase tracking-[0.2em]">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-gray-300 italic transition-colors hover:border-primary/30">
                          {techIcons[tag] && <span className="text-primary">{techIcons[tag]}</span>}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] p-8 md:p-10 rounded-[2.5rem] border border-white/5">
                  <h4 className="text-lg font-bold mb-8 flex items-center gap-3">
                    <Layers size={20} className="text-primary" /> Key Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.highlights.map((item, i) => (
                      <div key={i} className="p-5 bg-black/20 rounded-2xl border border-white/5 flex gap-3">
                        <span className="text-primary font-bold">/</span>
                        <p className="text-gray-300 text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] py-4 bg-primary text-white text-center rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={18} /> Live Website
                    </a>
                  )}

                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[200px] py-4 bg-white/5 border border-white/10 text-white/90 text-center rounded-2xl font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FaGithub size={18} /> View GitHub
                    </a>
                  )}

                  {selectedProject.links.frontend && (
                    <a href={selectedProject.links.frontend} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px] py-4 bg-white/5 border border-white/10 text-white/90 text-center rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                      <FaGithub size={18} /> Front-end Code
                    </a>
                  )}
                  {selectedProject.links.backend && (
                    <a href={selectedProject.links.backend} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-[200px] py-4 bg-white/5 border border-white/10 text-white/90 text-center rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                      <Database size={18} /> Back-end Code
                    </a>
                  )}

                  {selectedProject.links.download && (
                    <a
                      href={selectedProject.links.download}
                      download
                      className="flex-1 min-w-[200px] py-4 bg-white/5 border border-white/10 text-white/90 text-center rounded-2xl font-bold hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FileText size={18} /> Download Document
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImage(null)}
            className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-default"
          >
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-6 right-6 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-[20001]"
            >
              <X size={32} />
            </button>

            <motion.img
              src={expandedImage}
              alt="Zoomed project detail"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain border border-white/10 cursor-pointer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};