import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { type Project } from "../../data/projects";
import { X, ArrowUpRight } from "lucide-react";
import { TechMicroIcon } from "./TechMicroIcon";

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

  const projectImages = project.images && project.images.length > 0
    ? project.images
    : project.image ? [project.image] : [];
  const currentImage = projectImages[activeImageIdx] || project.image;

  return createPortal(
    <div
      className="case-study-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="case-study-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header: Title, Origin Tag (Client/Academic/Personal), and Close Button */}
        <div className="case-study-header">
          <div className="case-study-header-main">
            <span className="case-study-origin-tag">{project.tag}</span>
            <h2 id="case-study-title" className="case-study-title">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="case-study-close-btn"
            aria-label="Close case study drawer"
            title="Close (Esc)"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>

        {/* Scrollable Editorial Content */}
        <div className="case-study-scroll-content">
          {/* Direct Minimalist Action Links */}
          {(project.liveUrl || project.githubUrl) && (
            <div className="case-study-actions-row">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="case-study-link-action"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={13} className="action-arrow" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="case-study-link-action"
                >
                  <span>Source Code</span>
                  <ArrowUpRight size={13} className="action-arrow" />
                </a>
              )}
            </div>
          )}

          {/* Visual Gallery */}
          {currentImage && (
            <div className="case-study-gallery">
              <div className="case-study-image-wrapper">
                <img
                  src={currentImage}
                  alt={`${project.title} preview`}
                  className="case-study-image"
                  loading="lazy"
                />
              </div>

              {projectImages.length > 1 && (
                <div className="case-study-thumbnails-row">
                  {projectImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`case-study-thumb-btn ${activeImageIdx === idx ? "active" : ""}`}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="thumb-img" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Body: Overview & Context */}
          {(project.overview || project.fullDescription || project.shortDescription) && (
            <div className="case-study-block">
              <h3 className="case-study-heading">Overview &amp; Context</h3>
              <p className="case-study-text">
                {project.overview || project.fullDescription || project.shortDescription}
              </p>
            </div>
          )}

          {/* Body: System Architecture */}
          {project.architecture && (
            <div className="case-study-block">
              <h3 className="case-study-heading">System Architecture</h3>
              <p className="case-study-text">{project.architecture}</p>
            </div>
          )}

          {/* Body: Engineering Highlights */}
          {(project.highlights || project.keyHighlights) && (
            <div className="case-study-block">
              <h3 className="case-study-heading">Engineering Highlights</h3>
              <ul className="case-study-highlights-list">
                {(project.highlights || project.keyHighlights || []).map((highlight, idx) => (
                  <li key={idx} className="case-study-highlight-item">
                    <span className="highlight-bullet">&middot;</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="case-study-block">
              <h3 className="case-study-heading">Technologies Used</h3>
              <div className="case-study-tech-pills">
                {project.technologies.map((tech) => (
                  <span key={tech} className="case-study-tech-pill">
                    <TechMicroIcon name={tech} size={12} className="tech-pill-icon" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
