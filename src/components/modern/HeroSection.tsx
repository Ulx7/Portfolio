import React from "react";
import { profile } from "../../data/profile";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <h1 className="hero-name">{profile.name}</h1>
      <p className="hero-sub">software engineer &bull; systems analyst &bull; data pipelines</p>

      <p className="hero-bio">
        Software developer and data analyst building resilient distributed platforms, enterprise systems, and modern web applications. Focused on turning complex data and backend logic into intuitive digital tools.
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
