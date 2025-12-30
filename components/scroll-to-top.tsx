'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

/**
 * Component that scrolls to top when navigating between different pages.
 * It does NOT scroll when only the locale changes (same pathname, different locale).
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const locale = useLocale();
  const previousPathnameRef = useRef(pathname);
  const previousLocaleRef = useRef(locale);

  useEffect(() => {
    const pathnameChanged = previousPathnameRef.current !== pathname;
    const localeChanged = previousLocaleRef.current !== locale;

    // Only scroll to top if the pathname changed (not just the locale)
    // Use behavior: 'instant' to override CSS scroll-behavior: smooth
    if (pathnameChanged && !localeChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // If both changed at the same time (e.g., navigating to a different page in another locale),
    // we still want to scroll to top
    if (pathnameChanged && localeChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    // Update refs for next comparison
    previousPathnameRef.current = pathname;
    previousLocaleRef.current = locale;
  }, [pathname, locale]);

  return null;
}

