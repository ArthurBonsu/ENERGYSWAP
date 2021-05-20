const i18next =require( 'i18next');
const { initReactI18next } =require( 'react-i18next');
const XHR =require( 'i18next-xhr-backend');
const LanguageDetector =require( 'i18next-browser-languagedetector');



//import i18next from 'i18next'
//import { initReactI18next } from 'react-i18next'
//import XHR from 'i18next-xhr-backend'
//import LanguageDetector from 'i18next-browser-languagedetector'
i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    react: {
      useSuspense: true
    },
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false }
  })

export default i18next
