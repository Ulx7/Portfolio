import React, { createContext, useContext, useState, useEffect } from "react";

export type ViewMode = "modern" | "retro";

interface ThemeModeContextType {
  mode: ViewMode;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
  isEmbedded: boolean;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

const checkIsEmbedded = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("embedded") === "true") return true;
    return window.self !== window.top;
  } catch {
    return true;
  }
};

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isEmbedded = checkIsEmbedded();

  const [mode, setModeState] = useState<ViewMode>(() => {
    if (isEmbedded) return "modern";
    const saved = localStorage.getItem("portfolio_mode");
    return saved === "retro" ? "retro" : "modern";
  });

  const setMode = (newMode: ViewMode) => {
    if (isEmbedded) return;
    setModeState(newMode);
    localStorage.setItem("portfolio_mode", newMode);
  };

  const toggleMode = () => {
    if (isEmbedded) return;
    setMode(mode === "modern" ? "retro" : "modern");
  };

  useEffect(() => {
    if (isEmbedded) {
      document.documentElement.classList.add("is-embedded");
      document.body.classList.add("is-embedded");
      document.documentElement.setAttribute("data-mode", "modern");
      document.body.classList.add("modern-active");
      document.body.classList.remove("retro-active");
      return;
    }

    document.documentElement.setAttribute("data-mode", mode);
    if (mode === "retro") {
      document.body.classList.add("retro-active");
      document.body.classList.remove("modern-active");
    } else {
      document.body.classList.add("modern-active");
      document.body.classList.remove("retro-active");
    }
  }, [mode, isEmbedded]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode, setMode, isEmbedded }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
};
