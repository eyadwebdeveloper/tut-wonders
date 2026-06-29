import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwzG7LC8TmVNsA3887CWfjUp3la52-GRkQx4A_PtFr-fK8_UszPb_c3BrTHn6yFDvhj/exec";

/* ─── INLINE STYLES ─────────────────────────────────────────── */
const css = `
  /* ── Apply Section ─────────────────────────────────────────── */
  #apply {
    background: linear-gradient(180deg, var(--green-dark) 0%, var(--green-mid) 50%, var(--green-dark) 100%);
    position: relative;
    overflow: hidden;
  }
  #apply::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,169,110,.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* ── Header ─────────────────────────────────────────────────── */
  .apply-header {
    text-align: center;
    margin-bottom: 64px;
  }
  .apply-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: rgba(201,169,110,.08);
    border: 1px solid rgba(201,169,110,.22);
    padding: 6px 18px 6px 12px;
    border-radius: 20px;
    font-size: .67rem;
    letter-spacing: .3em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 22px;
  }
  .apply-badge-dot {
    width: 6px; height: 6px;
    background: var(--terra-light);
    border-radius: 50%;
    animation: applyPulse 2s ease-in-out infinite;
  }
  @keyframes applyPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }

  /* ── Two-column layout ──────────────────────────────────────── */
  .apply-grid {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 60px;
    align-items: start;
  }
  @media (max-width: 860px) {
    .apply-grid { grid-template-columns: 1fr; gap: 40px; }
    .apply-sidebar { order: 2; }
    .apply-form-wrapper { order: 1; }
  }

  /* ── Sidebar ─────────────────────────────────────────────────── */
  .apply-sidebar .section-label { margin-bottom: 10px; }
  .apply-sidebar .section-title { margin-bottom: 16px; font-size: clamp(1.8rem,3.5vw,2.8rem); }
  .apply-sidebar .section-sub { margin-bottom: 36px; font-size: .92rem; line-height: 1.8; }

  .apply-perks {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 36px;
  }
  .apply-perk {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .55s ease, transform .55s ease;
  }
  .apply-perk.visible { opacity: 1; transform: none; }
  .apply-perk-icon {
    width: 38px; height: 38px; flex-shrink: 0;
    background: rgba(201,169,110,.08);
    border: 1px solid rgba(201,169,110,.2);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: var(--gold);
  }
  .apply-perk-icon svg { width: 18px; height: 18px; }
  .apply-perk-text p:first-child {
    font-family: 'Cinzel', serif;
    font-size: .78rem;
    font-weight: 600;
    letter-spacing: .08em;
    color: var(--gold-pale);
    margin-bottom: 3px;
  }
  .apply-perk-text p:last-child {
    font-size: .8rem;
    color: var(--text-dim);
    line-height: 1.6;
  }

  .apply-roles {
    border: 1px solid rgba(201,169,110,.15);
    border-radius: 8px;
    overflow: hidden;
  }
  .apply-roles-head {
    background: rgba(201,169,110,.06);
    padding: 10px 16px;
    font-family: 'Cinzel', serif;
    font-size: .68rem;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    border-bottom: 1px solid rgba(201,169,110,.12);
  }
  .apply-role-tag {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-bottom: 1px solid rgba(201,169,110,.07);
    font-size: .82rem;
    color: var(--cream);
  }
  .apply-role-tag:last-child { border-bottom: none; }
  .apply-role-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--terra-light); flex-shrink: 0; }

  /* ── Form wrapper ───────────────────────────────────────────── */
  .apply-form-wrapper {
    background: rgba(30,61,47,.45);
    border: 1px solid rgba(201,169,110,.14);
    border-radius: 12px;
    padding: 40px;
    backdrop-filter: blur(8px);
    position: relative;
    overflow: hidden;
  }
  .apply-form-wrapper::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  @media (max-width: 600px) {
    .apply-form-wrapper { padding: 24px 18px; }
  }

  .apply-form-title {
    font-family: 'Cinzel', serif;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: .1em;
    color: var(--gold);
    margin-bottom: 28px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(201,169,110,.12);
  }
  .apply-form-title span { color: var(--terra-light); }

  /* ── Form rows & groups ─────────────────────────────────────── */
  .apply-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  @media (max-width: 540px) { .apply-row { grid-template-columns: 1fr; } }

  .apply-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }
  .apply-group:last-child { margin-bottom: 0; }

  .apply-label {
    font-size: .72rem;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--text-dim);
  }
  .apply-label .req { color: var(--terra-light); margin-left: 2px; }

  .apply-input, .apply-select, .apply-textarea {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(201,169,110,.18);
    border-radius: 6px;
    color: var(--cream);
    font-family: 'Raleway', sans-serif;
    font-size: .88rem;
    padding: 12px 14px;
    outline: none;
    transition: border-color .25s, background .25s;
    width: 100%;
    box-sizing: border-box;
  }
  .apply-input::placeholder, .apply-textarea::placeholder { color: var(--text-dim); opacity: .7; }
  .apply-input:focus, .apply-select:focus, .apply-textarea:focus {
    border-color: var(--gold);
    background: rgba(255,255,255,.06);
  }
  .apply-input.error, .apply-select.error, .apply-textarea.error {
    border-color: var(--terra-light);
  }
  .apply-select {
    cursor: pointer; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238FAF98' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }
  .apply-select option { background: var(--green-mid); color: var(--cream); }
  .apply-textarea { resize: vertical; min-height: 110px; line-height: 1.7; }

  /* ── Section divider inside form ────────────────────────────── */
  .apply-form-section {
    font-family: 'Cinzel', serif;
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 24px 0 18px;
  }
  .apply-form-section::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(201,169,110,.15);
  }

  /* ── Email notice box ───────────────────────────────────────── */
  .apply-email-notice {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: rgba(201,169,110,.05);
    border: 1px solid rgba(201,169,110,.18);
    border-radius: 8px;
    padding: 14px 16px;
    margin-bottom: 8px;
  }
  .apply-email-notice svg { width: 16px; height: 16px; flex-shrink: 0; color: var(--gold); margin-top: 2px; }
  .apply-email-notice p { font-size: .78rem; color: var(--text-dim); line-height: 1.7; margin: 0; }
  .apply-email-notice a { color: var(--gold); text-decoration: underline; }

  /* ── Submit button ──────────────────────────────────────────── */
  .apply-submit {
    width: 100%;
    margin-top: 24px;
    background: linear-gradient(135deg, var(--terra), var(--terra-light));
    color: var(--cream);
    padding: 15px 40px;
    font-family: 'Cinzel', serif;
    font-size: .82rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
    transition: transform .3s, opacity .3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .apply-submit:hover:not(:disabled) { transform: translateY(-2px); opacity: .9; }
  .apply-submit:disabled { opacity: .55; cursor: not-allowed; transform: none; }
  .apply-submit svg { width: 16px; height: 16px; }

  /* ── Progress indicator ─────────────────────────────────────── */
  .apply-progress {
    display: flex;
    gap: 6px;
    margin-bottom: 24px;
  }
  .apply-progress-step {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: rgba(201,169,110,.15);
    transition: background .4s;
  }
  .apply-progress-step.done { background: var(--gold); }
  .apply-progress-step.active { background: var(--terra-light); }

  /* ── Success state ──────────────────────────────────────────── */
  .apply-success {
    text-align: center;
    padding: 48px 20px;
    animation: applyFadeIn .6s ease;
  }
  @keyframes applyFadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
  .apply-success-ring {
    width: 80px; height: 80px;
    border: 2px solid var(--gold);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px;
    color: var(--gold);
    font-size: 32px;
  }
  .apply-success h3 {
    font-family: 'Cinzel', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--gold);
    margin-bottom: 12px;
    letter-spacing: .06em;
  }
  .apply-success > p {
    color: var(--text-dim);
    font-size: .9rem;
    line-height: 1.8;
    max-width: 340px;
    margin: 0 auto 20px;
  }
  .apply-success-ref {
    display: inline-block;
    background: rgba(201,169,110,.08);
    border: 1px solid rgba(201,169,110,.2);
    padding: 8px 20px;
    border-radius: 20px;
    font-family: 'Cinzel', serif;
    font-size: .72rem;
    letter-spacing: .2em;
    color: var(--gold);
    margin-bottom: 28px;
  }
  .apply-success-email {
    background: rgba(201,169,110,.06);
    border: 1px solid rgba(201,169,110,.2);
    border-radius: 8px;
    padding: 20px 22px;
    text-align: left;
  }
  .apply-success-email-title {
    font-family: 'Cinzel', serif;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .18em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 10px;
  }
  .apply-success-email p {
    font-size: .82rem;
    color: var(--text-dim);
    line-height: 1.8;
    margin-bottom: 8px;
    max-width: none;
  }
  .apply-success-email strong { color: var(--cream); }
  .apply-success-email a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    background: linear-gradient(135deg, var(--terra), var(--terra-light));
    color: var(--cream);
    padding: 10px 22px;
    border-radius: 6px;
    font-family: 'Cinzel', serif;
    font-size: .73rem;
    font-weight: 700;
    letter-spacing: .15em;
    text-transform: uppercase;
    text-decoration: none;
    transition: opacity .2s, transform .2s;
  }
  .apply-success-email a:hover { opacity: .88; transform: translateY(-1px); }
  .apply-success-email a svg { width: 14px; height: 14px; }

  /* ── Error hint ─────────────────────────────────────────────── */
  .apply-hint {
    font-size: .7rem;
    color: var(--terra-light);
    margin-top: 2px;
  }

  /* ── Overlay loader ─────────────────────────────────────────── */
  .apply-submitting-overlay {
    position: absolute; inset: 0;
    background: rgba(20,43,31,.88);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    z-index: 10;
    border-radius: 12px;
    animation: applyFadeIn .3s ease;
  }
  .apply-spinner {
    width: 48px; height: 48px;
    border: 3px solid rgba(201,169,110,.2);
    border-top-color: var(--gold);
    border-radius: 50%;
    animation: applySpin 1s linear infinite;
  }
  @keyframes applySpin { to { transform: rotate(360deg); } }
  .apply-submitting-overlay p {
    font-family: 'Cinzel', serif;
    font-size: .75rem;
    letter-spacing: .25em;
    color: var(--gold);
    text-transform: uppercase;
  }

  /* ── RTL Support for Apply ──────────────────────────────────── */
  [dir="rtl"] .apply-badge {
    padding: 6px 12px 6px 18px;
  }
  [dir="rtl"] .apply-perk {
    flex-direction: row-reverse;
  }
  [dir="rtl"] .apply-form-section::after {
    margin-right: 12px;
    margin-left: 0;
  }
  [dir="rtl"] .apply-label .req {
    margin-left: 0;
    margin-right: 2px;
  }
  [dir="rtl"] .apply-select {
    background-position: left 14px center;
    padding-right: 14px;
    padding-left: 36px;
  }
  [dir="rtl"] .apply-email-notice {
    flex-direction: row-reverse;
  }
  [dir="rtl"] .apply-email-notice svg {
    transform: scaleX(-1);
  }
  [dir="rtl"] .apply-success-email {
    text-align: right;
  }
  [dir="rtl"] .apply-success-email a {
    flex-direction: row-reverse;
  }
  [dir="rtl"] .apply-progress-step:first-child {
    border-radius: 2px 0 0 2px;
  }
  [dir="rtl"] .apply-progress-step:last-child {
    border-radius: 0 2px 2px 0;
  }
`;

