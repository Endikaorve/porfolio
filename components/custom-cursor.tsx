'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface CustomCursorProps {
  mousePosition: { x: number; y: number };
  cursorVariant: 'default' | 'hover' | 'text';
  cursorText?: string;
}

const variants = {
  default: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    border: '1px solid color-mix(in srgb, var(--pink) 50%, transparent)',
  },
  hover: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    border: '1px solid color-mix(in srgb, var(--pink) 80%, transparent)',
  },
  text: {
    width: 100,
    height: 100,
    backgroundColor: 'var(--pink)',
    border: 'none',
  },
};

export function CustomCursor({
  mousePosition,
  cursorVariant,
  cursorText,
}: CustomCursorProps) {
  return (
    <div className="hidden md:block">
      {/* Punto central - siempre centrado */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <motion.div
          className="bg-white rounded-full"
          animate={{
            width: cursorVariant === 'text' ? 0 : 4,
            height: cursorVariant === 'text' ? 0 : 4,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        />
      </motion.div>

      {/* Círculo principal - centrado con transform */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full flex items-center justify-center"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: cursorVariant === 'text' ? 'normal' : 'difference',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      >
        {/* Texto contextual */}
        <AnimatePresence>
          {cursorVariant === 'text' && cursorText && (
            <motion.span
              className="text-white text-xs font-mono font-bold tracking-wider"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Halo - centrado con transform */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--pink) 15%, transparent) 0%, transparent 70%)',
        }}
        animate={{
          width: cursorVariant === 'text' ? 140 : cursorVariant === 'hover' ? 120 : 60,
          height: cursorVariant === 'text' ? 140 : cursorVariant === 'hover' ? 120 : 60,
          opacity: cursorVariant === 'text' ? 0.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
        }}
      />

      {/* Trail particles - pequeños puntos que siguen al cursor con delay */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[9996] rounded-full bg-primary/30"
          style={{
            width: 4 - i,
            height: 4 - i,
          }}
          animate={{
            left: mousePosition.x,
            top: mousePosition.y,
            x: '-50%',
            y: '-50%',
          }}
          transition={{
            type: 'spring',
            stiffness: 150 - i * 30,
            damping: 15 + i * 5,
            mass: 0.1,
          }}
        />
      ))}
    </div>
  );
}
