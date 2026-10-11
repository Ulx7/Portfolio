import React from "react";
import { profile } from "../../data/profile";

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero">
      <h1 className="hero-name">{profile.name}</h1>
      <p className="hero-sub">developer • analyst • problem solver</p>

      <p className="hero-bio">
        Software developer and data analyst building resilient distributed platforms, enterprise systems, and modern web applications. Focused on turning complex data and backend logic into intuitive digital tools.
      </p>

      <div className="hero-actions">
        <a
          href={`mailto:${profile.email}?subject=CV%20Request%20-%20Ulysse%20Castello`}
          className="hero-link"
        >
          <span className="link-icon link-code">&lt;&gt;</span>
          <span className="link-label">Resume</span>
          <span className="link-arrow">↗</span>
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hero-link"
        >
          <span className="link-icon link-bullet">●</span>
          <span className="link-label">LinkedIn</span>
        </a>

        <a href="#contact" className="hero-link">
          <span className="link-icon link-touch">✉</span>
          <span className="link-label">Get in touch</span>
        </a>
      </div>
    </section>
  );
};
