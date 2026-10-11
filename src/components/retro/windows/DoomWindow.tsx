import React, { useState } from "react";
import { Play, Volume2, Maximize2 } from "lucide-react";

export const DoomWindow: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // High quality lightweight public web DOS embed for Doom shareware
  const doomUrl = "https://dos.zone/player/?bundleUrl=https%3A%2F%2Fcdn.dos.zone%2Fcustom%2Fdos%2Fdoom.jsdos";

  return (
    <div className={`doom-window-layout ${fullscreen ? "fullscreen-doom" : ""}`}>
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
              <p>Experiencia retro integrada en Windows XP.</p>
              <p className="doom-keys-tip">Controles: Flechas de dirección / W,A,S,D para moverte, Ctrl / Espacio para disparar.</p>
            </div>

            <button
              onClick={() => setIsPlaying(true)}
              className="doom-start-btn"
            >
              <Play size={18} className="inline mr-2" />
              INICIAR DOOM (MS-DOS EMULATOR)
            </button>
          </div>
        ) : (
          <div className="doom-iframe-wrapper">
            <iframe
              src={doomUrl}
              title="DOOM Game Player"
              className="doom-iframe"
              allow="autoplay; fullscreen; gamepad"
            />
          </div>
        )}
      </div>

      <div className="status-bar">
        <div className="status-bar-field">
          {isPlaying ? "Running DOOM.EXE in DOSBox emulator" : "Ready to launch"}
        </div>
        <div className="status-bar-field" style={{ width: 100 }}>
          <Volume2 size={12} className="inline mr-1" /> Sound 22kHz
        </div>
        <div
          className="status-bar-field"
          style={{ width: 80, cursor: "pointer" }}
          onClick={() => setFullscreen(!fullscreen)}
        >
          <Maximize2 size={12} className="inline mr-1" /> View
        </div>
      </div>
    </div>
  );
};
