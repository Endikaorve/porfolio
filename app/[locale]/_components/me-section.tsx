'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function MeSection() {
  const t = useTranslations();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Líneas decorativas sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Texto principal minimalista */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed font-light mb-12">
            {t('me.description')}
          </p>

          {/* CTA sutil */}
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-primary hover:text-white transition-colors duration-300 group"
          >
            <span className="text-lg font-mono font-bold tracking-wider">
              {t('me.cta')}
            </span>
            <motion.span
              className="text-2xl"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
