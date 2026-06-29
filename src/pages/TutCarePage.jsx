import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../TutCare.css';

/* ── TutCare page meta / SEO helmet ── */
const TutCareMeta = () => (
  <Helmet>
    <title>TUT CARE – Community Care & Assistance App | TUT WONDERS</title>
    <meta name="description" content="TUT CARE connects people who need help with trusted community helpers nearby. Request assistance, track helpers in real-time, and join a caring community — coming soon to iOS & Android." />
    <meta name="keywords" content="TUT CARE, community care app, assistance app, helper app, TUT WONDERS, Egypt, accessibility, mobile app" />
    <meta name="author" content="Eyad Ashraf" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://tutwonders.com/tutcare" />

    {/* Open Graph */}
    <meta property="og:title" content="TUT CARE – Community Care & Assistance App" />
    <meta property="og:description" content="Connect with trusted community helpers nearby. Real-time tracking, verified helpers, and a caring community — built by TUT WONDERS." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://tutwonders.com/tutcare" />
    <meta property="og:image" content="https://tutwonders.com/src/images/tutcare-og.jpg" />
    <meta property="og:site_name" content="TUT WONDERS" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="TUT CARE – Community Care & Assistance App" />
    <meta name="twitter:description" content="Connect with trusted community helpers nearby. Coming soon to iOS & Android." />
    <meta name="twitter:image" content="https://tutwonders.com/src/images/tutcare-og.jpg" />

    {/* JSON-LD – SoftwareApplication */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "TUT CARE",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "iOS, Android",
        description: "TUT CARE connects people who need assistance with verified community helpers nearby, featuring real-time tracking and in-app communication.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Organization",
          name: "TUT WONDERS",
          url: "https://tutwonders.com",
        },
        url: "https://tutwonders.com/tutcare",
      })}
    </script>
  </Helmet>
);

