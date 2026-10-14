import React, { useState, useEffect } from "react";

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export const MinesweeperWindow: React.FC = () => {
  const ROWS = 9;
  const COLS = 9;
  const MINES = 10;

  const [grid, setGrid] = useState<CellState[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [faceState, setFaceState] = useState<"normal" | "shocked" | "dead" | "cool">("normal");
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [flagCount, setFlagCount] = useState(0);

  const initGame = () => {
    const newGrid: CellState[][] = [];
    for (let r = 0; r < ROWS; r++) {
      newGrid[r] = [];
      for (let c = 0; c < COLS; c++) {
        newGrid[r][c] = {
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0
        };
      }
    }

    // Place mines randomly
    let placedMines = 0;
    while (placedMines < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        placedMines++;
      }
    }

    // Compute neighbor counts
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setFaceState("normal");
    setSeconds(0);
    setTimerActive(false);
    setFlagCount(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setSeconds((s) => Math.min(999, s + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameOver, gameWon]);

  const revealCell = (r: number, c: number) => {
    if (gameOver || gameWon) return;
    const cell = grid[r][c];
    if (cell.isRevealed || cell.isFlagged) return;

    if (!timerActive) setTimerActive(true);

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    if (cell.isMine) {
      // Game Over: reveal all mines
      newGrid.forEach((row) =>
        row.forEach((c) => {
          if (c.isMine) c.isRevealed = true;
        })
      );
      setGrid(newGrid);
      setGameOver(true);
      setFaceState("dead");
      setTimerActive(false);
      return;
    }

    // Flood fill algorithm
    const revealNeighbors = (currR: number, currC: number) => {
      if (currR < 0 || currR >= ROWS || currC < 0 || currC >= COLS) return;
      const cur = newGrid[currR][currC];
      if (cur.isRevealed || cur.isFlagged || cur.isMine) return;

      cur.isRevealed = true;

      if (cur.neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            revealNeighbors(currR + dr, currC + dc);
          }
        }
      }
    };

    revealNeighbors(r, c);

    // Check win condition
    let unrevealedSafe = 0;
    newGrid.forEach((row) =>
      row.forEach((cur) => {
        if (!cur.isMine && !cur.isRevealed) unrevealedSafe++;
      })
    );

    setGrid(newGrid);

    if (unrevealedSafe === 0) {
      setGameWon(true);
      setFaceState("cool");
      setTimerActive(false);
    }
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || gameWon) return;
    const cell = grid[r][c];
    if (cell.isRevealed) return;

    if (!timerActive) setTimerActive(true);

    const newGrid = grid.map((row) => row.map((c) => ({ ...c })));
    const target = newGrid[r][c];
    target.isFlagged = !target.isFlagged;

    setFlagCount((count) => (target.isFlagged ? count + 1 : count - 1));
    setGrid(newGrid);
  };

  const getFaceEmoji = () => {
    switch (faceState) {
      case "shocked":
        return "😮";
      case "dead":
        return "😵";
      case "cool":
        return "😎";
      default:
        return "🙂";
    }
  };

  const formatDigits = (n: number) => {
    const clamped = Math.max(0, Math.min(999, n));
    return clamped.toString().padStart(3, "0");
  };

  return (
    <div className="minesweeper-layout">
      {/* Menu Bar */}
      <div className="ie-menubar">
        <span>Game</span>
        <span>Help</span>
      </div>

      <div className="minesweeper-box">
        {/* Header Board */}
        <div className="minesweeper-header">
          <div className="minesweeper-lcd">
            {formatDigits(MINES - flagCount)}
          </div>

          <button
            className="minesweeper-face-btn"
            onClick={initGame}
            title="Restart game"
          >
            {getFaceEmoji()}
          </button>

          <div className="minesweeper-lcd">{formatDigits(seconds)}</div>
        </div>

        {/* Board Grid */}
        <div
          className="minesweeper-grid"
          onMouseDown={() => {
            if (!gameOver && !gameWon) setFaceState("shocked");
          }}
          onMouseUp={() => {
            if (!gameOver && !gameWon) setFaceState("normal");
          }}
        >
          {grid.map((row, r) => (
            <div key={r} className="minesweeper-row">
              {row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  className={`ms-cell ${cell.isRevealed ? "revealed" : "hidden"} ${
                    cell.isRevealed && cell.isMine ? "mine-hit" : ""
                  }`}
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => toggleFlag(e, r, c)}
                >
                  {cell.isRevealed ? (
                    cell.isMine ? (
                      "💣"
                    ) : cell.neighborMines > 0 ? (
                      <span className={`n-${cell.neighborMines}`}>
                        {cell.neighborMines}
                      </span>
                    ) : null
                  ) : cell.isFlagged ? (
                    "🚩"
                  ) : null}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
