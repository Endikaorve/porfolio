import { setBlogRepository } from '../services/blog.service'
import { blogFileRepository } from '../infrastructure/blog-file.repository'

/**
 * Inyecta las dependencias del módulo blog
 * Conecta el servicio con la implementación del repositorio
 */
export const injectBlogDependencies = () => {
  setBlogRepository(blogFileRepository)
}

