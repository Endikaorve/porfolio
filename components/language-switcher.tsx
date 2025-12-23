"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Locale, locales } from "@/i18n/config";

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-1 font-mono text-sm">
      {locales.map((loc, index) => (
        <div key={loc} className="flex items-center">
          <motion.button
            onClick={() => handleLocaleChange(loc)}
            className={`relative px-3 py-2 font-bold tracking-wider transition-colors duration-200 ${
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
                className="absolute bottom-1 left-3 right-3 h-px bg-[#de5e91]"
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
  );
}

