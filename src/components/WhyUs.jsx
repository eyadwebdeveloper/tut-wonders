import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const WhyUs = () => {
  const { t } = useTranslation();

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
      .querySelectorAll(
        ".why-feature, .why-visual.reveal, .founder-card.reveal",
      )
      .forEach((el) => {
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);

  const features = [
    { key: "innovation", icon: "ai" },
    { key: "accessibility", icon: "accessibility" },
    { key: "ux", icon: "ux" },
    { key: "scalability", icon: "scalability" },
  ];

  const getIcon = (key) => {
    const icons = {
      ai: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
        </svg>
      ),
      accessibility: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      ux: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      scalability: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    };
    return icons[key] || icons.ai;
  };

  return (
    <section id="why">
      <div className="container">
        <p className="section-label reveal">{t("why.label")}</p>
        <h2 className="section-title reveal">
          {t("why.title")}
          <br />
          {t("why.titleEnd")}
        </h2>

        <div className="why-grid">
          <div className="why-visual reveal">
            <div className="why-card-main">
              <div className="big-stat">2+</div>
              <div className="big-stat-label">{t("why.stats.years")}</div>
              <div className="stat-row">
                <div className="stat-item">
                  <div className="stat-val">10+</div>
                  <div className="stat-lbl">{t("why.stats.projects")}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-val">5+</div>
                  <div className="stat-lbl">{t("why.stats.techs")}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-val">100%</div>
                  <div className="stat-lbl">{t("why.stats.custom")}</div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "16px",
                  padding: "10px 14px",
                  background: "rgba(201,169,110,.06)",
                  borderRadius: "6px",
                  fontSize: ".75rem",
                  color: "var(--gold)",
                  letterSpacing: ".1em",
                  textAlign: "center",
                }}
              >
                🇪🇬 {t("why.stats.location")}
              </div>
            </div>
          </div>

          <div className="why-features">
            {features.map((feature, index) => (
              <div
                className="why-feature"
                key={index}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">{getIcon(feature.icon)}</div>
                <div>
                  <h3 className="feature-title">
                    {t(`why.features.${feature.key}.title`)}
                  </h3>
                  <p className="feature-desc">
                    {t(`why.features.${feature.key}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Founder Message */}
        <div className="founder-card reveal" style={{ marginTop: "80px" }}>
          <div className="founder-quote-mark">
            <svg
              viewBox="0 0 48 36"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 36V21.6C0 9.6 7.2 2.4 21.6 0L24 3.6C16 5.4 11.4 10 10.8 17.4H20.4V36H0ZM27.6 36V21.6C27.6 9.6 34.8 2.4 49.2 0L51.6 3.6C43.6 5.4 39 10 38.4 17.4H48V36H27.6Z" />
            </svg>
          </div>
          <div className="founder-inner">
            <div className="founder-content">
              <blockquote className="founder-quote">
                {t("why.founder.quote")}
              </blockquote>
              <div className="founder-divider"></div>
              <div className="founder-sig">
                <div className="founder-avatar">MF</div>
                <div>
                  <strong className="founder-name">
                    {t("why.founder.name")}
                  </strong>
                  <span className="founder-title-role">
                    {t("why.founder.title")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
