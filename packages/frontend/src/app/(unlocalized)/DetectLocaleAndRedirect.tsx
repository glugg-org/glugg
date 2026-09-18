'use client';

import { getBrowserLocale } from '@/lib/i18n/getBrowserLocale';
import { useEffect } from 'react';

export function DetectLocaleAndRedirect() {
  useEffect(() => {
    const locale = getBrowserLocale();
    window.location.replace(`/${locale}/`);
  }, []);

  return <></>;
}
