import { injectBlogDependencies } from '@/core/blog/_di';

/**
 * Punto de entrada centralizado para la inyección de dependencias
 * Se ejecuta al iniciar la aplicación para configurar todos los módulos
 */
injectBlogDependencies();
