// src/components/TechStack.jsx
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const TechStack = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.stack-grid.reveal, .section-label.reveal, .section-title.reveal')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const techStack = [
    'React', 'Next.js', 'Vue.js', 'React Native', 'Flutter',
    'Node.js', 'Laravel', 'Python', 'TypeScript', 'PostgreSQL',
    'MongoDB', 'AWS', 'Firebase', 'Docker', 'Tailwind CSS',
    'GraphQL', 'REST APIs', 'Figma', 'Shopify', 'WordPress'
  ];

  return (
    <section id="stack">
      <div className="container">
        <div className="stack-header">
          <p className="section-label reveal" style={{ justifyContent: 'center' }}>{t('stack.label')}</p>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>{t('stack.title')}</h2>
        </div>
        <div className="stack-grid reveal">
          {techStack.map((tech, index) => (
            <span key={index} className="stack-tag">{tech}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;