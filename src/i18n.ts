import { en } from './i18n/en';
import { fr } from './i18n/fr';
import { es } from './i18n/es';
import { pt } from './i18n/pt';
import { it } from './i18n/it';
import { ar } from './i18n/ar';

export const translations: Record<string, Record<string, string>> = {
  en,
  fr,
  es,
  pt,
  it,
  ar
};

export const getTranslation = (lang: string, key: string): string => {
  const dict = translations[lang];
  if (!dict) {
    if (import.meta.env?.DEV) {
      console.error(`[i18n] Missing language dictionary: ${lang}`);
    }
    return key;
  }
  
  const val = dict[key];
  if (val !== undefined && val !== '') {
    return val;
  }
  
  if (import.meta.env?.DEV) {
    console.error(`[i18n] Missing translation: ${key} for ${lang}`);
  }
  return key;
};
