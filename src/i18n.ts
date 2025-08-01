import i18n from 'i18next';
import detector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.json';
import uz from './locales/uz.json';

const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
};

const language = localStorage.getItem('I18N_LANGUAGE');
if (!language) {
  localStorage.setItem('I18N_LANGUAGE', 'ru');
}

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('I18N_LANGUAGE') || 'ru',
    fallbackLng: 'ru', // use en if detected lng is not available
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
