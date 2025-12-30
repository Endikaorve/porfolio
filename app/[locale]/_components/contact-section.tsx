'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ScrambleText } from '@/components/scramble-text';
import { MagneticWrapper } from '@/components/magnetic-wrapper';

export function ContactSection() {
  const t = useTranslations();

  return (
    <section className="relative h-svh flex items-center justify-center overflow-hidden snap-start snap-always">
      {/* Background Elements */}
      {/* Líneas diagonales decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        <div
          className="absolute w-[200%] h-px bg-white -rotate-45"
          style={{ top: '20%', left: '-50%' }}
        />
        <div
          className="absolute w-[200%] h-px bg-white -rotate-45"
          style={{ top: '40%', left: '-50%' }}
        />
        <div
          className="absolute w-[200%] h-px bg-white -rotate-45"
          style={{ top: '60%', left: '-50%' }}
        />
        <div
          className="absolute w-[200%] h-px bg-white -rotate-45"
          style={{ top: '80%', left: '-50%' }}
        />
      </div>

      {/* Elementos técnicos en esquinas */}
      <div className="absolute bottom-24 left-8 hidden md:block">
        <div className="w-16 h-px bg-gradient-to-r from-primary/30 to-transparent" />
        <div className="w-px h-16 bg-gradient-to-b from-primary/30 to-transparent" />
      </div>
      <div className="absolute bottom-24 right-8 hidden md:flex flex-col items-end">
        <div className="w-16 h-px bg-gradient-to-l from-primary/30 to-transparent" />
        <div className="w-px h-16 bg-gradient-to-b from-primary/30 to-transparent ml-auto" />
      </div>

      {/* Círculo decorativo exterior */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-white/[0.02] pointer-events-none"
        style={{ borderRadius: '50%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-[15vw] font-black leading-none mb-12">
            <span className="text-white">{t('contact.title.line1')}</span>
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: '2px var(--pink)',
              }}
            >
              {t('contact.title.line2')}
            </span>
          </h2>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-20">
            {/* Email con efecto scramble */}
            <MagneticWrapper strength={0.15}>
              <ScrambleText
                text="endikaorve@gmail.com"
                as="a"
                href="mailto:endikaorve@gmail.com"
                className="text-white text-xl md:text-2xl hover:text-primary transition-colors relative group block"
              />
              <span className="block w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 mt-1" />
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
          </div>
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
