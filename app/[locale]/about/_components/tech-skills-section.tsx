'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { techStack } from './tech-stack';

export function TechSkillsSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Calcula el rango de scroll basado en el contenido real
  useEffect(() => {
    const calculateScrollRange = () => {
      if (contentRef.current) {
        const contentWidth = contentRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Cuánto necesitamos mover para ver todo el contenido
        setScrollRange(contentWidth - viewportWidth + 100); // +100 para padding extra
      }
    };

    calculateScrollRange();
    window.addEventListener('resize', calculateScrollRange);
    return () => window.removeEventListener('resize', calculateScrollRange);
  }, []);

  // Transforma scroll vertical a movimiento horizontal
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh]" // Altura extra para scroll
    >
      {/* Container sticky que se fija en la pantalla */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

        {/* Título fijo arriba - alineado con container */}
        <div className="absolute top-8 md:top-12 left-0 right-0 z-20">
          <div className="container mx-auto px-4">
            <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-black leading-none">
              <span className="text-white">{t('tech.title.line1')}</span>
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: '2px var(--pink)' }}
              >
                {t('tech.title.line2')}
              </span>
            </h2>
          </div>
        </div>

        {/* Contenido horizontal que se mueve */}
        <motion.div
          ref={contentRef}
          className="flex gap-12 md:gap-24 items-center pl-[10vw] pr-[20vw]"
          style={{ x }}
        >
          {techStack.map((tech, i) => (
            <motion.div
              key={`tech-${i}`}
              className="flex-shrink-0 flex flex-col items-center gap-4 group"
              whileHover={{ scale: 1.15, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <div className="relative">
                <tech.Icon className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 text-white/20 group-hover:text-primary transition-colors duration-300" />
              </div>
              <span className="text-xs md:text-sm font-mono text-white/30 group-hover:text-white/60 transition-colors duration-300 whitespace-nowrap">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-surface-dark to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-surface-dark to-transparent pointer-events-none z-10" />

        {/* Líneas decorativas */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="text-xs font-mono text-white/30">scroll</span>
        </div>
      </div>
    </section>
  );
}
