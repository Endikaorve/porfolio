import type React from 'react';
import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Locale } from '@/i18n/config';
import { siteConfig } from '@/config/site';
import '../globals.css';
import { Header } from '@/components/header';
import { GlobalCursor } from '@/components/global-cursor';
import { JsonLdSchema } from '@/components/json-ld';
import { ScrollToTop } from '@/components/scroll-to-top';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../translations/${locale}.json`);
  const t = messages.default;

  const currentUrl = `${siteConfig.url}/${locale}`;

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    keywords: [
      'Tech Lead',
      'Engineering Manager',
      'Product Engineer',
      'Frontend Developer',
      'Extreme Programming',
      'XP',
      'TDD',
      'Software Architecture',
      'Hexagonal Architecture',
      'Context Engineering',
      'AI Development',
      'React',
      'Next.js',
      'TypeScript',
      'Tech Speaker',
      'Banking Software',
      'Fintech',
      'Pamplona',
      'Navarra',
      'Spain',
    ],
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    metadataBase: new URL(siteConfig.url),

    // Alternates & hreflang
    alternates: {
      canonical: currentUrl,
      languages: {
        es: `${siteConfig.url}/es`,
        en: `${siteConfig.url}/en`,
      },
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      url: currentUrl,
      title: t.metadata.title,
      description: t.metadata.description,
      siteName: siteConfig.name,
      images: [
        {
          url: `${siteConfig.url}/og-image.jpg`,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: siteConfig.ogImage.alt,
        },
      ],
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title: t.metadata.title,
      description: t.metadata.description,
      images: [`${siteConfig.url}/og-image.jpg`],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Icons
    icons: {
      icon: [{ url: '/favicon.ico', sizes: 'any' }],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the client provider
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <JsonLdSchema locale={locale} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-surface-dark`}
      >
        <NextIntlClientProvider messages={messages}>
          <ScrollToTop />
          <GlobalCursor />
          <Header />
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
