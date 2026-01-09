import { MetadataRoute } from 'next';
import { blogService } from '@/core/blog/services/blog.service';
import { routing } from '@/i18n/routing';
import { siteConfig } from '@/config/site';
import '@/di';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Rutas estáticas base
  const staticRoutes: MetadataRoute.Sitemap = [];

  // Páginas principales para cada idioma
  for (const locale of routing.locales) {
    // Home
    staticRoutes.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es`,
          en: `${siteConfig.url}/en`,
        },
      },
    });

    // About
    staticRoutes.push({
      url: `${siteConfig.url}/${locale}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/about`,
          en: `${siteConfig.url}/en/about`,
        },
      },
    });

    // Blog listing
    staticRoutes.push({
      url: `${siteConfig.url}/${locale}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          es: `${siteConfig.url}/es/blog`,
          en: `${siteConfig.url}/en/blog`,
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
          url: `${siteConfig.url}/${locale}/blog/${slug}`,
          lastModified: postDate,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              es: `${siteConfig.url}/es/blog/${slug}`,
              en: `${siteConfig.url}/en/blog/${slug}`,
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
