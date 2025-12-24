"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BlogCard } from "./_components/blog-card";
import type { BlogPostMeta } from "@/lib/blog-types";

interface BlogListClientProps {
  posts: BlogPostMeta[];
  locale: string;
}

export function BlogListClient({ posts, locale }: BlogListClientProps) {
  const t = useTranslations("blog");

  return (
    <main className="relative min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header con navegación */}
        <motion.header
          className="pt-20 md:pt-24 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary transition-colors duration-200 font-mono text-sm group"
          >
            <motion.span
              className="inline-block"
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              ←
            </motion.span>
            {t("backToHome")}
          </Link>
        </motion.header>

        {/* Hero */}
        <motion.section
          className="pb-12 md:pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none">
            <span className="text-primary">{t("title.line1")}</span>
            <br />
            <span className="text-white">{t("title.line2")}</span>
          </h1>

          <p className="mt-8 text-white/60 text-lg md:text-xl max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.section>

        {/* Lista de posts */}
        <section className="pb-32">
          {posts.length > 0 ? (
            <div className="space-y-4">
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
              <p className="text-white/40 text-lg">{t("noPosts")}</p>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}

