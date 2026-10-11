import React from "react";

interface TechMicroIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const TechMicroIcon: React.FC<TechMicroIconProps> = ({
  name,
  size = 14,
  className = ""
}) => {
  const norm = name.toLowerCase();

  // React
  if (norm.includes("react")) {
    return (
      <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
        <circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none" />
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </svg>
    );
  }

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M9 16V8l8 9.5M15 8v4.5" />
      </svg>
    );
  }

  // Astro
  if (norm.includes("astro")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2l3.5 7h-7L12 2z" />
        <path d="M5 14c2.5 0 3.5 4 7 4s4.5-4 7-4" />
        <path d="M8.5 9L6 14h12l-2.5-5" />
      </svg>
    );
  }

  // TypeScript / TS
  if (norm.includes("typescript")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M6 9h6M9 9v9M14 13.5c.8-.7 1.8-1 2.8-1 1.7 0 3 .8 3 2.2 0 2.4-3.5 2-3.5 3.8 0 .5.5.9 1.4.9.8 0 1.5-.3 2.1-.8" />
      </svg>
    );
  }

  // JavaScript / JS
  if (norm.includes("javascript")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 11v6c0 1.5-.7 2-2 2M13 18.5c1 .5 2 .7 3 .7 2 0 3-1 3-2.5 0-2-3-2-3-3.5 0-.5.5-.8 1.2-.8.8 0 1.6.3 2.2.7" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 12c1.5-3 3.5-4 6-3 1.5.6 2.5 1.5 3.5 1.5 2 0 3-1.5 3.5-3.5-1.5 3-3.5 4-6 3-1.5-.6-2.5-1.5-3.5-1.5-2 0-3 1.5-3.5 3.5z" />
        <path d="M3 18c1.5-3 3.5-4 6-3 1.5.6 2.5 1.5 3.5 1.5 2 0 3-1.5 3.5-3.5-1.5 3-3.5 4-6 3-1.5-.6-2.5-1.5-3.5-1.5-2 0-3 1.5-3.5 3.5z" />
      </svg>
    );
  }

  // HTML / CSS
  if (norm.includes("html") || norm.includes("css") || norm.includes("ui/ux")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3z" />
        <path d="M8 8h8M7.5 12h8.5M8 16l4 1.2 4-1.2" />
      </svg>
    );
  }

  // Spring Boot / Java
  if (norm.includes("spring") || (norm.includes("java") && !norm.includes("script"))) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2a10 10 0 0110 10c0 4.5-3 8-7.5 9.5-3 .9-6.5-.5-8.5-3-2-2.5-2.5-6-1-9C6.5 5.5 9 3 12 2z" />
        <path d="M8 12c2-3 5-3 8 0M9.5 15c1.5-2 3.5-2 5 0" />
      </svg>
    );
  }

  // .NET / C#
  if (norm.includes(".net") || norm.includes("c#")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="M8 8v8M16 8v8M6 11h12M6 14h12" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes("node")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
        <path d="M12 6v12M7.5 9l9 6" />
      </svg>
    );
  }

  // RESTful APIs / API
  if (norm.includes("api") || norm.includes("rest")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 12h16M14 6l6 6-6 6M10 18l-6-6 6-6" />
      </svg>
    );
  }

  // Architecture / Design Patterns / OOP / MVC
  if (norm.includes("mvc") || norm.includes("pattern") || norm.includes("oop") || norm.includes("architecture")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
      </svg>
    );
  }

  // PySpark / Spark
  if (norm.includes("spark")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.9 4.9l4.3 4.3M14.8 14.8l4.3 4.3M19.1 4.9l-4.3 4.3M9.2 14.8l-4.3 4.3" />
      </svg>
    );
  }

  // Python / Pandas
  if (norm.includes("python") || norm.includes("pandas")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M11 2C6.5 2 6.5 4 6.5 4v2.5H11v1H4.5S2 7 2 11.5s2.5 4.5 2.5 4.5h2v-2c0-2.5 2-2.5 2-2.5h4.5c2 0 2-2 2-2V4s0-2-4-2z" />
        <circle cx="8" cy="3.8" r="0.8" fill="currentColor" />
        <path d="M13 22c4.5 0 4.5-2 4.5-2v-2.5H13v-1h6.5s2.5.5 2.5-4-2.5-4.5-2.5-4.5h-2v2c0 2.5-2 2.5-2 2.5H11c-2 0-2 2-2 2V20s0 2 4 2z" />
        <circle cx="16" cy="20.2" r="0.8" fill="currentColor" />
      </svg>
    );
  }

  // SQL Server / MySQL / Databases / Modeling
  if (norm.includes("sql") || norm.includes("data modeling")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes("mongo")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2C9 7 7 11 7 15a5 5 0 0010 0c0-4-2-8-5-13z" />
        <path d="M12 2v20" />
      </svg>
    );
  }

  // Hive / Hadoop
  if (norm.includes("hive") || norm.includes("hadoop")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 2l7 4v8l-7 4-7-4V6z" />
        <path d="M12 6l3.5 2v4L12 14l-3.5-2V8z" />
      </svg>
    );
  }

  // Azure / Cloud
  if (norm.includes("azure") || norm.includes("aws") || norm.includes("cloud")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M17.5 19H9a7 7 0 116.71-9.01A5 5 0 0117.5 19z" />
      </svg>
    );
  }

  // Docker
  if (norm.includes("docker")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 13h20c-1 5-5 8-10 8S3 18 2 13z" />
        <rect x="5" y="9.5" width="2.5" height="2.5" rx="0.5" />
        <rect x="8.5" y="9.5" width="2.5" height="2.5" rx="0.5" />
        <rect x="12" y="9.5" width="2.5" height="2.5" rx="0.5" />
        <rect x="8.5" y="6" width="2.5" height="2.5" rx="0.5" />
        <rect x="12" y="6" width="2.5" height="2.5" rx="0.5" />
      </svg>
    );
  }

  // Git / GitHub / CI/CD
  if (norm.includes("git") || norm.includes("ci")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M6 9v6M9 6h4a4 4 0 014 4v0" />
      </svg>
    );
  }

  // Agile / Scrum
  if (norm.includes("agile") || norm.includes("scrum")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67" />
      </svg>
    );
  }

  // Fallback terminal / code micro-icon
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 17l6-6-6-6M12 19h8" />
    </svg>
  );
};
