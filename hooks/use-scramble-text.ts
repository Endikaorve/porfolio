'use client';

import { useState, useCallback, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

interface UseScrambleTextOptions {
  speed?: number; // ms entre cada iteración
  iterations?: number; // cuántas veces cambia cada letra antes de resolverse
}

export function useScrambleText(
  originalText: string,
  options: UseScrambleTextOptions = {}
) {
  const { speed = 30, iterations = 3 } = options;
  const [displayText, setDisplayText] = useState(originalText);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    if (isScrambling) return;
    
    setIsScrambling(true);
    let iteration = 0;
    const maxIterations = originalText.length * iterations;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            // Preservar espacios y caracteres especiales
            if (char === ' ' || char === '@' || char === '.') return char;
            
            // Gradualmente resolver las letras
            if (index < iteration / iterations) {
              return originalText[index];
            }
            
            // Scramble aleatorio
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      iteration += 1;

      if (iteration >= maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(originalText);
        setIsScrambling(false);
      }
    }, speed);
  }, [originalText, speed, iterations, isScrambling]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(originalText);
    setIsScrambling(false);
  }, [originalText]);

  return { displayText, scramble, reset, isScrambling };
}

