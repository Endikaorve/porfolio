"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname, Link } from "@/i18n/navigation";
import { Locale, locales } from "@/i18n/config";

export function Header() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  const isAboutActive = pathname === "/about";
  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <nav className="flex items-center justify-end">
        {/* Navegación */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* About Link */}
          <Link
            href="/about"
            className={`group relative px-1.5 md:px-2 py-2 font-mono text-sm font-bold tracking-wider transition-colors duration-200 ${
              isAboutActive
                ? "text-primary"
                : "text-white/60 hover:text-primary"
            }`}
          >
            {t("aboutPage.headerLink")}
            <span
              className={`absolute bottom-1 left-1.5 right-1.5 md:left-2 md:right-2 h-px bg-primary transition-transform duration-200 origin-left ${
                isAboutActive
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>

          {/* Blog Link */}
          <Link
            href="/blog"
            className={`group relative px-1.5 md:px-2 py-2 font-mono text-sm font-bold tracking-wider transition-colors duration-200 ${
              isBlogActive
                ? "text-primary"
                : "text-white/60 hover:text-primary"
            }`}
          >
            {t("blog.headerLink")}
            <span
              className={`absolute bottom-1 left-1.5 right-1.5 md:left-2 md:right-2 h-px bg-primary transition-transform duration-200 origin-left ${
                isBlogActive
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`}
            />
          </Link>

          {/* Separador */}
          <span className="text-white/20 select-none">|</span>

          {/* Language Switcher */}
          <div className="flex items-center font-mono text-sm">
            {locales.map((loc, index) => (
              <div key={loc} className="flex items-center">
                <motion.button
                  onClick={() => handleLocaleChange(loc)}
                  className={`relative px-1.5 md:px-2 py-2 font-bold tracking-wider transition-colors duration-200 ${
                    locale === loc
                      ? "text-primary"
                      : "text-white/40 hover:text-white/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loc.toUpperCase()}
                  {/* Underline indicator for active locale */}
                  {locale === loc && (
                    <motion.div
                      className="absolute bottom-1 left-1.5 right-1.5 md:left-2 md:right-2 h-px bg-primary"
                      layoutId="locale-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    />
                  )}
                </motion.button>
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
