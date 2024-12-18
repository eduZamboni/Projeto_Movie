import React, { createContext, useState, useContext } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';

const storedLang = (localStorage.getItem('language')) || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es }
    },
    lng: storedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

const GlobalContext = createContext({
  language: 'en',
  changeLanguage: () => {}
});

export const GlobalProvider = ({ children }) => {
  const [language, setLanguage] = useState(storedLang);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  return (
    <GlobalContext.Provider value={{ language, changeLanguage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);