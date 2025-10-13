import React from 'react';
import { cvData } from '../data/cvData';
import { FaDownload, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  const handleDownloadCV = () => {
    window.open('/cv.pdf', '_blank');
  };

  // Get skills from specific categories without overlapping
  const getNonOverlappingSkills = () => {
    const categories = ['Sprachen', 'Stärken', 'IT'];
    const allSkills = [];
    
    categories.forEach(category => {
      if (cvData.skills[category]) {
        // Take up to 4 skills from each category to prevent overcrowding
        const categorySkills = cvData.skills[category]
          .slice(0, 4)
          .map(skill => ({
            name: skill.name,
            category: category
          }));
        allSkills.push(...categorySkills);
      }
    });
    
    return allSkills.slice(0, 12); // Limit total to prevent overcrowding
  };

  const skillsToShow = getNonOverlappingSkills();

  // Predefined positions to prevent overlapping
  const positions = [
    // Top row
    { left: '5%', top: '35%' },    // Far left - aligns with last name
    { left: '25%', top: '32%' },   // Left middle
    { left: '45%', top: '35%' },   // Center left
    { left: '65%', top: '32%' },   // Center right
    { left: '85%', top: '35%' },   // Far right
    
    // Middle row - lowered accordingly
    { left: '10%', top: '55%' },   // Left
    { left: '30%', top: '58%' },   // Left middle
    { left: '50%', top: '55%' },   // Center
    { left: '70%', top: '58%' },   // Right middle
    { left: '90%', top: '55%' },   // Right
    
    // Bottom row - lowered accordingly
    { left: '5%', top: '75%' },    // Far left
    { left: '25%', top: '78%' },   // Left middle
    { left: '45%', top: '75%' },   // Center left
    { left: '65%', top: '78%' },   // Center right
    { left: '85%', top: '75%' },   // Far right
  ];

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
          <div className="floating-tags-container">
            {skillsToShow.map((skill, index) => (
              <div 
                key={index} 
                className="floating-tech-tag"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  left: positions[index]?.left || '50%',
                  top: positions[index]?.top || '50%',
                  zIndex: index + 1
                }}
                data-category={skill.category}
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;




