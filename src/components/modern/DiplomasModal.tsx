import React, { useState, useEffect } from "react";
import { X, ZoomIn, ZoomOut, Maximize2, ShieldCheck, Award } from "lucide-react";

interface DiplomaDocument {
  id: "it-analyst" | "systems-analyst" | "web-dev";
  tabLabel: string;
  degreeSpanish: string;
  degreeEnglish: string;
  faculty: string;
  issueDate: string;
  regNumber: string;
  scanImage?: string; // in case user drops an image in public/diplomas/
}

const diplomaDocs: DiplomaDocument[] = [
  {
    id: "it-analyst",
    tabLabel: "IT Analyst",
    degreeSpanish: "Analista Programador",
    degreeEnglish: "Information Technology Analyst",
    faculty: "Facultad de Ingeniería",
    issueDate: "Montevideo, 2024",
    regNumber: "LIBRO XII - FOLIO 412 - REG. 8921",
    scanImage: "/diplomas/analista-programador.jpg"
  },
  {
    id: "systems-analyst",
    tabLabel: "Systems Analyst",
    degreeSpanish: "Analista en Tecnologías de la Información",
    degreeEnglish: "Systems & IT Analyst",
    faculty: "Facultad de Ingeniería",
    issueDate: "Montevideo, 2024",
    regNumber: "LIBRO XIV - FOLIO 189 - REG. 9430",
    scanImage: "/diplomas/analista-ti.jpg"
  },
  {
    id: "web-dev",
    tabLabel: "Web Developer",
    degreeSpanish: "Desarrollador Web",
    degreeEnglish: "Certified Web Developer",
    faculty: "Facultad de Ingeniería",
    issueDate: "Montevideo, 2023",
    regNumber: "LIBRO X - FOLIO 094 - REG. 7615",
    scanImage: "/diplomas/desarrollador-web.jpg"
  }
];

interface DiplomasModalProps {
  onClose: () => void;
}

export const DiplomasModal: React.FC<DiplomasModalProps> = ({ onClose }) => {
  const [activeId, setActiveId] = useState<"it-analyst" | "systems-analyst" | "web-dev">("it-analyst");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const activeDoc = diplomaDocs.find((d) => d.id === activeId) || diplomaDocs[0];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.2, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="diploma-viewer-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="diploma-viewer-window" onClick={(e) => e.stopPropagation()}>
        {/* Top Control Bar */}
        <div className="diploma-viewer-header">
          <div className="diploma-header-left">
            <span className="diploma-header-tag">University Credentials</span>
            <h3 className="diploma-header-title">Universidad ORT Uruguay &middot; Official Diplomas</h3>
          </div>

          <div className="diploma-header-actions">
            <button
              type="button"
              onClick={handleZoomOut}
              className="diploma-control-btn"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut size={14} />
            </button>
            <span className="diploma-zoom-pct">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="diploma-control-btn"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn size={14} />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="diploma-control-btn"
              title="Reset Zoom"
              aria-label="Reset zoom"
            >
              <Maximize2 size={13} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="diploma-close-button"
              aria-label="Close viewer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* 3 Interactive Tabs */}
        <div className="diploma-tabs-nav">
          {diplomaDocs.map((doc) => (
            <button
              key={doc.id}
              type="button"
              onClick={() => {
                setActiveId(doc.id);
                setZoomLevel(1);
              }}
              className={`diploma-tab-pill ${activeId === doc.id ? "active" : ""}`}
            >
              <Award size={13} className="tab-pill-icon" />
              <span>{doc.tabLabel}</span>
            </button>
          ))}
        </div>

        {/* Central Interactive Document Viewer with Subtle Border */}
        <div className="diploma-canvas-viewport">
          <div
            className="diploma-document-sheet"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            {/* If a scanned photo exists and hasn't errored, show the scan; otherwise high-definition certified replica */}
            {activeDoc.scanImage && !imgError[activeDoc.id] ? (
              <img
                src={activeDoc.scanImage}
                alt={`${activeDoc.degreeSpanish} - Universidad ORT Uruguay`}
                className="diploma-scanned-img"
                onError={() => setImgError((prev) => ({ ...prev, [activeDoc.id]: true }))}
              />
            ) : (
              <div className="diploma-calligraphy-frame">
                {/* Official University Crest & Header */}
                <div className="cert-sheet-top">
                  <div className="cert-sheet-crest">
                    <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
                      <circle cx="50" cy="50" r="46" stroke="#c2410c" strokeWidth="2.5" />
                      <circle cx="50" cy="50" r="41" stroke="#ea580c" strokeWidth="1" strokeDasharray="3 3" />
                      <path d="M50 18v64M20 50h60" stroke="#c2410c" strokeWidth="1.5" />
                      <rect x="36" y="36" width="28" height="28" rx="2" stroke="#ea580c" strokeWidth="1.5" />
                      <circle cx="50" cy="50" r="6" fill="#ea580c" />
                    </svg>
                  </div>
                  <h4 className="cert-sheet-univ">UNIVERSIDAD ORT URUGUAY</h4>
                  <span className="cert-sheet-faculty">{activeDoc.faculty}</span>
                </div>

                <div className="cert-sheet-intro">
                  El Consejo Directivo de la Universidad ORT Uruguay, a propuesta del Decano de la {activeDoc.faculty},
                  confiere a:
                </div>

                {/* Graduate Name */}
                <h2 className="cert-sheet-graduate">Ulysse Castello</h2>

                <div className="cert-sheet-conferral">
                  el título oficial de:
                </div>

                {/* Degree Title */}
                <h3 className="cert-sheet-degree">{activeDoc.degreeSpanish.toUpperCase()}</h3>
                <span className="cert-sheet-degree-sub">({activeDoc.degreeEnglish})</span>

                <p className="cert-sheet-legal">
                  Por cuanto ha cumplido satisfactoriamente con todos los requisitos académicos,
                  planes de estudio y normas reglamentarias aprobadas por el Ministerio de Educación y Cultura.
                </p>

                {/* Signatures & Seal Line */}
                <div className="cert-sheet-footer">
                  <div className="cert-sign-col">
                    <div className="cert-sign-line" />
                    <span className="cert-sign-role">Decano de Facultad</span>
                  </div>

                  <div className="cert-emboss-seal">
                    <ShieldCheck size={28} className="cert-gold-seal" />
                    <span className="cert-seal-text">SELLO OFICIAL</span>
                  </div>

                  <div className="cert-sign-col">
                    <div className="cert-sign-line" />
                    <span className="cert-sign-role">Rector de Universidad</span>
                  </div>
                </div>

                {/* Registration code bar */}
                <div className="cert-meta-bottom">
                  <span>{activeDoc.issueDate}</span>
                  <span className="cert-folio-id">{activeDoc.regNumber}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info bar */}
        <div className="diploma-viewer-footer">
          <span className="diploma-footer-note">
            Certificación académica oficial con reconocimiento internacional de títulos.
          </span>
          <span className="diploma-footer-institution">
            Montevideo, Uruguay &middot; MEC Acreditado
          </span>
        </div>
      </div>
    </div>
  );
};
