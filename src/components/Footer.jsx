import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import HeaderLogo from "../images/header-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <img src={HeaderLogo} alt="Tut Wonders" />
            <p>{t("footer.description")}</p>

            {/* TutCare mini-card in footer */}
            <Link
              to="/tutcare"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "20px",
                padding: "11px 18px",
                background: "rgba(0,180,220,.08)",
                border: "1px solid rgba(0,180,220,.25)",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "background .25s, border-color .25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,180,220,.16)";
                e.currentTarget.style.borderColor = "rgba(0,180,220,.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,180,220,.08)";
                e.currentTarget.style.borderColor = "rgba(0,180,220,.25)";
              }}
            >
              {/* TutCare icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#00b4dc,#0077a8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: ".72rem",
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    color: "#00b4dc",
                    lineHeight: 1,
                    marginBottom: "3px",
                  }}
                >
                  {t("tutcare.footerTitle")}
                </div>
                <div
                  style={{
                    fontSize: ".68rem",
                    color: "rgba(200,235,255,.55)",
                    lineHeight: 1.3,
                    maxWidth: "160px",
                  }}
                >
                  {t("tutcare.footerDesc")}
                </div>
              </div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(0,180,220,.6)"
                strokeWidth="2.5"
                style={{ marginLeft: "auto", flexShrink: 0 }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>{t("footer.services")}</h4>
            <ul>
              <li>
                <a href="#services">{t("services.items.web.title")}</a>
              </li>
              <li>
                <a href="#services">{t("services.items.mobile.title")}</a>
              </li>
              <li>
                <a href="#services">{t("services.items.design.title")}</a>
              </li>
              <li>
                <a href="#services">{t("services.items.ecommerce.title")}</a>
              </li>
              <li>
                <a href="#services">{t("services.items.shield.title")}</a>
              </li>
              {/* TutCare as a featured product link */}
              <li>
                <Link
                  to="/tutcare"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    color: "#00b4dc",
                    textDecoration: "none",
                    fontSize: ".82rem",
                    transition: "color .2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#5dd4ef")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#00b4dc")
                  }
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {t("tutcare.footerTitle")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h4>{t("footer.company")}</h4>
            <ul>
              <li>
                <a href="#why">{t("footer.links.about")}</a>
              </li>
              <li>
                <a href="#process">{t("footer.links.process")}</a>
              </li>
              <li>
                <a href="#stack">{t("footer.links.technologies")}</a>
              </li>
              <li>
                <a href="#testimonials">{t("footer.links.reviews")}</a>
              </li>
              <li>
                <a href="#contact">{t("footer.links.contact")}</a>
              </li>
              <li>
                <a href="#apply">{t("footer.links.careers")}</a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h4>{t("footer.connect")}</h4>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/tut-wonders-9a6839378/">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/tut.wonders">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/tutwonders">Instagram</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Tut Wonders. {t("footer.rights")}
          </p>
          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/in/tut-wonders-9a6839378/"
              title="LinkedIn"
            >
              in
            </a>
            <a href="https://www.facebook.com/tut.wonders" title="Facebook">
              f
            </a>
            <a href="https://www.instagram.com/tutwonders" title="Instagram">
              ig
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
