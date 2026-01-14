import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

import { blogService } from '@/core/blog/services/blog.service';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import { BlogPostLayout } from '../_components/blog-post-layout';
import { mdxComponents } from '../_components/mdx-components';
import '@/di';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Generar rutas estáticas para todos los posts en todos los idiomas
export async function generateStaticParams() {
  const slugs = await blogService.listSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of routing.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await blogService.getBlogPostDetailBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  const currentUrl = `${siteConfig.url}/${locale}/blog/${slug}`;
  const isSpanish = locale === 'es';
  const title = `${post.title} | ${siteConfig.author.name}`;

  return {
    title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: siteConfig.author.name }],

    // Canonical y alternates
    alternates: {
      canonical: currentUrl,
      languages: {
        es: `${siteConfig.url}/es/blog/${slug}`,
        en: `${siteConfig.url}/en/blog/${slug}`,
      },
    },

    // Open Graph
    openGraph: {
      type: 'article',
      locale: isSpanish ? 'es_ES' : 'en_US',
      alternateLocale: isSpanish ? 'en_US' : 'es_ES',
      url: currentUrl,
      title,
      description: post.description,
      siteName: `${siteConfig.author.name} Blog`,
      publishedTime: post.date,
      modifiedTime: post.modifiedDate || post.date,
      authors: [siteConfig.author.name],
      tags: post.tags,
      images: [
        {
          url: `${siteConfig.url}/og-image.jpg`,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: title,
        },
      ],
    },

    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title,
      description: post.description,
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

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await blogService.getBlogPostDetailBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteConfig.url}/${locale}/blog/${slug}#article`,
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}/og-image.jpg`,
    datePublished: post.date,
    dateModified: post.modifiedDate || post.date,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/${locale}/blog/${slug}`,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${siteConfig.url}/${locale}/blog`,
      name: `${siteConfig.author.name} Blog`,
    },
    keywords: post.tags.join(', '),
    inLanguage: locale === 'es' ? 'es-ES' : 'en-US',
    wordCount: post.content.split(/\s+/).length,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <BlogPostLayout post={post} locale={locale}>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypeHighlight],
            },
          }}
        />
      </BlogPostLayout>
    </>
  );
}
