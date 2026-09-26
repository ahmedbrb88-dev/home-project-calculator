import { en } from './en';
import { fr } from './fr';
import { es } from './es';
import { pt } from './pt';
import { it } from './it';
import { ar } from './ar';
import type { SiteContent } from './types';

const contentMap: Record<string, SiteContent> = {
  en,
  fr,
  es,
  pt,
  it,
  ar,
};

export function getContent(language: string): SiteContent {
  const content = contentMap[language];
  if (!content) throw new Error(`Content not found for language: ${language}`);
  return content;
}
