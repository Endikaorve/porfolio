'use client';

import { useEffect } from 'react';
import { HeroSection, MeSection, ContactSection } from './_components';

export default function Home() {
  // Aplicar scroll snap al html solo en la home page
  useEffect(() => {
    const html = document.documentElement;
    html.style.scrollSnapType = 'y mandatory';
    html.style.overflowY = 'scroll';

    return () => {
      html.style.scrollSnapType = '';
      html.style.overflowY = '';
    };
  }, []);

  return (
    <main className="relative">
      <HeroSection />
      <MeSection />
      <ContactSection />
    </main>
  );
}
