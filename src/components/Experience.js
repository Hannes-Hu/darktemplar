import React from 'react';
import { cvData } from '../data/cvData';
import { FaBriefcase } from 'react-icons/fa';

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <h2><FaBriefcase className="section-icon" /> Berufserfahrung</h2>
        <div className="experience-timeline">
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3>{exp.position}</h3>
                <h4>{exp.company} • {exp.period}</h4>
                <p>{exp.description}</p>
                <div className="tech-tags">
                  {exp.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

