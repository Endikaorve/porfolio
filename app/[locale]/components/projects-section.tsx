"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Github, ExternalLink } from "lucide-react";

export function ProjectsSection() {
  const t = useTranslations();

  return (
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Proyecto 1 - Banking Platform */}
          <motion.div
            className="col-span-1 lg:col-span-8 aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] relative group cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
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
            <div className="absolute inset-0 p-6 lg:p-12 flex flex-col justify-end">
              <span className="text-[#de5e91] text-xs lg:text-sm font-mono mb-2 tracking-wider">
                {t("projects.items.banking.category")}
              </span>
              <h3 className="text-2xl lg:text-5xl font-black text-white mb-2 lg:mb-4">
                {t("projects.items.banking.title")}
              </h3>
              <p className="text-white/60 text-sm lg:text-lg max-w-md leading-relaxed">
                {t("projects.items.banking.description")}
              </p>
            </div>
            <div className="absolute top-4 right-4 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-r-2 border-[#de5e91]/30 group-hover:border-[#de5e91] transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-l-2 border-[#de5e91]/30 group-hover:border-[#de5e91] transition-colors duration-300" />
          </motion.div>

          {/* Proyecto 2 - Hotel Booking Engine */}
          <motion.div
            className="col-span-1 lg:col-span-4 aspect-[4/3] md:aspect-[16/10] lg:aspect-square relative group cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.1 },
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
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
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
              <span className="text-white/50 text-xs lg:text-sm font-mono mb-2 tracking-wider">
                {t("projects.items.booking.category")}
              </span>
              <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
                {t("projects.items.booking.title")}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {t("projects.items.booking.description")}
              </p>
            </div>
            <div className="absolute top-4 right-4 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-r-2 border-white/20 group-hover:border-white/50 transition-colors duration-300" />
          </motion.div>

          {/* Proyecto 3 - SaaS Products */}
          <motion.div
            className="col-span-1 lg:col-span-5 aspect-[4/3] md:aspect-[16/10] relative group cursor-pointer overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2 },
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
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
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
              <span className="text-white/50 text-xs lg:text-sm font-mono mb-2 tracking-wider">
                {t("projects.items.saas.category")}
              </span>
              <h3 className="text-2xl lg:text-4xl font-black text-white mb-2">
                {t("projects.items.saas.title")}
              </h3>
              <p className="text-white/50 text-sm lg:text-base leading-relaxed">
                {t("projects.items.saas.description")}
              </p>
            </div>
            <div className="absolute top-4 right-4 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-r-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-l-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
          </motion.div>

          {/* Proyecto 4 - Labs & R&D */}
          <motion.div
            className="col-span-1 lg:col-span-7 relative group overflow-hidden bg-[#1a1a1a] border border-[#de5e91]/20 p-6 lg:p-8 flex flex-col justify-between"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.3 },
            }}
            viewport={{ once: true }}
          >
            {/* Header de la card principal */}
            <div className="mb-8 z-10 relative">
              <span className="text-[#de5e91]/70 text-xs lg:text-sm font-mono mb-2 tracking-wider block">
                {t("projects.items.labs.category")}
              </span>
              <h3 className="text-2xl lg:text-4xl font-black text-white mb-2">
                {t("projects.items.labs.title")}
              </h3>
              <p className="text-white/50 text-sm lg:text-base leading-relaxed max-w-2xl">
                {t("projects.items.labs.description")}
              </p>
            </div>

            {/* Grid de Subproyectos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 z-10 relative">
              {/* Subproyecto 1: Portfolio */}
              <div className="bg-white/5 border border-white/10 p-4 hover:border-[#de5e91]/50 transition-colors duration-300 group/item flex flex-col h-full relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-bold font-mono text-sm pr-4">
                    {t("projects.items.labs.subprojects.p1.name")}
                  </h4>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href="https://github.com/Endikaorve/porfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#de5e91] transition-colors p-1"
                      aria-label="GitHub Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-white/50 text-xs leading-relaxed mt-auto">
                  {t("projects.items.labs.subprojects.p1.desc")}
                </p>
              </div>

              {/* Subproyecto 2: Renderizados React */}
              <div className="bg-white/5 border border-white/10 p-4 hover:border-[#de5e91]/50 transition-colors duration-300 group/item flex flex-col h-full relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-bold font-mono text-sm pr-4">
                    {t("projects.items.labs.subprojects.p2.name")}
                  </h4>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href="https://github.com/Endikaorve/renderizados-web"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#de5e91] transition-colors p-1"
                      aria-label="GitHub Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://dxp-renderizados-web-presentacion.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#de5e91] transition-colors p-1"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-white/50 text-xs leading-relaxed mt-auto">
                  {t("projects.items.labs.subprojects.p2.desc")}
                </p>
              </div>

              {/* Subproyecto 3: Taller IA + Pokédex */}
              <div className="bg-white/5 border border-white/10 p-4 hover:border-[#de5e91]/50 transition-colors duration-300 group/item flex flex-col h-full relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-bold font-mono text-sm pr-4">
                    {t("projects.items.labs.subprojects.p3.name")}
                  </h4>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href="https://github.com/Endikaorve/pokedex-taller-scpna"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#de5e91] transition-colors p-1"
                      aria-label="GitHub Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://pokedex-vite-woad.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#de5e91] transition-colors p-1"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-white/50 text-xs leading-relaxed mt-auto">
                  {t("projects.items.labs.subprojects.p3.desc")}
                </p>
              </div>

              {/* Subproyecto 4: Landing CreaYarnoz */}
              <div className="bg-white/5 border border-white/10 p-4 hover:border-[#de5e91]/50 transition-colors duration-300 group/item flex flex-col h-full relative">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-bold font-mono text-sm pr-4">
                    {t("projects.items.labs.subprojects.p4.name")}
                  </h4>
                  <div className="flex gap-2 shrink-0">
                    <a
                      href="https://github.com/Endikaorve/creayarnoz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#de5e91] transition-colors p-1"
                      aria-label="GitHub Code"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href="https://creayarnoz.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/40 hover:text-[#de5e91] transition-colors p-1"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <p className="text-white/50 text-xs leading-relaxed mt-auto">
                  {t("projects.items.labs.subprojects.p4.desc")}
                </p>
              </div>
            </div>

            {/* Background decorativo */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
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
            <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-[#de5e91]/50 via-[#de5e91]/20 to-transparent" />
            <div className="absolute top-4 right-4 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-r-2 border-[#de5e91]/30" />
            <div className="absolute bottom-4 left-4 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-l-2 border-[#de5e91]/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

