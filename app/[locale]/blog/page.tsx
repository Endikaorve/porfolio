import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { blogService } from '@/core/blog/services/blog.service';
import { siteConfig } from '@/config/site';
import { BlogListClient } from './blog-list-client';
import '@/di';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blogPage' });

  const currentUrl = `${siteConfig.url}/${locale}/blog`;
  const isSpanish = locale === 'es';

  const title = `${t('title')} | ${siteConfig.author.name}`;
  const description = t('description');

  return {
    title,
    description,

    // Canonical y alternates
    alternates: {
      canonical: currentUrl,
      languages: {
        es: `${siteConfig.url}/es/blog`,
        en: `${siteConfig.url}/en/blog`,
      },
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale: isSpanish ? 'es_ES' : 'en_US',
      alternateLocale: isSpanish ? 'en_US' : 'es_ES',
      url: currentUrl,
      title,
      description,
      siteName: `${siteConfig.author.name} Blog`,
      images: [
        {
          url: `${siteConfig.url}/og-image.jpg`,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: `${siteConfig.author.name} - Blog`,
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

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await blogService.listBlogPosts(locale);

  return <BlogListClient posts={posts} locale={locale} />;
}
