import React, { useState, useEffect } from "react";
import { profile } from "../../data/profile";
import { ArrowUpRight, Copy, Check } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [berlinTime, setBerlinTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      // Determine timezone abbreviation (CEST or CET)
      const timeZoneName = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin",
        timeZoneName: "short",
      })
        .formatToParts(now)
        .find((part) => part.type === "timeZoneName")?.value || "CEST";

      setBerlinTime(`${formatted} ${timeZoneName}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="section contact-editorial-section">
      <h2 className="section-title">Get in Touch</h2>

      <p className="contact-editorial-desc">
        Have a project in mind, an engineering opportunity, or want to discuss software and data systems? My inbox is always open.
      </p>

      {/* Main Interactive Email Row */}
      <div className="contact-email-hero-row">
        <a
          href={`mailto:${profile.email}`}
          className="contact-main-email-link"
          aria-label={`Send an email to ${profile.email}`}
        >
          <span className="contact-email-text">{profile.email}</span>
          <ArrowUpRight size={18} className="contact-email-arrow" aria-hidden="true" />
        </a>

        {/* Discreet Copy Button with Micro-Tooltip */}
        <div className="contact-copy-wrapper">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="contact-discreet-copy-btn"
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            {copied ? (
              <Check size={13} className="copy-icon-success" />
            ) : (
              <Copy size={13} className="copy-icon-idle" />
            )}
            <span className="copy-btn-label">{copied ? "Copied!" : "Copy"}</span>
          </button>

          {copied && (
            <span className="copy-micro-toast" role="status" aria-live="polite">
              Copied!
            </span>
          )}
        </div>
      </div>

      {/* Subtle Separation & Metadata Single Line */}
      <div className="contact-editorial-footer-row">
        <div className="contact-meta-location">
          <span className="active-status-pulse-dot" title="Available for opportunities" />
          <span className="location-clock-text">
            Berlin, Germany &middot; <span className="live-clock-digits">{berlinTime || "CEST"}</span>
          </span>
        </div>

        <div className="contact-plain-social-links">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="editorial-plain-link"
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={12} className="plain-arrow" />
          </a>

          <span className="social-sep">&middot;</span>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="editorial-plain-link"
          >
            <span>GitHub</span>
            <ArrowUpRight size={12} className="plain-arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};
