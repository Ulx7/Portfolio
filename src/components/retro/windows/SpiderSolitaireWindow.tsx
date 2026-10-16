import React, { useRef, useState, useEffect } from "react";
import { useWindowManager } from "../../../context/WindowManagerContext";

export const SpiderSolitaireWindow: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { windows, closeWindow } = useWindowManager();
  const [gameMenuOpen, setGameMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const spiderWin = windows["spider"];

  const handleRestart = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "/spider/index.html?v=4";
    }
    setGameMenuOpen(false);
  };

  const triggerIframeResize = () => {
    try {
      const win = iframeRef.current?.contentWindow as any;
      if (win && win.SimpleGame && win.SimpleGame.resize) {
        win.SimpleGame.resize();
      }
    } catch {}
  };

  useEffect(() => {
    const timer1 = setTimeout(triggerIframeResize, 50);
    const timer2 = setTimeout(triggerIframeResize, 250);
    const timer3 = setTimeout(triggerIframeResize, 600);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [spiderWin?.isMaximized, spiderWin?.size, spiderWin?.isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        handleRestart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="spider-window-layout"
      onClick={() => {
        if (gameMenuOpen) setGameMenuOpen(false);
        if (helpOpen) setHelpOpen(false);
      }}
    >
      <div className="ie-menubar relative z-30" style={{ userSelect: "none" }}>
        <div className="relative inline-block">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setGameMenuOpen(!gameMenuOpen);
              setHelpOpen(false);
            }}
          >
            Game
          </span>
          {gameMenuOpen && (
            <div
              className="absolute left-0 top-full mt-0.5 w-44 bg-[#ffffff] border border-[#716f64] shadow-md py-1 z-50 text-xs text-[#000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex justify-between items-center"
                onClick={handleRestart}
              >
                <span>New Game</span>
                <span className="text-[10px] text-gray-400">F2</span>
              </div>
              <div className="border-t border-gray-200 my-1" />
              <div
                className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer"
                onClick={handleRestart}
              >
                Restart This Game
              </div>
              <div className="border-t border-gray-200 my-1" />
              <div
                className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer"
                onClick={() => {
                  setGameMenuOpen(false);
                  closeWindow("spider");
                }}
              >
                Exit
              </div>
            </div>
          )}
        </div>

        <div className="relative inline-block">
          <span
            onClick={(e) => {
              e.stopPropagation();
              setHelpOpen(!helpOpen);
              setGameMenuOpen(false);
            }}
          >
            Help
          </span>
          {helpOpen && (
            <div
              className="absolute left-0 top-full mt-0.5 w-56 bg-[#ffffff] border border-[#716f64] shadow-md py-1 z-50 text-xs text-[#000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer"
                onClick={() => {
                  setHelpOpen(false);
                  alert(
                    "Reglas de Spider Solitaire:\n\n" +
                    "• El objetivo es armar 8 escaleras completas del mismo palo desde el Rey hasta el As (K, Q, J, 10... A) en el tablero.\n" +
                    "• Al completar una escalera completa de un mismo palo, se retira de la mesa.\n" +
                    "• Podés colocar cualquier carta sobre otra cuyo valor sea 1 superior.\n" +
                    "• Podés mover secuencias de cartas juntas siempre que sean del mismo palo.\n" +
                    "• Cuando no tengas más movimientos, hacé clic en el mazo de cartas abajo a la derecha para repartir una carta en cada columna."
                  );
                }}
              >
                How to Play Spider Solitaire
              </div>
              <div className="border-t border-gray-200 my-1" />
              <div
                className="px-3 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer"
                onClick={() => {
                  setHelpOpen(false);
                  alert("Spider Solitaire • Windows XP Edition\nVersión retro fiel para el portfolio de Ulysse Castello.");
                }}
              >
                About Spider Solitaire
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="spider-viewport-container">
        <div className="spider-iframe-wrapper">
          <iframe
            ref={iframeRef}
            src="/spider/index.html?v=4"
            title="Spider Solitaire"
            className="spider-iframe"
            allow="autoplay; fullscreen"
            onLoad={triggerIframeResize}
          />
        </div>
      </div>

      <div className="status-bar" style={{ margin: 0 }}>
        <div className="status-bar-field" style={{ flex: 1 }}>
          Spider Solitaire • 104 Cards • Windows XP Edition
        </div>
        <div className="status-bar-field" style={{ width: 100 }}>
          F2: New Game
        </div>
      </div>
    </div>
  );
};
