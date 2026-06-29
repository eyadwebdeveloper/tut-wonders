import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

/* ── Inline styles scoped to this section ─────────────────────────── */
const css = `
  /* ── Section shell ── */
  #projects {
    background: var(--green-dark);
    position: relative;
    overflow: hidden;
  }
  #projects::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(201,169,110,.25), transparent);
  }

  /* ── Header ── */
  .projects-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 72px;
  }

  /* ── Single project card ── */
  .project-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid rgba(201,169,110,.14);
    border-radius: 16px;
    overflow: hidden;
    background: rgba(26,56,40,.35);
    backdrop-filter: blur(6px);
    opacity: 0;
    transform: translateY(40px);
    transition: opacity .7s ease, transform .7s ease;
  }
  .project-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  @media (max-width: 860px) {
    .project-card { grid-template-columns: 1fr; }
  }

  /* ── Left: visual panel ── */
  .project-visual {
    position: relative;
    background: linear-gradient(140deg, #0b2233 0%, #0e3048 50%, #0a2a1e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 56px 40px;
    min-height: 460px;
    overflow: hidden;
  }
  .project-visual::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,180,220,.08) 0%, transparent 70%),
      radial-gradient(ellipse 40% 30% at 70% 70%, rgba(201,169,110,.05) 0%, transparent 60%);
    pointer-events: none;
  }

  /* Decorative grid lines */
  .project-visual::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,180,220,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,180,220,.04) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
  }

  /* App mockup frame */
  .project-mockup {
    position: relative;
    z-index: 1;
    width: 200px;
    background: #0f1e2a;
    border: 1.5px solid rgba(0,200,240,.22);
    border-radius: 28px;
    padding: 18px 14px 24px;
    box-shadow:
      0 0 0 6px rgba(0,0,0,.35),
      0 0 60px rgba(0,180,220,.12),
      0 32px 80px rgba(0,0,0,.6);
  }
  .project-mockup-notch {
    width: 60px; height: 10px;
    background: #0f1e2a;
    border: 1.5px solid rgba(0,200,240,.18);
    border-radius: 8px;
    margin: 0 auto 16px;
  }
  .project-mockup-screen {
    background: linear-gradient(160deg, #0d2535, #0f3040);
    border-radius: 14px;
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .mockup-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  .mockup-logo-dot {
    width: 22px; height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00b4dc, #0077a8);
    display: flex; align-items: center; justify-content: center;
    font-size: 9px; font-weight: 700; color: #fff;
  }
  .mockup-title {
    font-size: 8px; font-weight: 700;
    color: #e0f4ff; letter-spacing: .06em;
  }
  .mockup-rating {
    background: rgba(255,200,0,.12);
    border: 1px solid rgba(255,200,0,.2);
    border-radius: 4px;
    padding: 2px 5px;
    font-size: 7px;
    color: #ffd700;
  }
  .mockup-greeting {
    font-size: 7px; color: rgba(200,235,255,.6); margin-bottom: 2px;
  }
  .mockup-user {
    font-size: 10px; font-weight: 700; color: #e0f4ff;
  }
  .mockup-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-top: 4px;
  }
  .mockup-btn {
    background: rgba(0,180,220,.1);
    border: 1px solid rgba(0,180,220,.2);
    border-radius: 8px;
    padding: 8px 6px;
    display: flex; flex-direction: column;
    align-items: center; gap: 5px;
  }
  .mockup-btn-icon {
    width: 16px; height: 16px;
    background: rgba(0,180,220,.25);
    border-radius: 4px;
  }
  .mockup-btn-label {
    font-size: 6.5px; color: rgba(200,235,255,.75);
    text-align: center; line-height: 1.3;
  }
  .mockup-section-title {
    font-size: 6.5px; font-weight: 700;
    color: rgba(200,235,255,.5);
    letter-spacing: .1em; text-transform: uppercase;
    margin-top: 4px;
  }
  .mockup-helper-row {
    display: flex; align-items: center; gap: 6px;
    background: rgba(0,180,220,.06);
    border-radius: 6px; padding: 5px 7px;
  }
  .mockup-avatar {
    width: 16px; height: 16px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00b4dc, #005f80);
    display: flex; align-items: center; justify-content: center;
    font-size: 6px; font-weight: 700; color: #fff;
    flex-shrink: 0;
  }
  .mockup-helper-info { flex: 1; }
  .mockup-helper-name { font-size: 7px; color: #e0f4ff; font-weight: 600; }
  .mockup-helper-dist { font-size: 6px; color: rgba(200,235,255,.5); }
  .mockup-online { width: 5px; height: 5px; border-radius: 50%; background: #22dd88; }
  .mockup-request-btn {
    margin-top: 8px;
    background: linear-gradient(135deg, #00b4dc, #0077a8);
    border-radius: 8px;
    padding: 7px;
    text-align: center;
    font-size: 7px; font-weight: 700; color: #fff;
    letter-spacing: .04em;
  }

  /* Floating stat badge */
  .project-stat-badge {
    position: absolute;
    bottom: 40px;
    right: 28px;
    background: rgba(10,25,18,.85);
    border: 1px solid rgba(201,169,110,.25);
    border-radius: 10px;
    padding: 10px 16px;
    backdrop-filter: blur(8px);
    z-index: 2;
  }
  .project-stat-badge .badge-num {
    font-family: 'Cinzel', serif;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
  }
  .project-stat-badge .badge-lbl {
    font-size: .65rem;
    color: rgba(200,235,255,.55);
    letter-spacing: .08em;
    margin-top: 2px;
  }

  /* Live badge */
  .project-live-badge {
    position: absolute;
    top: 28px;
    left: 28px;
    background: rgba(0,0,0,.55);
    border: 1px solid rgba(34,221,136,.35);
    border-radius: 20px;
    padding: 5px 12px 5px 8px;
    display: flex; align-items: center; gap: 7px;
    font-size: .65rem;
    color: #22dd88;
    letter-spacing: .1em;
    text-transform: uppercase;
    backdrop-filter: blur(6px);
    z-index: 2;
  }
  .project-live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #22dd88;
    animation: livePulse 1.8s ease-in-out infinite;
  }
  @keyframes livePulse {
    0%,100% { opacity:1; box-shadow:0 0 0 0 rgba(34,221,136,.4); }
    50% { opacity:.7; box-shadow:0 0 0 5px rgba(34,221,136,0); }
  }

  /* ── Right: content panel ── */
  .project-content {
    padding: 56px 52px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0;
  }
  @media (max-width: 860px) {
    .project-content { padding: 40px 28px; }
    .project-visual { min-height: 320px; }
  }

  .project-type-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(0,180,220,.08);
    border: 1px solid rgba(0,180,220,.2);
    border-radius: 4px;
    padding: 4px 12px;
    font-size: .65rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: #5dd4ef;
    margin-bottom: 22px;
    width: fit-content;
  }

  .project-name {
    font-family: 'Cinzel', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 700;
    color: var(--gold);
    line-height: 1.1;
    margin-bottom: 8px;
  }
  .project-tagline {
    font-size: 1rem;
    color: rgba(200,235,255,.7);
    font-weight: 300;
    margin-bottom: 24px;
    line-height: 1.6;
  }
  .project-desc {
    font-size: .92rem;
    color: var(--gold-pale);
    line-height: 1.85;
    margin-bottom: 32px;
    font-weight: 300;
  }

  /* Stats row */
  .project-stats {
    display: flex;
    gap: 28px;
    margin-bottom: 36px;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(201,169,110,.1);
  }
  .project-stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .project-stat-val {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
  }
  .project-stat-lbl {
    font-size: .68rem;
    color: rgba(200,235,255,.5);
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  /* Tech pills */
  .project-tech-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 36px;
  }
  .project-tech-pill {
    background: rgba(201,169,110,.06);
    border: 1px solid rgba(201,169,110,.16);
    border-radius: 4px;
    padding: 4px 12px;
    font-size: .7rem;
    color: var(--gold-pale);
    letter-spacing: .05em;
  }

  /* Actions */
  .project-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }
  .project-btn-live {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #00b4dc, #0077a8);
    color: #fff;
    padding: 13px 28px;
    font-family: 'Cinzel', serif;
    font-size: .75rem;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    clip-path: polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%);
    transition: opacity .3s, transform .3s;
  }
  .project-btn-live:hover { opacity: .88; transform: translateY(-2px); }
  .project-btn-live svg { width: 13px; height: 13px; }

  .project-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--gold);
    padding: 13px 28px;
    font-family: 'Cinzel', serif;
    font-size: .75rem;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid rgba(201,169,110,.35);
    border-radius: 4px;
    clip-path: polygon(7px 0%, 100% 0%, calc(100% - 7px) 100%, 0% 100%);
    transition: background .3s, color .3s, transform .3s;
  }
  .project-btn-ghost:hover {
    background: var(--gold);
    color: var(--green-dark);
    transform: translateY(-2px);
  }
  .project-btn-ghost svg { width: 13px; height: 13px; }

  /* Own-work chip */
  .project-own-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(201,169,110,.06);
    border: 1px solid rgba(201,169,110,.2);
    border-radius: 20px;
    padding: 4px 12px;
    font-size: .63rem;
    letter-spacing: .15em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 14px;
    width: fit-content;
  }
  .project-own-badge svg { width: 10px; height: 10px; }
`;

