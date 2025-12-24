import type React from 'react';

// Este layout raíz es requerido por Next.js pero el contenido
// real está en app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
