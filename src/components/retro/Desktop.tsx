import React, { useState } from "react";
import { useWindowManager, type WindowId } from "../../context/WindowManagerContext";
import { DesktopIcon } from "./DesktopIcon";
import { WindowFrame } from "./WindowFrame";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { ModeSwitcher } from "../common/ModeSwitcher";

import { InternetExplorerWindow } from "./windows/InternetExplorerWindow";
import { ProjectsExplorerWindow } from "./windows/ProjectsExplorerWindow";
import { NotepadAboutWindow } from "./windows/NotepadAboutWindow";
import { TerminalSkillsWindow } from "./windows/TerminalSkillsWindow";
import { ContactMsnWindow } from "./windows/ContactMsnWindow";
import { MinesweeperWindow } from "./windows/MinesweeperWindow";
import { DoomWindow } from "./windows/DoomWindow";

export const Desktop: React.FC = () => {
  const { openWindow, closeStartMenu } = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);

  const desktopShortcuts: { id: WindowId; title: string; iconName: string }[] = [
    { id: "ie", title: "Internet Explorer", iconName: "ie" },
    { id: "projects", title: "My Projects", iconName: "folder" },
    { id: "about", title: "About_Ulysse.txt", iconName: "notepad" },
    { id: "cmd", title: "Command Prompt", iconName: "cmd" },
    { id: "contact", title: "Outlook Express", iconName: "mail" },
    { id: "minesweeper", title: "Minesweeper", iconName: "bomb" },
    { id: "doom", title: "DOOM (1993)", iconName: "game" }
  ];

  const handleDesktopClick = () => {
    setSelectedIconId(null);
    closeStartMenu();
  };

  return (
    <div className="xp-desktop" onClick={handleDesktopClick}>
      {/* Floating Mode Switcher in top right corner */}
      <div className="xp-top-switcher">
        <ModeSwitcher />
      </div>

      {/* Desktop Shortcuts Column */}
      <div className="desktop-shortcuts-grid">
        {desktopShortcuts.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            title={item.title}
            iconName={item.iconName}
            isSelected={selectedIconId === item.id}
            onSelect={() => setSelectedIconId(item.id)}
            onOpen={() => openWindow(item.id)}
          />
        ))}

        {/* Recycle Bin icon */}
        <DesktopIcon
          id="recycle-bin"
          title="Recycle Bin"
          iconName="recycle-bin"
          isSelected={selectedIconId === "recycle-bin"}
          onSelect={() => setSelectedIconId("recycle-bin")}
          onOpen={() => alert("La Papelera de reciclaje está vacía.")}
        />
      </div>

      {/* Windows Layer */}
      <div className="desktop-windows-layer">
        <WindowFrame id="ie">
          <InternetExplorerWindow />
        </WindowFrame>

        <WindowFrame id="projects">
          <ProjectsExplorerWindow />
        </WindowFrame>

        <WindowFrame id="about">
          <NotepadAboutWindow />
        </WindowFrame>

        <WindowFrame id="cmd">
          <TerminalSkillsWindow />
        </WindowFrame>

        <WindowFrame id="contact">
          <ContactMsnWindow />
        </WindowFrame>

        <WindowFrame id="minesweeper">
          <MinesweeperWindow />
        </WindowFrame>

        <WindowFrame id="doom">
          <DoomWindow />
        </WindowFrame>
      </div>

      {/* Start Menu */}
      <StartMenu />

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};
