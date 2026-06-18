import { useState, useEffect } from 'react';
import HeaderLogo from '../images/header-logo.png';
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    const handleResize = () => {
      if (window.innerWidth > 900 && menuOpen) setMenuOpen(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen]);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a href="https://tutwonders.com" className="nav-logo">
        <img src={HeaderLogo} alt="Tut Wonders" />
      </a>

      <button
        className="nav-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((s) => !s)}
      >
        {menuOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
        <li><a href="#why" onClick={() => setMenuOpen(false)}>About</a></li>
        <li><a href="#process" onClick={() => setMenuOpen(false)}>Process</a></li>
        <li><a href="#stack" onClick={() => setMenuOpen(false)}>Technologies</a></li>
        <li><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>Get Started</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
