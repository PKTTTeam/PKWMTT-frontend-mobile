import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './src/translation/locales/en.json';
import pl from './src/translation/locales/pl.json';

const resources = {
  en: { translation: en },
  pl: { translation: pl },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb: (lang: string) => void) => {
    const locales = RNLocalize.getLocales();
    cb(locales[0]?.languageCode || 'pl');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pl',
    interpolation: { escapeValue: false },
  });

export default i18n;
