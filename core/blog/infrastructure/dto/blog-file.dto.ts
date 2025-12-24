/**
 * DTO que representa la estructura del archivo MDX con su frontmatter
 * Este es el formato raw que viene del filesystem antes de mapearlo al dominio
 */
export interface BlogFileDTO {
  /** Slug del post (nombre de la carpeta) */
  slug: string;
  /** Frontmatter extraído del archivo MDX con gray-matter */
  frontmatter: {
    title?: string;
    description?: string;
    date?: string;
    author?: string;
    tags?: string[];
    readTime?: string;
    featured?: boolean;
  };
  /** Contenido markdown/MDX del post */
  content: string;
}
