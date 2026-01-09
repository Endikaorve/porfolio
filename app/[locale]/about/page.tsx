import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { siteConfig } from '@/config/site';
import { AboutPageClient } from './_components';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const currentUrl = `${siteConfig.url}/${locale}/about`;
  const isSpanish = locale === 'es';

  const title = `${t('title')} | ${siteConfig.author.name}`;
  const description = t('description');

  return {
    title,
    description,
    keywords: [
      'Tech Lead',
      'Engineering Manager',
      'Product Engineer',
      'Software Architecture',
      'Hexagonal Architecture',
      'TDD',
      'Extreme Programming',
      'XP',
      'Context Engineering',
      'AI Development',
      'React',
      'Next.js',
      'TypeScript',
      'Team Leadership',
      'Tech Speaker',
      'Banking Software',
      'Endika Orube',
      'Pamplona',
      'Navarra',
    ],

    // Alternates & canonical
    alternates: {
      canonical: currentUrl,
      languages: {
        es: `${siteConfig.url}/es/about`,
        en: `${siteConfig.url}/en/about`,
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
      siteName: siteConfig.name,
      firstName: 'Endika',
      lastName: 'Orube',
      username: 'endikaorube',
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
      title,
      description,
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
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageClient />;
}
