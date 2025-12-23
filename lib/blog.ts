import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostMeta } from "./blog-types";

// Re-exportar tipos
export type { BlogPost, BlogPostMeta } from "./blog-types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/**
 * Obtiene todos los posts del blog para un idioma específico
 */
export function getBlogPosts(locale: string): BlogPostMeta[] {
  // Verificar que el directorio existe
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const slugs = fs.readdirSync(BLOG_DIR).filter((name) => {
    const fullPath = path.join(BLOG_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });

  const posts: BlogPostMeta[] = [];

  for (const slug of slugs) {
    const filePath = path.join(BLOG_DIR, slug, `${locale}.mdx`);

    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      posts.push({
        slug,
        title: data.title || slug,
        description: data.description || "",
        date: data.date || "",
        author: data.author || "Endika Orube",
        tags: data.tags || [],
        readTime: data.readTime || "5 min",
        featured: data.featured || false,
      });
    }
  }

  // Ordenar por fecha descendente (más recientes primero)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Obtiene un post específico por slug e idioma
 */
export function getBlogPost(
  slug: string,
  locale: string
): BlogPost | null {
  const filePath = path.join(BLOG_DIR, slug, `${locale}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    author: data.author || "Endika Orube",
    tags: data.tags || [],
    readTime: data.readTime || "5 min",
    featured: data.featured || false,
    content,
  };
}

/**
 * Obtiene todos los slugs de posts disponibles (para generateStaticParams)
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs.readdirSync(BLOG_DIR).filter((name) => {
    const fullPath = path.join(BLOG_DIR, name);
    return fs.statSync(fullPath).isDirectory();
  });
}

// Re-exportar utilidades del cliente
export { formatBlogDate } from "./blog-utils";

