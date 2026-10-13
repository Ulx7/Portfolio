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

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    navigator.clipboard.writeText("castelloulises1420@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="section contact-editorial-section">
      <h2 className="section-title">Get in Touch</h2>

      {/* Llamado a la acción editorial destacado */}
      <h3 className="contact-editorial-cta">
        Let&apos;s build something exceptional together
      </h3>

      {/* Párrafo de apoyo */}
      <p className="contact-editorial-desc">
        Have an engineering opportunity, a data challenge, or want to discuss systems architecture? Feel free to reach out directly.
      </p>

      {/* Tarjeta interactiva de correo: Franja sutil y elegante */}
      <div className="contact-email-bar">
        <a
          href={`mailto:${profile.email}`}
          className="contact-bar-email-link"
          aria-label={`Send email to ${profile.email}`}
        >
          <span className="contact-bar-email-text">{profile.email}</span>
          <ArrowUpRight size={17} className="contact-bar-email-arrow" aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={handleCopyEmail}
          className={`contact-bar-copy-btn ${copied ? "copied" : ""}`}
          title="Copy email to clipboard"
          aria-label="Copy email address to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} className="copy-icon-success" />
              <span>Copied! ✓</span>
            </>
          ) : (
            <>
              <Copy size={13} className="copy-icon-idle" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Pie de página: Footer integrado con línea horizontal */}
      <div className="contact-editorial-footer-row">
        <div className="contact-meta-location">
          <span className="contact-status-dot" aria-hidden="true" />
          <span className="location-clock-text">
            Available for new challenges &amp; projects &middot; Berlin, Germany &middot;{" "}
            <span className="live-clock-digits">{berlinTime || "CEST"}</span>
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
