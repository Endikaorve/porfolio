import type React from "react";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Locale } from "@/i18n/config";
import "../globals.css";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CVDownloadButton } from "@/components/cv-download-button";
import { JsonLdSchema } from "@/components/json-ld";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = "https://endikaorube.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../translations/${locale}.json`);
  const t = messages.default;

  const currentUrl = `${BASE_URL}/${locale}`;

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    keywords: [
      "Tech Lead",
      "Product Engineer",
      "Frontend Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Software Architecture",
      "TDD",
      "Pamplona",
      "Spain",
      "Navarra",
    ],
    authors: [{ name: "Endika Orube", url: BASE_URL }],
    creator: "Endika Orube",
    metadataBase: new URL(BASE_URL),

    // Alternates & hreflang
    alternates: {
      canonical: currentUrl,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
      },
    },

    // Open Graph
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_ES",
      url: currentUrl,
      title: t.metadata.title,
      description: t.metadata.description,
      siteName: "Endika Orube Portfolio",
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "Endika Orube - Tech Lead & Product Engineer",
        },
      ],
    },

    // Twitter Cards
    twitter: {
      card: "summary_large_image",
      title: t.metadata.title,
      description: t.metadata.description,
      images: [`${BASE_URL}/og-image.jpg`],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Icons
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <CVDownloadButton />
          <LanguageSwitcher />
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
