import React from 'react';
import { cvData } from '../data/cvData';
import { FaCalendar, FaExternalLinkAlt, FaHandsHelping } from 'react-icons/fa';

const VoluntaryActivities = () => {
  return (
    <section id="voluntary" className="voluntary-section">
      <div className="container">
        <h2><FaHandsHelping className="section-icon" /> Voluntary & Honorary Activities</h2>
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
              <div className="activity-actions">
                {activity.link && (
                  <a 
                    href={activity.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <FaExternalLinkAlt className="btn-icon" />
                    Learn More
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoluntaryActivities;
