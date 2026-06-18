import { useEffect, useRef } from 'react';

const servicesData = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'High-performance websites and web apps built with modern frameworks. Fast, secure, and scalable solutions tailored to your business needs.',
    icon: 'web'
  },
  {
    num: '02',
    title: 'Mobile Apps',
    desc: 'Native and cross-platform mobile applications for iOS and Android. Smooth, intuitive, and built to delight users from the first tap.',
    icon: 'mobile'
  },
  {
    num: '03',
    title: 'UI/UX Design',
    desc: 'User interfaces that balance beauty and function. We design experiences that feel effortless and convert visitors into customers.',
    icon: 'design'
  },
  {
    num: '04',
    title: 'Maintenance & Support',
    desc: 'Your product needs ongoing care. We offer proactive monitoring, updates, and technical support so your digital presence always performs at its best.',
    icon: 'shield'
  },
  {
    num: '05',
    title: 'Digital Strategy',
    desc: 'Roadmaps, audits, and digital transformation consulting. We help you make confident decisions about your technology investments.',
    icon: 'strategy'
  },
  {
    num: '06',
    title: 'E-Commerce',
    desc: 'Online stores that sell. We build and optimize e-commerce platforms optimized for conversions, performance, and seamless checkout flows.',
    icon: 'ecommerce'
  }
];

const ServiceIcon = ({ type }) => {
  const icons = {
    web: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    mobile: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
      </svg>
    ),
    design: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    ecommerce: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>
      </svg>
    )
  };
  return <div className="service-icon">{icons[type]}</div>;
};

const Services = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.service-card.reveal').forEach(el => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services">
      <div className="container">
        <div className="services-header">
          <div>
            <p className="section-label">What We Do</p>
            <h2 className="section-title">Services That<br/>Move The Needle</h2>
          </div>
          <p className="section-sub">
            From strategy to launch, we deliver digital products built for performance, 
            scale, and lasting impact. Every pixel. Every interaction. Every line of code.
          </p>
        </div>
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card reveal">
              <span className="service-num">{service.num}</span>
              <ServiceIcon type={service.icon} />
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;