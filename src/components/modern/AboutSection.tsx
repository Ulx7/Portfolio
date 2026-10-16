import React, { useState } from "react";
import { credentials } from "../../data/metrics";
import { DiplomasModal } from "./DiplomasModal";
import { CertificatesModal } from "./CertificatesModal";

export const AboutSection: React.FC = () => {
  const [showDiplomasModal, setShowDiplomasModal] = useState<boolean>(false);
  const [showCertificatesModal, setShowCertificatesModal] = useState<boolean>(false);

  return (
    <section id="about" className="section credentials-section">
      <h2 className="section-title">Credentials &amp; Education</h2>

      <div className="credentials-editorial-layout">
        {credentials.map((item) => (
          <div key={item.id} className="credential-editorial-entry">
            <div className="credential-left-col">
              <span className="credential-category-label">{item.category}</span>
            </div>

            <div className="credential-right-col">
              {item.id === "languages" ? (
                <p className="credential-editorial-text">
                  <span className="credential-details">
                    Spanish (Native) &middot; English (Professional working proficiency) &middot; German (Elementary proficiency).
                  </span>
                  {item.actionType === "certificates" && (
                    <button
                      type="button"
                      onClick={() => setShowCertificatesModal(true)}
                      className="view-diplomas-inline-link"
                      aria-label="View official language certificates"
                    >
                      <span>{item.actionLabel || "View certificates"}</span>
                      <span className="inline-arrow" aria-hidden="true">↗</span>
                    </button>
                  )}
                </p>
              ) : (
                <p className="credential-editorial-text">
                  <strong className="credential-headline">{item.headline}</strong>
                  {item.details && (
                    <>
                      <span className="credential-dash"> &mdash; </span>
                      <span className="credential-details">{item.details}</span>
                    </>
                  )}
                  {item.actionType === "diplomas" && (
                    <button
                      type="button"
                      onClick={() => setShowDiplomasModal(true)}
                      className="view-diplomas-inline-link"
                      aria-label="View official university certificates"
                    >
                      <span>{item.actionLabel || "View certificates"}</span>
                      <span className="inline-arrow" aria-hidden="true">↗</span>
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showDiplomasModal && (
        <DiplomasModal onClose={() => setShowDiplomasModal(false)} />
      )}

      {showCertificatesModal && (
        <CertificatesModal onClose={() => setShowCertificatesModal(false)} />
      )}
    </section>
  );
};
