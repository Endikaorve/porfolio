/**
 * Representa la metadata de un post del blog (sin contenido completo)
 * Usado en listados, previews y feeds
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
}

/**
 * Representa un post del blog con su contenido completo
 * Extiende BlogPost añadiendo el campo content
 */
export interface BlogPostDetail extends BlogPost {
  content: string;
}
