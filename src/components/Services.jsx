import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const ServiceIcon = ({ type }) => {
  const icons = {
    web: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    mobile: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    design: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    ai: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
    custom: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    shield: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    strategy: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    ecommerce: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  };
  return <div className="service-icon">{icons[type]}</div>;
};

const Services = () => {
  const { t } = useTranslation();
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll(".service-card.reveal")
      .forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, []);

  const servicesKeys = [
    "web",
    "mobile",
    "design",
    "ai",
    "custom",
    "strategy",
    "ecommerce",
    "shield",
  ];
  const servicesData = servicesKeys.map((key) => ({
    key,
    num: String(servicesKeys.indexOf(key) + 1).padStart(2, "0"),
    title: t(`services.items.${key}.title`),
    desc: t(`services.items.${key}.desc`),
    icon: key,
  }));

  return (
    <section id="services">
      <div className="container">
        <div className="services-header">
          <div>
            <p className="section-label">{t("services.label")}</p>
            <h2 className="section-title">
              {t("services.title")}
              <br />
              {t("services.titleEnd")}
            </h2>
          </div>
          <p className="section-sub">{t("services.subtitle")}</p>
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
