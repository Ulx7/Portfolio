import React, { useState, useRef, useEffect } from "react";
import { profile } from "../../../data/profile";
import { projects } from "../../../data/projects";
import { skillCategories } from "../../../data/skills";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalSkillsWindow: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div>
          <p>Microsoft Windows XP [Version 5.1.2600]</p>
          <p>(C) Copyright 1985-2001 Microsoft Corp.</p>
          <br />
          <p>Type <strong className="cmd-highlight">help</strong> to see available commands.</p>
        </div>
      )
    }
  ]);

  const [inputVal, setInputVal] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="cmd-help-block">
            <p>AVAILABLE SYSTEM COMMANDS:</p>
            <p>  <span className="cmd-cmd">help</span>       - Displays this list of commands</p>
            <p>  <span className="cmd-cmd">skills</span>     - Lists complete technical stack</p>
            <p>  <span className="cmd-cmd">projects</span>   - Lists featured projects</p>
            <p>  <span className="cmd-cmd">whoami</span>     - Displays developer profile</p>
            <p>  <span className="cmd-cmd">contact</span>    - Displays contact info and email</p>
            <p>  <span className="cmd-cmd">clear / cls</span>- Clears the console screen</p>
            <p>  <span className="cmd-cmd">date</span>       - Displays current system date and time</p>
            <p>  <span className="cmd-cmd">matrix</span>     - Activates Matrix mode</p>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div>
            <p>User: {profile.name}</p>
            <p>Role: {profile.role}</p>
            <p>Location: {profile.location}</p>
            <p>Education: Universidad ORT Uruguay</p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div>
            <p className="cmd-header">REGISTERED TECHNICAL STACK:</p>
            {skillCategories.map((cat) => (
              <div key={cat.name} style={{ marginBottom: 6 }}>
                <span className="cmd-cat">[{cat.name}]:</span>{" "}
                <span>{cat.skills.map((s) => s.name).join(" • ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div>
            <p className="cmd-header">REPOSITORY PROJECTS:</p>
            {projects.map((p, i) => (
              <div key={p.id} style={{ marginBottom: 6 }}>
                <p>
                  {i + 1}. <strong className="cmd-highlight">{p.title}</strong> [{p.category}]
                </p>
                <p style={{ color: "#9ca3af" }}>{p.shortDescription}</p>
                <p style={{ color: "#6ee7b7" }}>Technologies: {p.technologies.join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div>
            <p>Email: {profile.email}</p>
            <p>LinkedIn: {profile.linkedin}</p>
            <p>GitHub: {profile.github}</p>
            <p>Location: {profile.location}</p>
          </div>
        );
        break;

      case "date":
        output = <p>System date: {new Date().toLocaleString()}</p>;
        break;

      case "matrix":
        output = (
          <div style={{ color: "#00ff66" }}>
            <p>Waking up in the Matrix...</p>
            <p>01010101 01001100 01011001 01010011 01010011 01000101</p>
            <p>Connection established with Berlin, Germany.</p>
          </div>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = (
          <p style={{ color: "#f87171" }}>
            '{cmd}' is not recognized as an internal or external command. Type 'help'.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal("");
  };

  return (
    <div className="terminal-cmd-layout" onClick={() => document.getElementById("cmd-input")?.focus()}>
      <div className="terminal-history">
        {history.map((item, index) => (
          <div key={index} className="terminal-entry">
            {item.command !== "welcome" && (
              <div className="terminal-prompt-line">
                <span className="terminal-prompt">C:\Documents and Settings\Ulysse&gt;</span>
                <span className="terminal-cmd-text">{item.command}</span>
              </div>
            )}
            <div className="terminal-output">{item.output}</div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={handleCommand} className="terminal-input-row">
        <span className="terminal-prompt">C:\Documents and Settings\Ulysse&gt;</span>
        <input
          id="cmd-input"
          type="text"
          className="terminal-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          autoFocus
          spellCheck={false}
        />
      </form>
    </div>
  );
};
