'use client';

import Link from 'next/link';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { motion } from 'framer-motion';
import { GlobalCursor } from '@/components/global-cursor';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function NotFound() {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <title>404 | Endika Orube</title>
        <meta name="description" content="Page not found" />
      </head>
      <body className="font-sans antialiased bg-surface-dark">
        <GlobalCursor />

        <main className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            {/* 404 Title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h1
                className="text-[25vw] md:text-[15vw] font-black leading-none tracking-tighter text-transparent"
                style={{ WebkitTextStroke: '2px white' }}
              >
                404
              </h1>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/es" className="group">
                <span className="relative px-8 py-4 border border-primary text-primary font-mono text-sm tracking-wider overflow-hidden inline-block group-hover:text-white transition-colors duration-300">
                  <span className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">Ir a Inicio (ES)</span>
                </span>
              </Link>

              <Link href="/en" className="group">
                <span className="relative px-8 py-4 border border-primary text-primary font-mono text-sm tracking-wider overflow-hidden inline-block group-hover:text-white transition-colors duration-300">
                  <span className="absolute inset-0 bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <span className="relative z-10">Go to Home (EN)</span>
                </span>
              </Link>
            </motion.div>
          </div>
        </main>
      </body>
    </html>
  );
}
