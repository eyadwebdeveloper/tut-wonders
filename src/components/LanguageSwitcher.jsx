// src/components/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

// Flag images via Twemoji CDN — renders consistently on ALL devices/OS
// (no dependency on system emoji support)
const FLAG_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg';

const flagUrl = (code) => `${FLAG_CDN}/${code}.svg`;

const languages = [
  { code: 'en', label: 'English',  flagCode: '1f1ec-1f1e7' }, // 🇬🇧
  { code: 'ar', label: 'العربية', flagCode: '1f1ea-1f1ec' }, // 🇪🇬 Egypt
  { code: 'fr', label: 'Français', flagCode: '1f1eb-1f1f7' }, // 🇫🇷
  { code: 'es', label: 'Español',  flagCode: '1f1ea-1f1f8' }, // 🇪🇸
  { code: 'de', label: 'Deutsch',  flagCode: '1f1e9-1f1ea' }, // 🇩🇪
  { code: 'ru', label: 'Русский',  flagCode: '1f1f7-1f1fa' }, // 🇷🇺
];

const FlagImg = ({ flagCode, alt }) => (
  <img
    src={flagUrl(flagCode)}
    alt={alt}
    width="18"
    height="18"
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      borderRadius: '2px',
      flexShrink: 0,
      objectFit: 'cover',
    }}
    loading="lazy"
  />
);

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.select')}
      >
        <FlagImg flagCode={currentLanguage.flagCode} alt={currentLanguage.label} />
        <span className="lang-code">{currentLanguage.code.toUpperCase()}</span>
        <svg
          className={`lang-arrow ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${lang.code === i18n.language ? 'active' : ''}`}
              onClick={() => changeLanguage(lang.code)}
            >
              <FlagImg flagCode={lang.flagCode} alt={lang.label} />
              <span className="lang-label">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;