'use client';

import { useEffect, useState, useCallback } from 'react';
import { CustomCursor } from '@/components/custom-cursor';

type CursorVariant = 'default' | 'hover' | 'text';

export function GlobalCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    
    // Check for data-cursor attribute for text variant
    const cursorData = target.getAttribute('data-cursor') || 
                       target.closest('[data-cursor]')?.getAttribute('data-cursor');
    
    if (cursorData) {
      setCursorVariant('text');
      setCursorText(cursorData);
      return;
    }

    // Check for interactive elements
    const isLink = target.tagName === 'A' || target.closest('a');
    const isButton = target.tagName === 'BUTTON' || target.closest('button');

    if (isLink || isButton) {
      setCursorVariant('hover');
    }
  }, []);

  const handleMouseLeave = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    
    const cursorData = target.getAttribute('data-cursor') || 
                       target.closest('[data-cursor]')?.getAttribute('data-cursor');
    const isLink = target.tagName === 'A' || target.closest('a');
    const isButton = target.tagName === 'BUTTON' || target.closest('button');

    if (cursorData || isLink || isButton) {
      setCursorVariant('default');
      setCursorText('');
    }
  }, []);

  useEffect(() => {
    setIsClient(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!isClient) return null;

  return (
    <CustomCursor
      mousePosition={mousePosition}
      cursorVariant={cursorVariant}
      cursorText={cursorText}
    />
  );
}
