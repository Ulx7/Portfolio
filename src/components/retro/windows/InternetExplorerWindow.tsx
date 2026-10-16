import React, { useRef } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Globe } from "lucide-react";

export const InternetExplorerWindow: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "/?embedded=true";
    }
  };

  const handleHome = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "/?embedded=true";
    }
  };

  return (
    <div className="ie-window-layout">
      <div className="ie-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Favorites</span>
        <span>Tools</span>
        <span>Help</span>
      </div>

      <div className="ie-toolbar">
        <button className="ie-tool-btn" title="Back" onClick={() => window.history.back()}>
          <ArrowLeft size={14} />
          <span>Back</span>
        </button>
        <button className="ie-tool-btn" title="Forward" onClick={() => window.history.forward()}>
          <ArrowRight size={14} />
          <span>Forward</span>
        </button>
        <button className="ie-tool-btn" title="Stop">
          <span className="stop-x">×</span>
          <span>Stop</span>
        </button>
        <button className="ie-tool-btn" title="Refresh" onClick={handleRefresh}>
          <RotateCw size={13} />
          <span>Refresh</span>
        </button>
        <button className="ie-tool-btn" title="Home" onClick={handleHome}>
          <Home size={14} />
          <span>Home</span>
        </button>
        <div className="ie-tool-sep"></div>
        <button className="ie-tool-btn" title="Search">
          <Search size={14} />
          <span>Search</span>
        </button>

        <div className="ie-throbber">
          <div className="windows-flag-throbber"></div>
        </div>
      </div>

      <div className="ie-address-bar">
        <span className="address-label">Address</span>
        <div className="address-input-wrapper">
          <Globe size={14} className="address-globe" />
          <input
            type="text"
            className="address-input"
            value="https://ulysse-dev.vercel.app/"
            readOnly
            style={{ color: "#000000", backgroundColor: "transparent" }}
          />
        </div>
        <button className="ie-go-btn" onClick={handleRefresh}>
          <span>Go</span>
        </button>
      </div>

      <div className="ie-viewport">
        <iframe
          ref={iframeRef}
          src="/?embedded=true"
          title="Ulysse Castello Portfolio"
          className="ie-iframe"
          style={{ border: "none", width: "100%", height: "100%", display: "block" }}
        />
      </div>

      <div className="status-bar ie-statusbar">
        <div className="status-bar-field">Done</div>
        <div className="status-bar-field" style={{ width: 140 }}>
          <span className="internet-zone">Internet | Protected Mode: Off</span>
        </div>
        <div className="status-bar-field" style={{ width: 60 }}>100%</div>
      </div>
    </div>
  );
};
