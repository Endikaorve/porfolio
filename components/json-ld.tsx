const BASE_URL = 'https://endikaorube.com';

export function JsonLdSchema({ locale }: { locale: string }) {
  const isSpanish = locale === 'es';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Endika Orube',
    givenName: 'Endika',
    familyName: 'Orube',
    jobTitle: 'Tech Lead & Product Engineer',
    description: isSpanish
      ? 'Tech Lead & Product Engineer con +7 años de experiencia en desarrollo de software, liderando equipos y construyendo productos digitales.'
      : 'Tech Lead & Product Engineer with 7+ years of experience in software development, leading teams and building digital products.',
    url: BASE_URL,
    email: 'endikaorve@gmail.com',
    image: `${BASE_URL}/endika.jpg`,
    sameAs: [
      'https://www.linkedin.com/in/endikaorube/',
      'https://github.com/Endikaorve',
    ],
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
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Endika Orube Portfolio',
    description: isSpanish
      ? 'Portfolio profesional de Endika Orube - Tech Lead & Product Engineer'
      : 'Professional portfolio of Endika Orube - Tech Lead & Product Engineer',
    inLanguage: [locale === 'es' ? 'es-ES' : 'en-US'],
    author: {
      '@id': `${BASE_URL}/#person`,
    },
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${BASE_URL}/${locale}/#webpage`,
    url: `${BASE_URL}/${locale}`,
    name: 'Endika Orube | Tech Lead & Product Engineer',
    isPartOf: {
      '@id': `${BASE_URL}/#website`,
    },
    about: {
      '@id': `${BASE_URL}/#person`,
    },
    mainEntity: {
      '@id': `${BASE_URL}/#person`,
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