const Projects = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
    return () => styleEl.remove();
  }, []);

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
      { threshold: 0.1 },
    );
    document
      .querySelectorAll(".project-card, .projects-header .reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const mockupBtns = t("projects.tutcare.mockupBtns", { returnObjects: true });
  const helpers = t("projects.tutcare.helpers", { returnObjects: true });
  const stats = t("projects.tutcare.stats", { returnObjects: true });

  return (
    <section id="projects">
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <p className="section-label reveal">{t("projects.label")}</p>
          <h2 className="section-title reveal">
            {t("projects.title")}
            <br />
            {t("projects.titleEnd")}
          </h2>
          <p className="section-sub reveal" style={{ marginBottom: 0 }}>
            {t("projects.subtitle")}
          </p>
        </div>

        {/* TutCare Card */}
        <div className="project-card">
          {/* Left: App Mockup Visual */}
          <div className="project-visual">
            <span className="project-live-badge">
              <span className="project-live-dot" />
              {t("projects.tutcare.live")}
            </span>

            {/* Phone mockup */}
            <div className="project-mockup">
              <div className="project-mockup-notch" />
              <div className="project-mockup-screen">
                <div className="mockup-topbar">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div className="mockup-logo-dot">TC</div>
                    <span className="mockup-title">TUT CARE</span>
                  </div>
                  <span className="mockup-rating">★ 4.9</span>
                </div>
                <div>
                  <div className="mockup-greeting">
                    {t("projects.tutcare.greeting")} 👋
                  </div>
                  <div className="mockup-user">Eyad</div>
                </div>
                <div className="mockup-grid">
                  {Array.isArray(mockupBtns) &&
                    mockupBtns.map((label, i) => (
                      <div className="mockup-btn" key={i}>
                        <div className="mockup-btn-icon" />
                        <span className="mockup-btn-label">{label}</span>
                      </div>
                    ))}
                </div>
                <div
                  className="mockup-section-title"
                  style={{ marginTop: "8px" }}
                >
                  {t("projects.tutcare.nearbyHelpers")}
                </div>
                {Array.isArray(helpers) &&
                  helpers.map((h) => (
                    <div className="mockup-helper-row" key={h.initials}>
                      <div className="mockup-avatar">{h.initials}</div>
                      <div className="mockup-helper-info">
                        <div className="mockup-helper-name">{h.name}</div>
                        <div className="mockup-helper-dist">
                          {h.dist} · ★ 4.8
                        </div>
                      </div>
                      <div className="mockup-online" />
                    </div>
                  ))}
                <div className="mockup-request-btn">
                  {t("projects.tutcare.requestBtn")}
                </div>
              </div>
            </div>

            {/* Floating stat */}
            <div className="project-stat-badge">
              <div className="badge-num">50K+</div>
              <div className="badge-lbl">
                {t("projects.tutcare.activeUsers")}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="project-content">
            <div className="project-own-badge">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {t("projects.tutcare.builtBy")}
            </div>

            <div className="project-type-tag">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <path d="M12 18h.01" />
              </svg>
              {t("projects.tutcare.typeTag")}
            </div>

            <h3 className="project-name">TUT CARE</h3>
            <p className="project-tagline">{t("projects.tutcare.tagline")}</p>
            <p className="project-desc">{t("projects.tutcare.desc")}</p>

            <div className="project-stats">
              {Array.isArray(stats) &&
                stats.map((s) => (
                  <div className="project-stat" key={s.val}>
                    <span className="project-stat-val">{s.val}</span>
                    <span className="project-stat-lbl">{s.lbl}</span>
                  </div>
                ))}
            </div>

            <div className="project-tech-row">
              {[
                "Flutter",
                "Firebase",
                "AI / TTS",
                "Real-time GPS",
                "In-App Payments",
                "Background Checks",
              ].map((tech) => (
                <span key={tech} className="project-tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-actions">
              <a
                href="https://www.tutcare.com"
                target="_blank"
                rel="noopener noreferrer"
                className="project-btn-live"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                {t("projects.tutcare.visitBtn")}
              </a>
              <Link to="/tutcare" className="project-btn-ghost">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M12 18h.01" />
                </svg>
                {t("projects.tutcare.learnMoreBtn")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
