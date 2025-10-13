import React from 'react';
import { cvData } from '../data/cvData';
import { FaCalendar, FaHandsHelping } from 'react-icons/fa';

const VoluntaryActivities = () => {
  return (
    <section id="voluntary" className="voluntary-section">
      <div className="container">
        <h2><FaHandsHelping className="section-icon" /> Freiwillige / Ehrenamtliche Tätigkeiten</h2>
        <div className="activities-grid">
          {cvData.voluntaryActivities.map((activity) => (
            <div key={activity.id} className="activity-card">
              <div className="activity-header">
                <div className="activity-title">
                  <h3>{activity.role}</h3>
                  <h4>{activity.organization}</h4>
                </div>
                <div className="activity-period">
                  <FaCalendar className="period-icon" />
                  <span>{activity.period}</span>
                </div>
              </div>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-technologies">
                {activity.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoluntaryActivities;


