import React, { useState, useRef, useEffect } from "react";
import { useWindowManager } from "../../../context/WindowManagerContext";
import {
  useWallpaper,
  WALLPAPER_LIST,
  type WallpaperPosition,
  type WallpaperOption
} from "../../../context/WallpaperContext";

const PRESET_COLORS = [
  { name: "Windows XP Blue", hex: "#245edb" },
  { name: "Olive Green", hex: "#5b7b43" },
  { name: "Metallic Silver", hex: "#708090" },
  { name: "Classic Teal", hex: "#008080" },
  { name: "Midnight Black", hex: "#000000" },
  { name: "Navy Blue", hex: "#000080" },
];

export const DisplayPropertiesWindow: React.FC = () => {
  const { closeWindow } = useWindowManager();
  const {
    previewSettings,
    setPreviewSettings,
    applySettings,
    resetPreview,
    getWallpaperUrl
  } = useWallpaper();

  const [activeTab, setActiveTab] = useState<"themes" | "desktop" | "screensaver" | "appearance" | "settings">("desktop");
  const [screensaverType, setScreensaverType] = useState<"matrix" | "starfield" | "pipes" | "windows">("starfield");
  const [fullscreenScreensaver, setFullscreenScreensaver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewUrl = getWallpaperUrl(previewSettings);

  const handleSelectWallpaper = (wp: WallpaperOption) => {
    setPreviewSettings((prev) => ({
      ...prev,
      wallpaperId: wp.id,
      customUrl: undefined
    }));
  };

  const handlePositionChange = (pos: WallpaperPosition) => {
    setPreviewSettings((prev) => ({ ...prev, position: pos }));
  };

  const handleColorChange = (color: string) => {
    setPreviewSettings((prev) => ({ ...prev, backgroundColor: color }));
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPreviewSettings((prev) => ({
            ...prev,
            wallpaperId: "custom",
            customUrl: result
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOk = () => {
    applySettings();
    closeWindow("display");
  };

  const handleCancel = () => {
    resetPreview();
    closeWindow("display");
  };

  const handleApply = () => {
    applySettings();
  };

  // Close fullscreen screensaver on mouse move or keydown
  useEffect(() => {
    if (!fullscreenScreensaver) return;
    const handleExit = () => setFullscreenScreensaver(false);
    window.addEventListener("mousemove", handleExit);
    window.addEventListener("keydown", handleExit);
    window.addEventListener("mousedown", handleExit);
    return () => {
      window.removeEventListener("mousemove", handleExit);
      window.removeEventListener("keydown", handleExit);
      window.removeEventListener("mousedown", handleExit);
    };
  }, [fullscreenScreensaver]);

  return (
    <div className="display-props-layout">
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === "themes" ? "active" : ""}`}
          onClick={() => setActiveTab("themes")}
        >
          Themes
        </button>
        <button
          className={`tab-btn ${activeTab === "desktop" ? "active" : ""}`}
          onClick={() => setActiveTab("desktop")}
        >
          Desktop
        </button>
        <button
          className={`tab-btn ${activeTab === "screensaver" ? "active" : ""}`}
          onClick={() => setActiveTab("screensaver")}
        >
          Screen Saver
        </button>
        <button
          className={`tab-btn ${activeTab === "appearance" ? "active" : ""}`}
          onClick={() => setActiveTab("appearance")}
        >
          Appearance
        </button>
        <button
          className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </div>

      <div className="tab-body">
        {activeTab === "desktop" && (
          <div className="desktop-tab-content">
            <div className="crt-monitor-container">
              <div className="crt-monitor-bezel">
                <div
                  className="crt-monitor-screen"
                  style={{
                    backgroundColor: previewSettings.backgroundColor,
                    backgroundImage: previewUrl ? `url("${previewUrl}")` : "none",
                    backgroundSize:
                      previewSettings.position === "stretch"
                        ? "100% 100%"
                        : previewSettings.position === "tile"
                        ? "35%"
                        : "auto 60%",
                    backgroundPosition: "center",
                    backgroundRepeat: previewSettings.position === "tile" ? "repeat" : "no-repeat",
                  }}
                >
                  <div className="crt-scanlines" />
                </div>
                <div className="crt-brand-badge">
                  <div className="crt-led-light" />
                </div>
              </div>
              <div className="crt-monitor-stand-neck" />
              <div className="crt-monitor-stand-base" />
            </div>

            <div className="text-xs text-[#000] mb-1 font-semibold">Background:</div>

            <div className="desktop-controls-grid">
              <div className="wallpaper-listbox-container">
                <div className="wallpaper-listbox">
                  {WALLPAPER_LIST.map((wp) => {
                    const isSelected =
                      previewSettings.wallpaperId === wp.id && !previewSettings.customUrl;
                    return (
                      <div
                        key={wp.id}
                        className={`wallpaper-list-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSelectWallpaper(wp)}
                      >
                        {wp.name}
                      </div>
                    );
                  })}
                  {previewSettings.customUrl && (
                    <div className="wallpaper-list-item selected">
                      (Custom Image)
                    </div>
                  )}
                </div>
              </div>

              <div className="desktop-actions-col">
                <button
                  className="xp-dialog-btn w-full mb-3"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse...
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleCustomUpload}
                />

                <div className="mb-3">
                  <label className="text-xs text-gray-800 block mb-1">Position:</label>
                  <select
                    className="xp-dialog-select w-full"
                    value={previewSettings.position}
                    onChange={(e) => handlePositionChange(e.target.value as WallpaperPosition)}
                  >
                    <option value="stretch">Stretch</option>
                    <option value="center">Center</option>
                    <option value="tile">Tile</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-800 block mb-1">Color:</label>
                  <div className="flex items-center gap-2">
                    <select
                      className="xp-dialog-select flex-1"
                      value={previewSettings.backgroundColor}
                      onChange={(e) => handleColorChange(e.target.value)}
                    >
                      {PRESET_COLORS.map((c) => (
                        <option key={c.hex} value={c.hex}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <div
                      className="w-5 h-5 border border-[#716f64] shadow-inner"
                      style={{ backgroundColor: previewSettings.backgroundColor }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "screensaver" && (
          <div className="screensaver-tab-content">
            <div className="crt-monitor-container">
              <div className="crt-monitor-bezel">
                <div className="crt-monitor-screen bg-black flex items-center justify-center overflow-hidden">
                  {screensaverType === "starfield" && (
                    <div className="screensaver-starfield">
                      <div className="star star-1" />
                      <div className="star star-2" />
                      <div className="star star-3" />
                      <div className="star star-4" />
                      <div className="text-[10px] text-white opacity-40 font-mono">Starfield Simulation</div>
                    </div>
                  )}
                  {screensaverType === "windows" && (
                    <div className="screensaver-flying-logo">
                      <div className="w-8 h-8 rounded bg-[#3b82f6] shadow-lg animate-bounce flex items-center justify-center text-white text-[10px] font-bold">
                        XP
                      </div>
                    </div>
                  )}
                  {screensaverType === "matrix" && (
                    <div className="matrix-rain-preview font-mono text-[9px] text-green-500 leading-tight">
                      <div>01101001 10101</div>
                      <div>10100101 01010</div>
                      <div>01001100 11001</div>
                      <div>ULYSSE • RETRO</div>
                    </div>
                  )}
                  {screensaverType === "pipes" && (
                    <div className="pipes-preview w-full h-full flex flex-col justify-around p-2">
                      <div className="h-2 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-full" />
                      <div className="h-2 w-2/3 ml-auto bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full" />
                      <div className="h-2 w-1/2 bg-gradient-to-r from-green-600 via-lime-400 to-green-600 rounded-full" />
                    </div>
                  )}
                </div>
                <div className="crt-brand-badge">
                  <div className="crt-led-light" />
                </div>
              </div>
              <div className="crt-monitor-stand-neck" />
              <div className="crt-monitor-stand-base" />
            </div>

            <fieldset className="xp-groupbox mt-2">
              <legend>Screen saver</legend>
              <div className="flex items-center gap-3">
                <select
                  className="xp-dialog-select flex-1"
                  value={screensaverType}
                  onChange={(e) => setScreensaverType(e.target.value as any)}
                >
                  <option value="starfield">Starfield Simulation</option>
                  <option value="windows">Windows XP 3D Flying Logo</option>
                  <option value="matrix">Matrix Code Rain</option>
                  <option value="pipes">3D Pipes</option>
                </select>
                <button
                  className="xp-dialog-btn px-4"
                  onClick={() => setFullscreenScreensaver(true)}
                >
                  Preview
                </button>
              </div>

              <div className="flex items-center gap-2 mt-3 text-xs text-gray-800">
                <span>Wait:</span>
                <input
                  type="number"
                  defaultValue={10}
                  className="w-12 px-1 py-0.5 border border-[#716f64] text-xs"
                />
                <span>minutes</span>
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === "themes" && (
          <div className="themes-tab-content text-xs text-gray-800">
            <p className="mb-3">
              A theme specifies the desktop background, and a set of sounds, icons, and other elements to help personalize your computer with one click.
            </p>
            <div className="mb-2">
              <label className="block mb-1 font-semibold">Theme:</label>
              <select className="xp-dialog-select w-64" defaultValue="xp">
                <option value="xp">Windows XP (Modified)</option>
                <option value="classic">Windows Classic</option>
                <option value="royale">Windows Royale (Energy Blue)</option>
              </select>
            </div>
            <fieldset className="xp-groupbox mt-4 p-3 bg-gray-50">
              <legend>Sample</legend>
              <div className="p-3 bg-[#ece9d8] border border-[#716f64] text-center text-gray-600">
                Active Theme: Windows XP Luna Classic
              </div>
            </fieldset>
          </div>
        )}

        {activeTab === "appearance" && (
          <div className="appearance-tab-content text-xs text-gray-800">
            <fieldset className="xp-groupbox p-3 mb-3 bg-white">
              <legend>Windows and buttons preview</legend>
              <div className="border border-[#0055ea] rounded-t p-1 bg-gradient-to-r from-[#0055ea] to-[#3b82f6] text-white flex justify-between items-center text-xs font-bold">
                <span>Active Window</span>
                <span className="bg-red-500 px-1.5 py-0.2 rounded text-[10px]">✕</span>
              </div>
              <div className="p-3 bg-[#ece9d8] border-x border-b border-[#0055ea] text-xs">
                Window text and XP Luna styling
              </div>
            </fieldset>

            <div className="space-y-2">
              <div>
                <label className="block mb-0.5 font-semibold">Windows and buttons:</label>
                <select className="xp-dialog-select w-full" defaultValue="luna">
                  <option value="luna">Windows XP style</option>
                  <option value="classic">Windows Classic style</option>
                </select>
              </div>
              <div>
                <label className="block mb-0.5 font-semibold">Color scheme:</label>
                <select className="xp-dialog-select w-full" defaultValue="blue">
                  <option value="blue">Default (blue)</option>
                  <option value="olive">Olive Green</option>
                  <option value="silver">Silver</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="settings-tab-content text-xs text-gray-800">
            <p className="mb-2 font-semibold">Display:</p>
            <p className="mb-4 text-gray-600">
              Plug and Play Monitor on NVIDIA GeForce FX 5900 (Retro Mode Active)
            </p>

            <fieldset className="xp-groupbox p-3">
              <legend>Screen resolution</legend>
              <div className="flex items-center justify-between mb-2">
                <span>Less</span>
                <span className="font-bold">1920 by 1080 pixels</span>
                <span>More</span>
              </div>
              <input type="range" min={1} max={5} defaultValue={4} className="w-full" />
            </fieldset>

            <fieldset className="xp-groupbox p-3 mt-3">
              <legend>Color quality</legend>
              <select className="xp-dialog-select w-44" defaultValue="32">
                <option value="32">Highest (32 bit)</option>
                <option value="16">Medium (16 bit)</option>
                <option value="256">256 Colors</option>
              </select>
            </fieldset>
          </div>
        )}
      </div>

      <div className="dialog-footer-buttons">
        <button className="xp-dialog-btn" onClick={handleOk}>
          OK
        </button>
        <button className="xp-dialog-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button className="xp-dialog-btn" onClick={handleApply}>
          Apply
        </button>
      </div>

      {fullscreenScreensaver && (
        <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center cursor-none">
          {screensaverType === "starfield" && (
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              <div className="starfield-full star-full-1" />
              <div className="starfield-full star-full-2" />
              <div className="starfield-full star-full-3" />
              <div className="text-white opacity-40 font-mono text-sm tracking-widest animate-pulse">
                WINDOWS XP • STARFIELD SIMULATION
              </div>
            </div>
          )}
          {screensaverType === "windows" && (
            <div className="animate-bounce">
              <div className="w-24 h-24 rounded bg-[#0284c7] shadow-2xl flex items-center justify-center text-white text-2xl font-bold border-2 border-white">
                XP
              </div>
            </div>
          )}
          {screensaverType === "matrix" && (
            <div className="font-mono text-green-500 text-lg leading-relaxed select-none">
              <div>01001001 01101110 01110100 01100101</div>
              <div>01110010 01101110 01100101 01110100</div>
              <div>ULYSSE CASTELLO • FULLSTACK DEV</div>
              <div>01000101 01111000 01110000 01101100</div>
            </div>
          )}
          {screensaverType === "pipes" && (
            <div className="w-2/3 h-2/3 flex flex-col justify-around">
              <div className="h-6 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-full shadow-lg" />
              <div className="h-6 w-3/4 ml-auto bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full shadow-lg" />
              <div className="h-6 w-1/2 bg-gradient-to-r from-green-600 via-lime-400 to-green-600 rounded-full shadow-lg" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
