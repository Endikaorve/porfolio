import type { BlogRepository } from '../domain/blog-repository';
import type { BlogPost, BlogPostDetail } from '../domain/blog';

let blogRepository: BlogRepository;

/**
 * Servicio de blog que encapsula la lógica de negocio
 * Depende de BlogRepository que se inyecta mediante DI
 */
export const blogService = {
  /**
   * Lista todos los posts del blog (solo metadata) para un idioma
   * @param locale - Idioma de los posts
   * @returns Array de posts ordenados por fecha descendente
   */
  listBlogPosts: (locale: string): Promise<BlogPost[]> => {
    return blogRepository.listBlogPosts(locale);
  },

  /**
   * Obtiene un post completo por slug
   * @param slug - Identificador único del post
   * @param locale - Idioma del post
   * @returns Post completo con contenido o null si no existe
   */
  getBlogPostDetailBySlug: (
    slug: string,
    locale: string
  ): Promise<BlogPostDetail | null> => {
    return blogRepository.getBlogPostDetailBySlug(slug, locale);
  },

  /**
   * Lista todos los slugs disponibles
   * Útil para generateStaticParams en Next.js
   * @returns Array de slugs
   */
  listSlugs: (): Promise<string[]> => {
    return blogRepository.listSlugs();
  },
};

/**
 * Inyecta la implementación del repositorio
 * Se llama desde el módulo de DI al iniciar la app
 * @param repository - Implementación del repositorio
 */
export const setBlogRepository = (repository: BlogRepository) => {
  blogRepository = repository;
};
