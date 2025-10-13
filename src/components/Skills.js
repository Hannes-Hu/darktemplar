import React from 'react';
import { cvData } from '../data/cvData';
import { FaLanguage, FaLaptopCode, FaHeart, FaStar, FaLightbulb } from 'react-icons/fa';

const Skills = () => {
  const getIcon = (category) => {
    switch (category) {
      case 'Sprachen': return <FaLanguage />;
      case 'IT': return <FaLaptopCode />;
      case 'Hobbies': return <FaHeart />;
      case 'Stärken': return <FaStar />;
      default: return <FaStar />;
    }
  };

  const getSkillLevel = (percentage) => {
    if (percentage >= 90) return 'Experte';
    if (percentage >= 80) return 'Advanced';
    if (percentage >= 70) return 'Intermediate';
    if (percentage >= 60) return 'Grundkenntnisse';
    return 'Novice';
  };

  const getLevelColor = (percentage) => {
    if (percentage >= 90) return '#10b981'; // Green
    if (percentage >= 80) return '#3b82f6'; // Blue
    if (percentage >= 70) return '#8b5cf6'; // Purple
    if (percentage >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  // Check if category should show any text
  const shouldShowText = (category) => {
    return category === 'Sprachen' || category === 'IT';
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2><FaLightbulb className="section-icon" /> Skills</h2>
        <div className="skills-grid">
          {Object.entries(cvData.skills).map(([category, skills]) => (
            <div key={category} className={`skill-category ${isSimpleCategory(category) ? 'simple-category' : ''}`}>
              <div className="category-header">
                <div className="category-icon">
                  {getIcon(category)}
                </div>
                <h3>{category}</h3>
              </div>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      {shouldShowText(category) && (
                        <div className="skill-info">
                          <span 
                            className="skill-level"
                            style={{ color: getLevelColor(skill.percentage) }}
                          >
                            {getSkillLevel(skill.percentage)}
                          </span>
                          <span className="skill-percentage">{skill.percentage}%</span>
                        </div>
                      )}
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{
                          width: `${skill.percentage}%`,
                          backgroundColor: getLevelColor(skill.percentage)
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;




