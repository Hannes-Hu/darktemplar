import React from 'react';
import { cvData } from '../data/cvData';
import { FaLanguage, FaLaptopCode, FaHeart, FaStar } from 'react-icons/fa';

const Skills = () => {
  const getIcon = (category) => {
    switch (category) {
      case 'Languages': return <FaLanguage />;
      case 'IT': return <FaLaptopCode />;
      case 'Hobbies': return <FaHeart />;
      case 'Strengths': return <FaStar />;
      default: return <FaStar />;
    }
  };

  const getSkillLevel = (percentage) => {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 80) return 'Advanced';
    if (percentage >= 70) return 'Intermediate';
    if (percentage >= 60) return 'Beginner';
    return 'Novice';
  };

  const getLevelColor = (percentage) => {
    if (percentage >= 90) return '#10b981'; // Green
    if (percentage >= 80) return '#3b82f6'; // Blue
    if (percentage >= 70) return '#8b5cf6'; // Purple
    if (percentage >= 60) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  // Check if category should show skill level and percentage
  const shouldShowSkillLevel = (category) => {
    return category === 'Languages' || category === 'IT';
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2>Skills</h2>
        <div className="skills-grid">
          {Object.entries(cvData.skills).map(([category, skills]) => (
            <div key={category} className="skill-category">
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
                      <div className="skill-info">
                        {shouldShowSkillLevel(category) ? (
                          <>
                            <span 
                              className="skill-level"
                              style={{ color: getLevelColor(skill.percentage) }}
                            >
                              {getSkillLevel(skill.percentage)}
                            </span>
                            <span className="skill-percentage">{skill.percentage}%</span>
                          </>
                        ) : (
                          // Empty div to maintain layout, but show nothing for Hobbies/Strengths
                          <div></div>
                        )}
                      </div>
                    </div>
                    {shouldShowSkillLevel(category) && (
                      <div className="skill-bar">
                        <div 
                          className="skill-progress"
                          style={{
                            width: `${skill.percentage}%`,
                            backgroundColor: getLevelColor(skill.percentage)
                          }}
                        ></div>
                      </div>
                    )}
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
