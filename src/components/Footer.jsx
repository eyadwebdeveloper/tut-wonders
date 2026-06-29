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
