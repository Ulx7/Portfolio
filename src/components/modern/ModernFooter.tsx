import React from "react";
import { profile } from "../../data/profile";
import { useThemeMode } from "../../context/ThemeModeContext";
import { Monitor } from "lucide-react";

export const ModernFooter: React.FC = () => {
  const { toggleMode, isEmbedded } = useThemeMode();

  return (
    <footer className="clean-footer">
      <div className="footer-line">
        <span className="footer-author">{profile.name} • 2026</span>
        {!isEmbedded && (
          <button onClick={toggleMode} className="footer-xp-btn">
            <Monitor size={12} className="inline mr-1" />
            <span>Windows XP mode</span>
          </button>
        )}
      </div>
    </footer>
  );
};
