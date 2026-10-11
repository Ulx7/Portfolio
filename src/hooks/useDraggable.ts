import { useState, useRef, useEffect, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

export const useDraggable = (
  initialPosition: Position,
  onPositionChange?: (pos: Position) => void,
  isMaximized: boolean = false
) => {
  const [position, setPosition] = useState<Position>(initialPosition);
  const isDragging = useRef(false);
  const dragStartOffset = useRef<Position>({ x: 0, y: 0 });

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return;
      // Only drag with left mouse click and not when clicking title-bar-controls buttons
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest(".title-bar-controls")) return;

      isDragging.current = true;
      dragStartOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging.current) return;
        const newX = Math.max(0, Math.min(window.innerWidth - 120, moveEvent.clientX - dragStartOffset.current.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 80, moveEvent.clientY - dragStartOffset.current.y));
        const newPos = { x: newX, y: newY };
        setPosition(newPos);
        onPositionChange?.(newPos);
      };

      const onMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [isMaximized, position, onPositionChange]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isMaximized) return;
      if ((e.target as HTMLElement).closest(".title-bar-controls")) return;
      const touch = e.touches[0];
      if (!touch) return;

      isDragging.current = true;
      dragStartOffset.current = {
        x: touch.clientX - position.x,
        y: touch.clientY - position.y
      };

      const onTouchMove = (moveEvent: TouchEvent) => {
        if (!isDragging.current) return;
        const t = moveEvent.touches[0];
        if (!t) return;
        const newX = Math.max(0, Math.min(window.innerWidth - 60, t.clientX - dragStartOffset.current.x));
        const newY = Math.max(0, Math.min(window.innerHeight - 60, t.clientY - dragStartOffset.current.y));
        const newPos = { x: newX, y: newY };
        setPosition(newPos);
        onPositionChange?.(newPos);
      };

      const onTouchEnd = () => {
        isDragging.current = false;
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      };

      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    },
    [isMaximized, position, onPositionChange]
  );

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  return { position, onMouseDown, onTouchStart };
};
