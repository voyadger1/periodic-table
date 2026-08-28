import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импортируем JSON-файлы напрямую (альтернатива бэкенду)
import translationEN from './locales/en/translation.json';
import translationRU from './locales/ru/translation.json';
import type { TLanguage } from '@/shared/data/langs';

const resources: {
  [K in TLanguage]?: { translation: any };
} = {
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
};
// Функция для определения языка с переопределением
const getDetectedLanguage = (browserLang: string): TLanguage[] => {
  if ((['be', 'kk', 'uk', 'uz'] as TLanguage[]).some((lang) => lang === browserLang)) {
    return ['ru', 'en'];
  }

  // Для всех остальных — английский (fallback)
  return ['en'];
};

i18n
  // если используете HTTP-бэкенд, раскомментируйте следующую строку и закомментируйте resources
  .use(initReactI18next) // передаёт i18n в react-i18next
  .init({
    resources, // ресурсы (если не используете Backend)
    lng: 'ru',
    fallbackLng: getDetectedLanguage, // язык по умолчанию
    debug: true, // включить логи (для разработки)
    interpolation: {
      escapeValue: false, // React уже защищает от XSS
    },
  });

export default i18n;
