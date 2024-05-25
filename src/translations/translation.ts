import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import homeSr from "./assets/sr.json";
import homeEn from "./assets/en.json";

const resources = {
  en: {
    home: homeEn,
  },
  sr: {
    home: homeSr,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "sr-Latn",
  debug: false,
  fallbackLng: "sr-Latn",
  saveMissing: true,
  compatibilityJSON: "v3",
});

export default i18next;
