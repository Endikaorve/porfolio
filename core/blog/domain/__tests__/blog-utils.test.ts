import { describe, it, expect } from 'vitest';
import { formatBlogPostDate } from '../blog-utils';
import { aBlogPost } from '../__builders__/blog-post.builder';

describe('formatBlogPostDate', () => {
  it('should format date in Spanish locale', () => {
    const blogPost = aBlogPost().withDate('2024-01-15').build();

    const result = formatBlogPostDate(blogPost, 'es');

    expect(result).toBe('15 ene 2024');
  });

  it('should format date in English locale', () => {
    const blogPost = aBlogPost().withDate('2024-01-15').build();

    const result = formatBlogPostDate(blogPost, 'en');

    expect(result).toBe('Jan 15, 2024');
  });

  it('should handle different date formats', () => {
    const blogPost = aBlogPost().withDate('2024-12-31').build();

    const resultEs = formatBlogPostDate(blogPost, 'es');
    const resultEn = formatBlogPostDate(blogPost, 'en');

    expect(resultEs).toBe('31 dic 2024');
    expect(resultEn).toBe('Dec 31, 2024');
  });

  it('should format date at the beginning of year', () => {
    const blogPost = aBlogPost().withDate('2024-01-01').build();

    const result = formatBlogPostDate(blogPost, 'es');

    expect(result).toBe('1 ene 2024');
  });

  it('should work with BlogPost interface (destructuring)', () => {
    const blogPost = aBlogPost()
      .withDate('2024-06-15')
      .withTitle('Test Post')
      .withSlug('test-slug')
      .build();

    const result = formatBlogPostDate(blogPost, 'en');

    expect(result).toBe('Jun 15, 2024');
  });
});
