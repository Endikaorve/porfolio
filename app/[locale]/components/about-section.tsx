"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function AboutSection() {
  const t = useTranslations();

  return (
    <section className="relative min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          {/* Foto - Mobile first, luego reposicionada en desktop */}
          <motion.div
            className="col-span-12 md:col-span-5 md:row-span-2 relative order-first md:order-none"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square max-w-[280px] md:max-w-none mx-auto md:mx-0">
              {/* Marco exterior decorativo */}
              <div className="absolute -inset-3 md:-inset-4 border border-[#de5e91]/20" />

              {/* Contenedor de imagen con overlay */}
              <div className="relative w-full h-full overflow-hidden group">
                {/* Imagen */}
                <Image
                  src="/endika.jpg"
                  alt="Endika Orube - Tech Lead & Product Engineer especializado en React, Next.js y arquitectura frontend en Pamplona, Navarra"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />

                {/* Overlay gradiente rosa */}
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-30 group-hover:opacity-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(222, 94, 145, 0.4) 0%, transparent 60%)",
                  }}
                />

                {/* Línea diagonal decorativa */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div
                    className="absolute w-[200%] h-px bg-[#de5e91]/40 -rotate-45"
                    style={{ top: "20%", left: "-50%" }}
                  />
                </div>

                {/* Borde interior */}
                <div className="absolute inset-0 border border-white/10" />
              </div>

              {/* Esquinas decorativas */}
              <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#de5e91]" />
              <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#de5e91]" />

              {/* Indicador de hover - solo desktop */}
              <div className="hidden md:block absolute -right-12 top-1/2 -translate-y-1/2">
                <div className="w-8 h-px bg-[#de5e91]/30" />
              </div>
            </div>
          </motion.div>

          {/* Título */}
          <motion.div
            className="col-span-12 md:col-span-7 relative mt-8 md:mt-0"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#de5e91] mb-8 leading-none">
                {t("about.title.line1")}
                <br />
                {t("about.title.line2")}
                <br />
                <span className="text-white">{t("about.title.line3")}</span>
              </h2>
            </div>
          </motion.div>

          {/* Descripción y stats */}
          <motion.div
            className="col-span-12 md:col-span-7 flex items-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <p className="text-white text-lg md:text-xl leading-relaxed">
                {t("about.description1")}
              </p>
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                {t("about.description2")}
              </p>
              <div className="flex gap-4 pt-4">
                <div className="border-l-4 border-[#de5e91] pl-4">
                  <span className="text-2xl md:text-3xl font-black text-white">
                    {t("about.stats.techLead")}
                  </span>
                  <p className="text-white/60 text-sm">
                    {t("about.stats.engineers")}
                  </p>
                </div>
                <div className="border-l-4 border-white pl-4">
                  <span className="text-2xl md:text-3xl font-black text-[#de5e91]">
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
  );
}

