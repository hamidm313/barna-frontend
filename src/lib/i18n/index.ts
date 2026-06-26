import { useSiteTheme } from '@/providers/ThemeProvider';
import fa from './fa';
import en from './en';
import fr from './fr';

const translations = { fa, en, fr } as const;

type NestedValue<T, K extends string> = K extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
    ? NestedValue<T[Key], Rest>
    : never
  : K extends keyof T
  ? T[K]
  : never;

export function useTranslation() {
  const { locale } = useSiteTheme();
  const t = translations[locale as keyof typeof translations] || translations.fa;

  function translate<S extends string>(key: S): string {
    const parts = key.split('.');
    let current: unknown = t;
    for (const part of parts) {
      if (current && typeof current === 'object' && part in (current as object)) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    return typeof current === 'string' ? current : key;
  }

  return { t: translate, locale, dir: locale === 'fa' ? 'rtl' : 'ltr' };
}

export { fa, en, fr };
export type Locale = 'fa' | 'en' | 'fr';
