'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { CustomCursor } from '@/components/custom-cursor';

type CursorVariant = 'default' | 'hover' | 'text';

export function GlobalCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default');
  const [cursorText, setCursorText] = useState<string>('');
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  
  // Refs para acceder a valores actuales sin añadirlos como dependencias
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const cursorStateRef = useRef({ variant: 'default' as CursorVariant, text: '' });

  // Helper para actualizar el cursor solo si es necesario (evita re-renders innecesarios)
  const updateCursor = useCallback((newVariant: CursorVariant, newText: string = '') => {
    const { variant, text } = cursorStateRef.current;
    if (variant !== newVariant || text !== newText) {
      cursorStateRef.current = { variant: newVariant, text: newText };
      setCursorVariant(newVariant);
      setCursorText(newText);
    }
  }, []);

  // Verificar estado del cursor cuando cambia la ruta (navegación client-side)
  useEffect(() => {
    // Usar un pequeño delay para que el DOM se actualice después de la navegación
    const timeoutId = setTimeout(() => {
      const { x, y } = mousePositionRef.current;
      const elementUnderCursor = document.elementFromPoint(x, y) as HTMLElement | null;
      
      if (elementUnderCursor) {
        const cursorData = elementUnderCursor.getAttribute('data-cursor') || 
                          elementUnderCursor.closest('[data-cursor]')?.getAttribute('data-cursor');
        
        if (cursorData) {
          updateCursor('text', cursorData);
          return;
        }

        const isLink = elementUnderCursor.tagName === 'A' || elementUnderCursor.closest('a');
        const isButton = elementUnderCursor.tagName === 'BUTTON' || elementUnderCursor.closest('button');

        if (isLink || isButton) {
          updateCursor('hover');
        } else {
          updateCursor('default');
        }
      } else {
        updateCursor('default');
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname, updateCursor]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    mousePositionRef.current = newPosition;
    setMousePosition(newPosition);
  }, []);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    
    // Check for data-cursor attribute for text variant
    const cursorData = target.getAttribute('data-cursor') || 
                       target.closest('[data-cursor]')?.getAttribute('data-cursor');
    
    if (cursorData) {
      updateCursor('text', cursorData);
      return;
    }

    // Check for interactive elements
    const isLink = target.tagName === 'A' || target.closest('a');
    const isButton = target.tagName === 'BUTTON' || target.closest('button');

    if (isLink || isButton) {
      updateCursor('hover');
    } else {
      updateCursor('default');
    }
  }, [updateCursor]);

  const handleMouseLeave = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    
    const cursorData = target.getAttribute('data-cursor') || 
                       target.closest('[data-cursor]')?.getAttribute('data-cursor');
    const isLink = target.tagName === 'A' || target.closest('a');
    const isButton = target.tagName === 'BUTTON' || target.closest('button');

    if (cursorData || isLink || isButton) {
      updateCursor('default');
    }
  }, [updateCursor]);

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
