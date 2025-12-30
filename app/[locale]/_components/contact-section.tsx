'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ScrambleText } from '@/components/scramble-text';
import { MagneticWrapper } from '@/components/magnetic-wrapper';

/**
 * ContactSection - Simplificada
 *
 * Eliminada decoración vacía (líneas, círculos, números).
 * El foco está en el contenido: título impactante + links de contacto.
 */
export function ContactSection() {
  const t = useTranslations();

  return (
    <section className="relative h-svh flex items-center justify-center overflow-hidden snap-start snap-always">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[12vw] md:text-[10vw] font-black leading-none mb-12">
            <motion.span
              className="text-white block"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {t('contact.title.line1')}
            </motion.span>
            <motion.span
              className="text-transparent block"
              style={{
                WebkitTextStroke: '2px var(--pink)',
              }}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {t('contact.title.line2')}
            </motion.span>
          </h2>

          <motion.div
            className="flex flex-col md:flex-row gap-8 justify-center items-center mt-16 md:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {/* Email con efecto scramble */}
            <MagneticWrapper strength={0.15}>
              <a href="mailto:endikaorve@gmail.com" className="group block">
                <ScrambleText
                  text="endikaorve@gmail.com"
                  className="text-white text-xl md:text-2xl group-hover:text-primary transition-colors duration-300"
                />
                <span className="block w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 mt-1" />
              </a>
            </MagneticWrapper>

            <span className="text-white/20 text-4xl hidden md:block">/</span>

            <div className="flex gap-6">
              <MagneticWrapper strength={0.2}>
                <motion.a
                  href="https://www.linkedin.com/in/endikaorube/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-mono hover:text-primary transition-colors block"
                  whileHover={{ y: -5 }}
                >
                  LINKEDIN
                </motion.a>
              </MagneticWrapper>

              <MagneticWrapper strength={0.2}>
                <motion.a
                  href="https://github.com/Endikaorve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-mono hover:text-primary transition-colors block"
                  whileHover={{ y: -5 }}
                >
                  {t('contact.github')}
                </motion.a>
              </MagneticWrapper>

              <MagneticWrapper strength={0.2}>
                <motion.a
                  href="/Endika Orube Vega - CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-mono hover:text-primary transition-colors block"
                  whileHover={{ y: -5 }}
                >
                  {t('cv.downloadShort')}
                </motion.a>
              </MagneticWrapper>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer minimalista */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container mx-auto px-4 flex justify-between items-center text-white/40 text-sm font-mono">
          <span>{t('contact.copyright')}</span>
          <span>{t('contact.location')}</span>
        </div>
      </div>
    </section>
  );
}
