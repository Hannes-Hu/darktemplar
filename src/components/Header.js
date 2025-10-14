import React, { useState, useEffect } from 'react';
import { cvData } from '../data/cvData';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="nav-logo">
          <span>{cvData.personal.name.split(' ')[0]}</span>
        </div>
      <ul className="nav-links">
        <li><button onClick={() => scrollToSection('about')}>Über mich</button></li>
        <li><button onClick={() => scrollToSection('experience')}>Berufserfahrung</button></li>
        <li><button onClick={() => scrollToSection('skills')}>Skills</button></li>
        <li><button onClick={() => scrollToSection('voluntary')}>Ehrenamtliche Arbeit</button></li>
        <li><button onClick={() => scrollToSection('contact')}>Kontakt</button></li>
      </ul>
      </nav>
    </header>
  );
};


export default Header;


