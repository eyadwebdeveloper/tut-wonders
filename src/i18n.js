// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';
import deTranslation from './locales/de/translation.json';
import ruTranslation from './locales/ru/translation.json';

const resources = {
  en: { translation: enTranslation },
  ar: { translation: arTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  de: { translation: deTranslation },
  ru: { translation: ruTranslation },
};

const rtlLanguages = ['ar'];

const ensureCairoFont = () => {
  if (!document.querySelector('#cairo-font')) {
    const link = document.createElement('link');
    link.id = 'cairo-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap';
    document.head.appendChild(link);
  }
};

export const applyLanguageDOM = (lng) => {
  const html = document.documentElement;
  if (rtlLanguages.includes(lng)) {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    html.classList.add('lang-ar');
    html.classList.remove('lang-ltr');
    ensureCairoFont();
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', lng || 'en');
    html.classList.remove('lang-ar');
    html.classList.add('lang-ltr');
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Apply DOM changes once i18n has detected/loaded the language
i18n.on('initialized', () => {
  applyLanguageDOM(i18n.language);
});

// Apply on every runtime language change
i18n.on('languageChanged', (lng) => {
  applyLanguageDOM(lng);
});

export default i18n;