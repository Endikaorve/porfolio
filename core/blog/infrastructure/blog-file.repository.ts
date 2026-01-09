import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogRepository } from '../domain/blog-repository';
import type { BlogPost, BlogPostDetail } from '../domain/blog';
import type { BlogFileDTO, BlogMetadata } from './dto/blog-file.dto';
import { buildBlogPost, buildBlogPostDetail } from './mappers/blog-file.mapper';

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

/**
 * Lee el archivo metadata.json de un post
 * @param slug - Slug del post
 * @returns Metadata estática del post
 */
function readMetadata(slug: string): BlogMetadata {
  const metadataPath = path.join(BLOG_DIR, slug, 'metadata.json');
  
  if (!fs.existsSync(metadataPath)) {
    // Fallback si no existe metadata.json (para compatibilidad)
    return {
      date: '',
      tags: [],
      readTime: '5 min',
    };
  }

  const metadataContent = fs.readFileSync(metadataPath, 'utf-8');
  return JSON.parse(metadataContent) as BlogMetadata;
}

/**
 * Implementación del repositorio de blog basada en filesystem
 * Lee archivos MDX de la carpeta content/blog
 */
export const blogFileRepository: BlogRepository = {
  /**
   * Lista todos los slugs disponibles (carpetas en content/blog)
   */
  listSlugs: async (): Promise<string[]> => {
    if (!fs.existsSync(BLOG_DIR)) {
      return [];
    }

    return fs.readdirSync(BLOG_DIR).filter((name) => {
      const fullPath = path.join(BLOG_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    });
  },

  /**
   * Obtiene un post completo por slug e idioma
   * Lee metadata.json (estático) y el archivo .mdx del idioma (traducible)
   */
  getBlogPostDetailBySlug: async (
    slug: string,
    locale: string
  ): Promise<BlogPostDetail | null> => {
    const filePath = path.join(BLOG_DIR, slug, `${locale}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    // Leer metadata estática
    const metadata = readMetadata(slug);

    // Leer contenido traducible
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const dto: BlogFileDTO = {
      slug,
      metadata,
      frontmatter: data,
      content,
    };

    return buildBlogPostDetail(dto);
  },

  /**
   * Lista todos los posts (metadata) para un idioma
   * Lee metadata.json (estático) y el archivo .mdx del idioma (traducible)
   * Ordenados por fecha descendente
   */
  listBlogPosts: async (locale: string): Promise<BlogPost[]> => {
    // Verificar que el directorio existe
    if (!fs.existsSync(BLOG_DIR)) {
      return [];
    }

    const slugs = fs.readdirSync(BLOG_DIR).filter((name) => {
      const fullPath = path.join(BLOG_DIR, name);
      return fs.statSync(fullPath).isDirectory();
    });

    const posts: BlogPost[] = [];

    for (const slug of slugs) {
      const filePath = path.join(BLOG_DIR, slug, `${locale}.mdx`);

      // Solo procesar si existe el archivo del idioma
      if (fs.existsSync(filePath)) {
        // Leer contenido traducible
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Leer metadata estática (después de verificar que el .mdx existe)
        const metadata = readMetadata(slug);

        const dto: BlogFileDTO = {
          slug,
          metadata,
          frontmatter: data,
          content,
        };

        posts.push(buildBlogPost(dto));
      }
    }

    // Ordenar por fecha descendente (más recientes primero)
    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
};
