/**
 * Configuración centralizada del sitio
 * Todas las constantes globales del portfolio deben ir aquí
 */

export const siteConfig = {
  /** URL base del sitio (sin trailing slash) */
  url: 'https://endikaorube.dev',

  /** Nombre del sitio */
  name: 'Endika Orube Portfolio',

  /** Autor del sitio */
  author: {
    name: 'Endika Orube',
    email: 'endikaorve@gmail.com',
    role: 'Tech Lead & Product Engineer',
  },

  /** Redes sociales */
  social: {
    linkedin: 'https://www.linkedin.com/in/endikaorube/',
    github: 'https://github.com/Endikaorve',
  },

  /** Configuración de imágenes OG */
  ogImage: {
    width: 1200,
    height: 630,
    alt: 'Endika Orube - Tech Lead & Product Engineer',
  },
} as const;
