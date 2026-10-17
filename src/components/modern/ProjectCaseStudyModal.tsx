import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  type Project,
  type FeatureItem,
  type ProjectLink,
} from "../../data/projects";
import { X } from "lucide-react";

interface ProjectCaseStudyModalProps {
  project: Project;
  onClose: () => void;
  onSelectProject?: (p: Project) => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  // Reset selected image when project changes
  useEffect(() => {
    setActiveImageIdx(0);
  }, [project.id]);

  // Prevent background scroll and bind Escape key to close modal
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

  const projectImages =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];
  const currentImage = projectImages[activeImageIdx] || project.image;

  const handlePrev = () => {
    setActiveImageIdx((prev) => (prev > 0 ? prev - 1 : projectImages.length - 1));
  };

  const handleNext = () => {
    setActiveImageIdx((prev) => (prev < projectImages.length - 1 ? prev + 1 : 0));
  };

  const categoryKicker =
    project.categoryKicker ||
    project.category ||
    (project.tag === "Academic"
      ? "ACADEMIC · UNIVERSIDAD ORT URUGUAY"
      : project.tag === "Client"
        ? "COMMERCIAL CLIENT WORK"
        : "PERSONAL · IN DEVELOPMENT");

  const contextObjective =
    project.contextObjective ||
    project.fullDescription ||
    project.shortDescription;

  const keyFeatures: (string | FeatureItem)[] =
    project.keyFeatures && project.keyFeatures.length > 0
      ? project.keyFeatures
      : [];

  const projectLinks: ProjectLink[] =
    project.links && project.links.length > 0
      ? project.links
      : (() => {
        const links: ProjectLink[] = [];
        if (project.liveUrl) {
          links.push({ label: "Live Demo", url: project.liveUrl, type: "external" });
        }
        if (project.frontendUrl) {
          links.push({ label: "Front-end Code", url: project.frontendUrl, type: "external" });
        }
        if (project.backendUrl) {
          links.push({ label: "Back-end Code", url: project.backendUrl, type: "external" });
        }
        if (project.documentUrl) {
          links.push({
            label: "Download Document",
            url: project.documentUrl,
            type: "download",
            downloadFilename: project.id === "football-bigdata"
              ? "Ulysse_Castello_BigData_Football_Analytics.pdf"
              : project.id === "real-estate-system"
                ? "Ulysse_Castello_RealEstate_Management_System.pdf"
                : undefined
          });
        }
        if (project.githubUrl && !project.frontendUrl) {
          links.push({ label: "Source Code", url: project.githubUrl, type: "external" });
        }
        return links;
      })();

  return createPortal(
    <div
      className="sop-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sop-modal-title"
    >
      <div
        className="sop-modal-container sop-modal-single-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="sop-modal-close-btn"
          aria-label="Close project modal"
          title="Close (Esc)"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        <div className="sop-modal-scroll">
          <div className="sop-header-section">
            <span className="sop-kicker">{categoryKicker}</span>

            <h2 id="sop-modal-title" className="sop-title">
              {project.title}
            </h2>

            {projectLinks.length > 0 && (
              <div className="sop-quick-links-bar">
                {projectLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    download={link.type === "download" ? (link.downloadFilename || true) : undefined}
                    className={`sop-quick-link ${link.type === "download"
                        ? "sop-link-doc"
                        : link.label === "Live Demo"
                          ? "sop-link-accent"
                          : ""
                      }`}
                  >
                    <span>{link.label}</span>
                    <span className="sop-quick-arrow" aria-hidden="true">
                      {link.type === "download" ? "↓" : "↗"}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {currentImage && (
            <div className="sop-carousel-frame">
              <div className="sop-carousel-screen">
                <img
                  src={currentImage}
                  alt={`${project.title} visual preview`}
                  className="sop-carousel-img"
                  loading="lazy"
                />
              </div>

              <div className="sop-carousel-bar">
                <div className="sop-bar-left">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={projectImages.length <= 1}
                    className="sop-arrow-btn"
                    aria-label="Previous slide"
                  >
                    ←
                  </button>
                  <div className="sop-dots-track" aria-hidden="true">
                    {projectImages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveImageIdx(idx)}
                        className={`sop-dot-btn ${activeImageIdx === idx ? "active" : ""}`}
                        aria-label={`Jump to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="sop-carousel-tech-center font-mono">
                    {project.technologies.map((tech, idx) => (
                      <span key={tech} className="sop-carousel-tech-item">
                        {idx > 0 && (
                          <span className="sop-carousel-tech-sep" aria-hidden="true">
                            /
                          </span>
                        )}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="sop-bar-right">
                  <span className="sop-counter font-mono">
                    {activeImageIdx + 1} / {projectImages.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={projectImages.length <= 1}
                    className="sop-arrow-btn"
                    aria-label="Next slide"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="sop-content-flow">
            <div className="sop-flow-section">
              <div className="sop-section-header">
                <span className="sop-section-kicker">CONTEXT &amp; OBJECTIVE</span>
              </div>
              <p className="sop-editorial-text">{contextObjective}</p>
            </div>

            {keyFeatures.length > 0 && (
              <div className="sop-flow-section">
                <div className="sop-section-header">
                  <span className="sop-section-kicker">KEY FEATURES</span>
                </div>
                <div className="sop-features-grid grid grid-cols-1 md:grid-cols-2 gap-3.5 my-6">
                  {keyFeatures.map((feat: string | FeatureItem, idx: number) => {
                    const isObject = typeof feat === "object";
                    const hasColon = typeof feat === "string" && feat.includes(": ");
                    const title = isObject
                      ? feat.title
                      : hasColon
                        ? feat.split(": ")[0]
                        : feat;
                    const desc = isObject
                      ? feat.description
                      : hasColon
                        ? feat.split(": ").slice(1).join(": ")
                        : undefined;

                    return (
                      <div
                        key={idx}
                        className="sop-feature-card bg-neutral-900/40 border border-neutral-800/60 rounded-lg p-3.5"
                      >
                        <div className="sop-feature-bullet" aria-hidden="true">
                          ■
                        </div>
                        <div className="sop-feature-content">
                          <span className="sop-feature-title">{title}</span>
                          {desc && <p className="sop-feature-desc">{desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
