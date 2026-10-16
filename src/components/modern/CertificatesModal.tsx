import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Clock } from "lucide-react";

export type LanguageTabId = "english" | "german";

interface CertificateItem {
  id: LanguageTabId;
  label: string;
  imageSrc?: string;
  isPending?: boolean;
  statusNote?: string;
}

const certificateList: CertificateItem[] = [
  {
    id: "english",
    label: "English",
    imageSrc: "/diplomas/english.png",
  },
  {
    id: "german",
    label: "German",
    isPending: true,
    statusNote: "Elementary proficiency. Official documentation in progress.",
  },
];

interface CertificatesModalProps {
  onClose: () => void;
  initialTab?: LanguageTabId;
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({ onClose, initialTab }) => {
  const [activeTab, setActiveTab] = useState<LanguageTabId>(initialTab || "english");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const activeCert = certificateList.find((c) => c.id === activeTab) || certificateList[0];
  const displaySrc = activeCert.imageSrc;

  return createPortal(
    <div
      className="diploma-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Language Certifications Viewer"
    >
      <div className="diploma-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="diploma-lightbox-header">
          <div className="diploma-text-tabs" role="tablist">
            {certificateList.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
                className={`diploma-text-tab ${activeTab === item.id ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="diploma-lightbox-close"
            aria-label="Close certificate viewer"
            title="Close (Esc)"
          >
            <X size={20} strokeWidth={1.5} className="close-x-svg" />
          </button>
        </div>

        <div className="diploma-lightbox-content">
          {activeCert.isPending ? (
            <div className="cert-pending-state">
              <div className="cert-pending-icon-wrapper">
                <Clock size={28} strokeWidth={1.6} className="cert-pending-icon" />
              </div>
              <h3 className="cert-pending-title">German Language Certification</h3>
              <p className="cert-pending-desc">
                Current level: <strong>Elementary proficiency</strong>. Official certificate has not been uploaded yet and will be added upon completion.
              </p>
            </div>
          ) : (
            <div className="diploma-image-container">
              <img
                src={displaySrc}
                alt={`${activeCert.label} Certificate`}
                className="diploma-fullscreen-image"
              />
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
