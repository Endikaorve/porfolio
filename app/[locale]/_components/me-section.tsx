'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { MagneticWrapper } from '@/components/magnetic-wrapper';

/**
 * MeSection - Rediseñada con foto y tono personal
 *
 * Filosofía del diseño:
 * - Humanizar con la foto, crear conexión inmediata
 * - Headline reflexivo: mostrar filosofía, no declarar liderazgo
 * - Estructura horizontal más íntima (foto + texto)
 * - CTA "Conoce mi historia" invita a explorar sin vender
 * - Links de contacto sutiles para acceso directo
 * - Fondo sutil con elementos geométricos para dar profundidad
 */

// Partículas decorativas - desktop (más densas)
const particlesDesktop = [
  // Lateral izquierdo
  { type: 'square', x: '6%', y: '12%', size: 10, opacity: 0.12 },
  { type: 'square-filled', x: '10%', y: '28%', size: 6, opacity: 0.08 },
  { type: 'square', x: '4%', y: '45%', size: 8, opacity: 0.1 },
  { type: 'square-filled', x: '8%', y: '62%', size: 5, opacity: 0.07 },
  { type: 'square', x: '11%', y: '78%', size: 12, opacity: 0.14 },
  // Lateral derecho
  { type: 'square-filled', x: '90%', y: '18%', size: 8, opacity: 0.1 },
  { type: 'square', x: '86%', y: '35%', size: 6, opacity: 0.08 },
  { type: 'square-filled', x: '93%', y: '52%', size: 10, opacity: 0.12 },
  { type: 'square', x: '88%', y: '68%', size: 5, opacity: 0.07 },
  { type: 'square-filled', x: '91%', y: '85%', size: 8, opacity: 0.1 },
];

// Partículas decorativas - mobile (más simples, en esquinas)
const particlesMobile = [
  { type: 'square', x: '5%', y: '8%', size: 8, opacity: 0.1 },
  { type: 'square-filled', x: '92%', y: '12%', size: 6, opacity: 0.08 },
  { type: 'square-filled', x: '8%', y: '88%', size: 6, opacity: 0.08 },
  { type: 'square', x: '90%', y: '85%', size: 8, opacity: 0.1 },
];

// Iconos de contacto
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 min-[2000px]:w-7 min-[2000px]:h-7"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 min-[2000px]:w-7 min-[2000px]:h-7"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 min-[2000px]:w-7 min-[2000px]:h-7"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:endikaorve@gmail.com',
    external: false,
    icon: EmailIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/endikaorube/',
    external: true,
    icon: LinkedInIcon,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Endikaorve',
    external: true,
    icon: GitHubIcon,
  },
];

export function MeSection() {
  const t = useTranslations();

  return (
    <section className="relative h-svh flex items-center overflow-hidden snap-start snap-always">
      {/* Background Elements */}
      {/* Líneas diagonales decorativas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.025]">
        <div
          className="absolute w-[200%] h-px bg-white -rotate-45"
          style={{ top: '30%', left: '-50%' }}
        />
        <div
          className="absolute w-[200%] h-px bg-white -rotate-45"
          style={{ top: '70%', left: '-50%' }}
        />
      </div>

      {/* Círculo decorativo - posicionado hacia la derecha */}
      <motion.div
        className="absolute right-[-20%] top-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] border border-primary/[0.04] pointer-events-none hidden md:block"
        style={{ borderRadius: '50%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Partículas geométricas - Mobile (simplificadas) */}
      <div className="absolute inset-0 pointer-events-none md:hidden">
        {particlesMobile.map((particle, i) => (
          <motion.div
            key={`particle-mobile-${i}`}
            className={
              particle.type === 'square-filled'
                ? 'absolute bg-primary'
                : 'absolute border border-primary'
            }
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: particle.opacity, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.4 + i * 0.1,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>

      {/* Partículas geométricas - Desktop (más densas) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {particlesDesktop.map((particle, i) => (
          <motion.div
            key={`particle-desktop-${i}`}
            className={
              particle.type === 'square-filled'
                ? 'absolute bg-primary'
                : 'absolute border border-primary'
            }
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: particle.opacity, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3 + i * 0.05,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>

      {/* Elementos técnicos en esquinas */}
      <div className="absolute bottom-8 left-8 hidden md:block">
        <motion.div
          className="w-12 h-px bg-gradient-to-r from-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ transformOrigin: 'left' }}
        />
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary/20 to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-end">
        <motion.div
          className="w-12 h-px bg-gradient-to-l from-primary/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ transformOrigin: 'right' }}
        />
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary/20 to-transparent ml-auto"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{ transformOrigin: 'top' }}
        />
      </div>

      <div className="w-full max-w-7xl min-[2000px]:max-w-[100rem] mx-auto px-4 md:px-8 min-[2000px]:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24 xl:gap-32 min-[2000px]:gap-48">
          {/* Foto con tratamiento visual */}
          <motion.div
            className="relative flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Contenedor de la foto con efecto */}
            <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 min-[2000px]:w-[26rem] min-[2000px]:h-[26rem]">
              {/* Borde decorativo offset */}
              <motion.div
                className="absolute -inset-2 min-[2000px]:-inset-4 border border-primary/30"
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
                className="absolute -bottom-3 -right-3 min-[2000px]:-bottom-4 min-[2000px]:-right-4 w-6 h-6 min-[2000px]:w-10 min-[2000px]:h-10 bg-primary"
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
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl min-[2000px]:text-7xl font-bold leading-tight tracking-tight text-white"
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

            {/* Descripción - quién soy */}
            <motion.p
              className="mt-6 md:mt-8 text-white/60 text-base md:text-lg lg:text-xl min-[2000px]:text-2xl max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {t('me.description')}
            </motion.p>

            {/* CTA + Contact Links */}
            <motion.div
              className="mt-12 xl:mt-16 min-[2000px]:mt-20 space-y-8 min-[2000px]:space-y-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* CTA Principal */}
              <Link
                href="/about"
                className="group inline-flex items-center gap-4 min-[2000px]:gap-6"
              >
                <span className="relative px-6 py-3 min-[2000px]:px-10 min-[2000px]:py-5 border border-primary text-primary font-mono text-sm min-[2000px]:text-lg tracking-wider overflow-hidden group-hover:text-white transition-colors duration-300">
                  <span className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">{t('me.cta')}</span>
                </span>
                <motion.span
                  className="text-primary text-xl min-[2000px]:text-3xl"
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

              {/* Links de contacto - con iconos */}
              <motion.div
                className="flex items-center gap-3 min-[2000px]:gap-5 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <span className="text-white/30 text-xs min-[2000px]:text-base font-mono tracking-wider">
                  {t('me.orConnect')}
                </span>
                <span className="w-4 min-[2000px]:w-6 h-px bg-white/20" />
                <div className="flex items-center gap-4 min-[2000px]:gap-6">
                  {contactLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <MagneticWrapper key={link.label} strength={0.2}>
                        <motion.a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={
                            link.external ? 'noopener noreferrer' : undefined
                          }
                          aria-label={link.label}
                          className="text-white/40 hover:text-primary transition-colors duration-200"
                          whileHover={{ y: -3, scale: 1.1 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            delay: 0.7 + index * 0.1,
                            duration: 0.3,
                          }}
                        >
                          <IconComponent />
                        </motion.a>
                      </MagneticWrapper>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
