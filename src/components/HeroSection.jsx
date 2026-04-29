import { ArrowDown, FileDown } from "lucide-react"

export const HeroSection = () => {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        >
            {/* 1. Máscara de fondo: Esto hace que el texto sea LEGIBLE sobre las estrellas */}
            <div className="absolute inset-0 bg-radial-gradient from-background/20 via-background/60 to-background z-0" />

            <div className="container relative mx-auto text-center z-10">
                <div className="space-y-10 md:space-y-14">

                    {/* TÍTULO: Usamos un leading más ajustado y pesos diferenciados */}
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1]">
                        <span className="opacity-0 animate-fade-in block text-foreground/70 dark:text-white/90 text-4xl md:text-6xl font-medium mb-2">
                            Hi, I'm
                        </span>
                        <span className="text-primary opacity-0 animate-fade-in-delay-1 inline-block drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                            Ulysse
                        </span>
                        <span className="ml-3 opacity-0 animate-fade-in-delay-2 inline-block text-foreground dark:text-white">
                            Castello
                        </span>
                    </h1>

                    {/* PÁRRAFO: Reducimos un poco el ancho para que no sea tan largo y sea más elegante */}
                    <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-delay-3 leading-relaxed font-light">
                        Building the future, one project at a time. I navigate between <span className="text-foreground/80 dark:text-white/80 font-medium">logic and data</span> to bring digital ideas to life.
                    </p>

                    {/* BOTONES: Añadimos un poco más de personalidad */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 opacity-0 animate-fade-in-delay-4">
                        <a href="#projects" className="cosmic-button w-full sm:w-auto shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                            View My Work
                        </a>

                        <a
                            href="/tu-cv.pdf"
                            download
                            className="group flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-gray-200/10 bg-white/0 dark:bg-white/[0.03] hover:dark:bg-white/[0.08] hover:dark:border-white/20 transition-all duration-300 w-full sm:w-auto text-foreground dark:text-white/90 font-medium"
                        >
                            <FileDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
                            Download CV
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Lo hacemos un poco más discreto */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40">
                <span className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Scroll</span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </div>
        </section>
    )
}