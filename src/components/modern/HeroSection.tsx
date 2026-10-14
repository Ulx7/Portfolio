import React from "react";
import { profile } from "../../data/profile";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <h1 className="hero-name">{profile.name}</h1>
      <p className="hero-sub">Software Developer • Backend Systems • Data Pipelines</p>

      <p className="hero-bio">
        Software developer with a strong foundation in backend architecture, data pipelines, and scalable software systems. Experienced in building robust solutions with Java (Spring Boot), C# (.NET), Python, and SQL, with the versatility to work across the full stack. Driven by solving logical problems, automating workflows, and writing clean, reliable code from the ground up.
      </p>

      <div className="hero-actions">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          download="Ulysse_Castello_Resume.pdf"
          className="hero-link"
        >
          <span className="link-label">Resume</span>
          <span className="link-arrow">↓</span>
        </a>

        <a href="#contact" className="hero-link">
          <span className="link-label">Get in touch</span>
          <span className="link-touch">✉</span>
        </a>
      </div>
    </section>
  );
};
