import { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    service: '',
    message: ''
  });
  const [buttonText, setButtonText] = useState('Send Message');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText('Sending…');
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonText('✓ Message Sent!');
      setTimeout(() => {
        setButtonText('Send Message');
        setButtonDisabled(false);
        setFormData({ firstName: '', lastName: '', email: '', service: '', message: '' });
      }, 2000);
    }, 1600);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.contact-item.reveal, .section-label.reveal, .section-title.reveal, .section-sub.reveal')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div>
            <p className="section-label reveal">Get In Touch</p>
            <h2 className="section-title reveal">Let's Talk About<br/>Your Project</h2>
            <p className="section-sub reveal">Whether you have a clear brief or just an idea, we'd love to hear from you. No commitment, just a conversation.</p>
            <div className="contact-info">
              <div className="contact-item reveal">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-label">Location</p>
                  <p className="contact-value">Egypt · Remote Worldwide</p>
                </div>
              </div>
              <div className="contact-item reveal">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-label">Email</p>
                  <a href="mailto:info@tutwonders.com" className="contact-value">info@tutwonders.com</a>
                </div>
              </div>
              <div className="contact-item reveal">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.68h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="contact-label">WhatsApp</p>
                  <a href="https://wa.me/201012446686" className="contact-value" target="_blank" rel="noopener noreferrer">+201012446686</a>
                </div>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="Eyad" 
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Ashraf" 
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email"
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Service Needed</label>
              <select name="service" value={formData.service} onChange={handleChange}>
                <option value="">Select a service…</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Maintenance & Support">Maintenance & Support</option>
                <option value="Digital Strategy">Digital Strategy</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tell Us About Your Project</label>
              <textarea 
                name="message"
                placeholder="Describe your idea, goals, or any questions you have…"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', textAlign: 'center', fontSize: '.8rem' }}
              disabled={buttonDisabled}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;