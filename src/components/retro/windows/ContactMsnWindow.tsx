import React, { useState } from "react";
import { profile } from "../../../data/profile";
import { Send, Check, Paperclip } from "lucide-react";
import confetti from "canvas-confetti";

export const ContactMsnWindow: React.FC = () => {
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("Collaboration Opportunity / Project Inquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !message) {
      alert("Please fill in your sender email and message.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      // FormSubmit hash token tied to castelloulises1420@gmail.com
      const FORMSUBMIT_HASH = "7067797cdac976fdc6ba6a8695bd2528";
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_HASH}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: subject || `Portfolio Message from ${from}`,
          name: from,
          email: from,
          message: message,
          _replyto: from,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json().catch(() => ({}));

      const isSuccess =
        response.ok &&
        (data.success === true ||
          data.success === "true" ||
          (typeof data.message === "string" && data.message.toLowerCase().includes("success")));

      if (isSuccess) {
        setStatus("sent");
        confetti({ particleCount: 70, spread: 60 });
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        throw new Error(data.message || "Failed to deliver email.");
      }
    } catch (err: any) {
      console.error("FormSubmit error:", err);
      setStatus("error");
      setErrorMessage("Could not send in background. Click below to open your mail client instead.");
    }
  };

  const handleMailtoFallback = () => {
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${from}\n\n${message}`)}`;
    window.location.href = mailto;
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
          type="button"
          className="outlook-tool-btn primary"
          onClick={handleSend}
          disabled={status === "sending"}
        >
          <Send size={15} />
          <span>{status === "sending" ? "Sending..." : "Send"}</span>
        </button>
        <button type="button" className="outlook-tool-btn">
          <Paperclip size={14} />
          <span>Attach</span>
        </button>
        <div className="ie-tool-sep"></div>
        <button type="button" className="outlook-tool-btn" onClick={() => setMessage("")}>
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
              placeholder="your_email@example.com"
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
            placeholder="Type your message for Ulysse Castello here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="outlook-textarea"
          />
        </div>

        {status === "sending" && (
          <div className="outlook-sending-banner">
            <span>Dispatching message via Outlook Express... Please wait.</span>
          </div>
        )}

        {status === "sent" && (
          <div className="outlook-success-banner">
            <Check size={16} className="text-green-600 inline mr-2" />
            <span>Message sent successfully to Ulysse's inbox ({profile.email}).</span>
          </div>
        )}

        {status === "error" && (
          <div className="outlook-error-banner">
            <span>{errorMessage}</span>
            <button
              type="button"
              className="outlook-fallback-btn"
              onClick={handleMailtoFallback}
            >
              Open Default Mail Client
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
