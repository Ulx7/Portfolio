import React from "react";
import { profile } from "../../data/profile";
import { useWindowManager, type WindowId } from "../../context/WindowManagerContext";
import { useThemeMode } from "../../context/ThemeModeContext";
import { XpIcon } from "./XpIcon";
import { LogOut, Power, ChevronRight, HelpCircle, Settings, HardDrive, FileText } from "lucide-react";

export const StartMenu: React.FC = () => {
  const { startMenuOpen, openWindow, closeStartMenu } = useWindowManager();
  const { toggleMode } = useThemeMode();

  if (!startMenuOpen) return null;

  const handleLaunch = (id: WindowId) => {
    openWindow(id);
    closeStartMenu();
  };

  return (
    <div className="xp-start-menu" onClick={(e) => e.stopPropagation()}>
      {/* Top Banner with Avatar */}
      <div className="start-menu-header">
        <div className="user-avatar-frame">
          <div className="user-avatar-inner">UC</div>
        </div>
        <span className="user-display-name">{profile.name}</span>
      </div>

      {/* Two columns body */}
      <div className="start-menu-body">
        {/* Left Column (Pinned Programs) */}
        <div className="start-menu-left">
          <div className="start-item" onClick={() => handleLaunch("ie")}>
            <XpIcon name="ie" size={32} />
            <div className="start-item-text">
              <strong className="item-title">Internet Explorer</strong>
              <span className="item-sub">Ver Portfolio Web</span>
            </div>
          </div>

          <div className="start-item" onClick={() => handleLaunch("contact")}>
            <XpIcon name="mail" size={32} />
            <div className="start-item-text">
              <strong className="item-title">E-mail (Outlook Express)</strong>
              <span className="item-sub">Enviar mensaje a Ulysse</span>
            </div>
          </div>

          <div className="start-divider"></div>

          <div className="start-item" onClick={() => handleLaunch("projects")}>
            <XpIcon name="folder" size={30} />
            <div className="start-item-text">
              <span className="item-title">My Projects</span>
            </div>
          </div>

          <div className="start-item" onClick={() => handleLaunch("about")}>
            <XpIcon name="notepad" size={30} />
            <div className="start-item-text">
              <span className="item-title">Notepad (About Me)</span>
            </div>
          </div>

          <div className="start-item" onClick={() => handleLaunch("cmd")}>
            <XpIcon name="cmd" size={30} />
            <div className="start-item-text">
              <span className="item-title">Command Prompt (CMD)</span>
            </div>
          </div>

          <div className="start-item" onClick={() => handleLaunch("minesweeper")}>
            <XpIcon name="bomb" size={30} />
            <div className="start-item-text">
              <span className="item-title">Minesweeper</span>
            </div>
          </div>

          <div className="start-item" onClick={() => handleLaunch("doom")}>
            <XpIcon name="game" size={30} />
            <div className="start-item-text">
              <span className="item-title">DOOM (MS-DOS)</span>
            </div>
          </div>

          <div className="all-programs-bar">
            <span>All Programs</span>
            <ChevronRight size={14} className="all-programs-arrow" />
          </div>
        </div>

        {/* Right Column (System folders & places) */}
        <div className="start-menu-right">
          <div className="right-item" onClick={() => handleLaunch("about")}>
            <FileText size={20} className="text-blue-700" />
            <span>My Documents</span>
          </div>

          <div className="right-item" onClick={() => handleLaunch("projects")}>
            <HardDrive size={20} className="text-blue-700" />
            <span>My Projects</span>
          </div>

          <div className="right-item">
            <XpIcon name="my-computer" size={20} />
            <span>My Computer</span>
          </div>

          <div className="start-divider"></div>

          <div className="right-item">
            <Settings size={20} className="text-blue-700" />
            <span>Control Panel</span>
          </div>

          <div className="right-item">
            <HelpCircle size={20} className="text-blue-700" />
            <span>Help and Support</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="start-menu-footer">
        <button
          className="start-footer-btn"
          onClick={() => {
            closeStartMenu();
            toggleMode();
          }}
          title="Cambiar al Modo Moderno"
        >
          <LogOut size={16} className="text-orange-500" />
          <span>Cambiar a Modo Moderno</span>
        </button>

        <button
          className="start-footer-btn"
          onClick={() => {
            closeStartMenu();
            if (confirm("¿Deseas cerrar el modo Windows XP y volver al portfolio moderno?")) {
              toggleMode();
            }
          }}
          title="Cerrar sesión"
        >
          <Power size={16} className="text-red-500" />
          <span>Turn Off Computer</span>
        </button>
      </div>
    </div>
  );
};
