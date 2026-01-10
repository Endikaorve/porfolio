import type { BlogRepository } from '../domain/blog-repository';
import type { BlogPost, BlogPostDetail } from '../domain/blog';

let blogRepository: BlogRepository;

/**
 * Servicio de blog que encapsula la lógica de negocio
 * Depende de BlogRepository que se inyecta mediante DI
 */
export const blogService = {
  /**
   * Lista todos los posts publicados del blog (solo metadata) para un idioma
   * Filtra los posts que no están publicados (lógica de negocio)
   * @param locale - Idioma de los posts
   * @returns Array de posts publicados ordenados por fecha descendente
   */
  listBlogPosts: async (locale: string): Promise<BlogPost[]> => {
    const allPosts = await blogRepository.listBlogPosts(locale);
    // Lógica de negocio: solo mostrar posts publicados
    return allPosts.filter((post) => post.published);
  },

  /**
   * Obtiene un post publicado completo por slug
   * Retorna null si el post no existe o no está publicado
   * @param slug - Identificador único del post
   * @param locale - Idioma del post
   * @returns Post completo con contenido o null si no existe/no publicado
   */
  getBlogPostDetailBySlug: async (
    slug: string,
    locale: string
  ): Promise<BlogPostDetail | null> => {
    const post = await blogRepository.getBlogPostDetailBySlug(slug, locale);
    // Lógica de negocio: solo mostrar si está publicado
    if (!post || !post.published) {
      return null;
    }
    return post;
  },

  /**
   * Lista todos los slugs de posts publicados
   * Útil para generateStaticParams en Next.js
   * @param locale - Idioma para verificar publicación (default: 'es')
   * @returns Array de slugs de posts publicados
   */
  listSlugs: async (locale: string = 'es'): Promise<string[]> => {
    const allSlugs = await blogRepository.listSlugs();
    // Para cada slug, verificar si el post está publicado
    const publishedSlugs: string[] = [];
    for (const slug of allSlugs) {
      const post = await blogRepository.getBlogPostDetailBySlug(slug, locale);
      if (post && post.published) {
        publishedSlugs.push(slug);
      }
    }
    return publishedSlugs;
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
