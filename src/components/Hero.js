import React from 'react';
import { cvData } from '../data/cvData';
import { FaDownload, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const handleDownloadCV = () => {
    // This would typically download a PDF CV
    window.open('/cv.pdf', '_blank');
  };

  // Get skill names for the floating card
  const skillNames = cvData.getSkillsArray().slice(0, 8);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-name">{cvData.personal.name}</span>
          </h1>
          <h2 className="hero-subtitle">{cvData.personal.title}</h2>
          <p className="hero-description">
            {cvData.about}
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleDownloadCV}>
              <FaDownload className="btn-icon" />
              Lebenslauf herunterladen
            </button>
            <div className="social-links">
              <a href={`mailto:${cvData.personal.email}`} aria-label="Email">
                <FaEnvelope />
              </a>
              <a href={`https://${cvData.personal.linkedin}`} aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card">
            <div className="card-content">
              <div className="tech-stack">
                {skillNames.map((skill, index) => (
                  <span key={index} className="tech-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;




