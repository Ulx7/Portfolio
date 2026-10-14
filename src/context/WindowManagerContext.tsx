import React, { createContext, useContext, useState, useCallback, useRef } from "react";

export type WindowId = "ie" | "projects" | "about" | "cmd" | "contact" | "minesweeper" | "doom" | "pinball";

export interface WindowState {
  id: WindowId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface WindowManagerContextType {
  windows: Record<WindowId, WindowState>;
  activeWindowId: WindowId | null;
  startMenuOpen: boolean;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  toggleMaximize: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updatePosition: (id: WindowId, position: { x: number; y: number }) => void;
  updateSize: (id: WindowId, size: { width: number; height: number }) => void;
  toggleStartMenu: () => void;
  closeStartMenu: () => void;
}

const DEFAULT_WINDOWS: Record<WindowId, WindowState> = {
  ie: {
    id: "ie",
    title: "Internet Explorer - Ulysse Castello Portfolio",
    iconName: "ie",
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 70, y: 40 },
    size: { width: 840, height: 560 }
  },
  projects: {
    id: "projects",
    title: "My Projects - Windows Explorer",
    iconName: "folder",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 120, y: 70 },
    size: { width: 720, height: 480 }
  },
  about: {
    id: "about",
    title: "About_Ulysse.txt - Notepad",
    iconName: "notepad",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 160, y: 100 },
    size: { width: 560, height: 420 }
  },
  cmd: {
    id: "cmd",
    title: "Command Prompt - C:\\WINDOWS\\system32\\cmd.exe",
    iconName: "cmd",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    position: { x: 200, y: 130 },
    size: { width: 640, height: 400 }
  },
  contact: {
    id: "contact",
    title: "Outlook Express - New Message",
    iconName: "mail",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    position: { x: 240, y: 110 },
    size: { width: 580, height: 460 }
  },
  minesweeper: {
    id: "minesweeper",
    title: "Minesweeper",
    iconName: "bomb",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    position: { x: 280, y: 80 },
    size: { width: 340, height: 420 }
  },
  doom: {
    id: "doom",
    title: "DOOM (1993) - MS-DOS Arcade",
    iconName: "game",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 100, y: 50 },
    size: { width: 700, height: 520 }
  },
  pinball: {
    id: "pinball",
    title: "3D Pinball for Windows - Space Cadet",
    iconName: "pinball",
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 140, y: 40 },
    size: { width: 620, height: 500 }
  }
};

const WindowManagerContext = createContext<WindowManagerContextType | undefined>(undefined);

export const WindowManagerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(DEFAULT_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>("ie");
  const highestZIndexRef = useRef(15);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const focusWindow = useCallback((id: WindowId) => {
    setActiveWindowId(id);
    highestZIndexRef.current += 1;
    const nextZ = highestZIndexRef.current;
    setWindows((curr) => ({
      ...curr,
      [id]: {
        ...curr[id],
        zIndex: nextZ,
        isMinimized: false
      }
    }));
    setStartMenuOpen(false);
  }, []);

  const openWindow = useCallback(
    (id: WindowId) => {
      highestZIndexRef.current += 1;
      const nextZ = highestZIndexRef.current;
      setWindows((curr) => ({
        ...curr,
        [id]: {
          ...curr[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ
        }
      }));
      setActiveWindowId(id);
      setStartMenuOpen(false);
    },
    []
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isOpen: false }
    }));
    setActiveWindowId((currActive) => (currActive === id ? null : currActive));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isMinimized: true }
    }));
    setActiveWindowId((currActive) => (currActive === id ? null : currActive));
  }, []);

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], isMaximized: !curr[id].isMaximized }
    }));
    focusWindow(id);
  }, [focusWindow]);

  const updatePosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], position }
    }));
  }, []);

  const updateSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((curr) => ({
      ...curr,
      [id]: { ...curr[id], size }
    }));
  }, []);

  const toggleStartMenu = useCallback(() => {
    setStartMenuOpen((prev) => !prev);
  }, []);

  const closeStartMenu = useCallback(() => {
    setStartMenuOpen(false);
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        startMenuOpen,
        openWindow,
        closeWindow,
        minimizeWindow,
        toggleMaximize,
        focusWindow,
        updatePosition,
        updateSize,
        toggleStartMenu,
        closeStartMenu
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
};

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  }
  return context;
};
