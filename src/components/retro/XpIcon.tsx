import React from "react";

interface XpIconProps {
  name: string;
  size?: number;
  className?: string;
}

const XP_ICON_MAP: Record<string, string> = {
  ie: "/icons/xp/ie.png",
  folder: "/icons/xp/folder.png",
  notepad: "/icons/xp/notepad.png",
  cmd: "/icons/xp/cmd.png",
  mail: "/icons/xp/mail.png",
  bomb: "/icons/xp/minesweeper.png",
  minesweeper: "/icons/xp/minesweeper.png",
  game: "/icons/xp/doom.png",
  doom: "/icons/xp/doom.png",
  pinball: "/icons/xp/pinball.png",
  paint: "/icons/xp/paint.png",
  winamp: "/icons/xp/winamp.png",
  "my-computer": "/icons/xp/my-computer.png",
  "recycle-bin": "/icons/xp/recycle-bin.png",
};

export const XpIcon: React.FC<XpIconProps> = ({ name, size = 32, className = "" }) => {
  const [imgError, setImgError] = React.useState(false);
  const iconPath = XP_ICON_MAP[name];

  if (iconPath && !imgError) {
    return (
      <img
        src={iconPath}
        alt={name}
        width={size}
        height={size}
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: "contain",
          display: "inline-block",
          imageRendering: "auto",
          userSelect: "none",
          pointerEvents: "none",
          flexShrink: 0,
        }}
        draggable={false}
        onError={() => setImgError(true)}
      />
    );
  }

  switch (name) {
    case "ie":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue 'e' with gold halo */}
          <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#FBBF24" strokeWidth="4" transform="rotate(-30 24 24)" />
          <circle cx="24" cy="24" r="16" fill="#0284C7" />
          <path
            d="M16 22H32M32 22C32 17 28 14 24 14C19 14 15 18 15 24C15 30 19 34 24 34C28 34 31 31 32 28"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "folder":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10C6 8.89543 6.89543 8 8 8H18L22 14H40C41.1046 14 42 14.8954 42 16V36C42 37.1046 41.1046 38 40 38H8C6.89543 38 6 37.1046 6 36V10Z" fill="#F59E0B" />
          <path d="M4 18H44L40 38H4L4 18Z" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
          <rect x="12" y="22" width="20" height="2" fill="#FFFFFF" opacity="0.8" />
          <rect x="12" y="26" width="14" height="2" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );

    case "notepad":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="6" width="26" height="36" rx="2" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          <rect x="10" y="6" width="26" height="6" fill="#3B82F6" />
          <line x1="16" y1="18" x2="30" y2="18" stroke="#94A3B8" strokeWidth="2" />
          <line x1="16" y1="24" x2="30" y2="24" stroke="#94A3B8" strokeWidth="2" />
          <line x1="16" y1="30" x2="26" y2="30" stroke="#94A3B8" strokeWidth="2" />
          <path d="M28 32L38 22L42 26L32 36L26 38L28 32Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
        </svg>
      );

    case "cmd":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="8" width="36" height="30" rx="3" fill="#1E293B" stroke="#475569" strokeWidth="2" />
          <rect x="6" y="8" width="36" height="6" fill="#334155" />
          <text x="12" y="26" fill="#10B981" fontFamily="monospace" fontSize="13" fontWeight="bold">
            C:&gt;_
          </text>
        </svg>
      );

    case "mail":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="12" width="36" height="24" rx="2" fill="#F8FAFC" stroke="#0284C7" strokeWidth="2" />
          <path d="M6 14L24 28L42 14" stroke="#0284C7" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="36" cy="18" r="4" fill="#EF4444" />
        </svg>
      );

    case "bomb":
    case "minesweeper":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="24" cy="26" r="12" fill="#0F172A" />
          <line x1="24" y1="10" x2="24" y2="14" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="12" y1="18" x2="15" y2="20" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="36" y1="18" x2="33" y2="20" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="22" r="3" fill="#FFFFFF" opacity="0.8" />
          <path d="M24 10C26 6 32 6 34 8" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <circle cx="35" cy="8" r="2" fill="#FACC15" />
        </svg>
      );

    case "game":
    case "doom":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="10" width="32" height="28" rx="4" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />
          <text x="12" y="28" fill="#FDE047" fontFamily="Impact, sans-serif" fontSize="13" fontWeight="bold">
            DOOM
          </text>
          <circle cx="14" cy="14" r="2" fill="#450A0A" />
          <circle cx="34" cy="14" r="2" fill="#450A0A" />
        </svg>
      );

    case "pinball":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="6" width="32" height="36" rx="4" fill="#0B132B" stroke="#3A506B" strokeWidth="2" />
          <path d="M12 12L24 8L36 12V36L24 40L12 36V12Z" fill="#1C2541" />
          <path d="M16 32L21 34L19 36L14 34Z" fill="#E63946" />
          <path d="M32 32L27 34L29 36L34 34Z" fill="#E63946" />
          <circle cx="24" cy="18" r="4" fill="#F4A261" stroke="#E76F51" strokeWidth="1.5" />
          <circle cx="17" cy="22" r="3" fill="#E9C46A" />
          <circle cx="31" cy="22" r="3" fill="#E9C46A" />
          <circle cx="27" cy="28" r="4" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
          <circle cx="26" cy="27" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case "paint":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24 6C13.5 6 6 13.5 6 24C6 34.5 13.5 42 24 42C26.5 42 28.5 40 28.5 37.5C28.5 36.3 28 35.2 27.2 34.4C26.4 33.6 26 32.5 26 31.5C26 29 28 27 30.5 27H35C39.5 27 43 23.5 43 19C43 11.8 34.5 6 24 6Z"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="2"
          />
          <circle cx="14" cy="18" r="3" fill="#EF4444" />
          <circle cx="21" cy="13" r="3" fill="#F59E0B" />
          <circle cx="29" cy="13" r="3" fill="#10B981" />
          <circle cx="36" cy="18" r="3" fill="#3B82F6" />
          <circle cx="16" cy="27" r="3" fill="#8B5CF6" />
          <path d="M22 36L38 10L42 12L25 39L22 36Z" fill="#B45309" />
          <path d="M20 38L22 36L25 39L21 42C19.5 43 18 41 20 38Z" fill="#1E293B" />
        </svg>
      );

    case "my-computer":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="8" width="32" height="24" rx="2" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
          <rect x="12" y="12" width="24" height="16" fill="#0284C7" />
          <path d="M20 32H28V36H20V32Z" fill="#94A3B8" />
          <path d="M14 36H34V39H14V36Z" fill="#64748B" />
        </svg>
      );

    case "recycle-bin":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="14" y="14" width="20" height="24" rx="2" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="2" />
          <rect x="12" y="10" width="24" height="4" rx="1" fill="#1D4ED8" />
          <line x1="20" y1="18" x2="20" y2="32" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="24" y1="18" x2="24" y2="32" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="28" y1="18" x2="28" y2="32" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="#3B82F6" className={className}>
          <rect x="10" y="10" width="28" height="28" rx="4" />
        </svg>
      );
  }
};
