import React from "react";
import { XpIcon } from "./XpIcon";

interface DesktopIconProps {
  id: string;
  title: string;
  iconName: string;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  title,
  iconName,
  isSelected,
  onSelect,
  onOpen
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <div
      className={`desktop-shortcut ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
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
