"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { BlogPost } from "@/core/blog/domain/blog";
import { formatBlogPostDate } from "@/core/blog/domain/blog-utils";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  locale: string;
}

export function BlogCard({ post, index, locale }: BlogCardProps) {
  const formattedDate = formatBlogPostDate(post, locale);
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Número de sección grande */}
        <span className="absolute -left-2 md:-left-8 top-0 text-6xl md:text-8xl font-black text-white/5 select-none pointer-events-none">
          {number}
        </span>

        <div className="relative border-t border-white/10 pt-8 pb-12 pl-8 md:pl-16 transition-all duration-300 group-hover:border-primary/50">
          {/* Línea decorativa izquierda */}
          <div className="absolute left-0 top-8 bottom-12 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Header: Fecha y tiempo de lectura */}
          <div className="flex items-center gap-4 mb-4 text-sm font-mono text-white/40">
            <time dateTime={post.date}>{formattedDate}</time>
            <span className="w-1 h-1 bg-primary/50" />
            <span>{post.readTime}</span>
          </div>

          {/* Título */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>

          {/* Descripción */}
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 max-w-3xl">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono uppercase tracking-wider text-primary/80 border border-primary/20 bg-primary/5 group-hover:border-primary/40 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Flecha de navegación */}
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
            initial={{ x: -10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <span className="text-2xl text-primary">→</span>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
}

