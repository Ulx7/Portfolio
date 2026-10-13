import React, { useEffect, useRef } from "react";

export const DotGridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface CosmicDot {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      rgb: string;
    }

    let dots: CosmicDot[] = [];

    // Warm terracotta, warm vibrant orange, and amber oxide palette
    const colors = [
      "224, 86, 56",  // #e05638 terracota
      "255, 107, 74", // #ff6b4a naranja cálido
      "217, 119, 6",  // #d97706 óxido
    ];

    const setupAndDraw = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Deep matte carbon base background so micro-stars pop distinctly
      ctx.fillStyle = "#0c0c0c";
      ctx.fillRect(0, 0, width, height);

      dots = [];
      // Generous density matching Cleo Balaranjith (~700-1000 micro-stars across screen)
      const count = Math.floor((width * height) / 2400);

      for (let i = 0; i < count; i++) {
        const rgb = colors[Math.floor(Math.random() * colors.length)];
        // Visible opacity strictly between 0.45 and 0.70 as requested
        const alpha = 0.45 + Math.random() * 0.25;
        // Fine micro-points diameter strictly 1px to 1.5px (radius 0.55 to 0.75)
        const radius = 0.55 + Math.random() * 0.22;

        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          alpha,
          rgb,
        });
      }

      // Draw all micro-points
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        ctx.fillStyle = `rgba(${d.rgb}, ${d.alpha.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    setupAndDraw();

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupAndDraw();
      }, 150);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dot-grid-canvas"
      style={{
        position: "fixed",
        inset: 0,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
