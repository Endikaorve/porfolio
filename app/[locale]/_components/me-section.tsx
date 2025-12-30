'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * MeSection - Rediseñada con storytelling real
 *
 * Justificación del rediseño:
 * - Las palabras sueltas (SOFTWARE, EQUIPOS, PRODUCTO) no contaban una historia
 * - Ahora hay una frase de impacto que define quién eres y qué haces
 * - La composición tipográfica crea tensión visual con palabras clave destacadas
 * - El CTA es más prominente y accesible
 * - Sin scroll indicator (estaba duplicado con Hero)
 */
export function MeSection() {
  const t = useTranslations();

  // Palabras de la headline para animar individualmente
  const headlineWords = t('me.headline').split(' ');

  // Palabras clave que queremos destacar en accent color
  const accentWords = [
    'LIDERO',
    'LEAD',
    'EQUIPOS',
    'TEAMS',
    'IMPORTA',
    'MATTERS',
  ];

  return (
    <section className="relative h-svh flex items-center overflow-hidden snap-start snap-always">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative">
        {/* Headline principal - composición tipográfica */}
        <div className="relative">
          {/* Headline con palabras animadas individualmente */}
          <motion.h2
            className="text-[8vw] md:text-[5.5vw] lg:text-[4.5vw] font-black leading-[1.1] tracking-tight max-w-5xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-[0.3em] ${
                  accentWords.includes(word.toUpperCase())
                    ? 'text-primary'
                    : 'text-white'
                }`}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>

          {/* Subheadline y contexto */}
          <motion.div
            className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Línea decorativa horizontal */}
            <motion.div
              className="w-16 h-px bg-primary hidden md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.4 }}
            />

            <div className="flex flex-col gap-2">
              <span className="text-white/80 text-sm md:text-base font-mono tracking-wider">
                {t('me.subheadline')}
              </span>
              <span className="text-white/40 text-xs md:text-sm font-mono tracking-widest">
                {t('me.context')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* CTA prominente */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link href="/about" className="group inline-flex items-center gap-4">
            {/* Botón con borde que se rellena en hover */}
            <span className="relative px-6 py-3 border border-primary/60 text-primary font-mono text-sm tracking-wider overflow-hidden transition-colors duration-300 group-hover:text-surface-dark">
              {/* Background fill en hover */}
              <motion.span
                className="absolute inset-0 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ scaleX: 0 }}
              />
              <span className="relative z-10 group-hover:text-surface-dark transition-colors duration-300">
                {t('me.cta')}
              </span>
            </span>

            {/* Flecha animada */}
            <motion.span
              className="text-primary text-xl"
              animate={{ x: [0, 8, 0] }}
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
    </section>
  );
}
