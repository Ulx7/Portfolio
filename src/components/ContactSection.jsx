import { useState } from "react";
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle } from "lucide-react";
import { cn } from "../lib/utils";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.target);
        formData.append("access_key", import.meta.env.PUBLIC_WEB3FORMS_KEY);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                setStatus("success");
                e.target.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatus(null), 5000);
        }
    };

    return (
        <section id="contact" className="py-32 px-4 relative bg-transparent overflow-hidden">
            {/* Decoración de fondo sutil */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* COLUMNA IZQUIERDA: Inspirada en tu referencia "Studio" */}
                    <div className="space-y-12 text-left">
                        <div className="space-y-6">
                            {/* Badge de Disponibilidad */}
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
                                    Available for new projects
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black text-foreground dark:text-white leading-tight">
                                Let's build <br />
                                <span className="text-primary italic font-light">together.</span>
                            </h2>
                        </div>

                        {/* Info de contacto minimalista */}
                        <div className="space-y-8 pt-8">
                            <div className="group transition-all">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-2">Location</p>
                                <p className="text-xl text-foreground dark:text-white font-medium">Helsinki, Finland</p>
                            </div>

                            <div className="group transition-all">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-2">Email</p>
                                <a href="mailto:castelloulises1420@gmail.com" className="text-xl text-foreground dark:text-white font-medium hover:text-primary transition-colors border-b border-white/10 hover:border-primary pb-1">
                                    castelloulises1420@gmail.com
                                </a>
                            </div>

                            {/* Redes Sociales */}
                            <div className="flex gap-6 pt-4">
                                <a
                                    href="https://linkedin.com/in/ulysse-castello"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/5 dark:bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all border border-white/5"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                                <a
                                    href="https://github.com/Ulx7"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-all border border-white/5"
                                >
                                    <FaGithub size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Formulario Moderno "Glass" */}
                    <div className="relative">
                        {/* Brillo de fondo para el formulario */}
                        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-20" />

                        <div className="relative bg-[#0f172a]/50 dark:bg-[#0f172a]/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <h3 className="text-2xl font-bold mb-8 text-foreground dark:text-white">Send a message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Name</label>
                                        <input type="text" name="name" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-black/40 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-700" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Email</label>
                                        <input type="email" name="email" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-black/40 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-700" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-gray-500 ml-1">Message</label>
                                    <textarea name="message" rows="4" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-black/40 text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder:text-gray-700" placeholder="Tell me about your project..." />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                                        status === "success" ? "bg-green-600 text-white" : "bg-primary text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]",
                                        isSubmitting && "opacity-70 cursor-not-allowed"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>Sending... <Loader2 className="animate-spin" size={16} /></>
                                    ) : status === "success" ? (
                                        <>Message Sent! <CheckCircle size={16} /></>
                                    ) : (
                                        <>Start Conversation <Send size={16} /></>
                                    )}
                                </button>

                                {status === "error" && (
                                    <p className="text-red-400 text-[10px] text-center font-bold uppercase tracking-tighter">Something went wrong. Please try again.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};