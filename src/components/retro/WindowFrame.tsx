import React from "react";
import { type WindowId, useWindowManager } from "../../context/WindowManagerContext";
import { useDraggable } from "../../hooks/useDraggable";
import { XpIcon } from "./XpIcon";

interface WindowFrameProps {
  id: WindowId;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ id, children }) => {
  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    updatePosition
  } = useWindowManager();

  const win = windows[id];
  const isActive = activeWindowId === id;

  const { position, onMouseDown, onTouchStart } = useDraggable(
    win.position,
    (newPos) => updatePosition(id, newPos),
    win.isMaximized
  );

  if (!win.isOpen) return null;

  const windowStyle: React.CSSProperties = {
    display: win.isMinimized ? "none" : "flex",
    flexDirection: "column",
    position: "absolute",
    zIndex: win.zIndex,
    ...(win.isMaximized
      ? {
          top: 0,
          left: 0,
          width: "100%",
          height: "calc(100% - 32px)",
          borderRadius: 0
        }
      : {
          top: `${position.y}px`,
          left: `${position.x}px`,
          width: `min(${win.size.width}px, 96vw)`,
          height: `min(${win.size.height}px, 86vh)`
        })
  };

  return (
    <div
      className={`window xp-window-frame ${isActive ? "active" : "inactive"}`}
      style={windowStyle}
      onMouseDown={() => focusWindow(id)}
    >
      <div
        className={`title-bar ${isActive ? "" : "inactive"}`}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onDoubleClick={() => toggleMaximize(id)}
      >
        <div className="title-bar-left">
          <XpIcon name={win.iconName} size={16} className="title-bar-icon" />
          <div className="title-bar-text">{win.title}</div>
        </div>

        <div className="title-bar-controls">
          <button
            aria-label="Minimize"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              (e.currentTarget as HTMLButtonElement).blur();
              minimizeWindow(id);
            }}
            title="Minimize"
          />
          <button
            aria-label={win.isMaximized ? "Restore" : "Maximize"}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              (e.currentTarget as HTMLButtonElement).blur();
              toggleMaximize(id);
            }}
            title={win.isMaximized ? "Restore" : "Maximize"}
          />
          <button
            aria-label="Close"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              (e.currentTarget as HTMLButtonElement).blur();
              closeWindow(id);
            }}
            title="Close"
          />
        </div>
      </div>

      <div className="window-body-container">{children}</div>
    </div>
  );
};
