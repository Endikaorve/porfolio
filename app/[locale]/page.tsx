"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTranslations } from "next-intl";

// Componente minimalista de partículas decorativas
function ExperienceParticles() {
  const particles = [
    { type: "square", x: "5%", y: "15%", size: 16, opacity: 0.3 },
    { type: "square", x: "12%", y: "8%", size: 12, opacity: 0.25 },
    { type: "circle", x: "8%", y: "25%", size: 10, opacity: 0.28 },
    { type: "square", x: "88%", y: "10%", size: 20, opacity: 0.25 },
    { type: "square", x: "92%", y: "20%", size: 14, opacity: 0.28 },
    { type: "rect-h", x: "85%", y: "5%", width: 24, height: 8, opacity: 0.25 },
    { type: "square", x: "10%", y: "50%", size: 12, opacity: 0.25 },
    { type: "square", x: "6%", y: "60%", size: 16, opacity: 0.3 },
    { type: "circle", x: "4%", y: "45%", size: 8, opacity: 0.3 },
    { type: "square", x: "85%", y: "50%", size: 18, opacity: 0.28 },
    { type: "square", x: "90%", y: "42%", size: 14, opacity: 0.25 },
    { type: "rect-v", x: "93%", y: "55%", width: 8, height: 20, opacity: 0.28 },
    { type: "square", x: "90%", y: "75%", size: 14, opacity: 0.3 },
    { type: "square", x: "86%", y: "82%", size: 18, opacity: 0.28 },
    { type: "circle", x: "92%", y: "88%", size: 12, opacity: 0.25 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none w-full overflow-hidden">
      {particles.map((particle, i) => {
        if (particle.type === "circle") {
          return (
            <div
              key={`particle-${i}`}
              className="absolute border border-[#de5e91] rounded-full"
              style={{
                left: particle.x,
                top: particle.y,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
              }}
            />
          );
        }

        if (particle.type === "rect-h") {
          return (
            <div
              key={`particle-${i}`}
              className="absolute border border-[#de5e91]"
              style={{
                left: particle.x,
                top: particle.y,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                opacity: particle.opacity,
              }}
            />
          );
        }

        if (particle.type === "rect-v") {
          return (
            <div
              key={`particle-${i}`}
              className="absolute border border-[#de5e91]"
              style={{
                left: particle.x,
                top: particle.y,
                width: `${particle.width}px`,
                height: `${particle.height}px`,
                opacity: particle.opacity,
              }}
            />
          );
        }

        return (
          <div
            key={`particle-${i}`}
            className="absolute border border-[#de5e91]"
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        );
      })}
    </div>
  );
}

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
  const t = useTranslations("experience");
  const rotations = [-0.8, 1.2, -1.3, 1.7];
  const fixedRotation = rotations[index % rotations.length];

  return (
    <div
      className="card-outer h-screen w-full flex items-center justify-center sticky top-0 pointer-events-none"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="relative p-5 md:p-12 2xl:p-16 w-full bg-[#212121] border-2 border-[#de5e91]/30 pointer-events-auto"
        style={{
          rotate: fixedRotation,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#de5e91] to-transparent opacity-50" />

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

        <p className="text-white/60 text-sm md:text-lg 2xl:text-xl leading-relaxed mb-4 md:mb-8 2xl:mb-10 relative z-10 pl-6 2xl:pl-8">
          {job.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4 2xl:gap-6 relative z-10">
          {job.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="border-l-2 2xl:border-l-[3px] border-[#de5e91]/50 pl-3 md:pl-4 2xl:pl-6 py-1 md:py-2 2xl:py-3 hover:border-[#de5e91] transition-colors duration-300"
            >
              <h4 className="text-white font-bold text-xs md:text-sm 2xl:text-base">
                {highlight.title}
              </h4>
              <p className="hidden md:block text-white/50 text-sm 2xl:text-base leading-relaxed mt-1">
                {highlight.text}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onOpenModal}
          className="md:hidden mt-6 relative z-10 w-full py-3 border-2 border-[#de5e91] text-[#de5e91] font-mono text-sm font-bold hover:bg-[#de5e91] hover:text-[#212121] transition-all duration-300 active:scale-95"
        >
          {t("viewMore")}
        </button>

        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#de5e91]/40 to-transparent" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#de5e91]/20" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#de5e91]/20" />
      </motion.div>
    </div>
  );
}

export default function Home() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  // Hero intro animation state
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

  // Jobs data using translations
  const jobs = [
    {
      period: t("experience.jobs.biko2Lead.period"),
      company: t("experience.jobs.biko2Lead.company"),
      role: t("experience.jobs.biko2Lead.role"),
      project: t("experience.jobs.biko2Lead.project"),
      description: t("experience.jobs.biko2Lead.description"),
      highlights: [
        {
          title: t("experience.jobs.biko2Lead.highlights.engineering.title"),
          text: t("experience.jobs.biko2Lead.highlights.engineering.text"),
        },
        {
          title: t("experience.jobs.biko2Lead.highlights.excellence.title"),
          text: t("experience.jobs.biko2Lead.highlights.excellence.text"),
        },
        {
          title: t("experience.jobs.biko2Lead.highlights.innovation.title"),
          text: t("experience.jobs.biko2Lead.highlights.innovation.text"),
        },
        {
          title: t("experience.jobs.biko2Lead.highlights.management.title"),
          text: t("experience.jobs.biko2Lead.highlights.management.text"),
        },
      ],
    },
    {
      period: t("experience.jobs.biko2Senior.period"),
      company: t("experience.jobs.biko2Senior.company"),
      role: t("experience.jobs.biko2Senior.role"),
      project: t("experience.jobs.biko2Senior.project"),
      description: t("experience.jobs.biko2Senior.description"),
      highlights: [
        {
          title: t("experience.jobs.biko2Senior.highlights.architecture.title"),
          text: t("experience.jobs.biko2Senior.highlights.architecture.text"),
        },
        {
          title: t("experience.jobs.biko2Senior.highlights.product.title"),
          text: t("experience.jobs.biko2Senior.highlights.product.text"),
        },
        {
          title: t(
            "experience.jobs.biko2Senior.highlights.observability.title"
          ),
          text: t("experience.jobs.biko2Senior.highlights.observability.text"),
        },
        {
          title: t("experience.jobs.biko2Senior.highlights.quality.title"),
          text: t("experience.jobs.biko2Senior.highlights.quality.text"),
        },
      ],
    },
    {
      period: t("experience.jobs.nubbaLead.period"),
      company: t("experience.jobs.nubbaLead.company"),
      role: t("experience.jobs.nubbaLead.role"),
      project: t("experience.jobs.nubbaLead.project"),
      description: t("experience.jobs.nubbaLead.description"),
      highlights: [
        {
          title: t("experience.jobs.nubbaLead.highlights.product.title"),
          text: t("experience.jobs.nubbaLead.highlights.product.text"),
        },
        {
          title: t("experience.jobs.nubbaLead.highlights.business.title"),
          text: t("experience.jobs.nubbaLead.highlights.business.text"),
        },
        {
          title: t("experience.jobs.nubbaLead.highlights.leadership.title"),
          text: t("experience.jobs.nubbaLead.highlights.leadership.text"),
        },
      ],
    },
    {
      period: t("experience.jobs.nubbaFullStack.period"),
      company: t("experience.jobs.nubbaFullStack.company"),
      role: t("experience.jobs.nubbaFullStack.role"),
      project: t("experience.jobs.nubbaFullStack.project"),
      description: t("experience.jobs.nubbaFullStack.description"),
      highlights: [
        {
          title: t(
            "experience.jobs.nubbaFullStack.highlights.development.title"
          ),
          text: t("experience.jobs.nubbaFullStack.highlights.development.text"),
        },
        {
          title: t("experience.jobs.nubbaFullStack.highlights.stack.title"),
          text: t("experience.jobs.nubbaFullStack.highlights.stack.text"),
        },
        {
          title: t("experience.jobs.nubbaFullStack.highlights.culture.title"),
          text: t("experience.jobs.nubbaFullStack.highlights.culture.text"),
        },
      ],
    },
  ];

  // Expertise items
  const expertiseItems = [
    {
      number: t("expertise.items.product.number"),
      title: t("expertise.items.product.title"),
      description: t("expertise.items.product.description"),
    },
    {
      number: t("expertise.items.xp.number"),
      title: t("expertise.items.xp.title"),
      description: t("expertise.items.xp.description"),
    },
    {
      number: t("expertise.items.architecture.number"),
      title: t("expertise.items.architecture.title"),
      description: t("expertise.items.architecture.description"),
    },
    {
      number: t("expertise.items.leadership.number"),
      title: t("expertise.items.leadership.title"),
      description: t("expertise.items.leadership.description"),
    },
  ];

  return (
    <main ref={containerRef} className="relative bg-[#212121]">
      {/* Custom Cursor System - Awwwards Style */}
      <div className="hidden md:block">
        {/* Punto central - siempre centrado */}
        <motion.div
          className="fixed pointer-events-none z-[9999] mix-blend-difference"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-1 h-1 bg-white rounded-full" />
        </motion.div>

        {/* Círculo principal - centrado con transform */}
        <motion.div
          className="fixed pointer-events-none z-[9998] rounded-full backdrop-blur-sm"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
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

        {/* Halo - centrado con transform */}
        <motion.div
          className="fixed pointer-events-none z-[9997] rounded-full"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Capa animada - texto que se mueve con scroll */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-7xl px-4">
            {/* ENDIKA - Reveal desde abajo */}
            <div className={heroReady ? "" : "overflow-hidden"}>
              <motion.h1
                className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter will-change-transform"
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
                className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter text-white will-change-transform"
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
              </motion.h1>
            </div>
          </div>
        </div>

        {/* Capa estática - elementos de UI */}
        <div className="relative z-10 w-full max-w-7xl px-4">
          {/* Placeholder para mantener espacio */}
          <div className="relative" aria-hidden="true">
            <div className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter opacity-0 select-none pointer-events-none">
              ENDIKA
            </div>
            <div className="text-[25vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter opacity-0 select-none pointer-events-none">
              ORUBE
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

      {/* About Section */}
      <section className="relative min-h-screen py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4">
            <motion.div
              className="col-span-12 md:col-span-6 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10">
                <h2 className="text-6xl md:text-7xl font-black text-[#de5e91] mb-8 leading-none">
                  {t("about.title.line1")}
                  <br />
                  {t("about.title.line2")}
                  <br />
                  <span className="text-white">{t("about.title.line3")}</span>
                </h2>
              </div>
            </motion.div>

            <motion.div
              className="col-span-12 md:col-span-6 md:col-start-7 flex items-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <p className="text-white text-xl leading-relaxed">
                  {t("about.description1")}
                </p>
                <p className="text-white/60 text-lg leading-relaxed">
                  {t("about.description2")}
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="border-l-4 border-[#de5e91] pl-4">
                    <span className="text-3xl font-black text-white">
                      {t("about.stats.techLead")}
                    </span>
                    <p className="text-white/60 text-sm">
                      {t("about.stats.engineers")}
                    </p>
                  </div>
                  <div className="border-l-4 border-white pl-4">
                    <span className="text-3xl font-black text-[#de5e91]">
                      {t("about.stats.years")}
                    </span>
                    <p className="text-white/60 text-sm">
                      {t("about.stats.productEng")}
                    </p>
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

      {/* Expertise Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-6xl md:text-8xl font-black text-white mb-20 leading-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("expertise.title.line1")}
            <br />
            <span className="text-[#de5e91]">{t("expertise.title.line2")}</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertiseItems.map((item, i) => (
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

      {/* Experience Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 pb-20">
          <motion.h2
            className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-black leading-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-white">{t("experience.title.line1")}</span>
            <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "2px #de5e91",
              }}
            >
              {t("experience.title.line2")}
            </span>
          </motion.h2>
        </div>

        <div className="experience-cards relative">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ zIndex: 0 }}
          >
            <ExperienceParticles />
          </div>

          <div
            className="w-[90%] max-w-5xl 2xl:max-w-6xl mx-auto relative"
            style={{ zIndex: 1 }}
          >
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
                  <motion.div
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    onClick={() => setOpenModalIndex(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />

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
                    <div className="p-6 overflow-x-hidden">
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

                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#de5e91] to-transparent opacity-50" />

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

                      <p className="text-white/60 text-sm leading-relaxed mb-6 break-words">
                        {jobs[openModalIndex].description}
                      </p>

                      <div className="space-y-4">
                        <h4 className="text-white font-bold text-sm mb-3">
                          {t("experience.keyDetails")}
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

                      <div className="mt-8 pt-4 border-t border-[#de5e91]/20">
                        <button
                          onClick={() => setOpenModalIndex(null)}
                          className="w-full py-3 border-2 border-white/30 text-white font-mono text-sm font-bold hover:border-white hover:bg-white hover:text-[#212121] transition-all duration-300"
                        >
                          {t("experience.close")}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-[12vw] sm:text-[10vw] md:text-8xl font-black text-white leading-none">
              {t("community.title.line1")}
              <br />
              <span className="text-[#de5e91]">
                {t("community.title.line2")}
              </span>
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
                  {t("community.teaching.period")}
                </span>
                <h3 className="text-3xl font-black text-white mt-2 mb-3">
                  {t("community.teaching.title")}
                </h3>
                <p className="text-white/70 mb-4">
                  {t("community.teaching.subtitle")}
                </p>
                <p className="text-white/60 leading-relaxed">
                  {t("community.teaching.description")}
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
                    {t("community.talks.vibe.year")}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2 mb-2">
                    {t("community.talks.vibe.title")}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    {t("community.talks.vibe.event")}
                  </p>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {t("community.talks.vibe.description")}
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-xl" />
                <div className="relative border-l-4 border-white pl-8 py-4">
                  <span className="text-white/40 font-mono text-sm">
                    {t("community.talks.rendering.year")}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2 mb-2">
                    {t("community.talks.rendering.title")}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    {t("community.talks.rendering.event")}
                  </p>
                  <p className="text-white/50 leading-relaxed text-sm">
                    {t("community.talks.rendering.description")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[12vw] font-black text-white mb-20 leading-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("projects.title.line1")}
            <br />
            <span className="text-[#de5e91]">{t("projects.title.line2")}</span>
          </motion.h2>

          {/* Mobile: Stack uniforme | Desktop: Grid asimétrico */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
            {/* Proyecto 1 - Banking Platform */}
            <motion.div
              className="col-span-1 md:col-span-8 aspect-[4/3] md:aspect-[16/9] relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-[#1a1a1a]" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 40%, rgba(222, 94, 145, 0.1) 50%, transparent 60%),
                    linear-gradient(-45deg, transparent 40%, rgba(222, 94, 145, 0.05) 50%, transparent 60%)
                  `,
                }}
              />
              <div className="absolute inset-0 border border-[#de5e91]/20 group-hover:border-[#de5e91]/50 transition-colors duration-300" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#de5e91] via-[#de5e91]/50 to-transparent opacity-60" />
              <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
                <span className="text-[#de5e91] text-xs md:text-sm font-mono mb-2 tracking-wider">
                  {t("projects.items.banking.category")}
                </span>
                <h3 className="text-2xl md:text-5xl font-black text-white mb-2 md:mb-4">
                  {t("projects.items.banking.title")}
                </h3>
                <p className="text-white/60 text-sm md:text-lg max-w-md leading-relaxed">
                  {t("projects.items.banking.description")}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#de5e91]/30 group-hover:border-[#de5e91] transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#de5e91]/30 group-hover:border-[#de5e91] transition-colors duration-300" />
            </motion.div>

            {/* Proyecto 2 - Hotel Booking Engine */}
            <motion.div
              className="col-span-1 md:col-span-4 aspect-[4/3] md:aspect-square relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-[#1a1a1a]" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 80% 20%, rgba(222, 94, 145, 0.15) 0%, transparent 50%)`,
                }}
              />
              <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 transition-colors duration-300" />
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-white/40 via-white/10 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="text-white/50 text-xs md:text-sm font-mono mb-2 tracking-wider">
                  {t("projects.items.booking.category")}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  {t("projects.items.booking.title")}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {t("projects.items.booking.description")}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-white/20 group-hover:border-white/50 transition-colors duration-300" />
            </motion.div>

            {/* Proyecto 3 - SaaS Products */}
            <motion.div
              className="col-span-1 md:col-span-5 aspect-[4/3] relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-[#1a1a1a]" />
              <div
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 20px,
                      rgba(255, 255, 255, 0.02) 20px,
                      rgba(255, 255, 255, 0.02) 40px
                    )
                  `,
                }}
              />
              <div className="absolute inset-0 border border-white/15 group-hover:border-white/30 transition-colors duration-300" />
              <div className="absolute left-0 bottom-0 w-1 h-full bg-gradient-to-t from-white/30 via-white/10 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="text-white/50 text-xs md:text-sm font-mono mb-2 tracking-wider">
                  {t("projects.items.saas.category")}
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
                  {t("projects.items.saas.title")}
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  {t("projects.items.saas.description")}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
            </motion.div>

            {/* Proyecto 4 - Micro-frontends & Design Systems */}
            <motion.div
              className="col-span-1 md:col-span-7 aspect-[4/3] relative group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-[#1a1a1a]" />
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(
                      90deg,
                      transparent,
                      transparent 40px,
                      rgba(222, 94, 145, 0.03) 40px,
                      rgba(222, 94, 145, 0.03) 80px
                    )
                  `,
                }}
              />
              <div className="absolute inset-0 border border-[#de5e91]/20 group-hover:border-[#de5e91]/40 transition-colors duration-300" />
              <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#de5e91]/50 via-[#de5e91]/20 to-transparent" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <span className="text-[#de5e91]/70 text-xs md:text-sm font-mono mb-2 tracking-wider">
                  {t("projects.items.designSystems.category")}
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-white mb-2">
                  {t("projects.items.designSystems.title")}
                </h3>
                <p className="text-white/50 text-sm md:text-base leading-relaxed">
                  {t("projects.items.designSystems.description")}
                </p>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#de5e91]/30 group-hover:border-[#de5e91] transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#de5e91]/30 group-hover:border-[#de5e91] transition-colors duration-300" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[15vw] font-black leading-none mb-12">
              <span className="text-white">{t("contact.title.line1")}</span>
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: "2px #de5e91",
                }}
              >
                {t("contact.title.line2")}
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
                  {t("contact.phone")}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer minimalista */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4 flex justify-between items-center text-white/40 text-sm font-mono">
            <span>{t("contact.copyright")}</span>
            <span>{t("contact.location")}</span>
          </div>
        </div>
      </section>
    </main>
  );
}
