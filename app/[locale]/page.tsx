'use client';

import { HeroSection, MeSection, ContactSection } from './_components';

export default function Home() {
  return (
    <main className="relative h-dvh overflow-y-scroll snap-y snap-mandatory">
      <HeroSection />
      <MeSection />
      <ContactSection />
    </main>
  );
}
