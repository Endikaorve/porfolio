"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

// Componentes separados por sección
import {
  AnimatedBackground,
  HeroSection,
  AboutSection,
  ExpertiseSection,
  ExperienceSection,
  CommunitySection,
  TechSkillsSection,
  ProjectsSection,
  ContactSection,
} from "./components";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Background parallax
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={containerRef} className="relative">
      {/* Fondo animado con grid distorsionado */}
      <AnimatedBackground backgroundX={backgroundX} backgroundY={backgroundY} />

      {/* Secciones del portfolio */}
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ExperienceSection />
      <CommunitySection />
      <TechSkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
