"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// Componente de partículas decorativas que scrollean normalmente
// COMENTADO TEMPORALMENTE - Causa problemas de overflow
/*
function ExperienceParticles({ index }: { index: number }) {
  // Offset basado en el índice para variar las posiciones (alterna entre +/-)
  const offsetX = index % 2 === 0 ? index * 3 : -index * 3;
  const offsetY = index % 2 === 0 ? index * 5 : -index * 4;

  // Helper para parsear y modificar porcentajes
  const adjustPosition = (pos: string, offset: number) => {
    const value = parseFloat(pos);
    return `${value + offset}%`;
  };

  // Partículas decorativas base que se modifican por índice
  const baseParticles = [
    // Top-left cluster
    { x: "-20%", y: "5%", size: 3, opacity: 0.3 },
    { x: "-15%", y: "15%", size: 2, opacity: 0.2 },
    { x: "-25%", y: "12%", size: 1.5, opacity: 0.4 },
    // Top-right cluster
    { x: "105%", y: "8%", size: 4, opacity: 0.25 },
    { x: "110%", y: "18%", size: 2.5, opacity: 0.3 },
    { x: "115%", y: "10%", size: 1, opacity: 0.2 },
    // Bottom-left cluster
    { x: "-18%", y: "85%", size: 2, opacity: 0.35 },
    { x: "-12%", y: "92%", size: 3.5, opacity: 0.25 },
    // Bottom-right cluster
    { x: "108%", y: "88%", size: 2.5, opacity: 0.3 },
    { x: "112%", y: "78%", size: 1.5, opacity: 0.4 },
    // Middle floating elements
    { x: "-8%", y: "45%", size: 1, opacity: 0.15 },
    { x: "103%", y: "50%", size: 1, opacity: 0.15 },
  ];

  // Aplicar offset único a cada partícula según el índice
  const particles = baseParticles.map((p, i) => ({
    ...p,
    x: adjustPosition(p.x, (i % 2 === 0 ? offsetX : -offsetX) * 0.3),
    y: adjustPosition(p.y, (i % 3 === 0 ? offsetY : -offsetY) * 0.2),
  }));

  // Líneas decorativas base
  const baseLines = [
    { x1: "-10%", y1: "20%", x2: "-5%", y2: "25%", opacity: 0.2 },
    { x1: "105%", y1: "30%", x2: "110%", y2: "35%", opacity: 0.25 },
    { x1: "-15%", y1: "70%", x2: "-8%", y2: "75%", opacity: 0.15 },
    { x1: "108%", y1: "65%", x2: "115%", y2: "70%", opacity: 0.2 },
  ];

  // Aplicar offset a las líneas
  const lines = baseLines.map((l, i) => ({
    ...l,
    x1: adjustPosition(l.x1, (i % 2 === 0 ? offsetX : -offsetX) * 0.4),
    y1: adjustPosition(l.y1, offsetY * 0.3),
    x2: adjustPosition(l.x2, (i % 2 === 0 ? offsetX : -offsetX) * 0.4),
    y2: adjustPosition(l.y2, offsetY * 0.3),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none w-[90%] max-w-5xl 2xl:max-w-6xl mx-auto">
      {/* Cuadrados/rectángulos decorativos *}
      {particles.map((particle, i) => (
        <div
          key={`particle-${index}-${i}`}
          className="absolute border border-[#de5e91]"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size * 8}px`,
            height: `${particle.size * 8}px`,
            opacity: particle.opacity,
          }}
        />
      ))}

      {/* Líneas diagonales decorativas *}
      {lines.map((line, i) => (
        <svg
          key={`line-${index}-${i}`}
          className="absolute"
          style={{
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            opacity: line.opacity,
          }}
        >
          <line
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#de5e91"
            strokeWidth="1"
          />
        </svg>
      ))}

      {/* Mini grid decorativo *}
      <div
        className="absolute opacity-10 pointer-events-none hidden md:block"
        style={{
          left: "-15%",
          top: "50%",
          width: "40px",
          height: "40px",
          backgroundImage: `
            linear-gradient(to right, #de5e91 1px, transparent 1px),
            linear-gradient(to bottom, #de5e91 1px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
        }}
      />
      <div
        className="absolute opacity-10 pointer-events-none hidden md:block"
        style={{
          right: "-12%",
          top: "25%",
          width: "30px",
          height: "30px",
          backgroundImage: `
            linear-gradient(to right, #de5e91 1px, transparent 1px),
            linear-gradient(to bottom, #de5e91 1px, transparent 1px)
          `,
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
}
*/

