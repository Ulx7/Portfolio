import React, { useEffect, useRef } from "react";
import Webamp from "webamp";
import { useWindowManager } from "../../context/WindowManagerContext";
import { WINAMP_PLAYLIST } from "../../config/musicTracks";

export const WinampPlayer: React.FC = () => {
  const { windows, closeWindow, minimizeWindow } = useWindowManager();
  const winampState = windows.winamp;
  const containerRef = useRef<HTMLDivElement>(null);
  const webampInstanceRef = useRef<Webamp | null>(null);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    if (!winampState?.isOpen) {
      if (webampInstanceRef.current) {
        try {
          webampInstanceRef.current.close();
        } catch {
          // Handled
        }
      }
      return;
    }

    // If already initialized and isOpen was toggled back to true, reopen it
    if (webampInstanceRef.current) {
      try {
        webampInstanceRef.current.reopen();
      } catch {
        // Handled
      }
      return;
    }

    if (isInitializingRef.current || !containerRef.current) return;
    if (!Webamp.browserIsSupported()) {
      alert("Tu navegador no soporta la Web Audio API requerida para Winamp.");
      return;
    }

    isInitializingRef.current = true;

    try {
      const webamp = new Webamp({
        initialTracks: WINAMP_PLAYLIST,
      });

      webampInstanceRef.current = webamp;

      webamp.onClose(() => {
        closeWindow("winamp");
      });

      webamp.onMinimize(() => {
        minimizeWindow("winamp");
      });

      webamp.renderWhenReady(containerRef.current).catch((err) => {
        console.error("Error al renderizar Webamp:", err);
      });
    } catch (err) {
      console.error("Error al instanciar Webamp:", err);
    } finally {
      isInitializingRef.current = false;
    }

    return () => {
      if (webampInstanceRef.current) {
        try {
          webampInstanceRef.current.dispose();
        } catch {
          // Handled
        }
        webampInstanceRef.current = null;
      }
    };
  }, [winampState?.isOpen, closeWindow, minimizeWindow]);

  if (!winampState?.isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="webamp-desktop-wrapper"
      style={{
        display: winampState.isMinimized ? "none" : "block",
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 55,
      }}
    />
  );
};
