"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
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
      <nav className="flex items-center justify-between">
        {/* CV Download - Izquierda */}
        <motion.a
          href="/Endika Orube Vega - CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-2 font-mono text-sm font-bold tracking-wider text-[#de5e91] hover:text-white transition-colors duration-200 border border-[#de5e91]/30 hover:border-[#de5e91]/60 backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Descargar CV"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{t("cv.downloadShort")}</span>
        </motion.a>

        {/* Navegación - Derecha */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Blog Link */}
          {(() => {
            const isBlogActive =
              pathname === "/blog" || pathname.startsWith("/blog/");
            return (
              <Link
                href="/blog"
                className={`group relative px-3 py-2 font-mono text-sm font-bold tracking-wider transition-colors duration-200 ${
                  isBlogActive
                    ? "text-[#de5e91]"
                    : "text-white/60 hover:text-[#de5e91]"
                }`}
              >
                {t("blog.headerLink")}
                <span
                  className={`absolute bottom-1 left-3 right-3 h-px bg-[#de5e91] transition-transform duration-200 origin-left ${
                    isBlogActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })()}

          {/* Separador */}
          <span className="text-white/20 select-none px-1">/</span>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 font-mono text-sm">
            {locales.map((loc, index) => (
              <div key={loc} className="flex items-center">
                <motion.button
                  onClick={() => handleLocaleChange(loc)}
                  className={`relative px-2 md:px-3 py-2 font-bold tracking-wider transition-colors duration-200 ${
                    locale === loc
                      ? "text-[#de5e91]"
                      : "text-white/40 hover:text-white/80"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loc.toUpperCase()}
                  {/* Underline indicator for active locale */}
                  {locale === loc && (
                    <motion.div
                      className="absolute bottom-1 left-2 right-2 md:left-3 md:right-3 h-px bg-[#de5e91]"
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
