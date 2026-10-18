import React, { useState } from "react";
import { XpIcon } from "../XpIcon";
import { useWindowManager } from "../../../context/WindowManagerContext";
import { ArrowLeft, ArrowRight, ArrowUp, Search, Folder, Trash2, RotateCcw, AlertTriangle, Monitor, FolderKanban } from "lucide-react";

export const RecycleBinWindow: React.FC = () => {
  const {
    recycleBinItems,
    restoreRecycleBinItem,
    restoreAllRecycleBinItems,
    emptyRecycleBin,
    openWindow
  } = useWindowManager();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showConfirmEmpty, setShowConfirmEmpty] = useState<boolean>(false);

  const selectedItem = recycleBinItems.find((item) => item.id === selectedId) || null;
  const isBinFull = recycleBinItems.length > 0;
  const binIcon = isBinFull ? "recycle-bin-full" : "recycle-bin-empty";

  const handleEmptyBin = () => {
    emptyRecycleBin();
    setSelectedId(null);
    setShowConfirmEmpty(false);
  };

  const handleRestoreSingle = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    restoreRecycleBinItem(id);
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="explorer-layout">
      <div className="ie-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      <div className="explorer-toolbar">
        <button className="ie-tool-btn" title="Back">
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <button className="ie-tool-btn" title="Forward">
          <ArrowRight size={14} />
        </button>
        <button className="ie-tool-btn" title="Up">
          <ArrowUp size={14} />
        </button>
        <div className="ie-tool-sep" />
        <button className="ie-tool-btn" title="Search">
          <Search size={14} />
          <span>Search</span>
        </button>
        <button className="ie-tool-btn" title="Folders">
          <Folder size={14} />
          <span>Folders</span>
        </button>
      </div>

      <div className="explorer-address-bar">
        <span className="address-label">Address</span>
        <div className="address-input-wrapper">
          <XpIcon name={binIcon} size={14} className="inline mr-1" />
          <span className="explorer-path">Recycle Bin</span>
        </div>
      </div>

      <div className="explorer-body">
        <div className="explorer-sidebar">
          <div className="sidebar-box">
            <div className="sidebar-box-header">
              <span>Recycle Bin Tasks</span>
            </div>
            <div className="sidebar-box-content">
              <div
                className={`task-item ${recycleBinItems.length === 0 ? "opacity-50 pointer-events-none cursor-default" : ""}`}
                onClick={() => {
                  if (recycleBinItems.length > 0) {
                    setShowConfirmEmpty(true);
                  }
                }}
              >
                <Trash2 size={13} className={recycleBinItems.length > 0 ? "text-red-600" : "text-gray-400"} />
                <span>Empty the Recycle Bin</span>
              </div>

              {recycleBinItems.length > 0 && (
                <div
                  className="task-item"
                  onClick={restoreAllRecycleBinItems}
                >
                  <RotateCcw size={13} className="text-blue-600" />
                  <span>Restore all items</span>
                </div>
              )}

              {selectedItem && (
                <div className="task-item" onClick={() => handleRestoreSingle(selectedItem.id)}>
                  <RotateCcw size={13} className="text-emerald-600" />
                  <span>Restore this item</span>
                </div>
              )}
            </div>
          </div>

          <div className="sidebar-box">
            <div className="sidebar-box-header">
              <span>Other Places</span>
            </div>
            <div className="sidebar-box-content">
              <div className="task-item" onClick={() => openWindow("system")}>
                <Monitor size={13} className="text-blue-600" />
                <span>My Computer</span>
              </div>
              <div className="task-item" onClick={() => openWindow("projects")}>
                <FolderKanban size={13} className="text-amber-600" />
                <span>My Projects</span>
              </div>
            </div>
          </div>

          <div className="sidebar-box">
            <div className="sidebar-box-header">
              <span>Details</span>
            </div>
            <div className="sidebar-box-content details-content">
              {selectedItem ? (
                <>
                  <strong className="detail-title">{selectedItem.name}</strong>
                  <span className="detail-cat">{selectedItem.type}</span>
                  <div className="detail-tech" style={{ marginTop: 4 }}>
                    <strong>Original Location:</strong>
                    <p style={{ wordBreak: "break-all" }}>{selectedItem.originalLocation}</p>
                  </div>
                  <div className="detail-tech" style={{ marginTop: 4 }}>
                    <strong>Date Deleted:</strong>
                    <p>{selectedItem.dateDeleted}</p>
                  </div>
                  <div className="detail-tech" style={{ marginTop: 4 }}>
                    <strong>Size:</strong>
                    <p>{selectedItem.size}</p>
                  </div>
                </>
              ) : (
                <>
                  <strong className="detail-title">Recycle Bin</strong>
                  <span className="detail-cat">System Folder</span>
                  <p className="detail-desc" style={{ marginTop: 4 }}>
                    The Recycle Bin holds files and folders that you have deleted from your system.
                  </p>
                  <p style={{ fontSize: 11, color: "#64748b" }}>
                    {recycleBinItems.length} file{recycleBinItems.length === 1 ? "" : "s"} in bin
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="explorer-main" style={{ background: "#ffffff", padding: 0 }}>
          {recycleBinItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#64748b",
                gap: 12,
                padding: 24,
                textAlign: "center"
              }}
            >
              <XpIcon name="recycle-bin-empty" size={48} />
              <strong style={{ color: "#1e293b", fontSize: 13 }}>The Recycle Bin is empty</strong>
              <span style={{ fontSize: 11, maxWidth: 280 }}>
                Deleted items will appear here before being permanently removed from your computer.
              </span>
            </div>
          ) : (
            <div style={{ overflowX: "auto", height: "100%" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 11,
                  fontFamily: "var(--font-xp, Tahoma, Arial, sans-serif)",
                  textAlign: "left"
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "linear-gradient(180deg, #f0ede0 0%, #dcd6c8 100%)",
                      borderBottom: "1px solid #999488",
                      color: "#333333",
                      userSelect: "none"
                    }}
                  >
                    <th style={{ padding: "4px 8px", borderRight: "1px solid #dcd6c8", fontWeight: 600 }}>Name</th>
                    <th style={{ padding: "4px 8px", borderRight: "1px solid #dcd6c8", fontWeight: 600 }}>Original Location</th>
                    <th style={{ padding: "4px 8px", borderRight: "1px solid #dcd6c8", fontWeight: 600 }}>Date Deleted</th>
                    <th style={{ padding: "4px 8px", borderRight: "1px solid #dcd6c8", fontWeight: 600 }}>Size</th>
                    <th style={{ padding: "4px 8px", fontWeight: 600 }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {recycleBinItems.map((item) => {
                    const isSelected = selectedId === item.id;
                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        onDoubleClick={() => handleRestoreSingle(item.id)}
                        style={{
                          backgroundColor: isSelected ? "#316ac5" : "transparent",
                          color: isSelected ? "#ffffff" : "#000000",
                          cursor: "pointer",
                          userSelect: "none"
                        }}
                      >
                        <td style={{ padding: "3px 8px", display: "flex", alignItems: "center", gap: 6 }}>
                          <XpIcon name={item.icon} size={16} />
                          <span>{item.name}</span>
                        </td>
                        <td style={{ padding: "3px 8px" }}>{item.originalLocation}</td>
                        <td style={{ padding: "3px 8px" }}>{item.dateDeleted}</td>
                        <td style={{ padding: "3px 8px" }}>{item.size}</td>
                        <td style={{ padding: "3px 8px" }}>{item.type}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="status-bar">
        <div className="status-bar-field">{recycleBinItems.length} object{recycleBinItems.length === 1 ? "" : "s"}</div>
        <div className="status-bar-field" style={{ width: 140 }}>
          {selectedItem ? selectedItem.name : "Recycle Bin"}
        </div>
        <div className="status-bar-field" style={{ width: 100 }}>Recycle Bin</div>
      </div>

      {showConfirmEmpty && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.35)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setShowConfirmEmpty(false)}
        >
          <div
            className="window-frame active"
            style={{
              width: 380,
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              animation: "none"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="title-bar">
              <div className="title-bar-text">
                <XpIcon name={binIcon} size={14} className="inline mr-1" />
                <span>{recycleBinItems.length === 1 ? "Confirm File Delete" : "Confirm Multiple File Delete"}</span>
              </div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={() => setShowConfirmEmpty(false)} />
              </div>
            </div>

            <div
              className="window-body"
              style={{
                background: "#ece9d8",
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 16
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, paddingTop: 2 }}>
                  <AlertTriangle size={32} className="text-amber-500" />
                </div>
                <div style={{ fontSize: 11, color: "#000000", lineHeight: 1.5 }}>
                  {recycleBinItems.length === 1 ? (
                    <>Are you sure you want to permanently delete <strong>'{recycleBinItems[0]?.name || "this file"}'</strong>?</>
                  ) : (
                    <>Are you sure you want to permanently delete these <strong>{recycleBinItems.length}</strong> items?</>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <button
                  type="button"
                  className="xp-dialog-btn"
                  style={{ minWidth: 70, fontWeight: 700, color: "#000000" }}
                  onClick={handleEmptyBin}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="xp-dialog-btn"
                  style={{ minWidth: 70, color: "#000000" }}
                  onClick={() => setShowConfirmEmpty(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
