// src/components/Footer.jsx
import { useTranslation } from 'react-i18next';
import HeaderLogo from '../images/header-logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={HeaderLogo} alt="Tut Wonders" />
            <p>{t('footer.description')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.services')}</h4>
            <ul>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Mobile Apps</a></li>
              <li><a href="#services">UI/UX Design</a></li>
              <li><a href="#services">E-Commerce</a></li>
              <li><a href="#services">Maintenance</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.company')}</h4>
            <ul>
              <li><a href="#why">About Us</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#stack">Technologies</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#apply">Careers</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('footer.connect')}</h4>
            <ul>
              <li><a href="https://tutwonders.com">LinkedIn</a></li>
              <li><a href="https://tutwonders.com">Facebook</a></li>
              <li><a href="https://tutwonders.com">Instagram</a></li>
              <li><a href="https://tutwonders.com">Behance</a></li>
              <li><a href="https://tutwonders.com">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Tut Wonders. {t('footer.rights')}</p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/tut-wonders-9a6839378/" title="LinkedIn">in</a>
            <a href="https://www.facebook.com/tut.wonders" title="Facebook">f</a>
            <a href="https://www.instagram.com/tutwonders" title="Instagram">ig</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;