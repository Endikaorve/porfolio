"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Nombre gigante con efecto 3D */}
          <div className="relative">
            <motion.h1
              className="text-[18vw] font-black leading-[0.85] tracking-tighter"
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
              className="text-[18vw] font-black leading-[0.85] tracking-tighter text-white"
              style={{
                textShadow: "0 0 80px rgba(222, 94, 145, 0.5)",
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

          {/* Subtítulo dinámico */}
          <motion.p className="absolute -right-4 top-1/2 -translate-y-1/2 text-[#de5e91] text-xl md:text-2xl font-mono rotate-90 origin-center whitespace-nowrap font-bold">
            TECH LEAD · PRODUCT ENGINEER
          </motion.p>
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
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
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
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
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
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
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
        <div className="experience-cards w-[90%] max-w-5xl mx-auto">
          {[
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
              rotation: -1.5,
              bg: "#2a2a2a",
              clipPath: `polygon(
                0% 2.3%, 4.1% 0%, 16.8% 1.2%, 33.2% 0%, 51.5% 0.7%, 72.3% 0%, 86.9% 1.1%, 98.2% 0%, 100% 1.8%,
                99.3% 16.4%, 100% 37.2%, 99.4% 57.8%, 100% 77.3%, 99.2% 91.5%, 100% 98.6%,
                97.8% 100%, 86.4% 99.3%, 71.8% 100%, 51.2% 99.4%, 32.5% 100%, 16.1% 99.5%, 4.3% 100%, 0% 98.4%,
                0.6% 87.2%, 0% 67.5%, 0.4% 47.3%, 0% 27.1%, 0.7% 11.8%
              )`,
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
              rotation: 1.2,
              bg: "#262626",
              clipPath: `polygon(
                0% 2.8%, 3.5% 0%, 17.2% 0.8%, 31.8% 0%, 52.1% 0.5%, 71.5% 0%, 87.3% 0.9%, 97.5% 0%, 100% 2.1%,
                99.6% 17.8%, 100% 38.5%, 99.2% 56.2%, 100% 76.8%, 99.4% 90.3%, 100% 98.2%,
                98.1% 100%, 85.7% 99.6%, 72.4% 100%, 50.8% 99.2%, 31.2% 100%, 15.5% 99.7%, 3.8% 100%, 0% 98.7%,
                0.4% 86.5%, 0% 66.2%, 0.5% 46.8%, 0% 26.5%, 0.6% 12.3%
              )`,
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
              rotation: -0.8,
              bg: "#2d2d2d",
              clipPath: `polygon(
                0% 2.5%, 4.5% 0%, 16.1% 1.0%, 32.8% 0%, 50.9% 0.6%, 73.1% 0%, 86.2% 1.3%, 97.9% 0%, 100% 1.6%,
                99.5% 15.9%, 100% 36.8%, 99.3% 58.4%, 100% 78.1%, 99.6% 92.1%, 100% 98.4%,
                97.4% 100%, 87.1% 99.4%, 70.9% 100%, 52.3% 99.5%, 30.8% 100%, 16.7% 99.3%, 4.1% 100%, 0% 98.2%,
                0.5% 88.1%, 0% 68.3%, 0.3% 48.1%, 0% 28.4%, 0.8% 10.9%
              )`,
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
              rotation: 1.8,
              bg: "#252525",
              clipPath: `polygon(
                0% 2.1%, 3.8% 0%, 17.5% 1.1%, 30.5% 0%, 51.8% 0.4%, 70.8% 0%, 85.8% 1.2%, 98.5% 0%, 100% 2.4%,
                99.2% 16.2%, 100% 37.9%, 99.5% 55.6%, 100% 75.9%, 99.3% 89.8%, 100% 98.9%,
                97.6% 100%, 86.8% 99.2%, 71.2% 100%, 50.5% 99.6%, 32.1% 100%, 15.8% 99.4%, 4.6% 100%, 0% 98.5%,
                0.7% 85.8%, 0% 67.9%, 0.4% 45.5%, 0% 25.8%, 0.5% 11.5%
              )`,
            },
          ].map((job, i) => (
            // Card outer - fullscreen sticky container with centered content
            <div
              key={i}
              className="card-outer h-screen w-full flex items-center justify-center sticky top-0"
              style={{ zIndex: i + 1 }}
            >
              {/* Card content */}
              <div
                className="relative p-5 md:p-12 shadow-2xl w-full"
                style={{
                  backgroundColor: job.bg,
                  clipPath: job.clipPath,
                  transform: `rotate(${job.rotation}deg)`,
                }}
              >
                {/* Subtle paper texture overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Card number indicator */}
                <div className="absolute -top-4 -right-2 md:-right-4">
                  <span
                    className="text-6xl md:text-8xl font-black opacity-10"
                    style={{ color: "#de5e91" }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Header */}
                <div className="relative z-10 mb-4 md:mb-6">
                  <span className="text-[#de5e91] font-mono text-xs md:text-sm tracking-wider">
                    {job.period}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black text-white mt-1 md:mt-2 leading-tight">
                    {job.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-1 md:mt-2">
                    <p className="text-white/70 text-sm md:text-lg font-medium">
                      {job.company}
                    </p>
                    <span className="text-white/30 hidden md:inline">·</span>
                    <p className="text-white/50 font-mono text-xs md:text-sm hidden md:block">
                      {job.project}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-4 md:mb-8 relative z-10">
                  {job.description}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 relative z-10">
                  {job.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 border-[#de5e91]/50 pl-3 md:pl-4 py-1 md:py-2"
                    >
                      <h4 className="text-white font-bold text-xs md:text-sm">
                        {highlight.title}
                      </h4>
                      {/* Text hidden on mobile */}
                      <p className="hidden md:block text-white/50 text-sm leading-relaxed mt-1">
                        {highlight.text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#de5e91]/30 to-transparent" />
              </div>
            </div>
          ))}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Profesor */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
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
