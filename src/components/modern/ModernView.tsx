import React from "react";
import { DotGridCanvas } from "../common/DotGridCanvas";
import { ModernNavbar } from "./ModernNavbar";
import { HeroSection } from "./HeroSection";
import { AboutSection } from "./AboutSection";
import { ProjectsGrid } from "./ProjectsGrid";
import { SkillsBadges } from "./SkillsBadges";
import { GithubActivity } from "./GithubActivity";
import { ContactSection } from "./ContactSection";

export const ModernView: React.FC = () => {
  return (
    <div className="modern-view-root">
      <DotGridCanvas />
      <ModernNavbar />
      <div className="site-wrapper">
        <main className="main-content">
          <HeroSection />
          <AboutSection />
          <ProjectsGrid />
          <SkillsBadges />
          <GithubActivity />
          <ContactSection />
        </main>
      </div>
    </div>
  );
};
