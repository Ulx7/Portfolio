import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { XpIcon } from "../retro/XpIcon";

interface RetroMobileWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RetroMobileWarningModal: React.FC<RetroMobileWarningModalProps> = ({
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="retro-warning-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="window retro-warning-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(330px, 92vw)" }}
      >
        <div className="title-bar">
          <div className="title-bar-left">
            <XpIcon name="my-computer" size={16} className="title-bar-icon" />
            <span className="title-bar-text">Windows XP Mode</span>
          </div>
          <div className="title-bar-controls">
            <button
              aria-label="Close"
              onClick={onClose}
              title="Close"
              type="button"
            />
          </div>
        </div>

        <div className="window-body retro-warning-body">
          <div className="retro-warning-content">
            <div className="retro-warning-icon-wrapper">
              <XpIcon name="my-computer" size={32} />
            </div>
            <div className="retro-warning-text-wrapper">
              <p className="retro-warning-message">
                The Windows XP interactive environment (featuring Paint, DOOM, Pinball, Winamp, and multi-window multitasking) was designed for desktop computers with a keyboard and mouse.
              </p>
            </div>
          </div>

          <div className="retro-warning-footer">
            <button
              type="button"
              className="xp-dialog-btn retro-warning-btn-primary"
              onClick={onClose}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
