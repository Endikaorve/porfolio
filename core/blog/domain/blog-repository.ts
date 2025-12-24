import type { BlogPost, BlogPostDetail } from './blog'

/**
 * Contrato del repositorio de blog
 * Define las operaciones de acceso a datos para los posts del blog
 */
export interface BlogRepository {
  /**
   * Lista todos los slugs disponibles de posts del blog
   * Útil para generateStaticParams
   */
  listSlugs(): Promise<string[]>

  /**
   * Obtiene un post completo por slug e idioma
   * @param slug - Identificador único del post
   * @param locale - Idioma del post (es, en, etc.)
   * @returns Post completo con contenido o null si no existe
   */
  getBlogPostDetailBySlug(
    slug: string,
    locale: string
  ): Promise<BlogPostDetail | null>

  /**
   * Lista todos los posts (solo metadata) para un idioma específico
   * Ordenados por fecha descendente (más recientes primero)
   * @param locale - Idioma de los posts (es, en, etc.)
   * @returns Array de posts con metadata
   */
  listBlogPosts(locale: string): Promise<BlogPost[]>
}

