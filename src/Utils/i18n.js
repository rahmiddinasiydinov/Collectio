import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationUz from './locales/uz/translationUz.json';
import translationEn from "./locales/en/translationEn.json";
const lang = JSON.parse(window.localStorage.getItem('language')) || 'uz';
const resources = {
    en: {
        translation:translationEn
    }, 
    uz: {
        translation:translationUz
    }
}
i18n.use(initReactI18next)
    .init({
        resources,
        lng: lang,
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        }
    });
export default i18n;
