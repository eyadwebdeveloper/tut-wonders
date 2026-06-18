import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    // Create sunrays
    const raysContainer = document.getElementById("heroRays");
    for (let i = 0; i < 24; i++) {
      const ray = document.createElement("div");
      ray.className = "ray";
      ray.style.transform = `rotate(${i * 15}deg)`;
      ray.style.animationDelay = `${(i * 0.15) % 4}s`;
      raysContainer.appendChild(ray);
    }

    // Create particles
    const particlesContainer = document.getElementById("particles");
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
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-rays" id="heroRays"></div>
      <div id="particles"></div>

      <div className="hero-content">
        <p className="hero-eyebrow">
          <span></span> Digital Excellence From Egypt To The World <span></span>
        </p>
        <h1 className="hero-title">
          We Build
          <br />
          <span className="accent">Digital</span>
          <br />
          <span className="terra">Wonders</span>
        </h1>
        <p className="hero-desc">
          Websites, mobile apps, and digital experiences crafted with precision
          — blending ancient creativity with modern technology.
        </p>
        <div className="hero-actions">
          <a href="#services" className="btn-primary">
            Explore Services
          </a>
          <a href="#contact" className="btn-ghost">
            Start a Project
          </a>
        </div>
      </div>

    </section>
  );
};

export default Hero;
