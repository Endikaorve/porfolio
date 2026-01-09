'use client';

import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/core/blog/domain/blog';
import { formatBlogPostDate } from '@/core/blog/domain/blog-utils';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  locale: string;
}

export function BlogCard({ post, index, locale }: BlogCardProps) {
  const formattedDate = formatBlogPostDate(post, locale);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      viewport={{ once: true }}
      className="group"
    >
      <Link 
        href={`/blog/${post.slug}`} 
        className="block py-6 border-t border-white/5 group-hover:border-primary/20 transition-colors duration-300"
      >
        {/* Fecha y tiempo de lectura */}
        <div className="flex items-center gap-3 mb-3 text-sm font-mono">
          <time 
            dateTime={post.date}
            className="text-primary/70 group-hover:text-primary transition-colors duration-200"
          >
            {formattedDate}
          </time>
          <span className="text-white/20">·</span>
          <span className="text-white/40">{post.readTime}</span>
        </div>

        {/* Título */}
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2 leading-tight group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h2>

        {/* Descripción */}
        <p className="text-white/50 text-base leading-relaxed mb-3">
          {post.description}
        </p>

        {/* Tags minimalistas */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-white/40 group-hover:text-primary/60 transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}
