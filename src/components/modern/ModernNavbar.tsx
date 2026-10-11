import React, { useState, useEffect } from "react";
import { profile } from "../../data/profile";
import { useThemeMode } from "../../context/ThemeModeContext";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/SocialIcons";

export const ModernNavbar: React.FC = () => {
  const { toggleMode } = useThemeMode();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "projects", "skills", "contact"];
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i] === "hero" ? "home" : sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-nav-fixed" role="banner">
      <div className="nav-container">
        <nav className="nav-links-left" aria-label="Primary navigation">
          <a
            className={`nav-item ${activeSection === "home" ? "active" : ""}`}
            href="#hero"
          >
            home
          </a>
          <a
            className={`nav-item ${activeSection === "about" ? "active" : ""}`}
            href="#about"
          >
            about
          </a>
          <a
            className={`nav-item ${activeSection === "projects" ? "active" : ""}`}
            href="#projects"
          >
            projects
          </a>
          <a
            className={`nav-item ${activeSection === "skills" ? "active" : ""}`}
            href="#skills"
          >
            skills
          </a>
          <a
            className={`nav-item ${activeSection === "contact" ? "active" : ""}`}
            href="#contact"
          >
            contact
          </a>
        </nav>

        <div className="nav-icons-right">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            title="GitHub"
            className="nav-icon-link"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
            className="nav-icon-link"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Send email to ${profile.email}`}
            title="Email"
            className="nav-icon-link"
          >
            <Mail size={18} strokeWidth={1.5} />
          </a>

          {/* Minimalist fine-line 4-quadrant Windows icon button (18px) */}
          <button
            type="button"
            onClick={toggleMode}
            className="nav-windows-btn"
            aria-label="Switch to Windows XP Mode"
            title="Switch to Windows XP Mode"
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="windows-svg"
            >
              <rect x="3.5" y="3.5" width="7" height="7" rx="0.5" />
              <rect x="13.5" y="3.5" width="7" height="7" rx="0.5" />
              <rect x="3.5" y="13.5" width="7" height="7" rx="0.5" />
              <rect x="13.5" y="13.5" width="7" height="7" rx="0.5" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
