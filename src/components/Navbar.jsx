import { cn } from "../lib/utils";
import { X, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloqueo de scroll profesional
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed w-full top-0 left-0 transition-all duration-500 ease-in-out z-[999]", // Z-index muy alto
        isScrolled 
          ? "py-3 bg-background/80 backdrop-blur-lg border-b border-white/5 shadow-xl" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="text-xl font-bold text-primary flex items-center group">
          <span className="relative z-10">
            <span className="text-glow text-foreground group-hover:text-primary transition-colors"> Ulysse </span>
            Portfolio
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <div className="pl-4 border-l border-white/10">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle - Z-index por encima del overlay */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-[1001] relative"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav Overlay - Fondo 100% Sólido */}
        <div
          className={cn(
            "fixed inset-0 min-h-screen w-full bg-background z-[1000] flex flex-col items-center justify-center transition-all duration-500 ease-in-out",
            isMenuOpen 
              ? "opacity-100 pointer-events-auto" 
              : "opacity-0 pointer-events-none"
          )}
        >
          {/* Refuerzo de opacidad para eliminar el "ruido" del fondo */}
          <div className="absolute inset-0 bg-background" />

          {/* Menu Items */}
          <div className="relative z-10 flex flex-col space-y-8 text-center items-center">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-4xl font-bold text-foreground hover:text-primary transition-all duration-300 active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Theme Toggle - Fijo abajo */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};