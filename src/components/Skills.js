import React from 'react';
import { cvData } from '../data/cvData';
import { FaCode, FaServer, FaDatabase, FaCloud, FaTools } from 'react-icons/fa';

const Skills = () => {
  const getIcon = (category) => {
    switch (category) {
      case 'Frontend': return <FaCode />;
      case 'Backend': return <FaServer />;
      case 'Database': return <FaDatabase />;
      case 'DevOps': return <FaCloud />;
      case 'Tools': return <FaTools />;
      default: return <FaCode />;
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

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2>Skills & Technologies</h2>
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
                        <span 
                          className="skill-level"
                          style={{ color: getLevelColor(skill.percentage) }}
                        >
                          {getSkillLevel(skill.percentage)}
                        </span>
                        <span className="skill-percentage">{skill.percentage}%</span>
                      </div>
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
