import { MetadataRoute } from 'next';
import { blogService } from '@/core/blog/services/blog.service';
import { routing } from '@/i18n/routing';
import '@/di';

const BASE_URL = 'https://endikaorube.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Rutas estáticas base
  const staticRoutes: MetadataRoute.Sitemap = [];

  // Páginas principales para cada idioma
  for (const locale of routing.locales) {
    // Home
    staticRoutes.push({
      url: `${BASE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${BASE_URL}/es`,
          en: `${BASE_URL}/en`,
        },
      },
    });

    // About
    staticRoutes.push({
      url: `${BASE_URL}/${locale}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${BASE_URL}/es/about`,
          en: `${BASE_URL}/en/about`,
        },
      },
    });

    // Blog listing
    staticRoutes.push({
      url: `${BASE_URL}/${locale}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${BASE_URL}/es/blog`,
          en: `${BASE_URL}/en/blog`,
        },
      },
    });
  }

  // Rutas dinámicas del blog
  const blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const slugs = await blogService.listSlugs();

    for (const slug of slugs) {
      // Añadir entrada para cada idioma
      for (const locale of routing.locales) {
        // Obtener la fecha del post si existe
        const post = await blogService.getBlogPostDetailBySlug(slug, locale);
        const postDate = post?.date ? new Date(post.date) : lastModified;

        blogRoutes.push({
          url: `${BASE_URL}/${locale}/blog/${slug}`,
          lastModified: postDate,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              es: `${BASE_URL}/es/blog/${slug}`,
              en: `${BASE_URL}/en/blog/${slug}`,
            },
          },
        });
      }
    }
  } catch (error) {
    // En caso de error, continuar sin las rutas del blog
    console.error('Error generating blog sitemap entries:', error);
  }

  return [...staticRoutes, ...blogRoutes];
}
