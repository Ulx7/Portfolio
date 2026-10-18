import React, { useState, useEffect } from "react";
import { useWindowManager, type WindowId } from "../../context/WindowManagerContext";
import { useWallpaper, getWallpaperUrl } from "../../context/WallpaperContext";
import { DesktopIcon, type Position } from "./DesktopIcon";
import { WindowFrame } from "./WindowFrame";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { XpIcon } from "./XpIcon";
import { ZoomIn, ZoomOut, RotateCw, RotateCcw, Trash2, Printer, Maximize2, X } from "lucide-react";

import { InternetExplorerWindow } from "./windows/InternetExplorerWindow";
import { ProjectsExplorerWindow } from "./windows/ProjectsExplorerWindow";
import { NotepadAboutWindow } from "./windows/NotepadAboutWindow";
import { TerminalSkillsWindow } from "./windows/TerminalSkillsWindow";
import { ContactMsnWindow } from "./windows/ContactMsnWindow";
import { MinesweeperWindow } from "./windows/MinesweeperWindow";
import { DoomWindow } from "./windows/DoomWindow";
import { PinballWindow } from "./windows/PinballWindow";
import { PaintWindow } from "./windows/PaintWindow";
import { SpiderSolitaireWindow } from "./windows/SpiderSolitaireWindow";
import { DisplayPropertiesWindow } from "./windows/DisplayPropertiesWindow";
import { SystemPropertiesWindow } from "./windows/SystemPropertiesWindow";
import { RecycleBinWindow } from "./windows/RecycleBinWindow";
import { WinampPlayer } from "./WinampPlayer";

interface ShortcutItem {
  id: WindowId;
  title: string;
  iconName: string;
}

const DESKTOP_SHORTCUTS: ShortcutItem[] = [
  { id: "system", title: "My Computer", iconName: "my-computer" },
  { id: "ie", title: "Internet Explorer", iconName: "ie" },
  { id: "projects", title: "My Projects", iconName: "folder" },
  { id: "about", title: "About_Ulysse.txt", iconName: "notepad" },
  { id: "cmd", title: "Command Prompt", iconName: "cmd" },
  { id: "paint", title: "Paint", iconName: "paint" },
  { id: "contact", title: "Outlook Express", iconName: "mail" },
  { id: "recycle-bin", title: "Recycle Bin", iconName: "recycle-bin" },

  { id: "winamp", title: "Winamp", iconName: "winamp" },
  { id: "spider", title: "Spider Solitaire", iconName: "spider" },
  { id: "minesweeper", title: "Minesweeper", iconName: "bomb" },
  { id: "doom", title: "DOOM (1993)", iconName: "game" },
  { id: "pinball", title: "3D Pinball", iconName: "pinball" }
];

const STORAGE_KEY = "xp_desktop_icon_positions_v8";

