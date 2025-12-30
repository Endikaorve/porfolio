'use client';

import { motion } from 'framer-motion';
import { Braces } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { Locale, locales } from '@/i18n/config';
import { MagneticWrapper } from '@/components/magnetic-wrapper';

export function Header() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      // Use scroll: false to maintain current scroll position when changing locale
      router.replace(pathname, { locale: newLocale, scroll: false });
    }
  };

  const isHomeActive = pathname === '/';
  const isAboutActive = pathname === '/about';
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/');

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      <nav className="flex items-center justify-end">
        {/* Navegación - gap uniforme entre elementos */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Home Link */}
          <MagneticWrapper strength={0.2}>
            <Link
              href="/"
              className={`group relative py-2 transition-colors duration-200 block ${
                isHomeActive
                  ? 'text-primary'
                  : 'text-white/60 hover:text-primary'
              }`}
            >
              <Braces size={18} strokeWidth={2} />
              <span
                className={`absolute bottom-1 left-0 right-0 h-px bg-primary transition-transform duration-200 origin-left ${
                  isHomeActive
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </MagneticWrapper>

          {/* Separador */}
          <span className="text-white/20 select-none">|</span>

          {/* About Link */}
          <MagneticWrapper strength={0.2}>
            <Link
              href="/about"
              className={`group relative py-2 font-mono text-sm font-bold tracking-wider transition-colors duration-200 block ${
                isAboutActive
                  ? 'text-primary'
                  : 'text-white/60 hover:text-primary'
              }`}
            >
              {t('aboutPage.headerLink')}
              <span
                className={`absolute bottom-1 left-0 right-0 h-px bg-primary transition-transform duration-200 origin-left ${
                  isAboutActive
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </MagneticWrapper>

          {/* Separador */}
          <span className="text-white/20 select-none">|</span>

          {/* Blog Link */}
          <MagneticWrapper strength={0.2}>
            <Link
              href="/blog"
              className={`group relative py-2 font-mono text-sm font-bold tracking-wider transition-colors duration-200 block ${
                isBlogActive
                  ? 'text-primary'
                  : 'text-white/60 hover:text-primary'
              }`}
            >
              {t('blog.headerLink')}
              <span
                className={`absolute bottom-1 left-0 right-0 h-px bg-primary transition-transform duration-200 origin-left ${
                  isBlogActive
                    ? 'scale-x-100'
                    : 'scale-x-0 group-hover:scale-x-100'
                }`}
              />
            </Link>
          </MagneticWrapper>

          {/* Separador */}
          <span className="text-white/20 select-none">|</span>

          {/* Language Switcher - elemento con gap interno */}
          <div className="flex items-center gap-1 font-mono text-sm">
            {locales.map((loc, index) => (
              <div key={loc} className="flex items-center gap-1">
                <MagneticWrapper strength={0.15}>
                  <motion.button
                    onClick={() => handleLocaleChange(loc)}
                    className={`relative py-2 font-bold tracking-wider transition-colors duration-200 ${
                      locale === loc
                        ? 'text-primary'
                        : 'text-white/40 hover:text-white/80'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loc.toUpperCase()}
                    {/* Underline indicator for active locale */}
                    {locale === loc && (
                      <span className="absolute bottom-1 left-0 right-0 h-px bg-primary" />
                    )}
                  </motion.button>
                </MagneticWrapper>
                {/* Separator between locales */}
                {index < locales.length - 1 && (
                  <span className="text-white/20 select-none">/</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
