import React, { useState } from "react";
import { profile } from "../../../data/profile";
import { Send, Check, Paperclip } from "lucide-react";
import confetti from "canvas-confetti";

export const ContactMsnWindow: React.FC = () => {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("Oportunidad de Colaboración / Consulta de Proyecto");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !message) {
      alert("Por favor complete su dirección de remitente y mensaje.");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      confetti({ particleCount: 70, spread: 60 });
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3500);
    }, 600);
  };

  return (
    <div className="outlook-window-layout">
      {/* Menu Bar */}
      <div className="ie-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Insert</span>
        <span>Format</span>
        <span>Tools</span>
        <span>Message</span>
        <span>Help</span>
      </div>

      {/* Toolbar */}
      <div className="outlook-toolbar">
        <button
          className="outlook-tool-btn primary"
          onClick={handleSend}
          disabled={status === "sending"}
        >
          <Send size={15} />
          <span>Send</span>
        </button>
        <button className="outlook-tool-btn">
          <Paperclip size={14} />
          <span>Attach</span>
        </button>
        <div className="ie-tool-sep"></div>
        <button className="outlook-tool-btn" onClick={() => setMessage("")}>
          <span>Clear</span>
        </button>
      </div>

      {/* Composer Form */}
      <form onSubmit={handleSend} className="outlook-form">
        <div className="outlook-row">
          <span className="outlook-label">To:</span>
          <div className="outlook-field-box">
            <input
              type="text"
              readOnly
              value={profile.email}
              className="outlook-input readonly"
            />
          </div>
        </div>

        <div className="outlook-row">
          <span className="outlook-label">From:</span>
          <div className="outlook-field-box">
            <input
              type="email"
              required
              placeholder="tu_email@ejemplo.com"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="outlook-input"
            />
          </div>
        </div>

        <div className="outlook-row">
          <span className="outlook-label">Subject:</span>
          <div className="outlook-field-box">
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="outlook-input"
            />
          </div>
        </div>

        <div className="outlook-body-area">
          <textarea
            rows={8}
            required
            placeholder="Escriba su mensaje para Ulysse Castello aquí..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="outlook-textarea"
          />
        </div>

        {status === "sent" && (
          <div className="outlook-success-banner">
            <Check size={16} className="text-green-600 inline mr-2" />
            <span>Mensaje enviado correctamente a la bandeja de Ulysse ({profile.email}).</span>
          </div>
        )}
      </form>
    </div>
  );
};
