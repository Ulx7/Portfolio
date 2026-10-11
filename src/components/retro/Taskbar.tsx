import React from "react";
import { useWindowManager, type WindowId } from "../../context/WindowManagerContext";
import { useThemeMode } from "../../context/ThemeModeContext";
import { useClock } from "../../hooks/useClock";
import { XpIcon } from "./XpIcon";
import { Volume2, Sparkles } from "lucide-react";

export const Taskbar: React.FC = () => {
  const {
    windows,
    activeWindowId,
    startMenuOpen,
    toggleStartMenu,
    focusWindow,
    minimizeWindow,
    openWindow
  } = useWindowManager();

  const { toggleMode } = useThemeMode();
  const time = useClock();

  const openWindows = Object.values(windows).filter((w) => w.isOpen);

  const handleTaskClick = (id: WindowId) => {
    const win = windows[id];
    if (activeWindowId === id && !win.isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <footer className="xp-taskbar" onClick={(e) => e.stopPropagation()}>
      {/* Start Button */}
      <button
        className={`xp-start-btn ${startMenuOpen ? "active" : ""}`}
        onClick={toggleStartMenu}
        aria-label="Start menu"
      >
        <span className="xp-start-flag">
          <span className="dot red"></span>
          <span className="dot green"></span>
          <span className="dot blue"></span>
          <span className="dot yellow"></span>
        </span>
        <span className="xp-start-label">start</span>
      </button>

      {/* Quick Launch Icons */}
      <div className="xp-quick-launch">
        <div className="quick-launch-divider"></div>
        <button
          className="quick-icon-btn"
          title="Internet Explorer"
          onClick={() => openWindow("ie")}
        >
          <XpIcon name="ie" size={16} />
        </button>
        <button
          className="quick-icon-btn"
          title="Outlook Express"
          onClick={() => openWindow("contact")}
        >
          <XpIcon name="mail" size={16} />
        </button>
        <button
          className="quick-icon-btn"
          title="Command Prompt"
          onClick={() => openWindow("cmd")}
        >
          <XpIcon name="cmd" size={16} />
        </button>
        <div className="quick-launch-divider"></div>
      </div>

      {/* Running Tasks / Windows */}
      <div className="xp-running-tasks">
        {openWindows.map((win) => {
          const isSelected = activeWindowId === win.id && !win.isMinimized;
          return (
            <button
              key={win.id}
              className={`taskbar-item ${isSelected ? "selected" : ""}`}
              onClick={() => handleTaskClick(win.id)}
              title={win.title}
            >
              <XpIcon name={win.iconName} size={15} />
              <span className="taskbar-item-text">{win.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray (Notification Area) */}
      <div className="xp-system-tray">
        <button
          className="tray-mode-switcher-btn"
          onClick={toggleMode}
          title="Cambiar al Modo Moderno (Cleo)"
        >
          <Sparkles size={12} className="inline mr-1" />
          <span>Modo Moderno</span>
        </button>

        <div className="tray-icons">
          <span className="tray-icon" title="Volumen: 100%">
            <Volume2 size={13} />
          </span>
        </div>

        <div className="tray-clock" title={new Date().toLocaleDateString()}>
          {time}
        </div>
      </div>
    </footer>
  );
};
