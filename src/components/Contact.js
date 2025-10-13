import React, { useState } from 'react';
import { cvData } from '../data/cvData';
import { FaEnvelope, FaLinkedin, FaGithub, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For Netlify forms, you'd use their form handling
    // This is a basic implementation
    const mailtoLink = `mailto:${cvData.personal.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new opportunities, interesting projects, 
              or just having a chat.
            </p>
            
            <div className="contact-methods">
              <a href={`mailto:${cvData.personal.email}`} className="contact-method">
                <FaEnvelope className="contact-icon" />
                <div>
                  <span className="method-label">Email</span>
                  <span className="method-value">{cvData.personal.email}</span>
                </div>
              </a>
              
              <a href={`https://${cvData.personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-method">
                <FaLinkedin className="contact-icon" />
                <div>
                  <span className="method-label">LinkedIn</span>
                  <span className="method-value">{cvData.personal.linkedin}</span>
                </div>
              </a>

            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              <FaPaperPlane className="btn-icon" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};


export default Contact;

