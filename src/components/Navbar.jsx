import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeaderLogo from "../images/header-logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = ({ onOpenBot }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isTutCare = location.pathname === "/tutcare";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleResize = () => {
      if (window.innerWidth > 900 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  const handleGetStarted = () => {
    setMenuOpen(false);
    onOpenBot?.();
  };

  return (
    <nav
      className={`${scrolled ? "scrolled" : ""} ${isTutCare ? "tutcare-nav" : ""}`}
    >
      <a href="https://tutwonders.com" className="nav-logo">
        <img src={HeaderLogo} alt="Tut Wonders" />
      </a>

      {isTutCare ? (
        /* ── TutCare: back button centred, nothing else ── */
        <div className="tutcare-nav-center">
          <Link to="/">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t("tutcare.backLink")}
          </Link>
        </div>
      ) : (
        /* ── Main site nav links ── */
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="#services" onClick={() => setMenuOpen(false)}>
              {t("nav.services")}
            </a>
          </li>
          <li>
            <a href="#why" onClick={() => setMenuOpen(false)}>
              {t("nav.about")}
            </a>
          </li>
          <li>
            <a href="#process" onClick={() => setMenuOpen(false)}>
              {t("nav.process")}
            </a>
          </li>
          <li>
            <a href="#stack" onClick={() => setMenuOpen(false)}>
              {t("nav.technologies")}
            </a>
          </li>
          <li>
            <a href="#apply" onClick={() => setMenuOpen(false)}>
              {t("nav.careers")}
            </a>
          </li>

          {/* ── TutCare themed CTA button ── */}
          <li>
            <Link
              to="/tutcare"
              onClick={() => setMenuOpen(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 18px",
                fontFamily: "'Cinzel', serif",
                fontSize: ".68rem",
                fontWeight: 600,
                letterSpacing: ".1em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "4px",
                background: "transparent",
                color: "#00b4dc",
                border: "1px solid rgba(0,180,220,.45)",
                clipPath:
                  "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
                transition: "background .25s, color .25s, border-color .25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg,#00b4dc,#0077a8)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#00b4dc";
                e.currentTarget.style.borderColor = "rgba(0,180,220,.45)";
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {t("tutcare.navBtn")}
            </Link>
          </li>

          {/* ── Get Started bot button ── */}
          <li>
            <button
              className="nav-cta"
              onClick={handleGetStarted}
              style={{
                cursor: "pointer",
                border: "none",
                fontFamily: "inherit",
              }}
            >
              {t("nav.getStarted")}
            </button>
          </li>
        </ul>
      )}

      <div className="nav-right">
        <LanguageSwitcher />
        {!isTutCare && (
          <button
            className="nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
