// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Import translations directly
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

// RTL languages
const rtlLanguages = ['ar'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Handle RTL and font
i18n.on('languageChanged', (lng) => {
  const html = document.documentElement;
  const body = document.body;
  
  if (rtlLanguages.includes(lng)) {
    html.dir = 'rtl';
    html.lang = 'ar';
    body.style.fontFamily = "'Cairo', 'Raleway', sans-serif";
    // Add Cairo font if not already loaded
    if (!document.querySelector('#cairo-font')) {
      const link = document.createElement('link');
      link.id = 'cairo-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap';
      document.head.appendChild(link);
    }
  } else {
    html.dir = 'ltr';
    html.lang = lng;
    body.style.fontFamily = "'Raleway', sans-serif";
  }
});

export default i18n;