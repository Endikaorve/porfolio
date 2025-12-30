'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Componente para animar letras individualmente con rotación
function SplitText({
  text,
  className,
  style,
  delay = 0,
  staggerDelay = 0.03,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  staggerDelay?: number;
}) {
  return (
    <span className={className} style={style}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{
            y: 120,
            opacity: 0,
            rotateX: -80,
          }}
          animate={{
            y: 0,
            opacity: 1,
            rotateX: 0,
          }}
          transition={{
            duration: 0.8,
            delay: delay + i * staggerDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const t = useTranslations();

  return (
    <section
      className="relative h-svh flex items-center justify-center overflow-hidden snap-start snap-always"
      style={{ perspective: '1000px' }}
    >
      {/* Capa con el texto principal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-7xl min-[2000px]:max-w-[120rem] px-4">
          {/* ENDIKA - Split text reveal con rotación */}
          <div className="overflow-hidden">
            <motion.h1
              className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter whitespace-nowrap"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px white',
              }}
            >
              <SplitText text="ENDIKA" delay={0.2} staggerDelay={0.04} />
            </motion.h1>
          </div>

          {/* ORUBE - Split text reveal con rotación */}
          <div className="overflow-hidden">
            <motion.h1 className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter text-white whitespace-nowrap">
              <SplitText text="ORUBE" delay={0.35} staggerDelay={0.04} />
              <motion.span
                className="inline-block w-[0.12em] h-[0.12em] bg-primary ml-[0.07em]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.7,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Capa estática - elementos de UI */}
      <div className="relative z-10 w-full max-w-7xl min-[2000px]:max-w-[120rem] px-4">
        {/* Placeholder para mantener espacio */}
        <div className="relative" aria-hidden="true">
          <div className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter opacity-0 select-none pointer-events-none whitespace-nowrap">
            ENDIKA
          </div>
          <div className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter opacity-0 select-none pointer-events-none whitespace-nowrap">
            ORUBE
            <span className="inline-block w-[0.12em] h-[0.12em] ml-[0.07em]" />
          </div>
        </div>

        {/* Rol desktop - Línea que se expande + texto reveal */}
        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 rotate-90 origin-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            {/* Línea decorativa que se expande */}
            <motion.div
              className="absolute -left-8 top-1/2 h-px bg-primary"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.85,
              }}
            />
            <motion.p
              className="text-primary text-xl md:text-2xl font-mono whitespace-nowrap font-bold"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.9,
              }}
            >
              {t('hero.role')}
            </motion.p>
          </motion.div>
        </div>

        {/* Rol mobile - Entrada coordinada con borde animado */}
        <motion.div
          className="md:hidden mt-24 pl-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.85 }}
        >
          {/* Borde izquierdo animado */}
          <motion.div
            className="absolute left-0 top-0 w-1 bg-primary"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.85,
            }}
          />
          <motion.p
            className="text-primary text-sm font-mono font-bold leading-relaxed"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.95,
            }}
          >
            TECH LEAD
            <br />
            PRODUCT ENGINEER
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll indicator - aparece al final de la secuencia */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
          delay: 1.1,
        }}
      >
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-primary to-transparent"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </motion.div>
    </section>
  );
}
