// src/components/Contact.jsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [buttonText, setButtonText] = useState(t('contact.form.submit'));
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(formData.subject || 'Message from Tut Wonders Website');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.open(`mailto:info@tutwonders.com?subject=${subject}&body=${body}`, '_blank');

    setButtonText(t('contact.form.sending'));
    setButtonDisabled(true);
    setTimeout(() => {
      setButtonText(t('contact.form.sent'));
      setTimeout(() => {
        setButtonText(t('contact.form.submit'));
        setButtonDisabled(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 2000);
    }, 800);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document
      .querySelectorAll(
        '.contact-item.reveal, .section-label.reveal, .section-title.reveal, .section-sub.reveal'
      )
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">

          {/* ── Left column: info ── */}
          <div>
            <p className="section-label reveal">{t('contact.label')}</p>
            <h2 className="section-title reveal">
              {t('contact.title')}<br />{t('contact.titleEnd')}
            </h2>
            <p className="section-sub reveal">
              {t('contact.subtitle')}
            </p>

            <div className="contact-info">
              <div className="contact-item reveal">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="contact-label">{t('contact.info.location')}</p>
                  <p className="contact-value">{t('contact.info.locationValue')}</p>
                </div>
              </div>

              <div className="contact-item reveal">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="contact-label">{t('contact.info.email')}</p>
                  <a href="mailto:info@tutwonders.com" className="contact-value">
                    info@tutwonders.com
                  </a>
                </div>
              </div>

              <div className="contact-item reveal">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 4.87 2 2 0 0 1 3.59 2.68h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="contact-label">{t('contact.info.whatsapp')}</p>
                  <a
                    href="https://wa.me/201012446686"
                    className="contact-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +20 101 244 6686
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column: form ── */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t('contact.form.name')}</label>
              <input
                type="text"
                name="name"
                placeholder={t('contact.form.namePlaceholder')}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('contact.form.email')}</label>
              <input
                type="email"
                name="email"
                placeholder={t('contact.form.emailPlaceholder')}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>{t('contact.form.subject')}</label>
              <input
                type="text"
                name="subject"
                placeholder={t('contact.form.subjectPlaceholder')}
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>{t('contact.form.message')}</label>
              <textarea
                name="message"
                placeholder={t('contact.form.messagePlaceholder')}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', textAlign: 'center', fontSize: '.8rem' }}
              disabled={buttonDisabled}
            >
              {buttonText}
            </button>

            <p style={{
              marginTop: '12px',
              fontSize: '12px',
              color: 'var(--text-dim)',
              textAlign: 'center',
              lineHeight: 1.6
            }}>
              {t('contact.form.projectPrompt')}{' '}
              <button
                type="button"
                onClick={() => document.querySelector('.bot-toggle')?.click()}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--gold)',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                {t('contact.form.projectLink')}
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;