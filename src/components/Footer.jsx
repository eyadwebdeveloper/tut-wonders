import HeaderLogo from '../images/header-logo.png';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src={HeaderLogo} alt="Tut Wonders" />
            <p>Digital solutions built with the precision of ancient craftsmen and the power of modern technology. From Egypt, for the world.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Web Development</a></li>
              <li><a href="#services">Mobile Apps</a></li>
              <li><a href="#services">UI/UX Design</a></li>
              <li><a href="#services">E-Commerce</a></li>
              <li><a href="#services">Maintenance</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#why">About Us</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#stack">Technologies</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Behance</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Tut Wonders. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" title="LinkedIn">in</a>
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Instagram">ig</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;