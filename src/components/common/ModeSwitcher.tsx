import React from "react";
import { useThemeMode } from "../../context/ThemeModeContext";
import { Monitor, Sparkles } from "lucide-react";

export const ModeSwitcher: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <div className="mode-switcher-container">
      <button
        onClick={toggleMode}
        className={`mode-switcher-btn ${mode === "retro" ? "retro-btn-style" : "modern-btn-style"}`}
        title={mode === "modern" ? "Cambiar a Modo Retro Windows XP" : "Volver a Modo Moderno Minimalista"}
        aria-label="Cambiar modo de visualización"
      >
        {mode === "modern" ? (
          <>
            <span className="mode-icon-wrapper xp-badge">
              <span className="xp-flag-dots">
                <span className="dot red"></span>
                <span className="dot green"></span>
                <span className="dot blue"></span>
                <span className="dot yellow"></span>
              </span>
            </span>
            <span className="mode-text">
              <span className="mode-label">Modo Retro</span>
              <span className="mode-sub">Windows XP</span>
            </span>
            <Monitor size={15} className="action-icon" />
          </>
        ) : (
          <>
            <span className="mode-icon-wrapper modern-badge">
              <Sparkles size={14} />
            </span>
            <span className="mode-text">
              <span className="mode-label">Modo Moderno</span>
              <span className="mode-sub">Editorial / Cleo</span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};