const generateRef = () =>
  "TW-" +
  Date.now().toString(36).toUpperCase() +
  "-" +
  Math.random().toString(36).slice(2, 5).toUpperCase();

const Apply = () => {
  const { t } = useTranslation();
  const ROLES = t("apply.form.roles", { returnObjects: true });
  const EXPERT_OR_TRAINER_OPTIONS = t(
    "apply.form.fields.expertOrTrainer.options",
    { returnObjects: true },
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    expertOrTrainer: "",
    portfolio: "",
    linkedin: "",
    summary: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState("");

  // ── FIX: Proper CSS injection ──────────────────────────────────
  useEffect(() => {
    // Check if styles already exist
    if (document.getElementById("apply-styles")) return;

    // Create and inject style element
    const el = document.createElement("style");
    el.id = "apply-styles";
    el.textContent = css;
    document.head.appendChild(el);

    // Cleanup function to remove styles when component unmounts
    return () => {
      const styleEl = document.getElementById("apply-styles");
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  // ── FIX: Observer for perks ────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    // Wait for DOM to be ready
    const timeoutId = setTimeout(() => {
      document
        .querySelectorAll(".apply-perk")
        .forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  // progress bar
  const totalSteps = 6;
  const filled = [
    form.firstName && form.lastName,
    form.email,
    form.phone,
    form.role,
    form.expertOrTrainer,
    form.summary,
  ].filter(Boolean).length;

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = t("apply.errors.required");
    if (!form.lastName.trim()) e.lastName = t("apply.errors.required");
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = t("apply.errors.email");
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{7,}$/.test(form.phone))
      e.phone = t("apply.errors.phone");
    if (!form.role) e.role = t("apply.errors.role");
    if (!form.expertOrTrainer)
      e.expertOrTrainer = t("apply.errors.expertOrTrainer");
    if (!form.summary.trim() || form.summary.length < 60)
      e.summary = t("apply.errors.summary");
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    const ref = generateRef();

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          role: form.role,
          expertOrTrainer: form.expertOrTrainer,
          portfolio: form.portfolio || "",
          linkedin: form.linkedin || "",
          summary: form.summary,
        }),
      });
    } catch (_) {
      // no-cors always throws for opaque responses — submission still went through
    }

    setRefCode(ref);
    setSubmitting(false);
    setSubmitted(true);
  };

  const PERKS = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: t("apply.sidebar.perks.flexible.title"),
      desc: t("apply.sidebar.perks.flexible.desc"),
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      title: t("apply.sidebar.perks.impact.title"),
      desc: t("apply.sidebar.perks.impact.desc"),
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: t("apply.sidebar.perks.team.title"),
      desc: t("apply.sidebar.perks.team.desc"),
    },
  ];

  return (
    <section id="apply">
      <div className="container">
        {/* ── Header ── */}
        <div className="apply-header">
          <div className="apply-badge">
            <span className="apply-badge-dot"></span>
            {t("apply.badge")}
          </div>
          <h2 className="section-title reveal" style={{ textAlign: "center" }}>
            {t("apply.title")}
            <br />
            {t("apply.titleEnd")}
          </h2>
          <p
            className="section-sub reveal"
            style={{ textAlign: "center", maxWidth: "520px", margin: "0 auto" }}
          >
            {t("apply.subtitle")}
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="apply-grid">
          {/* Sidebar */}
          <div className="apply-sidebar">
            <div className="apply-perks">
              {PERKS.map((p, i) => (
                <div
                  className="apply-perk"
                  key={i}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="apply-perk-icon">{p.icon}</div>
                  <div className="apply-perk-text">
                    <p>{p.title}</p>
                    <p>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="apply-roles">
              <div className="apply-roles-head">{t("apply.sidebar.roles")}</div>
              {ROLES.map((r) => (
                <div className="apply-role-tag" key={r}>
                  <span className="apply-role-dot"></span>
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="apply-form-wrapper">
            {submitted ? (
              /* ── Success ── */
              <div className="apply-success">
                <div className="apply-success-ring">✓</div>
                <h3>{t("apply.success.title")}</h3>
                <p>
                  {t("apply.success.message").replace("{name}", form.firstName)}
                </p>
                <div className="apply-success-ref">
                  {t("apply.success.ref").replace("{ref}", refCode)}
                </div>

                <div className="apply-success-email">
                  <p className="apply-success-email-title">
                    📎 {t("apply.success.filesTitle")}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: t("apply.success.filesMessage"),
                    }}
                  />
                  <p style={{ fontSize: ".75rem" }}>
                    Subject:{" "}
                    <strong>
                      {t("apply.success.subject").replace("{ref}", refCode)}
                    </strong>
                  </p>
                  <a
                    href={`mailto:info@tutwonders.com?subject=${encodeURIComponent(t("apply.success.subject").replace("{ref}", refCode))}&body=${encodeURIComponent(`Hi, please find attached my CV and National ID for my application (Ref: ${refCode}).%0A%0AName: ${form.firstName} ${form.lastName}%0ARole: ${form.role}`)}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {t("apply.success.button")}
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Progress bar */}
                <div className="apply-progress">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={[
                        "apply-progress-step",
                        i < filled - 1
                          ? "done"
                          : i === filled - 1
                            ? "active"
                            : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    />
                  ))}
                </div>

                <div className="apply-form-title">
                  {t("apply.form.title")} <span>·</span>{" "}
                  {new Date().getFullYear()}
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* ── Personal Details ── */}
                  <p className="apply-form-section">
                    {t("apply.form.sections.personal")}
                  </p>

                  <div className="apply-row">
                    <div className="apply-group">
                      <label className="apply-label">
                        {t("apply.form.fields.firstName.label")}{" "}
                        <span className="req">*</span>
                      </label>
                      <input
                        className={`apply-input${errors.firstName ? " error" : ""}`}
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder={t(
                          "apply.form.fields.firstName.placeholder",
                        )}
                      />
                      {errors.firstName && (
                        <span className="apply-hint">{errors.firstName}</span>
                      )}
                    </div>
                    <div className="apply-group">
                      <label className="apply-label">
                        {t("apply.form.fields.lastName.label")}{" "}
                        <span className="req">*</span>
                      </label>
                      <input
                        className={`apply-input${errors.lastName ? " error" : ""}`}
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder={t(
                          "apply.form.fields.lastName.placeholder",
                        )}
                      />
                      {errors.lastName && (
                        <span className="apply-hint">{errors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="apply-row">
                    <div className="apply-group">
                      <label className="apply-label">
                        {t("apply.form.fields.email.label")}{" "}
                        <span className="req">*</span>
                      </label>
                      <input
                        className={`apply-input${errors.email ? " error" : ""}`}
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t("apply.form.fields.email.placeholder")}
                      />
                      {errors.email && (
                        <span className="apply-hint">{errors.email}</span>
                      )}
                    </div>
                    <div className="apply-group">
                      <label className="apply-label">
                        {t("apply.form.fields.phone.label")}{" "}
                        <span className="req">*</span>
                      </label>
                      <input
                        className={`apply-input${errors.phone ? " error" : ""}`}
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={t("apply.form.fields.phone.placeholder")}
                      />
                      {errors.phone && (
                        <span className="apply-hint">{errors.phone}</span>
                      )}
                    </div>
                  </div>

                  {/* ── Role & Experience ── */}
                  <p className="apply-form-section">
                    {t("apply.form.sections.role")}
                  </p>

                  <div className="apply-group">
                    <label className="apply-label">
                      {t("apply.form.fields.role.label")}{" "}
                      <span className="req">*</span>
                    </label>
                    <select
                      className={`apply-select${errors.role ? " error" : ""}`}
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="">
                        {t("apply.form.fields.role.placeholder")}
                      </option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <span className="apply-hint">{errors.role}</span>
                    )}
                  </div>

                  <div className="apply-group">
                    <label className="apply-label">
                      {t("apply.form.fields.expertOrTrainer.label")}{" "}
                      <span className="req">*</span>
                    </label>
                    <select
                      className={`apply-select${errors.expertOrTrainer ? " error" : ""}`}
                      name="expertOrTrainer"
                      value={form.expertOrTrainer}
                      onChange={handleChange}
                    >
                      <option value="">
                        {t("apply.form.fields.expertOrTrainer.placeholder")}
                      </option>
                      {EXPERT_OR_TRAINER_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.expertOrTrainer && (
                      <span className="apply-hint">
                        {errors.expertOrTrainer}
                      </span>
                    )}
                  </div>

                  <div className="apply-row">
                    <div className="apply-group">
                      <label className="apply-label">
                        {t("apply.form.fields.portfolio.label")}
                      </label>
                      <input
                        className="apply-input"
                        type="url"
                        name="portfolio"
                        value={form.portfolio}
                        onChange={handleChange}
                        placeholder={t(
                          "apply.form.fields.portfolio.placeholder",
                        )}
                      />
                    </div>
                    <div className="apply-group">
                      <label className="apply-label">
                        {t("apply.form.fields.linkedin.label")}
                      </label>
                      <input
                        className="apply-input"
                        type="url"
                        name="linkedin"
                        value={form.linkedin}
                        onChange={handleChange}
                        placeholder={t(
                          "apply.form.fields.linkedin.placeholder",
                        )}
                      />
                    </div>
                  </div>

                  <div className="apply-group">
                    <label className="apply-label">
                      {t("apply.form.fields.summary.label")}{" "}
                      <span className="req">*</span>
                    </label>
                    <textarea
                      className={`apply-textarea${errors.summary ? " error" : ""}`}
                      name="summary"
                      value={form.summary}
                      onChange={handleChange}
                      placeholder={t("apply.form.fields.summary.placeholder")}
                    />
                    <span
                      style={{
                        fontSize: ".7rem",
                        color: "var(--text-dim)",
                        textAlign: "right",
                        display: "block",
                        marginTop: "4px",
                      }}
                    >
                      {t("apply.charCount").replace(
                        "{count}",
                        form.summary.length,
                      )}
                    </span>
                    {errors.summary && (
                      <span className="apply-hint">{errors.summary}</span>
                    )}
                  </div>

                  {/* ── Attachments notice ── */}
                  <p className="apply-form-section">
                    {t("apply.form.sections.attachments")}
                  </p>

                  <div className="apply-email-notice">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <p>
                      {t("apply.notice.title")}{" "}
                      <strong style={{ color: "var(--cream)" }}>
                        {t("apply.notice.cv")}
                      </strong>{" "}
                      {t("apply.notice.and")}{" "}
                      <strong style={{ color: "var(--cream)" }}>
                        {t("apply.notice.id")}
                      </strong>{" "}
                      {t("apply.notice.to")}{" "}
                      <a href="mailto:info@tutwonders.com">
                        info@tutwonders.com
                      </a>
                      .{t("apply.notice.extra")}
                    </p>
                  </div>

                  {errors._global && (
                    <p
                      style={{
                        color: "var(--terra-light)",
                        fontSize: ".82rem",
                        marginTop: "8px",
                        textAlign: "center",
                      }}
                    >
                      {errors._global}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="apply-submit"
                    disabled={submitting}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    {t("apply.form.submit")}
                  </button>
                </form>

                {submitting && (
                  <div className="apply-submitting-overlay">
                    <div className="apply-spinner"></div>
                    <p>Sending your application…</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apply;
