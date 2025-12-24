import { MetadataRoute } from 'next';

const BASE_URL = 'https://endikaorube.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${BASE_URL}/es`,
          en: `${BASE_URL}/en`,
        },
      },
    },
    {
      url: `${BASE_URL}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          es: `${BASE_URL}/es`,
          en: `${BASE_URL}/en`,
        },
      },
    },
  ];
}
