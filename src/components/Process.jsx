import { useEffect } from 'react';

const processSteps = [
  { num: '01', title: 'Discovery', desc: 'We listen deeply to understand your goals, users, and constraints. The right brief shapes everything that follows.' },
  { num: '02', title: 'Strategy & Design', desc: 'Wireframes, prototypes, and a visual direction that aligns your brand with user needs.' },
  { num: '03', title: 'Development', desc: 'Clean, scalable code. Agile sprints with regular check-ins so you\'re always in the loop.' },
  { num: '04', title: 'Testing & QA', desc: 'Cross-device testing, performance audits, and security checks before anything goes live.' },
  { num: '05', title: 'Launch & Grow', desc: 'Smooth deployment, onboarding support, and ongoing maintenance to keep you ahead.' }
];

const Process = () => {
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
          <p className="section-label" style={{ justifyContent: 'center' }}>How We Work</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>From Idea to Launch,<br/>Step by Step</h2>
          <p className="section-sub" style={{ textAlign: 'center', margin: '0 auto' }}>A transparent, collaborative process designed to get your project right — the first time.</p>
        </div>
        <div className="process-timeline">
          {processSteps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-circle">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;