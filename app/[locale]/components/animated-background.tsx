"use client";

import { motion, MotionValue } from "framer-motion";

interface AnimatedBackgroundProps {
  backgroundX: MotionValue<string>;
  backgroundY: MotionValue<string>;
}

export function AnimatedBackground({ backgroundX, backgroundY }: AnimatedBackgroundProps) {
  return (
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
  );
}

