import React from "react";
import { metrics } from "../../data/metrics";

export const ImpactNumbers: React.FC = () => {
  return (
    <section id="numbers" className="section">
      <h2 className="section-title">By the numbers</h2>

      <div className="numbers-list-container">
        {metrics.map((metric) => (
          <div key={metric.id} className="notification-card">
            <div className="notification-inner">
              <div className="notification-icon-wrapper">
                <div className="notification-badge">{metric.badge}</div>
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-title">
                    <strong>{metric.title}</strong> | {metric.subtitle}
                  </span>
                  <span className="notification-time">{metric.period}</span>
                </div>
                <div className="notification-message">{metric.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
