import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";
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
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent" />
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12 text-left">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full w-fit">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-gray-300">
                                    Available for new projects
                                </span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-tight">
                                Let's build <br />
                                <span className="text-primary italic font-light">together.</span>
                            </h2>
                        </div>

                        <div className="space-y-8 pt-8">
                            <div className="group">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-gray-500 font-bold mb-2">Location</p>
                                <p className="text-xl text-slate-800 dark:text-white font-medium">Helsinki, Finland</p>
                            </div>

                            <div className="group">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-gray-500 font-bold mb-2">Email</p>
                                <a href="mailto:castelloulises1420@gmail.com" className="text-xl text-slate-800 dark:text-white font-medium hover:text-primary transition-colors border-b border-slate-200 dark:border-white/10 hover:border-primary pb-1">
                                    castelloulises1420@gmail.com
                                </a>
                            </div>

                            <div className="flex gap-6 pt-4">
                                {[
                                    { icon: <FaLinkedin size={20} />, href: "https://linkedin.com/in/ulysse-castello" },
                                    { icon: <FaGithub size={20} />, href: "https://github.com/Ulx7" }
                                ].map((social, i) => (
                                    <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                                        className="p-3 bg-slate-100 dark:bg-white/5 rounded-full text-slate-600 dark:text-white hover:bg-primary hover:text-white dark:hover:bg-primary/20 dark:hover:text-primary transition-all border border-slate-200 dark:border-white/5"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-20 dark:opacity-40" />

                        <div className="relative bg-white/70 dark:bg-[#0f172a]/50 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-none">
                            <h3 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Send a message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-gray-500 ml-1">Name</label>
                                        <input type="text" name="name" required
                                            className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                                            placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-gray-500 ml-1">Email</label>
                                        <input type="email" name="email" required
                                            className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                                            placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest font-black text-slate-400 dark:text-gray-500 ml-1">Message</label>
                                    <textarea name="message" rows="4" required
                                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-slate-400 dark:placeholder:text-gray-700"
                                        placeholder="Tell me about your project..." />
                                </div>

                                <button type="submit" disabled={isSubmitting}
                                    className={cn(
                                        "w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all",
                                        status === "success" ? "bg-green-600 text-white" : "bg-primary text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25",
                                        isSubmitting && "opacity-70 cursor-not-allowed"
                                    )}
                                >
                                    {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : status === "success" ? <CheckCircle size={16} /> : <Send size={16} />}
                                    {isSubmitting ? "Sending..." : status === "success" ? "Sent!" : "Start Conversation"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};