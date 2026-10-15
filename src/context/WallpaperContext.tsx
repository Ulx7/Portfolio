import React, { createContext, useContext, useState, useEffect } from "react";

export interface WallpaperOption {
  id: string;
  name: string;
  url: string; // empty string for (None)
}

export const WALLPAPER_LIST: WallpaperOption[] = [
  { id: "none", name: "(None)", url: "" },
  { id: "bliss", name: "Bliss", url: "/wallpapers/bliss.jpg" },
  { id: "autumn", name: "Autumn", url: "/wallpapers/autumn.jpg" },
  { id: "azul", name: "Azul", url: "/wallpapers/azul.jpg" },
  { id: "crystal", name: "Crystal", url: "/wallpapers/crystal.jpg" },
  { id: "moon-flower", name: "Moon flower", url: "/wallpapers/moon-flower.jpg" },
  { id: "red-moon-desert", name: "Red moon desert", url: "/wallpapers/red-moon-desert.jpg" },
  { id: "stonehenge", name: "Stonehenge", url: "/wallpapers/stonehenge.jpg" },
  { id: "tulips", name: "Tulips", url: "/wallpapers/tulips.jpg" },
  { id: "wind", name: "Wind", url: "/wallpapers/wind.jpg" },
  { id: "windows-xp", name: "Windows XP", url: "/wallpapers/windows-xp.jpg" },
];

export type WallpaperPosition = "stretch" | "center" | "tile";

export interface WallpaperSettings {
  wallpaperId: string;
  customUrl?: string;
  position: WallpaperPosition;
  backgroundColor: string;
}

interface WallpaperContextType {
  settings: WallpaperSettings;
  previewSettings: WallpaperSettings;
  setPreviewSettings: React.Dispatch<React.SetStateAction<WallpaperSettings>>;
  applySettings: (newSettings?: WallpaperSettings) => void;
  resetPreview: () => void;
  getWallpaperUrl: (settings: WallpaperSettings) => string;
}

const STORAGE_KEY = "xp_wallpaper_settings_v1";

const DEFAULT_SETTINGS: WallpaperSettings = {
  wallpaperId: "bliss",
  position: "stretch",
  backgroundColor: "#245edb",
};

const getInitialSettings = (): WallpaperSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        return {
          wallpaperId: parsed.wallpaperId || "bliss",
          customUrl: parsed.customUrl,
          position: parsed.position || "stretch",
          backgroundColor: parsed.backgroundColor || "#245edb",
        };
      }
    }
  } catch {}
  return DEFAULT_SETTINGS;
};

export const getWallpaperUrl = (s: WallpaperSettings): string => {
  if (s.wallpaperId === "custom" && s.customUrl) {
    return s.customUrl;
  }
  const found = WALLPAPER_LIST.find((w) => w.id === s.wallpaperId);
  return found ? found.url : "";
};

const WallpaperContext = createContext<WallpaperContextType | undefined>(undefined);

export const WallpaperProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WallpaperSettings>(getInitialSettings);
  const [previewSettings, setPreviewSettings] = useState<WallpaperSettings>(settings);

  useEffect(() => {
    setPreviewSettings(settings);
  }, [settings]);

  const applySettings = (newSettings?: WallpaperSettings) => {
    const toApply = newSettings || previewSettings;
    setSettings(toApply);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toApply));
    } catch {}
  };

  const resetPreview = () => {
    setPreviewSettings(settings);
  };

  return (
    <WallpaperContext.Provider
      value={{
        settings,
        previewSettings,
        setPreviewSettings,
        applySettings,
        resetPreview,
        getWallpaperUrl,
      }}
    >
      {children}
    </WallpaperContext.Provider>
  );
};

export const useWallpaper = (): WallpaperContextType => {
  const ctx = useContext(WallpaperContext);
  if (!ctx) {
    throw new Error("useWallpaper must be used within a WallpaperProvider");
  }
  return ctx;
};
