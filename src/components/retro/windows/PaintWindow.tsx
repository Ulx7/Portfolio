import React, { useState, useRef, useEffect, useCallback } from "react";
import { useWindowManager } from "../../../context/WindowManagerContext";
import {
  Pencil,
  Paintbrush,
  Eraser,
  PaintBucket,
  Pipette,
  Minus,
  Square,
  Circle,
  Sparkles,
  Download,
  Trash2
} from "lucide-react";

type ToolType =
  | "pencil"
  | "brush"
  | "eraser"
  | "bucket"
  | "eyedropper"
  | "airbrush"
  | "line"
  | "rectangle"
  | "ellipse";

const PALETTE_COLORS: string[] = [
  // Row 1 (Darks / Saturated)
  "#000000",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#008080",
  "#000080",
  "#800080",
  "#808040",
  "#004040",
  "#0080FF",
  "#004080",
  "#8000FF",
  "#804000",
  // Row 2 (Lights / Pastels)
  "#FFFFFF",
  "#C0C0C0",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FFFF80",
  "#00FF80",
  "#80FFFF",
  "#8080FF",
  "#FF80FF",
  "#FF8040"
];

const BRUSH_SIZES = [2, 4, 8, 12];

export const PaintWindow: React.FC = () => {
  const { closeWindow } = useWindowManager();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeTool, setActiveTool] = useState<ToolType>("pencil");
  const [primaryColor, setPrimaryColor] = useState<string>("#000000");
  const [secondaryColor, setSecondaryColor] = useState<string>("#FFFFFF");
  const [brushSize, setBrushSize] = useState<number>(4);
  const [fillStyle, setFillStyle] = useState<"outline" | "fill" | "both">("outline");

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [canvasSize] = useState<{ width: number; height: number }>({ width: 620, height: 420 });

  const isDrawingRef = useRef(false);
  const startPointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sprayIntervalRef = useRef<number | null>(null);

  // Undo / Redo history stack
  const historyRef = useRef<ImageData[]>([]);
  const historyStepRef = useRef<number>(-1);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Save current canvas state to history
  const saveState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // Truncate redo history if new action taken
    const newHistory = historyRef.current.slice(0, historyStepRef.current + 1);
    newHistory.push(data);

    // Limit history stack size to 25 steps to save memory
    if (newHistory.length > 25) {
      newHistory.shift();
    }

    historyRef.current = newHistory;
    historyStepRef.current = newHistory.length - 1;
    setCanUndo(historyStepRef.current > 0);
    setCanRedo(false);
  }, []);

  const handleUndo = useCallback(() => {
    if (historyStepRef.current <= 0) return;
    historyStepRef.current -= 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.putImageData(historyRef.current[historyStepRef.current], 0, 0);
    setCanUndo(historyStepRef.current > 0);
    setCanRedo(true);
  }, []);

  const handleRedo = useCallback(() => {
    if (historyStepRef.current >= historyRef.current.length - 1) return;
    historyStepRef.current += 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.putImageData(historyRef.current[historyStepRef.current], 0, 0);
    setCanUndo(true);
    setCanRedo(historyStepRef.current < historyRef.current.length - 1);
  }, []);

  // Initialize canvas with clean white background
  useEffect(() => {
    const canvas = canvasRef.current;
    const preview = previewCanvasRef.current;
    if (!canvas || !preview) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;
    preview.width = canvasSize.width;
    preview.height = canvasSize.height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  }, [canvasSize.width, canvasSize.height, saveState]);

  // Download drawing as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "untitled.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Clear canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  // Flood fill algorithm
  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    const width = canvas.width;
    const height = canvas.height;

    // Convert hex fillColor to RGBA
    const tempEl = document.createElement("div");
    tempEl.style.color = fillColor;
    document.body.appendChild(tempEl);
    const rgbStr = window.getComputedStyle(tempEl).color;
    document.body.removeChild(tempEl);
    const rgbMatch = rgbStr.match(/\d+/g);
    if (!rgbMatch) return;
    const targetR = parseInt(rgbMatch[0], 10);
    const targetG = parseInt(rgbMatch[1], 10);
    const targetB = parseInt(rgbMatch[2], 10);
    const targetA = 255;

    const startIndex = (startY * width + startX) * 4;
    const startR = data[startIndex];
    const startG = data[startIndex + 1];
    const startB = data[startIndex + 2];
    const startA = data[startIndex + 3];

    if (startR === targetR && startG === targetG && startB === targetB && startA === targetA) {
      return;
    }

    const matchesStart = (idx: number) => {
      return (
        data[idx] === startR &&
        data[idx + 1] === startG &&
        data[idx + 2] === startB &&
        data[idx + 3] === startA
      );
    };

    const pixelStack: [number, number][] = [[startX, startY]];

    while (pixelStack.length > 0) {
      const point = pixelStack.pop();
      if (!point) continue;
      const [curX, curY] = point;

      let y1 = curY;
      while (y1 >= 0 && matchesStart((y1 * width + curX) * 4)) {
        y1--;
      }
      y1++;

      let reachLeft = false;
      let reachRight = false;

      while (y1 < height && matchesStart((y1 * width + curX) * 4)) {
        const curIdx = (y1 * width + curX) * 4;
        data[curIdx] = targetR;
        data[curIdx + 1] = targetG;
        data[curIdx + 2] = targetB;
        data[curIdx + 3] = targetA;

        if (curX > 0) {
          if (matchesStart((y1 * width + (curX - 1)) * 4)) {
            if (!reachLeft) {
              pixelStack.push([curX - 1, y1]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (curX < width - 1) {
          if (matchesStart((y1 * width + (curX + 1)) * 4)) {
            if (!reachRight) {
              pixelStack.push([curX + 1, y1]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        y1++;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    saveState();
  };

  // Spray airbrush particles
  const spray = (x: number, y: number, color: string, radius: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = color;
    const density = radius * 4;
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      const px = Math.round(x + r * Math.cos(angle));
      const py = Math.round(y + r * Math.sin(angle));
      ctx.fillRect(px, py, 1, 1);
    }
  };

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = canvasSize.width / rect.width;
    const scaleY = canvasSize.height / rect.height;
    return {
      x: Math.floor((e.clientX - rect.left) * scaleX),
      y: Math.floor((e.clientY - rect.top) * scaleY)
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    isDrawingRef.current = true;
    startPointRef.current = coords;

    const useColor = e.button === 2 ? secondaryColor : primaryColor;

    if (activeTool === "bucket") {
      floodFill(coords.x, coords.y, useColor);
      return;
    }

    if (activeTool === "eyedropper") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const pixel = ctx.getImageData(coords.x, coords.y, 1, 1).data;
      const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
      if (e.button === 2) {
        setSecondaryColor(hex);
      } else {
        setPrimaryColor(hex);
      }
      return;
    }

    if (activeTool === "airbrush") {
      spray(coords.x, coords.y, useColor, brushSize * 2.5);
      sprayIntervalRef.current = window.setInterval(() => {
        spray(startPointRef.current.x, startPointRef.current.y, useColor, brushSize * 2.5);
      }, 35);
      return;
    }

    if (activeTool === "pencil" || activeTool === "brush" || activeTool === "eraser") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.strokeStyle = activeTool === "eraser" ? secondaryColor : useColor;
      ctx.lineWidth = activeTool === "pencil" ? 1 : brushSize;
      ctx.lineCap = activeTool === "pencil" ? "square" : "round";
      ctx.lineJoin = activeTool === "pencil" ? "miter" : "round";
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const coords = getCanvasCoords(e);
    setCursorPos(coords);
    startPointRef.current = coords;

    if (!isDrawingRef.current) return;
    const useColor = e.buttons === 2 ? secondaryColor : primaryColor;

    if (activeTool === "pencil" || activeTool === "brush" || activeTool === "eraser") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.strokeStyle = activeTool === "eraser" ? secondaryColor : useColor;
      ctx.lineWidth = activeTool === "pencil" ? 1 : brushSize;
      ctx.lineCap = activeTool === "pencil" ? "square" : "round";
      ctx.lineJoin = activeTool === "pencil" ? "miter" : "round";
      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
      return;
    }

    if (activeTool === "airbrush") {
      spray(coords.x, coords.y, useColor, brushSize * 2.5);
      return;
    }

    // Live preview for geometric shapes & lines
    if (activeTool === "line" || activeTool === "rectangle" || activeTool === "ellipse") {
      const preview = previewCanvasRef.current;
      if (!preview) return;
      const pCtx = preview.getContext("2d");
      if (!pCtx) return;

      pCtx.clearRect(0, 0, preview.width, preview.height);
      pCtx.strokeStyle = useColor;
      pCtx.fillStyle = secondaryColor;
      pCtx.lineWidth = brushSize;
      pCtx.lineCap = "round";

      const start = startPointRef.current;
      const w = coords.x - start.x;
      const h = coords.y - start.y;

      if (activeTool === "line") {
        pCtx.beginPath();
        pCtx.moveTo(start.x, start.y);
        pCtx.lineTo(coords.x, coords.y);
        pCtx.stroke();
      } else if (activeTool === "rectangle") {
        if (fillStyle === "fill" || fillStyle === "both") {
          pCtx.fillRect(start.x, start.y, w, h);
        }
        if (fillStyle === "outline" || fillStyle === "both") {
          pCtx.strokeRect(start.x, start.y, w, h);
        }
      } else if (activeTool === "ellipse") {
        pCtx.beginPath();
        pCtx.ellipse(
          start.x + w / 2,
          start.y + h / 2,
          Math.abs(w / 2),
          Math.abs(h / 2),
          0,
          0,
          Math.PI * 2
        );
        if (fillStyle === "fill" || fillStyle === "both") pCtx.fill();
        if (fillStyle === "outline" || fillStyle === "both") pCtx.stroke();
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;

    if (sprayIntervalRef.current) {
      clearInterval(sprayIntervalRef.current);
      sprayIntervalRef.current = null;
    }

    const coords = getCanvasCoords(e);
    const useColor = e.button === 2 ? secondaryColor : primaryColor;

    // Commit preview canvas into real canvas
    if (activeTool === "line" || activeTool === "rectangle" || activeTool === "ellipse") {
      const canvas = canvasRef.current;
      const preview = previewCanvasRef.current;
      if (!canvas || !preview) return;
      const ctx = canvas.getContext("2d");
      const pCtx = preview.getContext("2d");
      if (!ctx || !pCtx) return;

      ctx.strokeStyle = useColor;
      ctx.fillStyle = secondaryColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";

      const start = startPointRef.current;
      const w = coords.x - start.x;
      const h = coords.y - start.y;

      if (activeTool === "line") {
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
      } else if (activeTool === "rectangle") {
        if (fillStyle === "fill" || fillStyle === "both") ctx.fillRect(start.x, start.y, w, h);
        if (fillStyle === "outline" || fillStyle === "both") ctx.strokeRect(start.x, start.y, w, h);
      } else if (activeTool === "ellipse") {
        ctx.beginPath();
        ctx.ellipse(
          start.x + w / 2,
          start.y + h / 2,
          Math.abs(w / 2),
          Math.abs(h / 2),
          0,
          0,
          Math.PI * 2
        );
        if (fillStyle === "fill" || fillStyle === "both") ctx.fill();
        if (fillStyle === "outline" || fillStyle === "both") ctx.stroke();
      }

      pCtx.clearRect(0, 0, preview.width, preview.height);
    }

    saveState();
  };

  return (
    <div className="paint-window-container" onContextMenu={(e) => e.preventDefault()}>
      <div className="ie-menubar">
        <div className="paint-menubar-left">
          <span onClick={handleClear} title="New image (Clear)">File (New)</span>
          <span onClick={handleDownload} title="Save As PNG">Save As...</span>
          <span onClick={handleUndo} className={canUndo ? "" : "opacity-40"}>Undo</span>
          <span onClick={handleRedo} className={canRedo ? "" : "opacity-40"}>Redo</span>
          <span onClick={() => closeWindow("paint")}>Exit</span>
        </div>
        <div className="paint-menubar-right">
          <button
            onClick={handleDownload}
            className="paint-quick-btn"
            title="Save drawing as PNG"
          >
            <Download size={12} className="inline mr-1" /> Save Image
          </button>
        </div>
      </div>

      <div className="paint-workspace">
        <div className="paint-toolbox">
          <div className="paint-tool-buttons">
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "pencil" ? "active" : ""}`}
              onClick={() => setActiveTool("pencil")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("pencil"); }}
              title="Pencil (Thin lines)"
            >
              <Pencil size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "brush" ? "active" : ""}`}
              onClick={() => setActiveTool("brush")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("brush"); }}
              title="Brush (Smooth strokes)"
            >
              <Paintbrush size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "eraser" ? "active" : ""}`}
              onClick={() => setActiveTool("eraser")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("eraser"); }}
              title="Eraser (Right-click color)"
            >
              <Eraser size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "bucket" ? "active" : ""}`}
              onClick={() => setActiveTool("bucket")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("bucket"); }}
              title="Fill with Color (Bucket)"
            >
              <PaintBucket size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "airbrush" ? "active" : ""}`}
              onClick={() => setActiveTool("airbrush")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("airbrush"); }}
              title="Airbrush (Spray can)"
            >
              <Sparkles size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "eyedropper" ? "active" : ""}`}
              onClick={() => setActiveTool("eyedropper")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("eyedropper"); }}
              title="Pick Color (Eyedropper)"
            >
              <Pipette size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "line" ? "active" : ""}`}
              onClick={() => setActiveTool("line")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("line"); }}
              title="Straight Line"
            >
              <Minus size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "rectangle" ? "active" : ""}`}
              onClick={() => setActiveTool("rectangle")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("rectangle"); }}
              title="Rectangle"
            >
              <Square size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className={`paint-tool-btn ${activeTool === "ellipse" ? "active" : ""}`}
              onClick={() => setActiveTool("ellipse")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveTool("ellipse"); }}
              title="Ellipse / Circle"
            >
              <Circle size={15} />
            </div>
            <div
              role="button"
              tabIndex={0}
              className="paint-tool-btn"
              onClick={handleClear}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClear(); }}
              title="Clear Canvas"
            >
              <Trash2 size={15} />
            </div>
          </div>

          <div className="paint-tool-options-box">
            {(activeTool === "pencil" ||
              activeTool === "brush" ||
              activeTool === "airbrush" ||
              activeTool === "eraser" ||
              activeTool === "line" ||
              activeTool === "rectangle" ||
              activeTool === "ellipse") && (
              <div className="paint-size-selector">
                {(activeTool === "pencil" ? [1, 2, 3, 4] : BRUSH_SIZES).map((size) => (
                  <div
                    key={size}
                    className={`paint-size-option ${brushSize === size ? "selected" : ""}`}
                    onClick={() => setBrushSize(size)}
                  >
                    <div
                      className="paint-size-dot"
                      style={{
                        width: `${Math.max(2, size)}px`,
                        height: `${Math.max(2, size)}px`
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {(activeTool === "rectangle" || activeTool === "ellipse") && (
              <div className="paint-fill-selector">
                <div
                  className={`paint-fill-option ${fillStyle === "outline" ? "selected" : ""}`}
                  onClick={() => setFillStyle("outline")}
                  title="Outline only"
                >
                  <div className="fill-preview outline-only" />
                </div>
                <div
                  className={`paint-fill-option ${fillStyle === "both" ? "selected" : ""}`}
                  onClick={() => setFillStyle("both")}
                  title="Outline with Fill"
                >
                  <div className="fill-preview both-fill" />
                </div>
                <div
                  className={`paint-fill-option ${fillStyle === "fill" ? "selected" : ""}`}
                  onClick={() => setFillStyle("fill")}
                  title="Solid Fill only"
                >
                  <div className="fill-preview solid-only" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="paint-canvas-scroll-area">
          <div
            className="paint-canvas-wrapper"
            style={{ width: `${canvasSize.width}px`, height: `${canvasSize.height}px` }}
          >
            <canvas
              ref={canvasRef}
              className="paint-canvas"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                isDrawingRef.current = false;
                setCursorPos(null);
                if (sprayIntervalRef.current) {
                  clearInterval(sprayIntervalRef.current);
                  sprayIntervalRef.current = null;
                }
              }}
            />
            <canvas ref={previewCanvasRef} className="paint-preview-canvas" />
          </div>
        </div>
      </div>

      <div className="paint-palette-bar">
        <div className="paint-active-colors">
          <div
            className="paint-secondary-color"
            style={{ backgroundColor: secondaryColor }}
            title={`Secondary Color (Right-Click): ${secondaryColor}`}
          />
          <div
            className="paint-primary-color"
            style={{ backgroundColor: primaryColor }}
            title={`Primary Color (Left-Click): ${primaryColor}`}
          />
        </div>

        <div className="paint-swatches-grid">
          {PALETTE_COLORS.map((color, index) => (
            <div
              key={index}
              className="paint-swatch"
              style={{ backgroundColor: color }}
              onClick={() => setPrimaryColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                setSecondaryColor(color);
              }}
              title={`${color} (Left-click: Primary, Right-click: Secondary)`}
            />
          ))}
        </div>
      </div>

      <div className="status-bar">
        <div className="status-bar-field" style={{ flex: 1 }}>
          For Help, click Help Topics on the Help Menu.
        </div>
        <div className="status-bar-field" style={{ width: 120 }}>
          {cursorPos ? `${cursorPos.x}, ${cursorPos.y}px` : ""}
        </div>
        <div className="status-bar-field" style={{ width: 100 }}>
          {`${canvasSize.width}x${canvasSize.height}px`}
        </div>
      </div>
    </div>
  );
};
