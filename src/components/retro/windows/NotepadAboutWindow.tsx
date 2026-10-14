import React, { useState } from "react";
import { profile } from "../../../data/profile";

export const NotepadAboutWindow: React.FC = () => {
  const initialText = `=====================================================
  ULYSSE CASTELLO - CURRICULUM VITAE & TECHNICAL PROFILE
=====================================================

Name: ${profile.name}
Role: ${profile.role}
Current Location: Berlin, Germany
Status: ${profile.status}
Email: ${profile.email}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}

-----------------------------------------------------
1. SUMMARY
-----------------------------------------------------
${profile.bio}

"${profile.secondaryBio}"

-----------------------------------------------------
2. UNIVERSITY EDUCATION & DEGREES
-----------------------------------------------------
* IT Analyst Degree - Universidad ORT Uruguay
* Analyst Programmer Degree - Universidad ORT Uruguay
* Web Developer Certificate - Universidad ORT Uruguay

-----------------------------------------------------
3. CORE TECHNICAL EXPERTISE
-----------------------------------------------------
- Backend Architecture & Systems:
  Service-oriented architecture, Java (Spring Boot),
  .NET Core (C#), REST APIs, Microservices.

- Big Data & Data Pipelines:
  Distributed data processing with PySpark, Hadoop, Hive,
  data pipelines and analytics with Pandas & Python.

- Persistence & Databases:
  SQL Server, MySQL, MongoDB, relational modeling and NoSQL.

- Frontend & Full-Stack:
  React, TypeScript, Astro, Tailwind CSS.

-----------------------------------------------------
4. SYSTEM NOTES
-----------------------------------------------------
File saved at C:\\Documents and Settings\\Ulysse\\Desktop\\About_Ulysse.txt
For direct contact, use Outlook Express or send an email.
`;

  const [text, setText] = useState(initialText);

  return (
    <div className="notepad-layout">
      <div className="ie-menubar">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>

      <div className="notepad-content">
        <textarea
          className="notepad-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className="status-bar">
        <div className="status-bar-field">Ln 1, Col 1</div>
        <div className="status-bar-field" style={{ width: 100 }}>100%</div>
        <div className="status-bar-field" style={{ width: 120 }}>Windows (CRLF)</div>
      </div>
    </div>
  );
};
