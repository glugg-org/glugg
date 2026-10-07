import { Locale } from '@/i18n/locales';
import { locale } from 'next/root-params';

export default async function getLocale() {
  // Try to read the locale in case we're in `[locale]/layout.tsx`
  let curLocale = await (locale as () => Promise<Locale | undefined>)();

  // If we're in `(unlocalized)/layout.tsx`, let's use a fallback
  curLocale ??= 'en';

  return curLocale;
}
