'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BlogCard } from './_components/blog-card';
import type { BlogPost } from '@/core/blog/domain/blog';

interface BlogListClientProps {
  posts: BlogPost[];
  locale: string;
}

export function BlogListClient({ posts, locale }: BlogListClientProps) {
  const t = useTranslations('blog');

  return (
    <main className="relative min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Hero minimalista con toque sutil */}
        <motion.section
          className="pt-24 md:pt-32 pb-12 md:pb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
            <span className="text-white">
              {t('title.line1')}
            </span>{' '}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '2px var(--pink)' }}
            >
              {t('title.line2')}
            </span>
          </h1>
          
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.section>

        {/* Lista de posts */}
        <section className="pb-32">
          {posts.length > 0 ? (
            <div className="space-y-12">
              {posts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  index={index}
                  locale={locale}
                />
              ))}
            </div>
          ) : (
            <motion.div
              className="py-24 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-white/40 text-base">{t('noPosts')}</p>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}
