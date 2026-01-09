/**
 * Metadata estática del post (centralizada, no depende del idioma)
 * Se guarda en metadata.json en la carpeta del post
 */
export interface BlogMetadata {
  /** Fecha de publicación del post */
  date: string;
  /** Fecha de última modificación del post */
  modifiedDate?: string;
  /** Etiquetas del post (en inglés, consistentes) */
  tags: string[];
  /** Tiempo estimado de lectura */
  readTime: string;
}

/**
 * DTO que representa la estructura del archivo MDX con su frontmatter
 * Este es el formato raw que viene del filesystem antes de mapearlo al dominio
 */
export interface BlogFileDTO {
  /** Slug del post (nombre de la carpeta) */
  slug: string;
  /** Metadata estática compartida entre idiomas */
  metadata: BlogMetadata;
  /** Frontmatter extraído del archivo MDX con gray-matter (solo datos traducibles) */
  frontmatter: {
    title?: string;
    description?: string;
  };
  /** Contenido markdown/MDX del post */
  content: string;
}
