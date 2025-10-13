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
    { left: '2%', top: '8%' },
    { left: '18%', top: '5%' },
    { left: '34%', top: '10%' },
    { left: '50%', top: '6%' },
    { left: '66%', top: '12%' },
    { left: '82%', top: '8%' },
    
    // Middle row
    { left: '6%', top: '38%' },
    { left: '22%', top: '42%' },
    { left: '38%', top: '36%' },
    { left: '54%', top: '40%' },
    { left: '70%', top: '34%' },
    { left: '86%', top: '38%' },
    
    // Bottom row
    { left: '2%', top: '68%' },
    { left: '18%', top: '72%' },
    { left: '34%', top: '66%' },
    { left: '50%', top: '70%' },
    { left: '66%', top: '64%' },
    { left: '82%', top: '68%' }
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


