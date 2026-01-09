import { siteConfig } from '@/config/site';

export function JsonLdSchema({ locale }: { locale: string }) {
  const isSpanish = locale === 'es';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    givenName: 'Endika',
    familyName: 'Orube',
    jobTitle: siteConfig.author.role,
    description: isSpanish
      ? 'Tech Lead & Product Engineer con +7 años de experiencia en desarrollo de software, liderando equipos y construyendo productos digitales.'
      : 'Tech Lead & Product Engineer with 7+ years of experience in software development, leading teams and building digital products.',
    url: siteConfig.url,
    email: siteConfig.author.email,
    image: `${siteConfig.url}/endika.jpg`,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'TDD',
      'Software Architecture',
      'Hexagonal Architecture',
      'Frontend Development',
      'Team Leadership',
      'Extreme Programming',
      'CI/CD',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Biko2 / Jakala',
      url: 'https://www.jakala.com/',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidad de Navarra',
    },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Navarra',
      addressCountry: 'ES',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: isSpanish
      ? `Portfolio profesional de ${siteConfig.author.name} - ${siteConfig.author.role}`
      : `Professional portfolio of ${siteConfig.author.name} - ${siteConfig.author.role}`,
    inLanguage: [locale === 'es' ? 'es-ES' : 'en-US'],
    author: {
      '@id': `${siteConfig.url}/#person`,
    },
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/${locale}/#webpage`,
    url: `${siteConfig.url}/${locale}`,
    name: `${siteConfig.author.name} | ${siteConfig.author.role}`,
    isPartOf: {
      '@id': `${siteConfig.url}/#website`,
    },
    about: {
      '@id': `${siteConfig.url}/#person`,
    },
    mainEntity: {
      '@id': `${siteConfig.url}/#person`,
    },
    inLanguage: locale === 'es' ? 'es-ES' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
