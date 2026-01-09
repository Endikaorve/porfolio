import type { BlogPost, BlogPostDetail } from '../../domain/blog';
import type { BlogFileDTO } from '../dto/blog-file.dto';

/**
 * Construye una entidad BlogPostDetail (con contenido) desde un DTO del filesystem
 * Combina metadata estática (metadata.json) con datos traducibles (frontmatter del .mdx)
 * @param dto - DTO del archivo MDX con metadata centralizada
 * @returns Entidad del dominio con contenido completo
 */
export function buildBlogPostDetail(dto: BlogFileDTO): BlogPostDetail {
  return {
    slug: dto.slug,
    // Datos traducibles del frontmatter
    title: dto.frontmatter.title || dto.slug,
    description: dto.frontmatter.description || '',
    // Datos estáticos de metadata.json
    date: dto.metadata.date,
    modifiedDate: dto.metadata.modifiedDate,
    tags: dto.metadata.tags,
    readTime: dto.metadata.readTime,
    // Contenido traducible
    content: dto.content,
  };
}

/**
 * Construye una entidad BlogPost (solo metadata) desde un DTO del filesystem
 * Combina metadata estática (metadata.json) con datos traducibles (frontmatter del .mdx)
 * @param dto - DTO del archivo MDX con metadata centralizada
 * @returns Entidad del dominio solo con metadata
 */
export function buildBlogPost(dto: BlogFileDTO): BlogPost {
  return {
    slug: dto.slug,
    // Datos traducibles del frontmatter
    title: dto.frontmatter.title || dto.slug,
    description: dto.frontmatter.description || '',
    // Datos estáticos de metadata.json
    date: dto.metadata.date,
    modifiedDate: dto.metadata.modifiedDate,
    tags: dto.metadata.tags,
    readTime: dto.metadata.readTime,
  };
}
