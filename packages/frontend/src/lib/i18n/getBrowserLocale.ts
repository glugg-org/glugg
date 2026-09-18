import { locales } from '@/i18n/locales';
import { hasLocale } from 'next-intl';

export function getBrowserLocale() {
  const browserLocale = navigator.language.split('-')[0];

  const locale = hasLocale(locales, browserLocale) ? browserLocale : 'en';

  return locale;
}
