import React, { useState } from "react";
import { projects, type Project } from "../../../data/projects";
import { XpIcon } from "../XpIcon";
import { ArrowLeft, ArrowRight, ArrowUp, Search, Folder, ExternalLink, HardDrive } from "lucide-react";

export const ProjectsExplorerWindow: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);

  return (
    <div className="explorer-layout">
      <div className="ie-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      <div className="explorer-toolbar">
        <button className="ie-tool-btn" title="Back">
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <button className="ie-tool-btn" title="Forward">
          <ArrowRight size={14} />
        </button>
        <button className="ie-tool-btn" title="Up">
          <ArrowUp size={14} />
        </button>
        <div className="ie-tool-sep"></div>
        <button className="ie-tool-btn" title="Search">
          <Search size={14} />
          <span>Search</span>
        </button>
        <button className="ie-tool-btn" title="Folders">
          <Folder size={14} />
          <span>Folders</span>
        </button>
      </div>

      <div className="explorer-address-bar">
        <span className="address-label">Address</span>
        <div className="address-input-wrapper">
          <HardDrive size={13} className="inline mr-1 text-blue-600" />
          <span className="explorer-path">C:\Documents and Settings\Ulysse\My Projects</span>
        </div>
      </div>

      <div className="explorer-body">
        <div className="explorer-sidebar">
          <div className="sidebar-box">
            <div className="sidebar-box-header">
              <span>File and Folder Tasks</span>
            </div>
            <div className="sidebar-box-content">
              <div className="task-item">
                <span className="task-bullet">📁</span>
                <span>Open Project Repository</span>
              </div>
              <div className="task-item">
                <span className="task-bullet">↗</span>
                <span>Share this portfolio</span>
              </div>
            </div>
          </div>

          <div className="sidebar-box">
            <div className="sidebar-box-header">
              <span>Details</span>
            </div>
            <div className="sidebar-box-content details-content">
              <strong className="detail-title">{selectedProject.title}</strong>
              <span className="detail-cat">{selectedProject.category}</span>
              <p className="detail-desc">{selectedProject.fullDescription}</p>

              <div className="detail-tech">
                <strong>Technologies:</strong>
                <p>{selectedProject.technologies.join(", ")}</p>
              </div>

              {selectedProject.metrics && (
                <div className="detail-metric">
                  <strong>Impact:</strong>
                  <p>{selectedProject.metrics}</p>
                </div>
              )}

              {selectedProject.documentUrl && (
                <a
                  href={selectedProject.documentUrl}
                  target="_blank"
                  rel="noreferrer"
                  download={true}
                  className="detail-launch-btn"
                >
                  <span>Download Document</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="detail-launch-btn"
                >
                  <span>View on GitHub</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="explorer-main">
          <div className="projects-file-grid">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className={`project-file-item ${selectedProject.id === proj.id ? "selected" : ""}`}
                onClick={() => setSelectedProject(proj)}
                onDoubleClick={() => {
                  if (proj.githubUrl) window.open(proj.githubUrl, "_blank");
                }}
              >
                <div className="file-icon-box">
                  <XpIcon name={proj.category === "Big Data" ? "cmd" : "folder"} size={42} />
                </div>
                <span className="file-name">{proj.title}</span>
                <span className="file-sub">{proj.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="status-bar">
        <div className="status-bar-field">{projects.length} objects</div>
        <div className="status-bar-field" style={{ width: 140 }}>
          {selectedProject.title}
        </div>
        <div className="status-bar-field" style={{ width: 100 }}>My Computer</div>
      </div>
    </div>
  );
};
