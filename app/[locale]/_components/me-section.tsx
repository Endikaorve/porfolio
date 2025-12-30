'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function MeSection() {
  const t = useTranslations();

  return (
    <section className="relative h-svh flex items-center overflow-hidden snap-start snap-always">
      {/* Composición tipográfica asimétrica */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative">
        {/* SOFTWARE - Grande, izquierda */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-transparent block"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}
          >
            SOFTWARE
          </span>
        </motion.div>

        {/* EQUIPOS - Mediano, derecha, superpuesto */}
        <motion.div
          className="relative -mt-[4vw] md:-mt-[3vw] flex justify-end"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[12vw] md:text-[9vw] font-black leading-none tracking-tighter text-primary">
            EQUIPOS
          </span>
        </motion.div>

        {/* PRODUCTO - Accent color, izquierda */}
        <motion.div
          className="relative -mt-[2vw] md:-mt-[1vw]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10vw] md:text-[7vw] font-black leading-none tracking-tighter text-white">
            PRODUCTO
          </span>
          <span className="inline-block w-[0.8vw] h-[0.8vw] md:w-[0.5vw] md:h-[0.5vw] bg-primary ml-1" />
        </motion.div>

        {/* CTA - Posicionado abajo a la derecha */}
        <motion.div
          className="mt-12 md:mt-16 flex justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-white/60 hover:text-primary transition-colors duration-300 group"
          >
            <span className="text-sm md:text-base font-mono tracking-wider">
              {t('me.cta')}
            </span>
            <motion.span
              className="text-lg"
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

      {/* Indicador de scroll - centrado como en Hero */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-primary to-transparent"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
