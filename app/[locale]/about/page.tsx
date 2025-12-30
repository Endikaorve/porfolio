import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutPageClient } from './_components';

const BASE_URL = 'https://endikaorube.com';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const currentUrl = `${BASE_URL}/${locale}/about`;
  const isSpanish = locale === 'es';

  const title = `${t('title')} | Endika Orube`;
  const description = isSpanish
    ? 'Conoce la trayectoria profesional de Endika Orube: +7 años de experiencia como Tech Lead, liderando equipos de +20 desarrolladores en proyectos críticos. Arquitectura, TDD, Product Engineering.'
    : 'Discover Endika Orube\'s professional journey: 7+ years of experience as Tech Lead, leading teams of 20+ developers on critical projects. Architecture, TDD, Product Engineering.';

  return {
    title,
    description,
    keywords: [
      'Tech Lead',
      'Engineering Manager',
      'Product Engineer',
      'Software Architecture',
      'TDD',
      'Extreme Programming',
      'React',
      'Next.js',
      'TypeScript',
      'Team Leadership',
      'Endika Orube',
      'Pamplona',
      'Navarra',
    ],

    // Alternates & canonical
    alternates: {
      canonical: currentUrl,
      languages: {
        es: `${BASE_URL}/es/about`,
        en: `${BASE_URL}/en/about`,
      },
    },

    // Open Graph
    openGraph: {
      type: 'profile',
      locale: isSpanish ? 'es_ES' : 'en_US',
      alternateLocale: isSpanish ? 'en_US' : 'es_ES',
      url: currentUrl,
      title,
      description,
      siteName: 'Endika Orube Portfolio',
      firstName: 'Endika',
      lastName: 'Orube',
      username: 'endikaorube',
      images: [
        {
          url: `${BASE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Endika Orube - Tech Lead & Product Engineer',
        },
      ],
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${BASE_URL}/og-image.jpg`],
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
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageClient />;
}
