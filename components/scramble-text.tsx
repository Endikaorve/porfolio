'use client';

import { useScrambleText } from '@/hooks/use-scramble-text';
import { motion } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export function ScrambleText({
  text,
  className = '',
  as: Component = 'span',
  href,
  target,
  rel,
}: ScrambleTextProps) {
  const { displayText, scramble, reset } = useScrambleText(text, {
    speed: 25,
    iterations: 4,
  });

  const commonProps = {
    className: `${className} font-mono`,
    onMouseEnter: scramble,
    onMouseLeave: reset,
  };

  if (Component === 'a' && href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        {...commonProps}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {displayText}
      </motion.a>
    );
  }

  return <Component {...commonProps}>{displayText}</Component>;
}

