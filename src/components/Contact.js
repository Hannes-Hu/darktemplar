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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          ...formData
        }).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h2>Kontakt</h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Beispiel</h3>
            <p>
              Beispielstext.
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

          <form 
            className="contact-form" 
            onSubmit={handleSubmit}
            name="contact"
            method="POST"
            data-netlify="true"
          >
            <input type="hidden" name="form-name" value="contact" />
            
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
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <FaPaperPlane className="btn-icon" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitStatus === 'success' && (
              <div className="form-success">
                Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="form-error">
                Es ist ein Fehler beim Senden Ihrer Nachricht aufgetreten. Bitte versuchen Sie es erneut oder senden Sie mir direkt eine E-Mail.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

