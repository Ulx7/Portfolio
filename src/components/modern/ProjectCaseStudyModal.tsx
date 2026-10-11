import React, { useEffect } from "react";
import { projects, type Project } from "../../data/projects";
import { X, ArrowUpRight, Code, Server, Layers, ChevronRight } from "lucide-react";
import { GithubIcon } from "../common/SocialIcons";
import { TechMicroIcon } from "./TechMicroIcon";

interface ProjectCaseStudyModalProps {
  project: Project;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="case-study-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div className="case-study-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="case-study-header">
          <div className="case-study-meta-top">
            <span className="case-study-badge" style={{ borderColor: `${project.color}40`, color: project.color }}>
              {project.category}
            </span>
            <span className="case-study-year">{project.year}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="case-study-close-btn"
            aria-label="Close case study drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="case-study-scroll-content">
          <h2 id="case-study-title" className="case-study-title">
            {project.title}
          </h2>

          <p className="case-study-lead">{project.shortDescription}</p>

          {/* Large Hero Image Preview */}
          <div className="case-study-image-wrapper">
            <img
              src={project.image}
              alt={project.title}
              className="case-study-image"
              loading="lazy"
            />
            {project.metrics && (
              <div className="case-study-metric-pill">
                <span>{project.metrics}</span>
              </div>
            )}
          </div>

          {/* Quick Actions Row */}
          <div className="case-study-actions-row">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="case-study-cta-primary"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={13} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="case-study-cta-secondary"
              >
                <GithubIcon size={14} />
                <span>Source Code</span>
              </a>
            )}
          </div>

          {/* The Technical Problem / Challenge */}
          {project.problemStatement && (
            <div className="case-study-block">
              <div className="case-study-section-label">
                <Server size={13} className="label-icon" />
                <span>The Technical Problem</span>
              </div>
              <p className="case-study-text">{project.problemStatement}</p>
            </div>
          )}

          {/* Architecture & Engineering Decisions */}
          {project.architecture && (
            <div className="case-study-block">
              <div className="case-study-section-label">
                <Layers size={13} className="label-icon" />
                <span>Architecture &amp; System Design</span>
              </div>
              <p className="case-study-text">{project.architecture}</p>
            </div>
          )}

          {/* In-depth Full Description */}
          <div className="case-study-block">
            <div className="case-study-section-label">
              <Code size={13} className="label-icon" />
              <span>Implementation Scope</span>
            </div>
            <p className="case-study-text">{project.fullDescription}</p>
          </div>

          {/* Key Highlights */}
          {project.keyHighlights && project.keyHighlights.length > 0 && (
            <div className="case-study-block">
              <span className="case-study-section-label">Key Highlights &amp; Results</span>
              <ul className="case-study-highlights-list">
                {project.keyHighlights.map((highlight, idx) => (
                  <li key={idx} className="case-study-highlight-item">
                    <span className="highlight-bullet">&middot;</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack Pills */}
          <div className="case-study-block">
            <span className="case-study-section-label">Technologies Used</span>
            <div className="case-study-tech-pills">
              {project.technologies.map((tech) => (
                <span key={tech} className="case-study-tech-pill">
                  <TechMicroIcon name={tech} size={12} className="tech-pill-icon" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Switch to other projects */}
          <div className="case-study-nav-other">
            <span className="case-study-section-label">Other Engineering Case Studies</span>
            <div className="case-study-other-grid">
              {projects
                .filter((p) => p.id !== project.id)
                .map((other) => (
                  <button
                    key={other.id}
                    type="button"
                    onClick={() => onSelectProject(other)}
                    className="case-study-other-item"
                  >
                    <div className="other-item-text">
                      <span className="other-item-title">{other.title}</span>
                      <span className="other-item-category">{other.category} &middot; {other.year}</span>
                    </div>
                    <ChevronRight size={14} className="other-item-arrow" />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
