"use client";

import { HeroSection, MeSection, ContactSection } from "./_components";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MeSection />
      <ContactSection />
    </main>
  );
}
