"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

// Tipos
interface Job {
  period: string;
  company: string;
  role: string;
  project: string;
  description: string;
  highlights: Array<{ title: string; text: string }>;
}

// Componente minimalista de partículas decorativas
function ExperienceParticles() {
  const particles = [
    // Lateral izquierdo - mezcla de bordes y rellenos
    { type: "square-filled", x: "5%", y: "3%", size: 6, opacity: 0.12 },
    { type: "square", x: "12%", y: "8%", size: 12, opacity: 0.25 },
    { type: "circle-filled", x: "3%", y: "12%", size: 8, opacity: 0.15 },
    { type: "square-filled", x: "8%", y: "18%", size: 8, opacity: 0.15 },
    { type: "circle", x: "11%", y: "22%", size: 10, opacity: 0.22 },
    { type: "circle-filled", x: "5%", y: "28%", size: 6, opacity: 0.12 },
    { type: "square", x: "3%", y: "35%", size: 10, opacity: 0.2 },
    { type: "square-filled", x: "9%", y: "40%", size: 10, opacity: 0.15 },
    { type: "circle", x: "4%", y: "45%", size: 8, opacity: 0.3 },
    { type: "square-filled", x: "10%", y: "52%", size: 6, opacity: 0.15 },
    { type: "square", x: "6%", y: "58%", size: 16, opacity: 0.3 },
    { type: "circle-filled", x: "12%", y: "64%", size: 8, opacity: 0.12 },
    { type: "square-filled", x: "4%", y: "70%", size: 10, opacity: 0.15 },
    { type: "square", x: "8%", y: "76%", size: 12, opacity: 0.22 },
    { type: "circle-filled", x: "11%", y: "82%", size: 6, opacity: 0.12 },
    { type: "square", x: "5%", y: "88%", size: 14, opacity: 0.25 },
    { type: "circle-filled", x: "9%", y: "94%", size: 8, opacity: 0.15 },
    // Lateral derecho - mezcla de bordes y rellenos
    { type: "rect-h", x: "85%", y: "4%", width: 24, height: 8, opacity: 0.25 },
    { type: "square-filled", x: "92%", y: "9%", size: 10, opacity: 0.12 },
    { type: "circle", x: "88%", y: "15%", size: 12, opacity: 0.22 },
    { type: "square", x: "94%", y: "20%", size: 14, opacity: 0.28 },
    { type: "circle-filled", x: "86%", y: "26%", size: 6, opacity: 0.15 },
    { type: "square-filled", x: "91%", y: "32%", size: 8, opacity: 0.12 },
    { type: "square", x: "87%", y: "38%", size: 10, opacity: 0.2 },
    { type: "square-filled", x: "94%", y: "44%", size: 8, opacity: 0.12 },
    { type: "square", x: "85%", y: "50%", size: 18, opacity: 0.28 },
    { type: "rect-v", x: "93%", y: "55%", width: 8, height: 20, opacity: 0.28 },
    { type: "circle-filled", x: "88%", y: "62%", size: 10, opacity: 0.15 },
    { type: "square-filled", x: "92%", y: "68%", size: 6, opacity: 0.15 },
    { type: "square", x: "86%", y: "74%", size: 14, opacity: 0.3 },
    { type: "circle-filled", x: "93%", y: "80%", size: 10, opacity: 0.12 },
    { type: "square-filled", x: "88%", y: "86%", size: 8, opacity: 0.15 },
    { type: "square", x: "91%", y: "92%", size: 12, opacity: 0.25 },
    { type: "circle-filled", x: "86%", y: "97%", size: 6, opacity: 0.12 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none w-full overflow-hidden">
      {particles.map((particle, i) => {
        if (particle.type === "circle") {
          return (
            <div
              key={`particle-${i}`}
              className="absolute border border-primary rounded-full"
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

        if (particle.type === "circle-filled") {
          return (
            <div
              key={`particle-${i}`}
              className="absolute bg-primary rounded-full"
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

        if (particle.type === "square-filled") {
          return (
            <div
              key={`particle-${i}`}
              className="absolute bg-primary"
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
              className="absolute border border-primary"
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
              className="absolute border border-primary"
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
            className="absolute border border-primary"
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
  job: Job;
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
        className="relative p-5 md:p-12 2xl:p-16 w-full bg-surface-dark border-2 border-primary/30 pointer-events-auto"
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

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

        <div className="relative z-10 mb-4 md:mb-6 2xl:mb-8 border-l-4 2xl:border-l-[6px] border-primary pl-6 2xl:pl-8">
          <span className="text-primary font-mono text-xs md:text-sm 2xl:text-base tracking-wider font-bold">
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
              className="border-l-2 2xl:border-l-[3px] border-primary/50 pl-3 md:pl-4 2xl:pl-6 py-1 md:py-2 2xl:py-3 hover:border-primary transition-colors duration-300"
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
          className="md:hidden mt-6 relative z-10 w-full py-3 border-2 border-primary text-primary font-mono text-sm font-bold hover:bg-primary hover:text-surface-dark transition-all duration-300 active:scale-95"
        >
          {t("viewMore")}
        </button>

        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20" />
      </motion.div>
    </div>
  );
}

// Modal de detalles para mobile
function ExperienceModal({
  job,
  onClose,
}: {
  job: Job;
  onClose: () => void;
}) {
  const t = useTranslations("experience");

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative w-full max-h-[85vh] bg-surface-dark border-2 border-primary overflow-y-auto overflow-x-hidden"
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
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors z-10"
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

          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <div className="mb-6 border-l-4 border-primary pl-6 pr-12">
            <span className="text-primary font-mono text-xs tracking-wider font-bold break-words">
              {job.period}
            </span>
            <h3 className="text-2xl font-black text-white mt-1 leading-tight break-words">
              {job.role}
            </h3>
            <p className="text-white/70 text-sm font-medium mt-1 break-words">
              {job.company}
            </p>
            <p className="text-white/50 font-mono text-xs mt-1 break-words">
              {job.project}
            </p>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-6 break-words">
            {job.description}
          </p>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm mb-3">
              {t("keyDetails")}
            </h4>
            {job.highlights.map((highlight, idx) => (
              <div
                key={idx}
                className="border-l-2 border-primary/50 pl-4 py-2 hover:border-primary transition-colors duration-300"
              >
                <h5 className="text-white font-bold text-sm mb-1 break-words">
                  {highlight.title}
                </h5>
                <p className="text-white/60 text-sm leading-relaxed break-words">
                  {highlight.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-primary/20">
            <button
              onClick={onClose}
              className="w-full py-3 border-2 border-white/30 text-white font-mono text-sm font-bold hover:border-white hover:bg-white hover:text-surface-dark transition-all duration-300"
            >
              {t("close")}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const t = useTranslations();
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  // Bloquear scroll cuando el modal está abierto
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

  // Jobs data using translations
  const jobs: Job[] = [
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
          title: t("experience.jobs.biko2Senior.highlights.observability.title"),
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
          title: t("experience.jobs.nubbaFullStack.highlights.development.title"),
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

  return (
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
              WebkitTextStroke: "2px var(--pink)",
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
        </div>
      </div>

      {/* Modal de detalles - Solo mobile - Fuera del stacking context */}
      <AnimatePresence>
        {openModalIndex !== null && (
          <ExperienceModal
            job={jobs[openModalIndex]}
            onClose={() => setOpenModalIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

