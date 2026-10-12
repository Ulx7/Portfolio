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

      {/* Asymmetric 2-column editorial layout */}
      <div className="credentials-editorial-layout">
        {credentials.map((item) => (
          <div key={item.id} className="credential-editorial-entry">
            <div className="credential-left-col">
              <span className="credential-category-label">{item.category}</span>
            </div>

            <div className="credential-right-col">
              {item.languageItems ? (
                /* Languages block: 3 clean lines of plain text with single general action link */
                <div className="credential-languages-block">
                  <div className="credential-languages-list">
                    {item.languageItems.map((lang, idx) => (
                      <p key={idx} className="credential-language-line">
                        <strong className="lang-name">{lang.language}</strong>
                        <span className="credential-dash"> &mdash; </span>
                        <span className="lang-level">{lang.level}</span>
                      </p>
                    ))}
                  </div>

                  {item.actionType === "certificates" && (
                    <div className="credential-action-container">
                      <button
                        type="button"
                        onClick={() => setShowCertificatesModal(true)}
                        className="view-diplomas-inline-link"
                        aria-label="View official language certificates"
                      >
                        <span>{item.actionLabel || "View Certificates"}</span>
                        <span className="inline-arrow" aria-hidden="true">↗</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Editorial text row for Status & Location and Education */
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
                      aria-label="View official university diplomas"
                    >
                      <span>{item.actionLabel || "View Diplomas"}</span>
                      <span className="inline-arrow" aria-hidden="true">↗</span>
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Independent University Diplomas Modal */}
      {showDiplomasModal && (
        <DiplomasModal onClose={() => setShowDiplomasModal(false)} />
      )}

      {/* Independent Language Certifications Modal */}
      {showCertificatesModal && (
        <CertificatesModal onClose={() => setShowCertificatesModal(false)} />
      )}
    </section>
  );
};
