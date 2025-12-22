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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const messages = await import(`../../translations/${locale}.json`);
  const t = messages.default;

  return {
    title: t.metadata.title,
    description: t.metadata.description,
    generator: "v0.app",
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
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
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitcher />
          <CVDownloadButton />
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
