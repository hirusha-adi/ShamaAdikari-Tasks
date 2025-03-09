import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi) // Load translations from JSON files
  .use(LanguageDetector) // Detect user's language
  .use(initReactI18next) // Initialize react-i18next
  .init({
    fallbackLng: "en", // Default language
    debug: false, // Set to true for debugging
    interpolation: {
      escapeValue: false, // Not needed for React
    },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Path to translation files
    },
    detection: {
      order: ["localStorage", "navigator"], // Detect language from localStorage first
      caches: ["localStorage"], // Store user's preference
    },
  });

export default i18n;
