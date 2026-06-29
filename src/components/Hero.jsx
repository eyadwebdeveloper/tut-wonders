import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Hero = ({ onOpenBot }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const raysContainer = document.getElementById("heroRays");
    if (raysContainer && !raysContainer.children.length) {
      for (let i = 0; i < 24; i++) {
        const ray = document.createElement("div");
        ray.className = "ray";
        ray.style.transform = `rotate(${i * 15}deg)`;
        ray.style.animationDelay = `${(i * 0.15) % 4}s`;
        raysContainer.appendChild(ray);
      }
    }

    const particlesContainer = document.getElementById("particles");
    if (particlesContainer && !particlesContainer.children.length) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement("div");
        p.className = "particle";
        p.style.cssText = `
          left: ${10 + Math.random() * 80}%;
          bottom: ${Math.random() * 30}%;
          animation-duration: ${5 + Math.random() * 8}s;
          animation-delay: ${Math.random() * 6}s;
          width: ${2 + Math.random() * 3}px;
          height: ${2 + Math.random() * 3}px;
          opacity: 0;
        `;
        particlesContainer.appendChild(p);
      }
    }
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-rays" id="heroRays"></div>
      <div id="particles"></div>

      <div className="hero-content">
        <p className="hero-eyebrow">
          <span></span> {t("hero.eyebrow")} <span></span>
        </p>
        <h1 className="hero-title">
          {t("hero.title")}
          <br />
          <span className="accent">{t("hero.titleAccent")}</span>
          <br />
          <span className="terra">{t("hero.titleEnd")}</span>
        </h1>
        <p className="hero-desc">{t("hero.description")}</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onOpenBot}>
            {t("hero.cta")}
          </button>
          <a href="#services" className="btn-ghost">
            {t("hero.viewWork")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
