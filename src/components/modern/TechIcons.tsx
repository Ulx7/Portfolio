import React from "react";

interface TechIconProps {
  name: string;
  size?: number;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 16 }) => {
  const norm = name.toLowerCase();

  if (norm.includes("react")) {
    return (
      <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  if (norm.includes("python")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M11.9 1.5C6.9 1.5 7.2 3.7 7.2 3.7v2.3h4.8v.7H5.2S1.5 6.2 1.5 11.2s3.2 4.9 3.2 4.9h1.9v-2.7c0-3.1 2.7-2.9 2.7-2.9h4.7c2.6 0 2.5-2.5 2.5-2.5V3.8s.4-2.3-4.6-2.3z"
          fill="#3776AB"
        />
        <circle cx="8.9" cy="3.5" r="0.7" fill="#fff" />
        <path
          d="M12.1 22.5c5 0 4.7-2.2 4.7-2.2v-2.3H12v-.7h6.8s3.7.5 3.7-4.5-3.2-4.9-3.2-4.9h-1.9v2.7c0 3.1-2.7 2.9-2.7 2.9H9.9c-2.6 0-2.5 2.5-2.5 2.5v4.2s-.4 2.3 4.7 2.3z"
          fill="#FFD43B"
        />
        <circle cx="15.1" cy="20.5" r="0.7" fill="#fff" />
      </svg>
    );
  }

  if (norm.includes("typescript")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M4 10h6m-3-1v8m5-4.5c.8-.7 1.8-1 2.8-1 1.7 0 3 .8 3 2.2 0 2.4-3.5 2-3.5 3.8 0 .5.5.9 1.4.9 1 0 1.8-.4 2.4-.9m-.1 3.5c-.8.5-1.8.7-2.8.7-2 0-3.4-1-3.4-2.6 0-2.5 3.6-2.2 3.6-3.8 0-.4-.4-.7-1.1-.7-.8 0-1.6.3-2.1.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("javascript")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M7 11v6c0 1.5-.7 2-2 2M13 18.5c1 .5 2 .7 3 .7 2 0 3-1 3-2.5 0-2-3-2-3-3.5 0-.5.5-.8 1.2-.8.8 0 1.6.3 2.2.7" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("java") && !norm.includes("script")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 19c3 1.5 12 1.5 16 0M6 21c3 1 9 1 12 0" stroke="#E76F00" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 14c-1-3 4-5 1-9 0 0 3 2 1 5 3 0 5-2 3-6 0 0 5 4-1 9 5 0 7-3 5-7 0 0 6 6-4 10" stroke="#5382A1" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("c#") || norm.includes("csharp")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#9B4F96" />
        <path d="M12 7c-3 0-5 2.2-5 5s2 5 5 5c2 0 3.8-1 4.5-2.5M17 9v6M14 11h6M14 13h6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("next")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#000" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <path d="M8 7v10M16 7v6m-8-5 9 10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes("astro")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8 6 6 12 6 17c0 3 2.5 5 6 5s6-2 6-5c0-5-2-11-6-15z" fill="#BC52EE" />
        <path d="M12 14c-1.5 2-2 4-1 6 1.5-.5 3-2 3-4-1-1-1.5-1.5-2-2z" fill="#FF5D01" />
      </svg>
    );
  }

  if (norm.includes("tailwind")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 10c1.5-3 4-3.5 5-2 1.5 2 2.5 3 5 3 2 0 3.5-1.5 4.5-3.5-1.5 3-4 3.5-5 2-1.5-2-2.5-3-5-3-2 0-3.5 1.5-4.5 3.5zm-4 7c1.5-3 4-3.5 5-2 1.5 2 2.5 3 5 3 2 0 3.5-1.5 4.5-3.5-1.5 3-4 3.5-5 2-1.5-2-2.5-3-5-3-2 0-3.5 1.5-4.5 3.5z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  if (norm.includes("spring")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M19 4C11 3 5 9 5 17c5 1 12-2 15-9 1-2.5 0-3.5-1-4z" fill="#6DB33F" />
        <path d="M7 17c3-3 7-5 12-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes(".net") || norm.includes("dotnet")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#512BD4" />
        <path d="M6 14h2M9 10l2 6 2-6M15 14h3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("node")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" fill="#539E43" />
        <path d="M12 6v12M7.5 9l9 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("pyspark") || norm.includes("spark")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" fill="#E25A1C" />
      </svg>
    );
  }

  if (norm.includes("sql") || norm.includes("database")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#CC292B" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="#CC292B" strokeWidth="1.8" fill="none" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="#CC292B" strokeWidth="1.8" fill="none" />
      </svg>
    );
  }

  if (norm.includes("mongo")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 2C9 7 7 12 7 16c0 4 2 6 5 6s5-2 5-6c0-4-2-9-5-14z" fill="#47A248" />
        <path d="M12 2v20" stroke="#fff" strokeWidth="1" />
      </svg>
    );
  }

  if (norm.includes("docker")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M2 13c1 0 3 .5 4 0 2-1 4-1 6 0 2 1 4 0 5-1 2-2 3-5 1-8-2 0-3 1-4 2-1-2-3-2-4-2v3H6v2H2v4z" fill="#2496ED" />
        <rect x="5" y="9" width="2" height="2" fill="#fff" />
        <rect x="8" y="9" width="2" height="2" fill="#fff" />
        <rect x="8" y="6" width="2" height="2" fill="#fff" />
      </svg>
    );
  }

  if (norm.includes("azure")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M13.5 2.5L5 17.5h6.5l4-7.5L20 21.5H4l1.5-3" stroke="#0078D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  if (norm.includes("aws")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M4 16c4 3 12 3 16 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 14.5l2 1.5-2 1.5" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M6 10l2-4 2 4M13 6v4M17 7c-1 0-2 .5-2 1.5s1 1.5 2 1.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("git")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" transform="rotate(45 12 12)" fill="#F05032" />
        <circle cx="10" cy="14" r="1.5" fill="#fff" />
        <circle cx="14" cy="10" r="1.5" fill="#fff" />
        <path d="M10 14l4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // Default clean code icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#e07a5f" strokeWidth="2" strokeLinecap="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
};
