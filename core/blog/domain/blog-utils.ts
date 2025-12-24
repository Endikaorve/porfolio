import type { BlogPost } from './blog'

/**
 * Formatea la fecha de un blog post según el idioma
 * @param blog - Post del blog con fecha
 * @param locale - Idioma para formatear (es, en, etc.)
 * @returns Fecha formateada según el locale
 */
export function formatBlogPostDate(blog: BlogPost, locale: string): string {
  const { date } = blog
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

