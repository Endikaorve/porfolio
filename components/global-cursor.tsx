'use client';

import { useEffect, useState } from 'react';
import { CustomCursor } from '@/components/custom-cursor';

export function GlobalCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover'>(
    'default'
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setCursorVariant('hover');
      }
    };

    const handleMouseLeave = () => {
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Usar event delegation para capturar todos los elementos interactivos
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        handleMouseLeave();
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  if (!isClient) return null;

  return (
    <CustomCursor mousePosition={mousePosition} cursorVariant={cursorVariant} />
  );
}
