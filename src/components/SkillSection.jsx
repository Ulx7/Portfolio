import {
    SiAstro, SiTailwindcss, SiPython, SiSpringboot, SiDotnet,
    SiJavascript, SiNextdotjs, SiHtml5, SiNodedotjs, SiMysql,
    SiMongodb, SiDocker, SiGit, SiApachespark, SiPandas
} from 'react-icons/si';
import { DiMsqlServer, DiJava } from 'react-icons/di';
import { FaReact, FaAws } from 'react-icons/fa';
import { Layers, Brain } from 'lucide-react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbBrandCSharp } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import { cn } from '../lib/utils';

const skills = [
    { name: "Java", category: "languages", icon: <DiJava size={32} /> },
    { name: "React", category: "frontend", icon: <FaReact size={32} /> },
    { name: "Astro", category: "frontend", icon: <SiAstro size={32} /> },
    { name: "Next.js", category: "frontend", icon: <SiNextdotjs size={32} /> },
    { name: "Azure", category: "tools", icon: <VscAzure size={32} /> },
    { name: "Python", category: "languages", icon: <SiPython size={32} /> },
    { name: "JavaScript", category: "languages", icon: <SiJavascript size={32} /> },
    { name: "AWS", category: "tools", icon: <FaAws size={32} /> },
    { name: "Tailwind CSS", category: "frontend", icon: <SiTailwindcss size={32} /> },
    { name: "C#", category: "languages", icon: <TbBrandCSharp size={36} /> },
    { name: "HTML/CSS", category: "frontend", icon: <SiHtml5 size={32} /> },
    { name: "Spring Boot", category: "backend", icon: <SiSpringboot size={32} /> },
    { name: "Node.js", category: "backend", icon: <SiNodedotjs size={32} /> },
    { name: ".NET", category: "backend", icon: <SiDotnet size={32} /> },
    { name: "RESTful APIs", category: "backend", icon: <Layers size={32} /> },
    { name: "MySQL", category: "database", icon: <SiMysql size={32} /> },
    { name: "SQL Server", category: "database", icon: <DiMsqlServer size={32} /> },
    { name: "MongoDB", category: "database", icon: <SiMongodb size={32} /> },
    { name: "PySpark", category: "data", icon: <SiApachespark size={32} /> },
    { name: "Pandas", category: "data", icon: <SiPandas size={32} /> },
    { name: "Big Data", category: "data", icon: <Brain size={32} /> },
    { name: "Docker", category: "tools", icon: <SiDocker size={32} /> },
    { name: "Git", category: "tools", icon: <SiGit size={32} /> }
];

const categories = ["all", "languages", "frontend", "backend", "database", "data", "tools"];

export const SkillSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const filteredSkills = skills.filter(s => activeCategory === "all" || s.category === activeCategory);

    return (
        <section id="skills" className="py-32 relative bg-transparent overflow-visible">
            <div className="container mx-auto max-w-5xl px-4 relative z-10">
                <div className="text-center mb-20"> 
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 italic tracking-tight">
                        Technical <span className="text-primary">Stack</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-primary mx-auto rounded-full opacity-80" />
                </div>

                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "relative px-7 py-3 rounded-full transition-all duration-300 capitalize text-sm font-medium tracking-wide",
                                activeCategory === cat ? "text-white" : "text-white/50 hover:text-white"
                            )}
                        >
                            <span className="relative z-10">{cat === "all" ? "All" : cat}</span>
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activePill"
                                    className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-full shadow-[0_0_25px_rgba(139,92,246,0.2)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="min-h-[500px] flex justify-center py-10">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-4xl mx-auto"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredSkills.map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        type: "tween",
                                        ease: "easeOut",
                                        duration: 0.35
                                    }}
                                    className="group w-full aspect-square"
                                >
                                    <div className="relative h-full w-full p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md flex flex-col items-center justify-center gap-5 transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.06] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] overflow-hidden">

                                        <div className="text-white/30 group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110 flex items-center justify-center">
                                            {React.cloneElement(skill.icon, { size: 36 })}
                                        </div>

                                        <h3 className="font-bold text-xs tracking-[0.25em] uppercase text-white/60 group-hover:text-white transition-colors">
                                            {skill.name}
                                        </h3>

                                        <div className="absolute inset-0 bg-radial-gradient from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};