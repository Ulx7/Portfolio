import React, { createContext, useContext, useState, useEffect } from "react";

export type ViewMode = "modern" | "retro";

interface ThemeModeContextType {
  mode: ViewMode;
  toggleMode: () => void;
  setMode: (mode: ViewMode) => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ViewMode>(() => {
    const saved = localStorage.getItem("portfolio_mode");
    return saved === "retro" ? "retro" : "modern";
  });

  const setMode = (newMode: ViewMode) => {
    setModeState(newMode);
    localStorage.setItem("portfolio_mode", newMode);
  };

  const toggleMode = () => {
    setMode(mode === "modern" ? "retro" : "modern");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    if (mode === "retro") {
      document.body.classList.add("retro-active");
      document.body.classList.remove("modern-active");
    } else {
      document.body.classList.add("modern-active");
      document.body.classList.remove("retro-active");
    }
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode, setMode }}>
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
