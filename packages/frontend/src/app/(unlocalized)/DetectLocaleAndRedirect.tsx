'use client';

import { locales } from '@/i18n/locales';
import { hasLocale } from 'next-intl';
import { useEffect } from 'react';

export function DetectLocaleAndRedirect() {
  useEffect(() => {
    const browserLocale = navigator.language.split('-')[0];

    const locale = hasLocale(locales, browserLocale) ? browserLocale : 'en';

    window.location.replace(`/${locale}/`);
  }, []);

  return <></>;
}
