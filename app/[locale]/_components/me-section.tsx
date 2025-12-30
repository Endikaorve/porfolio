'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

/**
 * MeSection - Rediseñada con foto y tono personal
 *
 * Filosofía del diseño:
 * - Humanizar con la foto, crear conexión inmediata
 * - Headline reflexivo: mostrar filosofía, no declarar liderazgo
 * - Estructura horizontal más íntima (foto + texto)
 * - CTA "Conoce mi historia" invita a explorar sin vender
 */
export function MeSection() {
  const t = useTranslations();

  return (
    <section className="relative h-svh flex items-center overflow-hidden snap-start snap-always">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">
          {/* Foto con tratamiento visual */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Contenedor de la foto con efecto */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
              {/* Borde decorativo offset */}
              <motion.div
                className="absolute -inset-2 border border-primary/30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />

              {/* Foto */}
              <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src="/endika.jpg"
                  alt="Endika Orube"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Punto decorativo */}
              <motion.div
                className="absolute -bottom-3 -right-3 w-6 h-6 bg-primary"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
          </motion.div>

          {/* Contenido textual */}
          <div className="flex-1 text-center md:text-left">
            {/* Headline - las 3 palabras core */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {t('me.headline')}
            </motion.h2>

            {/* CTA */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-4"
              >
                <span className="relative px-6 py-3 border border-primary text-primary font-mono text-sm tracking-wider overflow-hidden group-hover:text-white transition-colors duration-300">
                  <span className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">{t('me.cta')}</span>
                </span>
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
        </div>
      </div>
    </section>
  );
}
