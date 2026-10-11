import React, { useState } from "react";
import { metrics } from "../../data/metrics";
import { DiplomasModal } from "./DiplomasModal";
import { ArrowUpRight } from "lucide-react";

export const AboutSection: React.FC = () => {
  const [showDiplomasModal, setShowDiplomasModal] = useState<boolean>(false);

  return (
    <section id="about" className="section">
      <h2 className="section-title">Credentials &amp; Education</h2>

      {/* 3 Impact Cards */}
      <div className="milestones-stack">
        {metrics.map((m) => (
          <div key={m.id} className="milestone-card">
            <div className="milestone-badge-box">
              <span className="milestone-badge">{m.badge}</span>
            </div>

            <div className="milestone-body">
              <div className="milestone-header">
                <span className="milestone-heading">
                  <strong className="milestone-title">{m.title}</strong>
                  <span className="milestone-sep">&middot;</span>
                  <span className="milestone-sub">{m.subtitle}</span>
                </span>
              </div>
              <p className="milestone-desc">{m.description}</p>

              {/* Sutil y elegante enlace de texto para ver diplomas */}
              {m.hasDiplomaAction && (
                <div className="milestone-action-row">
                  <button
                    type="button"
                    onClick={() => setShowDiplomasModal(true)}
                    className="view-diplomas-link"
                    aria-label="View university diplomas and certification records"
                  >
                    <span>View Diplomas</span>
                    <ArrowUpRight size={13} className="diploma-arrow-icon" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Diplomas Modal Viewer */}
      {showDiplomasModal && (
        <DiplomasModal onClose={() => setShowDiplomasModal(false)} />
      )}
    </section>
  );
};
