import React from 'react';
import { cvData } from '../data/cvData';
import { FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2>
          <FaUser className="section-icon" /> Über mich
        </h2>
        <div className="about-content-full">
          <div className="personal-info-full">
            <div className="info-grid-full">
              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <span className="info-label">Adresse</span>
                  <span className="info-value">{cvData.personal.location}</span>
                </div>
              </div>
              <div className="info-item">
                <FaPhone className="info-icon" />
                <div>
                  <span className="info-label">Telefon</span>
                  <span className="info-value">{cvData.personal.phone}</span>
                </div>
              </div>
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <span className="info-label">E-Mail</span>
                  <span className="info-value">{cvData.personal.email}</span>
                </div>
              </div>
              <div className="info-item">
                <FaGlobe className="info-icon" />
                <div>
                  <span className="info-label">Website</span>
                  <span className="info-value">{cvData.personal.website}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