const getDefaultPositions = (): Record<string, Position> => {
  const positions: Record<string, Position> = {};
  const iconHeight = 84;
  const colWidth = 90;
  const startX = 14;
  const startY = 14;

  const col1 = ["system", "ie", "projects", "about", "cmd", "paint", "contact", "recycle-bin"];
  col1.forEach((id, row) => {
    positions[id] = {
      x: startX,
      y: startY + row * iconHeight
    };
  });

  const col2 = ["winamp", "spider", "minesweeper", "doom", "pinball"];
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
  const {
    openWindow,
    closeStartMenu,
    recycleBinItems,
    restoredDesktopItems,
    deleteDesktopFile,
    createDesktopFile,
    emptyRecycleBin
  } = useWindowManager();
  const { settings } = useWallpaper();
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [positions, setPositions] = useState<Record<string, Position>>(getInitialPositions);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [iconContextMenu, setIconContextMenu] = useState<{
    x: number;
    y: number;
    id: string;
    title: string;
    isRestored?: boolean;
  } | null>(null);

  const wallpaperUrl = getWallpaperUrl(settings);

  const desktopStyle: React.CSSProperties = {
    backgroundColor: settings.backgroundColor || "#004e98",
  };

  if (wallpaperUrl) {
    desktopStyle.backgroundImage = `url("${wallpaperUrl}")`;
    if (settings.position === "center") {
      desktopStyle.backgroundPosition = "center center";
      desktopStyle.backgroundRepeat = "no-repeat";
      desktopStyle.backgroundSize = "auto";
    } else if (settings.position === "tile") {
      desktopStyle.backgroundPosition = "top left";
      desktopStyle.backgroundRepeat = "repeat";
      desktopStyle.backgroundSize = "auto";
    } else {
      desktopStyle.backgroundPosition = "center center";
      desktopStyle.backgroundRepeat = "no-repeat";
      desktopStyle.backgroundSize = "cover";
    }
  } else {
    desktopStyle.backgroundImage = "none";
  }

  const handlePositionChange = (id: string, newPos: Position) => {
    setPositions((prev) => {
      const next = { ...prev, [id]: newPos };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
      }
      return next;
    });
  };

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedIconId) {
        const isRestored = restoredDesktopItems.some((r) => r.id === selectedIconId);
        if (isRestored) {
          deleteDesktopFile(selectedIconId);
          setSelectedIconId(null);
          setIconContextMenu(null);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIconId, restoredDesktopItems, deleteDesktopFile]);

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    closeStartMenu();
    setIconContextMenu(null);
    const menuWidth = 160;
    const menuHeight = 170;
    const x = Math.min(e.clientX, window.innerWidth - menuWidth - 6);
    const y = Math.min(e.clientY, window.innerHeight - menuHeight - 36);
    setContextMenu({ x, y });
  };

  const handleIconContextMenu = (
    e: React.MouseEvent,
    id: string,
    title: string,
    isRestored?: boolean
  ) => {
    closeStartMenu();
    setContextMenu(null);
    setSelectedIconId(id);
    const menuWidth = 160;
    const menuHeight = 140;
    const x = Math.min(e.clientX, window.innerWidth - menuWidth - 6);
    const y = Math.min(e.clientY, window.innerHeight - menuHeight - 36);
    setIconContextMenu({ x, y, id, title, isRestored });
  };

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    closeStartMenu();
    setContextMenu(null);
    setIconContextMenu(null);
  };

  const [photoViewerOpen, setPhotoViewerOpen] = useState(false);
  const [photoRotation, setPhotoRotation] = useState(0);
  const [photoZoom, setPhotoZoom] = useState(1);

  const handleOpenRestoredItem = (id: string, name: string) => {
    if (id === "spike") {
      setPhotoRotation(0);
      setPhotoZoom(1);
      setPhotoViewerOpen(true);
    } else if (id.startsWith("doc_") || name.endsWith(".txt")) {
      openWindow("about");
    } else if (id === "ie6") {
      alert("Internet Explorer 6 Setup\n\nSetup has detected that you are already using a modern retro browser environment. No upgrade required!");
    } else if (id === "clippy") {
      alert("Clippy Assistant\n\n📎 'Hi there! It looks like you restored me from the Recycle Bin! Would you like help writing a letter, fixing code, or exploring this portfolio?'");
    } else if (id === "first_web") {
      openWindow("ie");
    } else if (id === "dialup") {
      alert("Dial-Up Networking\n\nConnecting to AOL...\nDialing: 555-0199\nHandshake: Beep... boop... krrrrch... pssssshhhhh...\nConnected at 56,000 bps!");
    } else if (id === "bugs") {
      alert("portfolio_bugs_fixed.log\n\n[DIAGNOSTIC REPORT]\n- Total critical bugs: 0\n- Nostalgia factor: 100%\n- Retro audio engine: Operational\n- All systems running smoothly.");
    } else {
      alert(`${name}\n\nThis file was restored from the Recycle Bin.`);
    }
  };

  const isBinFull = recycleBinItems.length > 0;
  const recycleBinIconName = isBinFull ? "recycle-bin-full" : "recycle-bin-empty";

  const allShortcuts = [
    ...DESKTOP_SHORTCUTS.map((item) => ({
      ...item,
      iconName: item.id === "recycle-bin" ? recycleBinIconName : item.iconName,
      isRestored: false,
      fallbackPos: { x: 14, y: 14 }
    })),
    ...restoredDesktopItems.map((item, index) => ({
      id: item.id,
      title: item.name,
      iconName: item.icon,
      isRestored: true,
      fallbackPos: { x: 194, y: 14 + index * 84 }
    }))
  ];

  return (
    <div
      className="xp-desktop"
      style={desktopStyle}
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopContextMenu}
    >
      <div className="desktop-shortcuts-area">
        {allShortcuts.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            title={item.title}
            iconName={item.iconName}
            isSelected={selectedIconId === item.id}
            position={positions[item.id] || item.fallbackPos}
            onSelect={() => setSelectedIconId(item.id)}
            onOpen={() => {
              if (item.isRestored) {
                handleOpenRestoredItem(item.id, item.title);
              } else {
                openWindow(item.id as WindowId);
              }
            }}
            onPositionChange={(newPos) => handlePositionChange(item.id, newPos)}
            onContextMenu={(e) => handleIconContextMenu(e, item.id, item.title, item.isRestored)}
          />
        ))}
      </div>

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

        <WindowFrame id="spider">
          <SpiderSolitaireWindow />
        </WindowFrame>

        <WindowFrame id="display">
          <DisplayPropertiesWindow />
        </WindowFrame>

        <WindowFrame id="system">
          <SystemPropertiesWindow />
        </WindowFrame>

        <WindowFrame id="recycle-bin">
          <RecycleBinWindow />
        </WindowFrame>

        <WinampPlayer />
      </div>

      {contextMenu && (
        <div
          className="xp-context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="xp-context-menu-item disabled"
            onClick={() => setContextMenu(null)}
          >
            <span>Arrange Icons By</span>
            <span style={{ fontSize: 9 }}>▶</span>
          </div>
          <div
            className="xp-context-menu-item"
            onClick={() => {
              setContextMenu(null);
              const defs = getDefaultPositions();
              restoredDesktopItems.forEach((item, index) => {
                defs[item.id] = { x: 194, y: 14 + index * 84 };
              });
              setPositions(defs);
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(defs));
              } catch {
              }
            }}
          >
            <span>Auto Arrange Icons</span>
          </div>
          <div
            className="xp-context-menu-item"
            onClick={() => {
              setContextMenu(null);
              window.location.reload();
            }}
          >
            <span>Refresh</span>
          </div>
          <div className="xp-context-menu-sep" />
          <div
            className="xp-context-menu-item disabled"
            onClick={() => setContextMenu(null)}
          >
            <span>Paste</span>
          </div>
          <div
            className="xp-context-menu-item disabled"
            onClick={() => setContextMenu(null)}
          >
            <span>Paste Shortcut</span>
          </div>
          <div className="xp-context-menu-sep" />
          <div
            className="xp-context-menu-item"
            onClick={() => {
              setContextMenu(null);
              createDesktopFile();
            }}
          >
            <div className="flex items-center gap-2">
              <XpIcon name="notepad" size={16} />
              <span>New Text Document</span>
            </div>
          </div>
          <div className="xp-context-menu-sep" />
          <div
            className="xp-context-menu-item"
            onClick={() => {
              setContextMenu(null);
              openWindow("display");
            }}
          >
            <div className="flex items-center gap-2">
              <XpIcon name="display" size={16} />
              <span style={{ fontWeight: 600 }}>Properties</span>
            </div>
          </div>
        </div>
      )}

      {iconContextMenu && (
        <div
          className="xp-context-menu"
          style={{ left: iconContextMenu.x, top: iconContextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          {iconContextMenu.id === "recycle-bin" ? (
            <>
              <div
                className="xp-context-menu-item"
                style={{ fontWeight: 700 }}
                onClick={() => {
                  setIconContextMenu(null);
                  openWindow("recycle-bin");
                }}
              >
                <span>Open</span>
              </div>
              <div
                className={`xp-context-menu-item ${!isBinFull ? "disabled" : ""}`}
                onClick={() => {
                  if (isBinFull) {
                    emptyRecycleBin();
                  }
                  setIconContextMenu(null);
                }}
              >
                <span>Empty Recycle Bin</span>
              </div>
              <div className="xp-context-menu-sep" />
              <div
                className="xp-context-menu-item"
                onClick={() => {
                  setIconContextMenu(null);
                  openWindow("recycle-bin");
                }}
              >
                <div className="flex items-center gap-2">
                  <XpIcon name={recycleBinIconName} size={16} />
                  <span>Properties</span>
                </div>
              </div>
            </>
          ) : iconContextMenu.isRestored ? (
            <>
              <div
                className="xp-context-menu-item"
                style={{ fontWeight: 700 }}
                onClick={() => {
                  setIconContextMenu(null);
                  handleOpenRestoredItem(iconContextMenu.id, iconContextMenu.title);
                }}
              >
                <span>Open</span>
              </div>
              <div
                className="xp-context-menu-item"
                onClick={() => {
                  deleteDesktopFile(iconContextMenu.id);
                  setIconContextMenu(null);
                  setSelectedIconId(null);
                }}
              >
                <span>Delete</span>
              </div>
              <div className="xp-context-menu-sep" />
              <div
                className="xp-context-menu-item"
                onClick={() => {
                  setIconContextMenu(null);
                  alert(`${iconContextMenu.title}\n\nLocation: C:\\Desktop\nStatus: Restored from Recycle Bin`);
                }}
              >
                <span>Properties</span>
              </div>
            </>
          ) : (
            <>
              <div
                className="xp-context-menu-item"
                style={{ fontWeight: 700 }}
                onClick={() => {
                  setIconContextMenu(null);
                  openWindow(iconContextMenu.id as WindowId);
                }}
              >
                <span>Open</span>
              </div>
              <div className="xp-context-menu-sep" />
              <div
                className="xp-context-menu-item"
                onClick={() => {
                  setIconContextMenu(null);
                  openWindow("display");
                }}
              >
                <span>Properties</span>
              </div>
            </>
          )}
        </div>
      )}

      {photoViewerOpen && (
        <div
          className="xp-dialog-backdrop"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.45)"
          }}
          onClick={() => setPhotoViewerOpen(false)}
        >
          <div
            className="window"
            style={{
              width: "min(560px, 94vw)",
              background: "#ece9d8",
              boxShadow: "2px 4px 16px rgba(0,0,0,0.4)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-bar">
              <div className="title-bar-text">
                <XpIcon name="picture" size={14} className="inline mr-1" />
                <span>spike.jpg - Windows Picture and Fax Viewer</span>
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setPhotoViewerOpen(false)} />
              </div>
            </div>

            <div
              className="window-body"
              style={{
                margin: 4,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                background: "#ece9d8"
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  height: "380px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: "2px solid",
                  borderColor: "#7f9db9 #ffffff #ffffff #7f9db9",
                  position: "relative"
                }}
              >
                <img
                  src="/spike.jpg"
                  alt="spike.jpg"
                  style={{
                    maxHeight: "94%",
                    maxWidth: "94%",
                    objectFit: "contain",
                    transform: `rotate(${photoRotation}deg) scale(${photoZoom})`,
                    transition: "transform 0.15s ease"
                  }}
                  draggable={false}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 3,
                  padding: "6px 12px",
                  background: "#ece9d8",
                  borderTop: "1px solid #d4d0c8"
                }}
              >
                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Zoom In (+)"
                  onClick={() => setPhotoZoom((z) => Math.min(3, z + 0.25))}
                  style={{ padding: "4px 6px" }}
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Zoom Out (-)"
                  onClick={() => setPhotoZoom((z) => Math.max(0.4, z - 0.25))}
                  style={{ padding: "4px 6px" }}
                >
                  <ZoomOut size={16} />
                </button>
                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Actual Size / Best Fit"
                  onClick={() => {
                    setPhotoZoom(1);
                    setPhotoRotation(0);
                  }}
                  style={{ padding: "4px 6px" }}
                >
                  <Maximize2 size={16} />
                </button>

                <div style={{ width: 1, height: 18, background: "#999488", margin: "0 4px" }} />

                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Rotate Clockwise"
                  onClick={() => setPhotoRotation((r) => r + 90)}
                  style={{ padding: "4px 6px" }}
                >
                  <RotateCw size={16} />
                </button>
                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Rotate Counterclockwise"
                  onClick={() => setPhotoRotation((r) => r - 90)}
                  style={{ padding: "4px 6px" }}
                >
                  <RotateCcw size={16} />
                </button>

                <div style={{ width: 1, height: 18, background: "#999488", margin: "0 4px" }} />

                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Delete (sends to Recycle Bin)"
                  onClick={() => {
                    deleteDesktopFile("spike");
                    setPhotoViewerOpen(false);
                  }}
                  style={{ padding: "4px 6px" }}
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Print"
                  onClick={() => window.print()}
                  style={{ padding: "4px 6px" }}
                >
                  <Printer size={16} />
                </button>

                <div style={{ width: 1, height: 18, background: "#999488", margin: "0 4px" }} />

                <button
                  type="button"
                  className="ie-tool-btn"
                  title="Close"
                  onClick={() => setPhotoViewerOpen(false)}
                  style={{ padding: "4px 6px" }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <StartMenu />

      <Taskbar />
    </div>
  );
};
