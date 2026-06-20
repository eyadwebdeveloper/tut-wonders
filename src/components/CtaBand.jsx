import { useEffect } from 'react';

const CtaBand = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.cta-title.reveal, .cta-sub.reveal, .cta-actions.reveal')
      .forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="cta">
      <div className="container">
        <h2 className="cta-title reveal">Ready to Build Something Extraordinary?</h2>
        <p className="cta-sub reveal">Let's turn your vision into a digital wonder.</p>
        <div className="cta-actions reveal">
          <a href="#contact" className="btn-white">Start Your Project</a>
        </div>
      </div>
    </section>
  );
};

export default CtaBand;