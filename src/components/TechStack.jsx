import { useEffect } from 'react';

const techStack = [
  'React', 'Next.js', 'Vue.js', 'React Native', 'Flutter',
  'Node.js', 'Laravel', 'Python', 'TypeScript', 'PostgreSQL',
  'MongoDB', 'AWS', 'Firebase', 'Docker', 'Tailwind CSS',
  'GraphQL', 'REST APIs', 'Figma', 'Shopify', 'WordPress'
];

const TechStack = () => {
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

  return (
    <section id="stack">
      <div className="container">
        <div className="stack-header">
          <p className="section-label reveal" style={{ justifyContent: 'center' }}>Technologies</p>
          <h2 className="section-title reveal" style={{ textAlign: 'center' }}>Built With The Best Tools</h2>
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