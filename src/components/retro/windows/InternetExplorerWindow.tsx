import React, { useState } from "react";
import { profile } from "../../../data/profile";
import { projects } from "../../../data/projects";
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Globe, ExternalLink } from "lucide-react";

export const InternetExplorerWindow: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState("http://ulysse-castello.dev/");
  const [activeTab, setActiveTab] = useState<"home" | "projects" | "analytics">("home");

  return (
    <div className="ie-window-layout">
      {/* Menu bar */}
      <div className="ie-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      {/* Toolbar */}
      <div className="ie-toolbar">
        <button className="ie-tool-btn" title="Back" onClick={() => setActiveTab("home")}>
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <button className="ie-tool-btn" title="Forward" onClick={() => setActiveTab("projects")}>
          <ArrowRight size={14} />
          <span>Forward</span>
        </button>
        <button className="ie-tool-btn" title="Stop">
          <span className="stop-x">×</span>
          <span>Stop</span>
        </button>
        <button className="ie-tool-btn" title="Refresh" onClick={() => setCurrentUrl("http://ulysse-castello.dev/")}>
          <RotateCw size={13} />
          <span>Refresh</span>
        </button>
        <button className="ie-tool-btn" title="Home" onClick={() => setActiveTab("home")}>
          <Home size={14} />
          <span>Home</span>
        </button>
        <div className="ie-tool-sep"></div>
        <button className="ie-tool-btn" title="Search">
          <Search size={14} />
          <span>Search</span>
        </button>

        <div className="ie-throbber">
          <div className="windows-flag-throbber"></div>
        </div>
      </div>

      {/* Address Bar */}
      <div className="ie-address-bar">
        <span className="address-label">Address</span>
        <div className="address-input-wrapper">
          <Globe size={14} className="address-globe" />
          <input
            type="text"
            className="address-input"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
          />
        </div>
        <button className="ie-go-btn" onClick={() => alert("Navegando a: " + currentUrl)}>
          <span>Go</span>
        </button>
      </div>

      {/* Embedded Web View */}
      <div className="ie-viewport">
        <div className="ie-embedded-site">
          <div className="ie-subnav">
            <button
              className={`ie-tab-btn ${activeTab === "home" ? "active" : ""}`}
              onClick={() => setActiveTab("home")}
            >
              Inicio &amp; Perfil
            </button>
            <button
              className={`ie-tab-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Proyectos Web &amp; Big Data ({projects.length})
            </button>
            <button
              className={`ie-tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Métricas &amp; Contacto
            </button>
          </div>

          <div className="ie-content-area">
            {activeTab === "home" && (
              <div className="ie-article">
                <div className="ie-hero-badge">
                  <span>● Status: {profile.status} ({profile.location})</span>
                </div>
                <h1 className="ie-h1">{profile.name}</h1>
                <p className="ie-lead">{profile.role}</p>
                <hr className="ie-hr" />
                <p className="ie-p">{profile.bio}</p>
                <div className="ie-quote-box">
                  <p><em>"{profile.secondaryBio}"</em></p>
                </div>
                <div className="ie-links-row">
                  <a href={profile.github} target="_blank" rel="noreferrer" className="ie-hyperlink">
                    Visitar GitHub Oficial <ExternalLink size={12} className="inline ml-1" />
                  </a>
                  {" | "}
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="ie-hyperlink">
                    Perfil de LinkedIn <ExternalLink size={12} className="inline ml-1" />
                  </a>
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="ie-article">
                <h2 className="ie-h2">Catálogo de Proyectos</h2>
                <p className="ie-p">Exploración de proyectos en entorno web:</p>
                <div className="ie-projects-list">
                  {projects.map((p) => (
                    <div key={p.id} className="ie-project-entry">
                      <div className="entry-header">
                        <strong className="entry-title">{p.title}</strong>
                        <span className="entry-badge">{p.category}</span>
                      </div>
                      <p className="entry-desc">{p.shortDescription}</p>
                      <div className="entry-tags">
                        Tech: {p.technologies.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="ie-article">
                <h2 className="ie-h2">Información de Contacto &amp; Métricas</h2>
                <table className="ie-table">
                  <tbody>
                    <tr>
                      <td><strong>Ubicación:</strong></td>
                      <td>{profile.location}</td>
                    </tr>
                    <tr>
                      <td><strong>Email:</strong></td>
                      <td>
                        <a href={`mailto:${profile.email}`} className="ie-hyperlink">
                          {profile.email}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Formación:</strong></td>
                      <td>Universidad ORT Uruguay (IT Analyst, Systems Analyst, Web Dev)</td>
                    </tr>
                    <tr>
                      <td><strong>Especialidad:</strong></td>
                      <td>Full Stack (React, Java, C#) &amp; Big Data (Python, PySpark, Hive)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="status-bar ie-statusbar">
        <div className="status-bar-field">Done</div>
        <div className="status-bar-field" style={{ width: 140 }}>
          <span className="internet-zone">Internet | Protected Mode: Off</span>
        </div>
        <div className="status-bar-field" style={{ width: 60 }}>100%</div>
      </div>
    </div>
  );
};
