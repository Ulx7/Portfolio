import React, { useState } from "react";
import { projects, type Project } from "../../data/projects";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";

export const ProjectsGrid: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>

      {/* Complete Project Catalog in 2 columns */}
      <div className="project-grid">
        {projects.map((project) => {
          if (project.isComingSoon) {
            return (
              <div
                key={project.id}
                className="project-card project-card-disabled"
                aria-disabled="true"
              >
                <div className="project-img project-img-vivi">
                  <img
                    src="/vivi-logo.jpg"
                    alt={project.title}
                    className="vivi-cover-image"
                    loading="lazy"
                  />
                </div>

                <div className="project-body">
                  <div className="project-title-row">
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                  <div className="project-meta-row">
                    <span className="project-meta-line">PERSONAL &middot; IN DEVELOPMENT</span>
                  </div>
                  <p className="project-desc">{project.shortDescription}</p>
                </div>
              </div>
            );
          }

          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setSelectedCaseStudy(project)}
              className="project-card project-card-button"
              aria-label={`View case study for ${project.title}`}
            >
              <div className="project-img">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="proj-image"
                />
              </div>

              <div className="project-body">
                <div className="project-title-row">
                  <div className="project-title-meta-left">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-tag-pill">{project.tag}</span>
                  </div>
                  <span className="project-card-arrow" aria-hidden="true">↗</span>
                </div>
                <p className="project-desc">{project.shortDescription}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Case Study Slide-over Drawer / Modal */}
      {selectedCaseStudy && (
        <ProjectCaseStudyModal
          project={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onSelectProject={(nextProj) => setSelectedCaseStudy(nextProj)}
        />
      )}
    </section>
  );
};