/* ══════════════════════════════════════════════════════════════ */
const TutCarePage = () => {
  const { t } = useTranslation();
  const [faqOpen, setFaqOpen]             = useState(null);
  const [pricingAnnual, setPricingAnnual] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── safe translation arrays ─────────────────────────────── */
  const features    = t('tutcare.features',    { returnObjects: true }) || [];
  const userSteps   = t('tutcare.userSteps',   { returnObjects: true }) || [];
  const helperSteps = t('tutcare.helperSteps', { returnObjects: true }) || [];
  const plans       = t('tutcare.plans',       { returnObjects: true }) || [];
  const reviews     = t('tutcare.reviews',     { returnObjects: true }) || [];
  const faqs        = t('tutcare.faqs',        { returnObjects: true }) || [];
  const stats       = t('tutcare.stats',       { returnObjects: true }) || [];
  const mockupBtns  = t('tutcare.mockupBtns',  { returnObjects: true }) || [];
  const techStack   = t('tutcare.techStack',   { returnObjects: true }) || [];
  const screenshots = t('tutcare.screenshots', { returnObjects: true }) || [];

  /* ── feature icon paths ──────────────────────────────────── */
  const featureIcons = [
    "M12 2a7 7 0 0 1 7 7c0 4-3.5 7.5-7 11-3.5-3.5-7-7-7-11a7 7 0 0 1 7-7zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    "M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  ];

  const techIcons = [
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
    "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    "M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14M3 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z",
    "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z M9 3v18 M15 3v18",
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z",
  ];

  return (
    <>
      <TutCareMeta />
      <Navbar />

      <main className="tc-main">

        {/* ══ HERO ════════════════════════════════════════════════ */}
        <section className="tc-hero">
          <div className="tc-hero-glow" />
          <div className="container tc-hero-inner">
            <div className="tc-hero-grid">

              {/* left column */}
              <div>
                <div className="tc-badges">
                  <span className="tc-badge-live">
                    <span className="tc-badge-live-dot" />
                    {t('tutcare.liveBadge')}
                  </span>
                  <span className="tc-badge-built">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {t('tutcare.builtByBadge')}
                  </span>
                </div>

                <h1 className="tc-hero-title tc-fade-up">{t('tutcare.heroTitle')}</h1>
                <p className="tc-hero-subtitle tc-fade-up2">{t('tutcare.heroSubtitle')}</p>

                <div className="tc-hero-ctas tc-fade-up3">
                  <a href="#download" className="tc-btn tc-btn-primary tc-btn-disabled" aria-disabled="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    {t('tutcare.appStore')}
                  </a>
                  <a href="#download" className="tc-btn tc-btn-ghost tc-btn-disabled" aria-disabled="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.18 23.76c.35.2.74.24 1.12.12l12.4-7.17-2.62-2.63-10.9 9.68zm-1.04-18.5C2.05 5.6 2 6 2 6.44v11.12c0 .44.05.84.14 1.18l.07.06 6.23-6.23v-.15L2.21 5.2l-.07.06zM20.3 10.27l-2.65-1.53-2.93 2.92 2.93 2.93 2.66-1.54c.76-.44.76-1.34-.01-1.78zM4.3.12L16.7 7.29l-2.62 2.62L3.18.23C3.56.11 3.95.15 4.3.36z"/>
                    </svg>
                    {t('tutcare.googlePlay')}
                  </a>
                  <a href="#features" className="tc-btn tc-btn-ghost">{t('tutcare.exploreFeatures')}</a>
                </div>
              </div>

              {/* right – phone mockup */}
              <div className="tc-mockup-wrap">
                <div className="tc-mockup">
                  <div className="tc-mockup-notch" />
                  <div className="tc-mockup-screen">
                    <div className="tc-mockup-topbar">
                      <div className="tc-mockup-brand">
                        <div className="tc-mockup-icon">TC</div>
                        <span className="tc-mockup-brand-name">TUT CARE</span>
                      </div>
                      <span className="tc-mockup-rating">★ 4.9</span>
                    </div>
                    <div>
                      <div className="tc-mockup-greeting-label">{t('tutcare.mockupGreeting')} 👋</div>
                      <div className="tc-mockup-greeting-name">{t('tutcare.mockupGreetingName')}</div>
                    </div>
                    <div className="tc-mockup-grid">
                      {mockupBtns.map((lbl, i) => (
                        <div key={i} className="tc-mockup-btn">
                          <div className="tc-mockup-btn-icon" />
                          <span className="tc-mockup-btn-label">{lbl}</span>
                        </div>
                      ))}
                    </div>
                    <div className="tc-mockup-section-label">{t('tutcare.nearbyHelpers')}</div>
                    {[{ i: 'K', n: 'Karim A.', d: '0.3 km' }, { i: 'S', n: 'Sara M.', d: '0.6 km' }].map(h => (
                      <div key={h.i} className="tc-mockup-helper">
                        <div className="tc-mockup-helper-avatar">{h.i}</div>
                        <div style={{ flex: 1 }}>
                          <div className="tc-mockup-helper-name">{h.n}</div>
                          <div className="tc-mockup-helper-dist">{h.d} · ★ 4.8</div>
                        </div>
                        <div className="tc-mockup-helper-dot" />
                      </div>
                    ))}
                    <div className="tc-mockup-cta">{t('tutcare.requestHelper')}</div>
                  </div>
                </div>

                {/* floating stat badges */}
                {Array.isArray(stats) && stats.map((s, i) => (
                  <div
                    key={i}
                    className="tc-stat-badge"
                    style={{ top: i === 0 ? '10%' : i === 1 ? '30%' : i === 2 ? '55%' : '75%' }}
                  >
                    <div className="tc-stat-val">{s.val}</div>
                    <div className="tc-stat-lbl">{s.lbl}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ══ ABOUT ═══════════════════════════════════════════════ */}
        <section className="tc-how-section">
          <div className="container">
            <div className="tc-how-header">
              <p className="tc-section-label">{t('tutcare.aboutLabel')}</p>
              <h2 className="tc-section-title">
                {t('tutcare.aboutTitle')}<br />
                <span className="tc-section-title-sub">{t('tutcare.aboutTitleEnd')}</span>
              </h2>
              <p className="tc-how-subtitle">{t('tutcare.aboutSubtitle')}</p>
            </div>
            <div className="tc-how-grid">
              <div className="tc-how-panel">
                <div className="tc-how-panel-header">
                  <div className="tc-how-panel-icon tc-how-panel-icon-user">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                    </svg>
                  </div>
                  <h3 className="tc-how-panel-title">{t('tutcare.missionTitle')}</h3>
                </div>
                <div className="tc-how-steps">
                  <div className="tc-how-step">
                    <p className="tc-how-step-desc">{t('tutcare.missionText')}</p>
                  </div>
                </div>
              </div>

              <div className="tc-how-panel">
                <div className="tc-how-panel-header">
                  <div className="tc-how-panel-icon tc-how-panel-icon-helper">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                    </svg>
                  </div>
                  <h3 className="tc-how-panel-title">{t('tutcare.visionTitle')}</h3>
                </div>
                <div className="tc-how-steps">
                  <div className="tc-how-step">
                    <p className="tc-how-step-desc">{t('tutcare.visionText')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ THE PROBLEM ══════════════════════════════════════════ */}
        <section className="tc-pricing-section">
          <div className="container">
            <div className="tc-pricing-header">
              <p className="tc-section-label">{t('tutcare.problemLabel')}</p>
              <h2 className="tc-section-title">
                {t('tutcare.problemTitle')}<br />
                <span className="tc-section-title-sub">{t('tutcare.problemTitleEnd')}</span>
              </h2>
              <p className="tc-pricing-subtitle">{t('tutcare.problemSubtitle')}</p>
            </div>
            <div className="tc-pricing-grid">

              <div className="tc-plan-card tc-plan-card-regular">
                <p className="tc-plan-name tc-plan-name-regular">{t('tutcare.problem1Title')}</p>
                <p className="tc-plan-desc">{t('tutcare.problem1Desc')}</p>
                <div className="tc-problem-solution">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22dd88" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t('tutcare.problem1Solution')}
                </div>
              </div>

              <div className="tc-plan-card tc-plan-card-popular">
                <div className="tc-plan-popular-badge">{t('tutcare.mostUnderserved')}</div>
                <p className="tc-plan-name tc-plan-name-popular">{t('tutcare.problem2Title')}</p>
                <p className="tc-plan-desc">{t('tutcare.problem2Desc')}</p>
                <div className="tc-problem-solution">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22dd88" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t('tutcare.problem2Solution')}
                </div>
              </div>

              <div className="tc-plan-card tc-plan-card-regular">
                <p className="tc-plan-name tc-plan-name-regular">{t('tutcare.problem3Title')}</p>
                <p className="tc-plan-desc">{t('tutcare.problem3Desc')}</p>
                <div className="tc-problem-solution">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22dd88" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t('tutcare.problem3Solution')}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ FEATURES ═══════════════════════════════════════════ */}
        <section id="features" className="tc-features-section">
          <div className="container">
            <div className="tc-features-header">
              <p className="tc-section-label">{t('tutcare.featuresLabel')}</p>
              <h2 className="tc-section-title">
                {t('tutcare.featuresTitle')}<br />
                <span className="tc-section-title-sub">{t('tutcare.featuresTitleEnd')}</span>
              </h2>
              <p className="tc-features-subtitle">{t('tutcare.featuresSubtitle')}</p>
            </div>
            <div className="tc-features-grid">
              {Array.isArray(features) && features.map((f, i) => (
                <div key={i} className="tc-feature-card">
                  <div className="tc-feature-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5dd4ef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={featureIcons[i % featureIcons.length]} />
                    </svg>
                  </div>
                  <h3 className="tc-feature-title">{f.title}</h3>
                  <p className="tc-feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HOW IT WORKS ═══════════════════════════════════════ */}
        <section className="tc-how-section">
          <div className="container">
            <div className="tc-how-header">
              <p className="tc-section-label">{t('tutcare.howLabel')}</p>
              <h2 className="tc-section-title">{t('tutcare.howTitle')}</h2>
              <p className="tc-how-subtitle">{t('tutcare.howSubtitle')}</p>
            </div>
            <div className="tc-how-grid">
              <div className="tc-how-panel">
                <div className="tc-how-panel-header">
                  <div className="tc-how-panel-icon tc-how-panel-icon-user">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                  <h3 className="tc-how-panel-title">{t('tutcare.asUser')}</h3>
                </div>
                <div className="tc-how-steps">
                  {Array.isArray(userSteps) && userSteps.map((s, i) => (
                    <div key={i} className="tc-how-step">
                      <div className="tc-how-step-num tc-how-step-num-user">{i + 1}</div>
                      <div>
                        <div className="tc-how-step-title">{s.title}</div>
                        <div className="tc-how-step-desc">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="tc-how-panel">
                <div className="tc-how-panel-header">
                  <div className="tc-how-panel-icon tc-how-panel-icon-helper">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3 className="tc-how-panel-title">{t('tutcare.asHelper')}</h3>
                </div>
                <div className="tc-how-steps">
                  {Array.isArray(helperSteps) && helperSteps.map((s, i) => (
                    <div key={i} className="tc-how-step">
                      <div className="tc-how-step-num tc-how-step-num-helper">{i + 1}</div>
                      <div>
                        <div className="tc-how-step-title">{s.title}</div>
                        <div className="tc-how-step-desc">{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SCREENSHOTS ════════════════════════════════════════ */}
        <section className="tc-reviews-section">
          <div className="container">
            <div className="tc-reviews-header">
              <p className="tc-section-label">{t('tutcare.screenshotsLabel')}</p>
              <h2 className="tc-section-title">{t('tutcare.screenshotsTitle')}</h2>
              <p className="tc-screenshots-subtitle">{t('tutcare.screenshotsSubtitle')}</p>
            </div>
            <div className="tc-screenshots-grid">
              {Array.isArray(screenshots) && screenshots.map((s, i) => (
                <div key={i} className="tc-review-card tc-screenshot-card">
                  <div className="tc-screenshot-frame">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(0,180,220,.5)" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="3"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <span className="tc-screenshot-placeholder">{t('tutcare.screenshotPlaceholder')}</span>
                  </div>
                  <div className="tc-screenshot-info">
                    <div className="tc-review-name">{s.label}</div>
                    <div className="tc-review-role">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INTRO VIDEO ════════════════════════════════════════ */}
        <section className="tc-how-section">
          <div className="container">
            <div className="tc-how-header">
              <p className="tc-section-label">{t('tutcare.videoLabel')}</p>
              <h2 className="tc-section-title">
                {t('tutcare.videoTitle')}<br />
                <span className="tc-section-title-sub">{t('tutcare.videoTitleEnd')}</span>
              </h2>
              <p className="tc-how-subtitle">{t('tutcare.videoSubtitle')}</p>
            </div>
            <div className="tc-video-placeholder">
              <div className="tc-video-play-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--tc-blue)" strokeWidth="1.8">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
              <div className="tc-video-label-wrap">
                <div className="tc-video-title">{t('tutcare.videoComingSoon')}</div>
                <div className="tc-video-hint">{t('tutcare.videoHint')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TECH STACK ══════════════════════════════════════════ */}
        <section className="tc-features-section">
          <div className="container">
            <div className="tc-features-header">
              <p className="tc-section-label">{t('tutcare.techLabel')}</p>
              <h2 className="tc-section-title">
                {t('tutcare.techTitle')}<br />
                <span className="tc-section-title-sub">{t('tutcare.techTitleEnd')}</span>
              </h2>
              <p className="tc-features-subtitle">{t('tutcare.techSubtitle')}</p>
            </div>
            <div className="tc-features-grid">
              {Array.isArray(techStack) && techStack.map((tech, i) => (
                <div key={i} className="tc-feature-card">
                  <div className="tc-feature-icon-wrap">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5dd4ef" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={techIcons[i % techIcons.length]} />
                    </svg>
                  </div>
                  <h3 className="tc-feature-title">{tech.title}</h3>
                  <p className="tc-feature-desc">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ═══════════════════════════════════════ */}
        <section className="tc-reviews-section">
          <div className="container">
            <div className="tc-reviews-header">
              <p className="tc-section-label">{t('tutcare.reviewsLabel')}</p>
              <h2 className="tc-section-title">{t('tutcare.reviewsTitle')}</h2>
            </div>
            <div className="tc-reviews-grid">
              {Array.isArray(reviews) && reviews.map((r, i) => (
                <div key={i} className="tc-review-card">
                  <div className="tc-review-stars">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="#ffd700" stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="tc-review-text">"{r.text}"</p>
                  <div className="tc-review-author">
                    <div className="tc-review-avatar">{r.name[0]}</div>
                    <div>
                      <div className="tc-review-name">{r.name}</div>
                      <div className="tc-review-role">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PRICING ════════════════════════════════════════════ */}
        <section className="tc-pricing-section">
          <div className="container">
            <div className="tc-pricing-header">
              <p className="tc-section-label">{t('tutcare.pricingLabel')}</p>
              <h2 className="tc-section-title">{t('tutcare.pricingTitle')}</h2>
              <p className="tc-pricing-subtitle">{t('tutcare.pricingSubtitle')}</p>
              <div className="tc-pricing-toggle">
                <button
                  className={`tc-pricing-toggle-btn ${!pricingAnnual ? 'active' : 'inactive'}`}
                  onClick={() => setPricingAnnual(false)}
                >
                  {t('tutcare.monthly')}
                </button>
                <button
                  className={`tc-pricing-toggle-btn ${pricingAnnual ? 'active' : 'inactive'}`}
                  onClick={() => setPricingAnnual(true)}
                >
                  {t('tutcare.annual')} <span className="tc-pricing-discount">-20%</span>
                </button>
              </div>
            </div>
            <div className="tc-pricing-grid">
              {Array.isArray(plans) && plans.map((p, i) => (
                <div key={i} className={`tc-plan-card ${p.popular ? 'tc-plan-card-popular' : 'tc-plan-card-regular'}`}>
                  {p.popular && <div className="tc-plan-popular-badge">{t('tutcare.mostPopular')}</div>}
                  <p className={`tc-plan-name ${p.popular ? 'tc-plan-name-popular' : 'tc-plan-name-regular'}`}>{p.name}</p>
                  <div className="tc-plan-price-row">
                    <span className="tc-plan-price">
                      {p.price === '0' ? t('tutcare.free') : `$${pricingAnnual ? Math.round(Number(p.price) * .8) : p.price}`}
                    </span>
                    {p.price !== '0' && <span className="tc-plan-period">/{t('tutcare.mo')}</span>}
                  </div>
                  <p className="tc-plan-desc">{p.desc}</p>
                  <ul className="tc-plan-features">
                    {Array.isArray(p.features) && p.features.map((f, j) => (
                      <li key={j} className="tc-plan-feature">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22dd88" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="tc-plan-cta">
                    <span className={`tc-btn tc-btn-disabled ${p.popular ? 'tc-btn-primary' : 'tc-btn-ghost'}`}>
                      {p.price === '0' ? t('tutcare.getStartedFree') : t('tutcare.comingSoon')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FAQ ════════════════════════════════════════════════ */}
        <section className="tc-faq-section">
          <div className="container tc-faq-container">
            <div className="tc-faq-header">
              <p className="tc-section-label">{t('tutcare.faqLabel')}</p>
              <h2 className="tc-section-title">{t('tutcare.faqTitle')}</h2>
            </div>
            <div className="tc-faq-list">
              {Array.isArray(faqs) && faqs.map((f, i) => (
                <div key={i} className={`tc-faq-item ${faqOpen === i ? 'tc-faq-item-open' : 'tc-faq-item-closed'}`}>
                  <button className="tc-faq-trigger" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                    {f.q}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="var(--tc-blue)" strokeWidth="2.5"
                      className={`tc-faq-arrow ${faqOpen === i ? 'open' : ''}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  <div className={`tc-faq-body ${faqOpen === i ? 'open' : ''}`}>
                    <p className="tc-faq-answer">{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ DOWNLOAD / FINAL CTA ═══════════════════════════════ */}
        <section id="download" className="tc-cta-section">
          <div className="container">
            <div className="tc-cta-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--tc-blue)" strokeWidth="1.8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <h2 className="tc-section-title">{t('tutcare.ctaTitle')}</h2>
            <p className="tc-cta-subtitle">{t('tutcare.ctaSubtitle')}</p>
            <div className="tc-cta-btns">
              <a href="https://tutcare.com" onClick={e => e.preventDefault()} className="tc-btn tc-btn-primary tc-btn-disabled" aria-disabled="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                {t('tutcare.appStore')}
              </a>
              <a href="https://tutcare.com" onClick={e => e.preventDefault()} className="tc-btn tc-btn-ghost tc-btn-disabled" aria-disabled="true">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.35.2.74.24 1.12.12l12.4-7.17-2.62-2.63-10.9 9.68zm-1.04-18.5C2.05 5.6 2 6 2 6.44v11.12c0 .44.05.84.14 1.18l.07.06 6.23-6.23v-.15L2.21 5.2l-.07.06zM20.3 10.27l-2.65-1.53-2.93 2.92 2.93 2.93 2.66-1.54c.76-.44.76-1.34-.01-1.78zM4.3.12L16.7 7.29l-2.62 2.62L3.18.23C3.56.11 3.95.15 4.3.36z"/>
                </svg>
                {t('tutcare.googlePlay')}
              </a>
              <a href="https://tutcare.com" target="_blank" rel="noopener noreferrer" className="tc-btn tc-btn-ghost">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                {t('tutcare.visitWebsite')}
              </a>
            </div>
            <p className="tc-cta-note">{t('tutcare.ctaNote')}</p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default TutCarePage;
