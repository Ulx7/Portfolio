import React from "react";
import { skillCategories } from "../../data/skills";
import { TechMicroIcon } from "./TechMicroIcon";

export const SkillsBadges: React.FC = () => {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical Stack</h2>

      <div className="editorial-skills-grid">
        {skillCategories.map((category) => (
          <div key={category.name} className="editorial-skill-group">
            <h3 className="editorial-skill-role">{category.name}</h3>
            <ul className="editorial-skill-list">
              {category.skills.map((skill) => (
                <li key={skill.name} className="editorial-skill-item">
                  <span className="editorial-skill-bullet">/</span>
                  <span className="editorial-skill-icon">
                    <TechMicroIcon name={skill.name} size={13} />
                  </span>
                  <span className="editorial-skill-name">{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
