"use client";

import { motion } from "framer-motion";

interface CustomCursorProps {
  mousePosition: { x: number; y: number };
  cursorVariant: "default" | "hover";
}

const variants = {
  default: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    border: "1px solid color-mix(in srgb, var(--pink) 50%, transparent)",
  },
  hover: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    border: "1px solid color-mix(in srgb, var(--pink) 80%, transparent)",
  },
};

export function CustomCursor({ mousePosition, cursorVariant }: CustomCursorProps) {
  return (
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
        className="fixed pointer-events-none z-[9998] rounded-full mix-blend-difference"
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
            "radial-gradient(circle, color-mix(in srgb, var(--pink) 15%, transparent) 0%, transparent 70%)",
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
  );
}

