import { Code2, ShieldCheck, Cpu, FileDown, Mail, GraduationCap } from "lucide-react"

export const AboutSection = () => {
    return (
        <section id="about" className="py-32 md:py-48 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col items-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground dark:text-white">
                        About <span className="text-primary">Me</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-primary rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    
                    {/* COLUMNA IZQUIERDA: BIOGRAFÍA */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground/90 dark:text-white/90 leading-tight">
                                Software Developer & <br />
                                <span className="text-primary italic font-medium">Data Analyst</span>
                            </h3>
                            
                            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    I'm a tech enthusiast with a strong passion for developing 
                                    <span className="text-foreground font-medium dark:text-white"> efficient and scalable solutions</span>. 
                                    I'm currently focused on merging logic with data-driven insights.
                                </p>
                                <p className="italic border-l-2 border-primary/40 pl-6 py-2 bg-white/[0.02] dark:bg-white/[0.02]">
                                    "What motivates me most is the opportunity to work on projects that address 
                                    real-world issues while pushing the boundaries of innovation."
                                </p>
                            </div>
                        </div>

                        {/* Botones con más espacio */}
                        <div className="flex flex-wrap gap-5 pt-4">
                            <a href="#contact" className="cosmic-button flex items-center gap-2">
                                <Mail size={18} />
                                Get In Touch
                            </a>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: CERTIFICACIONES */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8">
                            <GraduationCap className="text-primary" size={28} />
                            <h3 className="text-xl font-bold tracking-wider uppercase text-foreground/70 dark:text-white/70">
                                Certifications
                            </h3>
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                { icon: <ShieldCheck />, title: "IT Analyst", school: "Universidad ORT Uruguay" },
                                { icon: <Cpu />, title: "Systems Analyst", school: "Universidad ORT Uruguay" },
                                { icon: <Code2 />, title: "Web Development", school: "Universidad ORT Uruguay" }
                            ].map((cert, index) => (
                                <div 
                                    key={index}
                                    className="group relative flex items-center gap-5 p-5 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] border border-white/5 dark:border-white/5 hover:border-primary/40 transition-all duration-500 backdrop-blur-md"
                                >
                                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                                        {cert.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground dark:text-white group-hover:text-primary transition-colors">{cert.title}</h4>
                                        <p className="text-sm text-muted-foreground">{cert.school}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}