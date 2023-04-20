import i18n from "i18next";
import { initReactI18next } from "react-i18next";


// Importing translation files
import translationEN from "./locales/en/translation.json";
import translationHE from "./locales/hn/translation.json";
import ns1 from "./locales/en/ns1.json";
import ns2 from "./locales/en/ns2.json";
import nsHe1 from "./locales/hn/ns1.json";
import nsHe2 from "./locales/hn/ns2.json";


//Creating object with the variables of imported translation files
export const defaultNS = 'translation'
export const resources = {
  en: {
    translation: translationEN,
    ns1: ns1,
    ns2: ns2,
  },
  hn: {
    translation: translationHE,
    ns1: nsHe1,
    ns2: nsHe2,
  },
} as const;

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng:"en", //default language
    defaultNS: defaultNS,
    ns: ['translation', 'ns1', 'ns2'],
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;