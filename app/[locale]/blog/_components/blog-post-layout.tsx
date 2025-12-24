"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { BlogPostDetail } from "@/core/blog/domain/blog";
import { formatBlogPostDate } from "@/core/blog/domain/blog-utils";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("blog");
  const formattedDate = formatBlogPostDate(post, locale);

  return (
    <article className="relative min-h-screen">
      <div className="relative">
        {/* Header con navegación */}
        <motion.header
          className="container mx-auto px-4 pt-20 md:pt-24"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-200 font-mono text-sm group"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              ←
            </motion.span>
            {t("backToBlog")}
          </Link>
        </motion.header>

        {/* Hero del artículo */}
        <motion.div
          className="container mx-auto px-4 py-16 md:py-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-mono text-white/40">
            <time dateTime={post.date} className="text-primary">
              {formattedDate}
            </time>
            <span className="w-1 h-1 bg-primary/50" />
            <span>{post.readTime}</span>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-none mb-8 max-w-5xl">
            {post.title}
          </h1>

          {/* Descripción */}
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-12 max-w-3xl">
            {post.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-16">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-mono uppercase tracking-wider text-primary border border-primary/30 bg-primary/5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Línea divisoria */}
          <div className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent mb-16" />
        </motion.div>

        {/* Contenido del artículo */}
        <motion.div
          className="container mx-auto px-4 pb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-3xl mx-auto">{children}</div>
        </motion.div>

        {/* Footer del artículo */}
        <motion.footer
          className="container mx-auto px-4 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="max-w-3xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12" />

            {/* Autor */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 border border-primary/30 flex items-center justify-center">
                <span className="text-primary font-black text-lg">E</span>
              </div>
              <div>
                <p className="font-bold text-white">{post.author}</p>
                <p className="text-white/40 text-sm font-mono">
                  Tech Lead & Product Engineer
                </p>
              </div>
            </div>

            {/* Volver al blog */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors duration-200 font-bold group"
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ x: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  ←
                </motion.span>
                {t("allPosts")}
              </Link>
            </div>
          </div>
        </motion.footer>
      </div>
    </article>
  );
}
