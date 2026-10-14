import React, { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";

export const PinballWindow: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Local, borderless, hardware-accelerated Space Cadet Pinball with native arrow keys support
  const pinballUrl = "/pinball/index.html";

  const handleLaunch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        iframeRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  return (
    <div className="doom-window-layout">
      {/* Main Viewport */}
      <div className="doom-viewport-container" style={{ background: "#000000" }}>
        {!isPlaying ? (
          <div className="doom-splash-screen">
            <div className="doom-title-art">
              <h1
                style={{
                  fontFamily: "Impact, sans-serif",
                  fontSize: "3.5rem",
                  color: "#38bdf8",
                  letterSpacing: "3px",
                  textShadow: "0 0 20px #0284c7, 3px 3px 0 #0369a1",
                  marginBottom: "0.25rem"
                }}
              >
                3D PINBALL
              </h1>
              <p className="doom-version-badge" style={{ color: "#38bdf8", marginBottom: "1.25rem" }}>
                Space Cadet • Windows XP Edition
              </p>
            </div>

            <div className="doom-briefing">
              <p className="doom-desc">
                The definitive Windows XP classic, faithfully recreated in WebAssembly with original sounds, music, and physics.
              </p>
              <p className="doom-keys-tip">
                Controls: <strong>Left / Right Arrows</strong> (or <strong>Z</strong> / <strong>/</strong>) = Flippers • <strong>Space</strong> / <strong>Down Arrow</strong> = Pull Plunger • <strong>X</strong> / <strong>.</strong> = Bump Table.
              </p>
            </div>

            <button
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleLaunch}
              className="doom-start-btn"
              style={{
                background: "#0284c7",
                borderColor: "#38bdf8",
                boxShadow: "0 0 25px rgba(2, 132, 199, 0.6)"
              }}
            >
              <Play size={18} className="inline mr-2" />
              PLAY 3D PINBALL
            </button>
          </div>
        ) : (
          <div className="doom-iframe-wrapper">
            <iframe
              ref={iframeRef}
              src={pinballUrl}
              title="3D Pinball - Space Cadet"
              className="doom-iframe"
              allow="autoplay; fullscreen; gamepad; keyboard"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="status-bar">
        <div className="status-bar-field" style={{ flex: 1 }}>
          {isPlaying
            ? "Space Cadet Pinball • Left/Right Arrows = Flippers • Space = Launch • F2 = New Game"
            : "Ready to launch Space Cadet"}
        </div>
        <div className="status-bar-field" style={{ width: 140 }}>
          SDL2 WebAudio 44kHz
        </div>
      </div>
    </div>
  );
};
