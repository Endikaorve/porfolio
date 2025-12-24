"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

import {
  AnimatedBackground,
  AboutSection,
  ExpertiseSection,
  ExperienceSection,
  CommunitySection,
  TechSkillsSection,
  ProjectsSection,
} from "./_components";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Background parallax
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={containerRef} className="relative">
      {/* Fondo animado con grid distorsionado */}
      <AnimatedBackground backgroundX={backgroundX} backgroundY={backgroundY} />

      {/* Secciones */}
      <AboutSection />
      <ExpertiseSection />
      <ExperienceSection />
      <CommunitySection />
      <TechSkillsSection />
      <ProjectsSection />
    </main>
  );
}

