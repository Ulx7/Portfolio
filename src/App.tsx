import React from "react";
import { ThemeModeProvider, useThemeMode } from "./context/ThemeModeContext";
import { WallpaperProvider } from "./context/WallpaperContext";
import { WindowManagerProvider } from "./context/WindowManagerContext";
import { ModernView } from "./components/modern/ModernView";
import { Desktop } from "./components/retro/Desktop";
import "./styles/tokens.css";
import "./styles/modern.css";
import "./styles/retro.css";

const PortfolioContent: React.FC = () => {
  const { mode } = useThemeMode();

  return (
    <div className={`portfolio-app-root ${mode === "retro" ? "retro-active" : "modern-active"}`}>
      {mode === "modern" ? <ModernView /> : <Desktop />}
    </div>
  );
};

export function App() {
  return (
    <ThemeModeProvider>
      <WallpaperProvider>
        <WindowManagerProvider>
          <PortfolioContent />
        </WindowManagerProvider>
      </WallpaperProvider>
    </ThemeModeProvider>
  );
}

export default App;
