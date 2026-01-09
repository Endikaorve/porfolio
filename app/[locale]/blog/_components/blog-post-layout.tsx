'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import type { BlogPostDetail } from '@/core/blog/domain/blog';
import { formatBlogPostDate } from '@/core/blog/domain/blog-utils';
import { useTranslations } from 'next-intl';

interface BlogPostLayoutProps {
  post: BlogPostDetail;
  locale: string;
  children: React.ReactNode;
}

export function BlogPostLayout({
  post,
  locale,
  children,
}: BlogPostLayoutProps) {
  const t = useTranslations('blog');
  const formattedDate = formatBlogPostDate(post, locale);

  return (
    <article className="relative min-h-screen">
      <div className="relative">
        {/* Header minimalista */}
        <motion.header
          className="container mx-auto px-4 max-w-3xl pt-24 md:pt-32 pb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors duration-200 text-sm font-mono"
          >
            <span>←</span>
            {t('backToBlog')}
          </Link>
        </motion.header>

        {/* Hero del artículo */}
        <motion.div
          className="container mx-auto px-4 max-w-3xl pb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Metadata arriba */}
          <div className="flex items-center gap-3 text-xs font-mono text-white/40 mb-6">
            <time dateTime={post.date} className="text-primary">
              {formattedDate}
            </time>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Descripción */}
          <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8">
            {post.description}
          </p>

          {/* Tags minimalistas */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-white/40 hover:text-primary transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Separador sutil */}
          <div className="h-px bg-white/10" />
        </motion.div>

        {/* Contenido del artículo */}
        <motion.div
          className="container mx-auto px-4 max-w-3xl pb-24"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="container mx-auto px-4 max-w-3xl pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Separador */}
          <div className="h-px bg-white/5 mb-8" />

          {/* Volver al blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors duration-200 text-sm"
          >
            <span>←</span>
            {t('allPosts')}
          </Link>
        </motion.footer>
      </div>
    </article>
  );
}
