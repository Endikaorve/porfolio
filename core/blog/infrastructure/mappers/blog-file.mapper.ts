import type { BlogPost, BlogPostDetail } from '../../domain/blog'
import type { BlogFileDTO } from '../dto/blog-file.dto'

/**
 * Construye una entidad BlogPostDetail (con contenido) desde un DTO del filesystem
 * Aplica valores por defecto para campos opcionales
 * @param dto - DTO del archivo MDX
 * @returns Entidad del dominio con contenido completo
 */
export function buildBlogPostDetail(dto: BlogFileDTO): BlogPostDetail {
  return {
    slug: dto.slug,
    title: dto.frontmatter.title || dto.slug,
    description: dto.frontmatter.description || '',
    date: dto.frontmatter.date || '',
    author: dto.frontmatter.author || 'Endika Orube',
    tags: dto.frontmatter.tags || [],
    readTime: dto.frontmatter.readTime || '5 min',
    featured: dto.frontmatter.featured || false,
    content: dto.content,
  }
}

/**
 * Construye una entidad BlogPost (solo metadata) desde un DTO del filesystem
 * Aplica valores por defecto para campos opcionales
 * @param dto - DTO del archivo MDX
 * @returns Entidad del dominio solo con metadata
 */
export function buildBlogPost(dto: BlogFileDTO): BlogPost {
  return {
    slug: dto.slug,
    title: dto.frontmatter.title || dto.slug,
    description: dto.frontmatter.description || '',
    date: dto.frontmatter.date || '',
    author: dto.frontmatter.author || 'Endika Orube',
    tags: dto.frontmatter.tags || [],
    readTime: dto.frontmatter.readTime || '5 min',
    featured: dto.frontmatter.featured || false,
  }
}