// Componente individual para cada card de experiencia
function ExperienceCard({
  job,
  index,
  onOpenModal,
}: {
  job: {
    period: string;
    company: string;
    role: string;
    project: string;
    description: string;
    highlights: Array<{ title: string; text: string }>;
  };
  index: number;
  onOpenModal: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  // Rotaciones diferentes para cada card (alternando positivo/negativo)
  const rotations = [-2.5, 2, -1.8, 2.2];
  const targetRotation = rotations[index % rotations.length];

  // La rotación va de 0 (cuando aparece) al valor target (cuando llega al centro)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, targetRotation]);

  return (
    <div
      ref={cardRef}
      className="card-outer h-screen w-full flex items-center justify-center sticky top-0"
      style={{ zIndex: index + 1 }}
    >
      {/* Card content */}
      <motion.div
        className="relative p-5 md:p-12 2xl:p-16 w-full bg-[#212121] border-2 border-[#de5e91]/30"
        style={{
          rotate: rotation,
        }}
      >
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Pink accent line top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#de5e91] to-transparent opacity-50" />

        {/* Header */}
        <div className="relative z-10 mb-4 md:mb-6 2xl:mb-8 border-l-4 2xl:border-l-[6px] border-[#de5e91] pl-6 2xl:pl-8">
          <span className="text-[#de5e91] font-mono text-xs md:text-sm 2xl:text-base tracking-wider font-bold">
            {job.period}
          </span>
          <h3 className="text-2xl md:text-4xl 2xl:text-5xl font-black text-white mt-1 md:mt-2 leading-tight">
            {job.role}
          </h3>
          <div className="flex flex-wrap items-center gap-1 md:gap-2 2xl:gap-3 mt-1 md:mt-2">
            <p className="text-white/70 text-sm md:text-lg 2xl:text-xl font-medium">
              {job.company}
            </p>
            <span className="text-white/30 hidden md:inline">·</span>
            <p className="text-white/50 font-mono text-xs md:text-sm 2xl:text-base hidden md:block">
              {job.project}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/60 text-sm md:text-lg 2xl:text-xl leading-relaxed mb-4 md:mb-8 2xl:mb-10 relative z-10 pl-6 2xl:pl-8">
          {job.description}
        </p>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 2xl:gap-6 relative z-10">
          {job.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="border-l-2 2xl:border-l-[3px] border-[#de5e91]/50 pl-3 md:pl-4 2xl:pl-6 py-1 md:py-2 2xl:py-3 hover:border-[#de5e91] transition-colors duration-300"
            >
              <h4 className="text-white font-bold text-xs md:text-sm 2xl:text-base">
                {highlight.title}
              </h4>
              {/* Text hidden on mobile */}
              <p className="hidden md:block text-white/50 text-sm 2xl:text-base leading-relaxed mt-1">
                {highlight.text}
              </p>
            </div>
          ))}
        </div>

        {/* Ver más button - Solo mobile */}
        <button
          onClick={onOpenModal}
          className="md:hidden mt-6 relative z-10 w-full py-3 border-2 border-[#de5e91] text-[#de5e91] font-mono text-sm font-bold hover:bg-[#de5e91] hover:text-[#212121] transition-all duration-300 active:scale-95"
        >
          VER MÁS DETALLES
        </button>

        {/* Bottom accent line with gradient */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#de5e91]/40 to-transparent" />

        {/* Corner accent details */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#de5e91]/20" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#de5e91]/20" />
      </motion.div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setCursorVariant("hover");
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (openModalIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openModalIndex]);

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const variants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(222, 94, 145, 0.1)",
      border: "1px solid rgba(222, 94, 145, 0.5)",
    },
    hover: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(222, 94, 145, 0.15)",
      border: "1px solid rgba(222, 94, 145, 0.8)",
    },
  };

  return (
    <main ref={containerRef} className="relative bg-[#212121]">
      {/* Custom Cursor System - Awwwards Style */}
      <div className="hidden md:block">
        {/* Cursor principal - punto pequeño */}
        <motion.div
          className="fixed pointer-events-none z-[9999] mix-blend-difference"
          style={{
            left: mousePosition.x - 2,
            top: mousePosition.y - 2,
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full" />
        </motion.div>

        {/* Cursor secundario - círculo grande */}
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full backdrop-blur-sm"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
          }}
          variants={variants}
          animate={cursorVariant}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.1,
          }}
        />

        {/* Cursor glow effect - halo de luz */}
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: mousePosition.x - 30,
            top: mousePosition.y - 30,
            background:
              "radial-gradient(circle, rgba(222, 94, 145, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            width: cursorVariant === "hover" ? 120 : 60,
            height: cursorVariant === "hover" ? 120 : 60,
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        />
      </div>

      {/* Fondo animado con grid distorsionado */}
      <motion.div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #de5e91 1px, transparent 1px),
            linear-gradient(to bottom, #de5e91 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          x: backgroundX,
          y: backgroundY,
        }}
      />

      {/* Hero Section - Tipografía Gigante Experimental */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-7xl"
        >
          {/* Nombre gigante con efecto 3D */}
          <div className="relative">
            <motion.h1
              className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px white",
              }}
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              ENDIKA
            </motion.h1>
            <motion.h1
              className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter text-white"
              style={{
                textShadow: "0 0 40px rgba(222, 94, 145, 0.3)",
              }}
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              ORUBE
            </motion.h1>
          </div>

          {/* Subtítulo dinámico - Desktop: rotado a la derecha */}
          <motion.p className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-[#de5e91] text-xl md:text-2xl font-mono rotate-90 origin-center whitespace-nowrap font-bold">
            TECH LEAD · PRODUCT ENGINEER
          </motion.p>

          {/* Subtítulo - Mobile: debajo del nombre, horizontal */}
          <motion.div
            className="md:hidden mt-8 border-l-4 border-[#de5e91] pl-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-[#de5e91] text-sm font-mono font-bold leading-relaxed">
              TECH LEAD
              <br />
              PRODUCT ENGINEER
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator experimental */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-[#de5e91] to-transparent" />
        </motion.div>
      </section>

      {/* About Section - Layout Asimétrico Extremo */}
      <section className="relative min-h-screen py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4">
            {/* Título principal */}
            <motion.div
              className="col-span-12 md:col-span-6 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <h2 className="text-6xl md:text-7xl font-black text-[#de5e91] mb-8 leading-none">
                  SOLVING
                  <br />
                  COMPLEX
                  <br />
                  <span className="text-white">PROBLEMS</span>
                </h2>
              </div>
            </motion.div>

            {/* Texto flotante */}
            <motion.div
              className="col-span-12 md:col-span-6 md:col-start-7 flex items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <p className="text-white text-xl leading-relaxed">
                  +7 años desarrollando software que importa. Tech Lead &
                  Engineering Manager de un equipo de +20 desarrolladores en un
                  proyecto bancario crítico (+1M usuarios).
                </p>
                <p className="text-white/60 text-lg leading-relaxed">
                  Combino expertise técnica profunda (arquitectura, testing, XP)
                  con visión estratégica de producto. Lidero desde la definición
                  de la solución hasta la entrega, asegurando que cada línea de
                  código aporte valor real al negocio.
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="border-l-4 border-[#de5e91] pl-4">
                    <span className="text-3xl font-black text-white">
                      TECH LEAD
                    </span>
                    <p className="text-white/60 text-sm">+20 ENGINEERS</p>
                  </div>
                  <div className="border-l-4 border-white pl-4">
                    <span className="text-3xl font-black text-[#de5e91]">
                      7+ YEARS
                    </span>
                    <p className="text-white/60 text-sm">PRODUCT ENG.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Scroll Horizontal */}
      <section className="relative py-32 overflow-hidden">
        <motion.div
          className="flex gap-12 px-12"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {[
            "TDD",
            "ARCHITECTURE",
            "REACT",
            "XP",
            "TESTING",
            "LEADERSHIP",
            "NEXT.JS",
            "CI/CD",
            "TYPESCRIPT",
            "NODE.JS",
            "TDD",
            "ARCHITECTURE",
          ].map((skill, i) => (
            <div
              key={i}
              className="text-[12vw] font-black leading-none whitespace-nowrap"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.2)",
              }}
            >
              {skill}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Expertise Section - Capacidades técnicas */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-6xl md:text-8xl font-black text-white mb-20 leading-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            WHAT I
            <br />
            <span className="text-[#de5e91]">BRING</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                number: "01",
                title: "EXTREME PROGRAMMING",
                description:
                  "TDD, Pair Programming, CI/CD, Integración Continua. Metodologías XP aplicadas a escala en equipos grandes.",
              },
              {
                number: "02",
                title: "ARQUITECTURA DE SOFTWARE",
                description:
                  "Arquitectura Hexagonal, Micro-frontends, Design Systems. Decisiones técnicas para sistemas que escalan.",
              },
              {
                number: "03",
                title: "VISIÓN DE PRODUCTO",
                description:
                  "Colaboro con POs y Negocio para definir soluciones que maximicen el valor al usuario. Del problema a la implementación.",
              },
              {
                number: "04",
                title: "LIDERAZGO Y MENTORÍA",
                description:
                  "Dirijo equipos técnicos, defino estándares, fomento cultura de calidad. Manager directo de 8 engineers.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="border-l-4 border-[#de5e91] pl-8 py-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-white/30 font-mono text-sm">
                  {item.number}
                </span>
                <h3 className="text-3xl font-black text-white mt-2 mb-4">
                  {item.title}
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section - Stacked Cards Effect */}
      <section className="relative py-20">
        {/* Section Header - Fixed, not sticky */}
        <div className="container mx-auto px-4 pb-20">
          <motion.h2
            className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-black leading-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-white">CAREER</span>
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "2px #de5e91",
              }}
            >
              JOURNEY
            </span>
          </motion.h2>
        </div>

        {/* Stacked Cards Container */}
        <div className="experience-cards relative">
          {/* Capa de partículas que scrollean - COMENTADO TEMPORALMENTE */}
          {/* 
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={`particles-container-${i}`}
                className="relative h-screen"
              >
                <ExperienceParticles index={i} />
              </div>
            ))}
          </div>
          */}

          {/* Capa de cards sticky */}
          <div className="w-[90%] max-w-5xl 2xl:max-w-6xl mx-auto relative">
            {(() => {
              const jobs = [
                {
                  period: "04/2023 — PRESENTE",
                  company: "BIKO2 / JAKALA",
                  role: "TECH LEAD & MANAGER",
                  project: "Banca Online Laboral Kutxa",
                  description:
                    "Lidero el equipo frontend (+20 devs) de la banca digital (+1M usuarios), combinando la dirección técnica y la gestión de personas con una visión estratégica del producto.",
                  highlights: [
                    {
                      title: "Ingeniería & Estrategia de Producto",
                      text: "Colaboro con POs, Negocio y Diseño para definir soluciones técnicas. Dirijo la migración Angular → React enfocada en seguridad, Time-to-Market y UX.",
                    },
                    {
                      title: "Excelencia Técnica & XP",
                      text: "TDD, Integración Continua, Pair Programming. Arquitectura robusta capaz de evolucionar con el negocio.",
                    },
                    {
                      title: "Innovación & IA aplicada",
                      text: "Context Engineering del equipo (Rules, Comandos, MCPs para Azure DevOps). Mejoras significativas en velocidad y calidad.",
                    },
                    {
                      title: "Gestión de Personas",
                      text: "Manager directo de 8 engineers. 1-on-1s, planes de carrera y formación continua.",
                    },
                  ],
                },
                {
                  period: "03/2022 — 04/2023",
                  company: "BIKO2 / JAKALA",
                  role: "SENIOR WEB DEVELOPER",
                  project: "Motor de Reservas Barceló Hotel Group",
                  description:
                    "Desarrollador core en la construcción del nuevo motor de reservas (alto tráfico), operando bajo metodología Extreme Programming estricta.",
                  highlights: [
                    {
                      title: "Arquitectura & Stack Moderno",
                      text: "Next.js + Arquitectura Hexagonal desplegada en Vercel. SEO y Core Web Vitals optimizados.",
                    },
                    {
                      title: "Visión de Producto & Diseño",
                      text: "Enlace clave entre diseño y desarrollo. Traduje maquetas complejas a componentes eficientes.",
                    },
                    {
                      title: "Observabilidad & Producción",
                      text: "Estrategias de monitorización y alerting (Sentry/Datadog) para estabilidad del servicio.",
                    },
                    {
                      title: "Calidad & Cultura",
                      text: "TDD y CI/CD. Mentorización de nuevos integrantes para acelerar onboarding.",
                    },
                  ],
                },
                {
                  period: "08/2020 — 02/2022",
                  company: "NUBBA GROUP",
                  role: "LEAD DEVELOPER & PM",
                  project: "RescueOnTime, Inallow + Consultoría",
                  description:
                    "Rol híbrido de liderazgo técnico y producto. Responsable final de la entrega en consultoría y productos propios SaaS.",
                  highlights: [
                    {
                      title: "Gestión Integral de Producto",
                      text: "Ciclo completo: preventa técnica, requisitos, diseño UX/UI, implementación y mantenimiento.",
                    },
                    {
                      title: "Estrategia de Negocio",
                      text: "Demos técnicas y feedback de mercado convertido en roadmap. Universidad de Navarra, Médicos del Mundo.",
                    },
                    {
                      title: "Liderazgo Técnico & Mentoring",
                      text: "Definí arquitectura y estándares. Transformé equipo de 1 a 5 developers.",
                    },
                  ],
                },
                {
                  period: "03/2018 — 08/2020",
                  company: "NUBBA GROUP",
                  role: "FULL STACK DEVELOPER",
                  project: "Startup Phase",
                  description:
                    "Segundo desarrollador en startup de 4 personas. Responsabilidad crítica desde el día uno en desarrollo Web y Mobile.",
                  highlights: [
                    {
                      title: "Desarrollo End-to-End",
                      text: "Soluciones a medida para clientes corporativos y productos SaaS internos.",
                    },
                    {
                      title: "Stack Tecnológico",
                      text: "Backend (PHP/Symfony, MySQL), Frontend (Angular 2+) y Mobile Híbrido (Ionic).",
                    },
                    {
                      title: "Cultura Startup",
                      text: "Mentalidad de resolución de problemas. Gestión de incidencias críticas en entorno de recursos limitados.",
                    },
                  ],
                },
              ];

              return (
                <>
                  {jobs.map((job, i) => (
                    <ExperienceCard
                      key={i}
                      job={job}
                      index={i}
                      onOpenModal={() => setOpenModalIndex(i)}
                    />
                  ))}

                  {/* Modal de detalles - Solo mobile */}
                  <AnimatePresence>
                    {openModalIndex !== null && (
                      <motion.div
                        className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Overlay/Backdrop */}
                        <motion.div
                          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                          onClick={() => setOpenModalIndex(null)}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />

                        {/* Modal Content */}
                        <motion.div
                          className="relative w-full max-h-[85vh] bg-[#212121] border-2 border-[#de5e91] overflow-y-auto overflow-x-hidden"
                          initial={{
                            scale: 0.8,
                            y: 100,
                            opacity: 0,
                          }}
                          animate={{
                            scale: 1,
                            y: 0,
                            opacity: 1,
                          }}
                          exit={{
                            scale: 0.8,
                            y: 100,
                            opacity: 0,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        >
                          {/* Contenido del modal */}
                          <div className="p-6 overflow-x-hidden">
                            {/* Botón cerrar */}
                            <button
                              onClick={() => setOpenModalIndex(null)}
                              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:text-[#de5e91] transition-colors z-10"
                              aria-label="Cerrar"
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>

                            {/* Pink accent line top */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#de5e91] to-transparent opacity-50" />

                            {/* Header */}
                            <div className="mb-6 border-l-4 border-[#de5e91] pl-6 pr-12">
                              <span className="text-[#de5e91] font-mono text-xs tracking-wider font-bold break-words">
                                {jobs[openModalIndex].period}
                              </span>
                              <h3 className="text-2xl font-black text-white mt-1 leading-tight break-words">
                                {jobs[openModalIndex].role}
                              </h3>
                              <p className="text-white/70 text-sm font-medium mt-1 break-words">
                                {jobs[openModalIndex].company}
                              </p>
                              <p className="text-white/50 font-mono text-xs mt-1 break-words">
                                {jobs[openModalIndex].project}
                              </p>
                            </div>

                            {/* Description */}
                            <p className="text-white/60 text-sm leading-relaxed mb-6 break-words">
                              {jobs[openModalIndex].description}
                            </p>

                            {/* Highlights - Completos en modal */}
                            <div className="space-y-4">
                              <h4 className="text-white font-bold text-sm mb-3">
                                DETALLES CLAVE
                              </h4>
                              {jobs[openModalIndex].highlights.map(
                                (highlight, idx) => (
                                  <div
                                    key={idx}
                                    className="border-l-2 border-[#de5e91]/50 pl-4 py-2 hover:border-[#de5e91] transition-colors duration-300"
                                  >
                                    <h5 className="text-white font-bold text-sm mb-1 break-words">
                                      {highlight.title}
                                    </h5>
                                    <p className="text-white/60 text-sm leading-relaxed break-words">
                                      {highlight.text}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>

                            {/* Bottom accent */}
                            <div className="mt-8 pt-4 border-t border-[#de5e91]/20">
                              <button
                                onClick={() => setOpenModalIndex(null)}
                                className="w-full py-3 border-2 border-white/30 text-white font-mono text-sm font-bold hover:border-white hover:bg-white hover:text-[#212121] transition-all duration-300"
                              >
                                CERRAR
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Projects Section - Grid Experimental con Hover */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-black text-white mb-20 leading-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            SELECTED
            <br />
            <span className="text-[#de5e91]">WORKS</span>
          </motion.h2>

          <div className="grid grid-cols-12 gap-6">
            {/* Proyecto 1 - Banking Platform */}
            <motion.div
              className="col-span-12 md:col-span-8 aspect-[16/9] relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#de5e91] to-purple-600" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <span className="text-white/60 text-sm font-mono mb-2">
                  01 / BANKING · FINTECH
                </span>
                <h3 className="text-5xl font-black text-white mb-4">
                  DIGITAL BANKING PLATFORM
                </h3>
                <p className="text-white/80 text-lg max-w-md">
                  Migración Angular → React. Arquitectura escalable para +1M
                  usuarios. TDD, CI/CD, Optimistic UI. Liderando equipo de +20
                  developers.
                </p>
              </div>
              <motion.div
                className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>

            {/* Proyecto 2 - Hotel Booking Engine */}
            <motion.div
              className="col-span-12 md:col-span-4 aspect-square relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-white/60 text-sm font-mono mb-2">
                  02 / HOSPITALITY
                </span>
                <h3 className="text-3xl font-black text-white mb-2">
                  BOOKING ENGINE
                </h3>
                <p className="text-white/70 text-sm">
                  Next.js + Hexagonal Architecture. XP estricto. Alto tráfico.
                  Optimización SEO y Core Web Vitals.
                </p>
              </div>
              <motion.div
                className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>

            {/* Proyecto 3 - SaaS Products */}
            <motion.div
              className="col-span-12 md:col-span-5 aspect-[4/3] relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-white/60 text-sm font-mono mb-2">
                  03 / SAAS · PRODUCTS
                </span>
                <h3 className="text-4xl font-black text-white mb-2">
                  ENTERPRISE SOLUTIONS
                </h3>
                <p className="text-white/70">
                  Productos propios desde 0. Full-stack. Universidad de Navarra,
                  Médicos del Mundo. Estrategia comercial.
                </p>
              </div>
              <motion.div
                className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>

            {/* Proyecto 4 - Micro-frontends & Design Systems */}
            <motion.div
              className="col-span-12 md:col-span-7 aspect-[4/3] relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-400" />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-white/60 text-sm font-mono mb-2">
                  04 / ARCHITECTURE
                </span>
                <h3 className="text-4xl font-black text-white mb-2">
                  DESIGN SYSTEMS & MICRO-FRONTENDS
                </h3>
                <p className="text-white/70">
                  Componentes reusables, documentados y testeados. Arquitectura
                  escalable para múltiples equipos.
                </p>
              </div>
              <motion.div
                className="absolute inset-0 border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-[12vw] sm:text-[10vw] md:text-8xl font-black text-white leading-none">
              COMMUNITY
              <br />
              <span className="text-[#de5e91]">& TEACHING</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 overflow-hidden">
            {/* Profesor */}
            <motion.div
              className="relative group overflow-visible"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute -inset-4 bg-[#de5e91] opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" />
              <div className="relative border-l-4 border-[#de5e91] pl-8 py-4">
                <span className="text-white/40 font-mono text-sm">
                  2023 — PRESENT
                </span>
                <h3 className="text-3xl font-black text-white mt-2 mb-3">
                  CURSO XP & SOFTWARE ENGINEERING
                </h3>
                <p className="text-white/70 mb-4">
                  Profesor principal en Biko2/Jakala
                </p>
                <p className="text-white/60 leading-relaxed">
                  Formación que va más allá del código: TDD, Arquitectura
                  Hexagonal, XP, Pair Programming, CI/CD. Enfoque en desarrollo
                  sostenible y profesional.
                </p>
              </div>
            </motion.div>

            {/* Charlas */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl" />
                <div className="relative border-l-4 border-white pl-8 py-4">
                  <span className="text-white/40 font-mono text-sm">
                    2025 · WORKSHOP
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2 mb-2">
                    MÁS ALLÁ DEL 'VIBE CODING' CON IA
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    Pamplona Software Crafters
                  </p>
                  <p className="text-white/50 leading-relaxed text-sm">
                    Context Engineering y estrategias para integrar IA en
                    desarrollo profesional sin perder calidad.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl" />
                <div className="relative border-l-4 border-white pl-8 py-4">
                  <span className="text-white/40 font-mono text-sm">
                    2025 · CHARLA
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2 mb-2">
                    ESTRATEGIAS DE RENDERIZADO EN REACT
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    Comunidad Pamplona
                  </p>
                  <p className="text-white/50 leading-relaxed text-sm">
                    Deep dive técnico: CSR, SSR, SSG, ISR, RSC. Arquitecturas
                    modernas y su impacto en Performance y SEO.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section - Experimental */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[15vw] font-black leading-none mb-12">
              <span className="text-white">LET'S</span>
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "2px #de5e91",
                }}
              >
                TALK
              </span>
            </h2>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-20">
              <motion.a
                href="mailto:endikaorve@gmail.com"
                className="text-white text-2xl font-mono hover:text-[#de5e91] transition-colors relative group"
                whileHover={{ scale: 1.1 }}
              >
                endikaorve@gmail.com
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#de5e91] group-hover:w-full transition-all duration-300" />
              </motion.a>

              <span className="text-white/20 text-4xl hidden md:block">/</span>

              <div className="flex gap-6">
                <motion.a
                  href="https://www.linkedin.com/in/endikaorube/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg font-mono hover:text-[#de5e91] transition-colors"
                  whileHover={{ y: -5 }}
                >
                  LINKEDIN
                </motion.a>
                <motion.a
                  href="tel:+34685253787"
                  className="text-white text-lg font-mono hover:text-[#de5e91] transition-colors"
                  whileHover={{ y: -5 }}
                >
                  PHONE
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer minimalista */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4 flex justify-between items-center text-white/40 text-sm font-mono">
            <span>© 2025 ENDIKA ORUBE</span>
            <span>PAMPLONA, ES</span>
          </div>
        </div>
      </section>
    </main>
  );
}
