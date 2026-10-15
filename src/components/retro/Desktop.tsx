import React, { useState, useEffect } from "react";
import { useWindowManager, type WindowId } from "../../context/WindowManagerContext";
import { DesktopIcon, type Position } from "./DesktopIcon";
import { WindowFrame } from "./WindowFrame";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";

import { InternetExplorerWindow } from "./windows/InternetExplorerWindow";
import { ProjectsExplorerWindow } from "./windows/ProjectsExplorerWindow";
import { NotepadAboutWindow } from "./windows/NotepadAboutWindow";
import { TerminalSkillsWindow } from "./windows/TerminalSkillsWindow";
import { ContactMsnWindow } from "./windows/ContactMsnWindow";
import { MinesweeperWindow } from "./windows/MinesweeperWindow";
import { DoomWindow } from "./windows/DoomWindow";
import { PinballWindow } from "./windows/PinballWindow";
import { PaintWindow } from "./windows/PaintWindow";
import { WinampPlayer } from "./WinampPlayer";

interface ShortcutItem {
  id: WindowId | "recycle-bin";
  title: string;
  iconName: string;
}

const DESKTOP_SHORTCUTS: ShortcutItem[] = [
  // Column 1: Portfolio Apps & System
  { id: "ie", title: "Internet Explorer", iconName: "ie" },
  { id: "projects", title: "My Projects", iconName: "folder" },
  { id: "about", title: "About_Ulysse.txt", iconName: "notepad" },
  { id: "cmd", title: "Command Prompt", iconName: "cmd" },
  { id: "paint", title: "Paint", iconName: "paint" },
  { id: "contact", title: "Outlook Express", iconName: "mail" },
  { id: "recycle-bin", title: "Recycle Bin", iconName: "recycle-bin" },

  // Column 2: Music & Retro Games
  { id: "winamp", title: "Winamp", iconName: "winamp" },
  { id: "minesweeper", title: "Minesweeper", iconName: "bomb" },
  { id: "doom", title: "DOOM (1993)", iconName: "game" },
  { id: "pinball", title: "3D Pinball", iconName: "pinball" }
];

const STORAGE_KEY = "xp_desktop_icon_positions_v6";

const getDefaultPositions = (): Record<string, Position> => {
  const positions: Record<string, Position> = {};
  const iconHeight = 84;
  const colWidth = 90;
  const startX = 14;
  const startY = 14;

  // Column 1 items (Apps & Recycle Bin)
  const col1 = ["ie", "projects", "about", "cmd", "paint", "contact", "recycle-bin"];
  col1.forEach((id, row) => {
    positions[id] = {
      x: startX,
      y: startY + row * iconHeight
    };
  });

  // Column 2 items (Winamp & Games)
  const col2 = ["winamp", "minesweeper", "doom", "pinball"];
  col2.forEach((id, row) => {
    positions[id] = {
      x: startX + colWidth,
      y: startY + row * iconHeight
    };
  });

  return positions;
};

const getInitialPositions = (): Record<string, Position> => {
  const defaults = getDefaultPositions();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        DESKTOP_SHORTCUTS.forEach((item) => {
          if (!parsed[item.id] || typeof parsed[item.id].x !== "number" || typeof parsed[item.id].y !== "number") {
            parsed[item.id] = defaults[item.id];
          }
        });
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error loading icon positions", err);
  }
  return defaults;
};

export const Desktop: React.FC = () => {
  const { openWindow, closeStartMenu } = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>(getInitialPositions);

  const handlePositionChange = (id: string, newPos: Position) => {
    setPositions((prev) => {
      const next = { ...prev, [id]: newPos };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Keep icons within visible bounds on viewport resize
  useEffect(() => {
    const handleResize = () => {
      setPositions((prev) => {
        let changed = false;
        const next = { ...prev };
        const maxX = Math.max(0, window.innerWidth - 76);
        const maxY = Math.max(0, window.innerHeight - 34 - 76);

        Object.keys(next).forEach((id) => {
          const cur = next[id];
          if (cur && (cur.x > maxX || cur.y > maxY)) {
            next[id] = {
              x: Math.min(cur.x, maxX),
              y: Math.min(cur.y, maxY)
            };
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    closeStartMenu();
  };

  return (
    <div className="xp-desktop" onClick={handleDesktopClick}>
      {/* Desktop Shortcuts Layer */}
      <div className="desktop-shortcuts-area">
        {DESKTOP_SHORTCUTS.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            title={item.title}
            iconName={item.iconName}
            isSelected={selectedIconId === item.id}
            position={positions[item.id] || { x: 14, y: 14 }}
            onSelect={() => setSelectedIconId(item.id)}
            onOpen={() => {
              if (item.id === "recycle-bin") {
                alert("The Recycle Bin is empty.");
              } else {
                openWindow(item.id as WindowId);
              }
            }}
            onPositionChange={(newPos) => handlePositionChange(item.id, newPos)}
          />
        ))}
      </div>

      {/* Windows Layer */}
      <div className="desktop-windows-layer">
        <WindowFrame id="ie">
          <InternetExplorerWindow />
        </WindowFrame>

        <WindowFrame id="projects">
          <ProjectsExplorerWindow />
        </WindowFrame>

        <WindowFrame id="about">
          <NotepadAboutWindow />
        </WindowFrame>

        <WindowFrame id="cmd">
          <TerminalSkillsWindow />
        </WindowFrame>

        <WindowFrame id="contact">
          <ContactMsnWindow />
        </WindowFrame>

        <WindowFrame id="paint">
          <PaintWindow />
        </WindowFrame>

        <WindowFrame id="minesweeper">
          <MinesweeperWindow />
        </WindowFrame>

        <WindowFrame id="doom">
          <DoomWindow />
        </WindowFrame>

        <WindowFrame id="pinball">
          <PinballWindow />
        </WindowFrame>

        {/* Winamp Modular Player */}
        <WinampPlayer />
      </div>

      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};
