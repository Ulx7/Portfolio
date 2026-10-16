import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

export const DoomWindow: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const doomUrl = "https://ross.aleksei.digital/98/DoomJS/index-jsdos.html";

  const handleLaunch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        iframeRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  return (
    <div className="doom-window-layout">
      <div className="ie-menubar">
        <span>Game</span>
        <span>Sound</span>
        <span>Controls</span>
        <span>Options</span>
        <span>Help</span>
      </div>

      <div className="doom-viewport-container">
        {!isPlaying ? (
          <div className="doom-splash-screen">
            <div className="doom-title-art">
              <h1 className="doom-logo-text">DOOM</h1>
              <p className="doom-version-badge">MS-DOS v1.9 Shareware • 1993</p>
            </div>

            <div className="doom-briefing">
              <p className="doom-desc">Classic retro gaming experience integrated into Windows XP.</p>
              <p className="doom-keys-tip">
                Controls: W,A,S,D / Arrow keys to move • Ctrl / Left Click to fire • Space to open doors.
              </p>
            </div>

            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleLaunch}
              className="doom-start-btn"
            >
              <Play size={18} className="inline mr-2" />
              START GAME
            </button>
          </div>
        ) : (
          <div className="doom-iframe-wrapper">
            <iframe
              ref={iframeRef}
              src={doomUrl}
              title="DOOM 95 Game Player"
              className="doom-iframe"
              allow="autoplay; fullscreen; gamepad; keyboard"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            />
          </div>
        )}
      </div>

      <div className="status-bar">
        <div className="status-bar-field" style={{ flex: 1 }}>
          {isPlaying ? "Running DOOM.EXE in DOSBox emulator • Click game to play" : "Ready to launch"}
        </div>
        <div className="status-bar-field" style={{ width: 140 }}>
          Sound 22kHz • MS-DOS
        </div>
      </div>
    </div>
  );
};
