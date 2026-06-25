// src/components/Process.jsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Process = () => {
  const { t } = useTranslation();
  const steps = ['discovery', 'strategy', 'development', 'testing', 'launch'];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = Array.from(document.querySelectorAll('.process-step')).indexOf(el) * 100;
          setTimeout(() => el.classList.add('visible'), delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.process-step').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process">
      <div className="container">
        <div className="process-header">
          <p className="section-label" style={{ justifyContent: 'center' }}>{t('process.label')}</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>{t('process.title')}<br/>{t('process.titleEnd')}</h2>
          <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>{t('process.subtitle')}</p>
        </div>
        <div className="process-timeline">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-circle">0{index + 1}</div>
              <h3 className="step-title">{t(`process.steps.${step}.title`)}</h3>
              <p className="step-desc">{t(`process.steps.${step}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;