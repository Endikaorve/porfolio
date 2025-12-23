"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

// Componentes separados por sección
import {
  CustomCursor,
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">(
    "default"
  );

  // Cursor tracking y eventos
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

    // Actualizar posición cuando el mouse entra en la página
    const handleDocumentEnter = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleDocumentEnter, true);

    const interactiveElements = document.querySelectorAll("a, button");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleDocumentEnter, true);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // Background parallax
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={containerRef} className="relative bg-[#212121]">
      {/* Custom Cursor System - Awwwards Style */}
      <CustomCursor
        mousePosition={mousePosition}
        cursorVariant={cursorVariant}
      />

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
