"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations();
  const heroRef = useRef<HTMLElement>(null);
  const [heroReady, setHeroReady] = useState(false);

  // Hero parallax - scroll horizontal
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const endikaX = useTransform(
    heroScrollProgress,
    [0, 0.1, 1],
    ["0%", "0%", "-120%"]
  );
  const orubeX = useTransform(
    heroScrollProgress,
    [0, 0.1, 1],
    ["0%", "0%", "120%"]
  );

  // Trigger floating animations after intro sequence
  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Capa animada - texto que se mueve con scroll */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-7xl min-[2000px]:max-w-[120rem] px-4">
          {/* ENDIKA - Reveal desde abajo */}
          <div className={heroReady ? "" : "overflow-hidden"}>
            <motion.h1
              className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter will-change-transform whitespace-nowrap"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px white",
                x: heroReady ? endikaX : 0,
              }}
              initial={{ y: "110%" }}
              animate={heroReady ? { y: [0, -20, 0] } : { y: 0 }}
              transition={
                heroReady
                  ? {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
                  : {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0,
                    }
              }
            >
              ENDIKA
            </motion.h1>
          </div>

          {/* ORUBE - Reveal desde arriba */}
          <div className={heroReady ? "" : "overflow-hidden"}>
            <motion.h1
              className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter text-white will-change-transform whitespace-nowrap"
              style={{
                textShadow: "0 0 40px rgba(222, 94, 145, 0.3)",
                x: heroReady ? orubeX : 0,
              }}
              initial={{ y: "-110%" }}
              animate={heroReady ? { y: [0, 20, 0] } : { y: 0 }}
              transition={
                heroReady
                  ? {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
                  : {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 0.1,
                    }
              }
            >
              ORUBE
              <span className="inline-block w-[0.12em] h-[0.12em] bg-primary ml-[0.07em]" />
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
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            {/* Línea decorativa que se expande */}
            <motion.div
              className="absolute -left-8 top-1/2 h-px bg-[#de5e91]"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.35,
              }}
            />
            <motion.p
              className="text-[#de5e91] text-xl md:text-2xl font-mono whitespace-nowrap font-bold"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}
            >
              {t("hero.role")}
            </motion.p>
          </motion.div>
        </div>

        {/* Rol mobile - Entrada coordinada con borde animado */}
        <motion.div
          className="md:hidden mt-24 pl-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          {/* Borde izquierdo animado */}
          <motion.div
            className="absolute left-0 top-0 w-1 bg-[#de5e91]"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.35,
            }}
          />
          <motion.p
            className="text-[#de5e91] text-sm font-mono font-bold leading-relaxed"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.45,
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
          delay: 0.55,
        }}
      >
        <motion.div
          className="w-px h-20 bg-gradient-to-b from-[#de5e91] to-transparent"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>
    </section>
  );
}

