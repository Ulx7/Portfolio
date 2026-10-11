import React, { useState } from "react";
import { profile } from "../../../data/profile";

export const NotepadAboutWindow: React.FC = () => {
  const initialText = `=====================================================
  ULYSSE CASTELLO - CURRICULUM VITAE & PERFIL TÉCNICO
=====================================================

Nombre: ${profile.name}
Rol: ${profile.role}
Ubicación actual: Berlin, Germany
Estado: ${profile.status}
Email: ${profile.email}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}

-----------------------------------------------------
1. PRESENTACIÓN
-----------------------------------------------------
${profile.bio}

"${profile.secondaryBio}"

-----------------------------------------------------
2. FORMACIÓN UNIVERSITARIA & CERTIFICACIONES
-----------------------------------------------------
* Analista TI - Universidad ORT Uruguay
* Analista de Sistemas - Universidad ORT Uruguay
* Desarrollo Web - Universidad ORT Uruguay

-----------------------------------------------------
3. ÁREAS DE ESPECIALIZACIÓN
-----------------------------------------------------
- Full-Stack Web Development:
  Arquitectura orientada a servicios, React, Astro, Next.js,
  Spring Boot (Java), .NET Core (C#).

- Big Data & Data Analytics:
  Procesamiento distribuido con PySpark, Hadoop, Hive,
  análisis de series de datos con Pandas & Python.

- Persistencia & Bases de Datos:
  SQL Server, MySQL, MongoDB, diseño relacional y NoSQL.

-----------------------------------------------------
4. NOTAS
-----------------------------------------------------
Archivo guardado en C:\\Documents and Settings\\Ulysse\\Desktop\\About_Ulysse.txt
Para contacto directo, utilice el programa Outlook Express o envíe un email.
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
