import React, { useState, useEffect } from "react";
import { profile } from "../../data/profile";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { useThemeMode } from "../../context/ThemeModeContext";
import { RetroMobileWarningModal } from "./RetroMobileWarningModal";

export const ContactSection: React.FC = () => {
  const { toggleMode, isEmbedded } = useThemeMode();
  const [copied, setCopied] = useState<boolean>(false);
  const [berlinTime, setBerlinTime] = useState<string>("");
  const [showRetroWarning, setShowRetroWarning] = useState<boolean>(false);

  const handleRetroClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setShowRetroWarning(true);
    } else {
      toggleMode();
    }
  };

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

      <h3 className="contact-editorial-cta">
        Have an idea in mind? Let&apos;s connect.
      </h3>

      <p className="contact-editorial-desc">
        I enjoy turning ideas into working software and solving practical problems. If you have an opportunity or a project you&apos;d like to discuss, feel free to drop a line.
      </p>

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

      <div className="contact-editorial-footer-row">
        <div className="contact-meta-location">
          <span className="contact-status-dot" aria-hidden="true" />
          <span className="location-clock-text">
            Available for roles &amp; projects &middot; Berlin &middot;{" "}
            <span className="live-clock-digits">{berlinTime || "CEST"}</span>
          </span>
        </div>

        {!isEmbedded && (
          <button
            type="button"
            onClick={handleRetroClick}
            className="footer-retro-link"
            aria-label="Experience Windows XP Mode"
          >
            <span className="footer-retro-hint">Feeling nostalgic?</span>
            <span className="footer-colophon-sep">&middot;</span>
            <span className="footer-retro-text">Windows XP Mode</span>
            <ArrowUpRight size={13} className="footer-retro-arrow" aria-hidden="true" />
          </button>
        )}
      </div>

      <RetroMobileWarningModal
        isOpen={showRetroWarning}
        onClose={() => setShowRetroWarning(false)}
      />
    </section>
  );
};
