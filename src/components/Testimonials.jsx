// src/components/Testimonials.jsx
import { useTranslation } from 'react-i18next';

const StarIcon = () => (
  <svg viewBox="0 0 12 12" fill="currentColor" width="11" height="11">
    <path d="M6 0l1.6 3.6L11.5 4l-2.75 2.7.65 3.8L6 8.8l-3.4 1.7.65-3.8L0 4l3.9-.4z"/>
  </svg>
);

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonialsData = t('testimonials.items', { returnObjects: true });
  const allTestimonials = [...testimonialsData, ...testimonialsData];

  // Generate initials
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <section id="testimonials">
      <div className="container">
        <div className="testimonials-header">
          <p className="section-label reveal">{t('testimonials.label')}</p>
          <h2 className="section-title reveal">{t('testimonials.title')}</h2>
        </div>
      </div>
      <div className="testimonials-track-wrap">
        <div className="testimonials-track">
          {allTestimonials.map((t, index) => (
            <div key={index} className="testimonial-card">
              <div className="t-card-top">
                <div className="t-stars">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <svg className="t-quote-icon" viewBox="0 0 24 18" fill="currentColor">
                  <path d="M0 18V10.8C0 4.8 3.6 1.2 10.8 0L12 1.8C8 2.7 5.7 5 5.4 8.7H10.2V18H0ZM13.8 18V10.8C13.8 4.8 17.4 1.2 24.6 0L25.8 1.8C21.8 2.7 19.5 5 19.2 8.7H24V18H13.8Z"/>
                </svg>
              </div>
              <p className="t-text">{t.text}</p>
              <div className="t-author">
                <div className="t-avatar">{getInitials(t.name)}</div>
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;