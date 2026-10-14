import React, { useRef, useState, useEffect } from "react";
import { XpIcon } from "./XpIcon";

export interface Position {
  x: number;
  y: number;
}

interface DesktopIconProps {
  id: string;
  title: string;
  iconName: string;
  isSelected: boolean;
  position: Position;
  onSelect: () => void;
  onOpen: () => void;
  onPositionChange: (newPos: Position) => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  title,
  iconName,
  isSelected,
  position,
  onSelect,
  onOpen,
  onPositionChange
}) => {
  const [currentPos, setCurrentPos] = useState<Position>(position);
  const [isDragging, setIsDragging] = useState(false);
  const dragEndTimeRef = useRef(0);
  const lastTapTimeRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Sync with prop when not actively dragging
  useEffect(() => {
    if (!isDraggingRef.current) {
      setCurrentPos(position);
    }
  }, [position.x, position.y]);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only primary button
    if (e.button !== 0) return;
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const initialPos = { ...currentPos };
    let hasMoved = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (!hasMoved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
        hasMoved = true;
        isDraggingRef.current = true;
        setIsDragging(true);
        onSelect();
      }

      if (hasMoved) {
        const maxX = Math.max(0, window.innerWidth - 76);
        const maxY = Math.max(0, window.innerHeight - 34 - 76);
        const nextX = Math.max(0, Math.min(maxX, initialPos.x + dx));
        const nextY = Math.max(0, Math.min(maxY, initialPos.y + dy));
        setCurrentPos({ x: nextX, y: nextY });
      }
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      if (hasMoved) {
        isDraggingRef.current = false;
        setIsDragging(false);
        dragEndTimeRef.current = Date.now();

        const dx = upEvent.clientX - startX;
        const dy = upEvent.clientY - startY;
        const maxX = Math.max(0, window.innerWidth - 76);
        const maxY = Math.max(0, window.innerHeight - 34 - 76);
        const finalPos = {
          x: Math.max(0, Math.min(maxX, initialPos.x + dx)),
          y: Math.max(0, Math.min(maxY, initialPos.y + dy))
        };
        setCurrentPos(finalPos);
        onPositionChange(finalPos);
      } else {
        onSelect();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    e.stopPropagation();

    const startX = touch.clientX;
    const startY = touch.clientY;
    const initialPos = { ...currentPos };
    let hasMoved = false;

    const handleTouchMove = (moveEvent: TouchEvent) => {
      const t = moveEvent.touches[0];
      if (!t) return;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (!hasMoved && (Math.abs(dx) > 5 || Math.abs(dy) > 5)) {
        hasMoved = true;
        isDraggingRef.current = true;
        setIsDragging(true);
        onSelect();
      }

      if (hasMoved) {
        if (moveEvent.cancelable) moveEvent.preventDefault();
        const maxX = Math.max(0, window.innerWidth - 76);
        const maxY = Math.max(0, window.innerHeight - 34 - 76);
        const nextX = Math.max(0, Math.min(maxX, initialPos.x + dx));
        const nextY = Math.max(0, Math.min(maxY, initialPos.y + dy));
        setCurrentPos({ x: nextX, y: nextY });
      }
    };

    const handleTouchEnd = () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);

      if (hasMoved) {
        isDraggingRef.current = false;
        setIsDragging(false);
        dragEndTimeRef.current = Date.now();
        onPositionChange(currentPos);
      } else {
        const now = Date.now();
        if (now - lastTapTimeRef.current < 350) {
          onOpen();
        } else {
          onSelect();
        }
        lastTapTimeRef.current = now;
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (Date.now() - dragEndTimeRef.current < 250) return;
    onOpen();
  };

  return (
    <div
      className={`desktop-shortcut ${isSelected ? "selected" : ""} ${isDragging ? "dragging" : ""}`}
      style={{
        left: `${currentPos.x}px`,
        top: `${currentPos.y}px`,
        zIndex: isDragging ? 50 : isSelected ? 4 : 2
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={handleDoubleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen();
      }}
    >
      <div className="icon-wrapper">
        <XpIcon name={iconName} size={36} />
      </div>
      <span className="icon-caption">{title}</span>
    </div>
  );
};
