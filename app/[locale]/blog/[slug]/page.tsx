import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

import { blogService } from '@/core/blog/services/blog.service';
import { routing } from '@/i18n/routing';
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

  return {
    title: `${post.title} | Endika Orube`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
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

  return (
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
  );
}
