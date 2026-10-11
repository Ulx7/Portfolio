import React, { useState } from "react";
import { projects, type Project } from "../../data/projects";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";

export const ProjectsGrid: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // 4 featured projects for 2-column symmetry
  const featuredProjects = projects.slice(0, 4);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>

      <div className="project-grid">
        {featuredProjects.map((project) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setSelectedCaseStudy(project)}
            className="project-card project-card-button"
            aria-label={`View detailed case study for ${project.title}`}
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
                <h3 className="project-title">{project.title}</h3>
                <span className="project-card-arrow" aria-hidden="true">↗</span>
              </div>
              <p className="project-desc">{project.shortDescription}</p>
            </div>
          </button>
        ))}
      </div>

      <p className="section-more">
        Want to see more?{" "}
        <button
          type="button"
          onClick={() => setSelectedCaseStudy(projects[4] || projects[0])}
          className="accent-link-btn"
        >
          Check them out.
        </button>
      </p>

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
