import React, { useState, useEffect, useRef } from "react";
import { profile } from "../../data/profile";
import { useThemeMode } from "../../context/ThemeModeContext";
import { Mail, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../common/SocialIcons";

export const ModernNavbar: React.FC = () => {
  const { toggleMode, isEmbedded } = useThemeMode();
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSectionRef = useRef("home");
  const isManualScrollRef = useRef(false);
  const manualScrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const sectionList = [
      { id: "hero", nav: "home" },
      { id: "about", nav: "about" },
      { id: "projects", nav: "projects" },
      { id: "skills", nav: "skills" },
      { id: "contact", nav: "contact" },
    ];

    let rafId: number | null = null;

    const calculateActiveSection = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollY >= scrollHeight - 50) {
        if (activeSectionRef.current !== "contact") {
          activeSectionRef.current = "contact";
          setActiveSection("contact");
        }
        return;
      }

      const scrollThreshold = scrollY + 120;
      let targetNav = "home";

      for (const section of sectionList) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollThreshold >= top) {
            targetNav = section.nav;
          }
        }
      }

      if (activeSectionRef.current !== targetNav) {
        activeSectionRef.current = targetNav;
        setActiveSection(targetNav);
      }
    };

    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        calculateActiveSection();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    calculateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      if (manualScrollTimerRef.current) {
        clearTimeout(manualScrollTimerRef.current);
      }
    };
  }, []);

  const handleNavClick = (navItem: string) => {
    activeSectionRef.current = navItem;
    setActiveSection(navItem);
    isManualScrollRef.current = true;
    if (manualScrollTimerRef.current) {
      clearTimeout(manualScrollTimerRef.current);
    }
    manualScrollTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 700);
  };

  return (
    <header className="site-nav-fixed" role="banner">
      <div className="nav-container">
        <a
          href="#hero"
          className="nav-mobile-brand"
          onClick={() => {
            handleNavClick("home");
            setMobileMenuOpen(false);
          }}
        >
          {profile.name}
        </a>

        <nav className="nav-links-left" aria-label="Primary navigation">
          <a
            className={`nav-item ${activeSection === "home" ? "active" : ""}`}
            href="#hero"
            onClick={() => handleNavClick("home")}
          >
            home
          </a>
          <a
            className={`nav-item ${activeSection === "about" ? "active" : ""}`}
            href="#about"
            onClick={() => handleNavClick("about")}
          >
            about
          </a>
          <a
            className={`nav-item ${activeSection === "projects" ? "active" : ""}`}
            href="#projects"
            onClick={() => handleNavClick("projects")}
          >
            projects
          </a>
          <a
            className={`nav-item ${activeSection === "skills" ? "active" : ""}`}
            href="#skills"
            onClick={() => handleNavClick("skills")}
          >
            skills
          </a>
          <a
            className={`nav-item ${activeSection === "contact" ? "active" : ""}`}
            href="#contact"
            onClick={() => handleNavClick("contact")}
          >
            contact
          </a>
        </nav>

        <div className="nav-right-cluster">
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
          </div>

          {!isEmbedded && (
            <div className="nav-xp-btn-wrapper">
              <button
                type="button"
                onClick={toggleMode}
                className="nav-windows-btn xp-mode-trigger"
                aria-label="Travel back in time · Windows XP Mode"
              >
                <svg
                  width={19}
                  height={19}
                  viewBox="0 0 24 24"
                  fill="none"
                  className="xp-flag-svg"
                  aria-hidden="true"
                >
                  <path
                    d="M 3 5.2 C 5.8 4.2, 8.4 5.9, 11 4.8 L 11 11.3 C 8.4 12.4, 5.8 10.7, 3 11.7 Z"
                    fill="#F25022"
                  />
                  <path
                    d="M 12.6 4.5 C 15.2 3.4, 18.4 5.2, 21 4.2 L 21 10.7 C 18.4 11.7, 15.2 9.9, 12.6 11.0 Z"
                    fill="#7FBA00"
                  />
                  <path
                    d="M 3 12.7 C 5.8 11.7, 8.4 13.4, 11 12.3 L 11 18.8 C 8.4 19.9, 5.8 18.2, 3 19.2 Z"
                    fill="#00A4EF"
                  />
                  <path
                    d="M 12.6 12.0 C 15.2 10.9, 18.4 12.7, 21 11.7 L 21 18.2 C 18.4 19.2, 15.2 17.4, 12.6 18.5 Z"
                    fill="#FFB900"
                  />
                </svg>
              </button>

              <div className="xp-tooltip" role="tooltip">
                <span className="xp-tooltip-text">Travel back in time &middot; Windows XP Mode</span>
              </div>
            </div>
          )}

          <button
            type="button"
            className="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile-dropdown">
          <nav className="nav-mobile-links" aria-label="Mobile navigation links">
            <a
              className={`nav-mobile-item ${activeSection === "home" ? "active" : ""}`}
              href="#hero"
              onClick={() => {
                handleNavClick("home");
                setMobileMenuOpen(false);
              }}
            >
              <span>home</span>
              {activeSection === "home" && <span className="nav-mobile-active-dot" />}
            </a>
            <a
              className={`nav-mobile-item ${activeSection === "about" ? "active" : ""}`}
              href="#about"
              onClick={() => {
                handleNavClick("about");
                setMobileMenuOpen(false);
              }}
            >
              <span>about</span>
              {activeSection === "about" && <span className="nav-mobile-active-dot" />}
            </a>
            <a
              className={`nav-mobile-item ${activeSection === "projects" ? "active" : ""}`}
              href="#projects"
              onClick={() => {
                handleNavClick("projects");
                setMobileMenuOpen(false);
              }}
            >
              <span>projects</span>
              {activeSection === "projects" && <span className="nav-mobile-active-dot" />}
            </a>
            <a
              className={`nav-mobile-item ${activeSection === "skills" ? "active" : ""}`}
              href="#skills"
              onClick={() => {
                handleNavClick("skills");
                setMobileMenuOpen(false);
              }}
            >
              <span>skills</span>
              {activeSection === "skills" && <span className="nav-mobile-active-dot" />}
            </a>
            <a
              className={`nav-mobile-item ${activeSection === "contact" ? "active" : ""}`}
              href="#contact"
              onClick={() => {
                handleNavClick("contact");
                setMobileMenuOpen(false);
              }}
            >
              <span>contact</span>
              {activeSection === "contact" && <span className="nav-mobile-active-dot" />}
            </a>
          </nav>

          <div className="nav-mobile-socials">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="nav-mobile-social-link"
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="nav-mobile-social-link"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label={`Send email to ${profile.email}`}
              className="nav-mobile-social-link"
            >
              <Mail size={18} strokeWidth={1.5} />
              <span>Email</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
