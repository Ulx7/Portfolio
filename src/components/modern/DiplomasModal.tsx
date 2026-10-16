import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export type DiplomaTabId = "it-analyst" | "systems-analyst" | "web-dev";

interface DiplomaItem {
  id: DiplomaTabId;
  label: string;
  imageSrc: string;
}

const diplomaList: DiplomaItem[] = [
  {
    id: "it-analyst",
    label: "IT Analyst",
    imageSrc: "/diplomas/it-analyst.png",
  },
  {
    id: "systems-analyst",
    label: "Systems Analyst",
    imageSrc: "/diplomas/systems-analyst.png",
  },
  {
    id: "web-dev",
    label: "Web Developer",
    imageSrc: "/diplomas/web-developer.png",
  },
];

interface DiplomasModalProps {
  onClose: () => void;
  initialTab?: DiplomaTabId;
}

export const DiplomasModal: React.FC<DiplomasModalProps> = ({ onClose, initialTab }) => {
  const [activeTab, setActiveTab] = useState<DiplomaTabId>(initialTab || "it-analyst");

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

  const activeDiploma = diplomaList.find((d) => d.id === activeTab) || diplomaList[0];
  const displaySrc = activeDiploma.imageSrc;

  return createPortal(
    <div
      className="diploma-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Official University Diplomas Viewer"
    >
      <div className="diploma-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="diploma-lightbox-header">
          <div className="diploma-text-tabs" role="tablist">
            {diplomaList.map((item) => (
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
            aria-label="Close diplomas viewer"
            title="Close (Esc)"
          >
            <X size={20} strokeWidth={1.5} className="close-x-svg" />
          </button>
        </div>

        <div className="diploma-lightbox-content">
          <div className="diploma-image-container">
            <img
              src={displaySrc}
              alt={`${activeDiploma.label} - Official University Diploma`}
              className="diploma-fullscreen-image"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
