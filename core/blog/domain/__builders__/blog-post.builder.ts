import type { BlogPost, BlogPostDetail } from '../blog';

/**
 * Builder para crear objetos BlogPost en tests
 * Proporciona valores por defecto sensatos que pueden ser sobreescritos
 */
export class BlogPostBuilder {
  private blogPost: BlogPost = {
    slug: 'test-post',
    title: 'Test Blog Post',
    description: 'This is a test blog post description',
    date: '2024-01-01',
    author: 'Test Author',
    tags: ['test', 'vitest'],
    readTime: '5 min',
    featured: false,
  };

  withSlug(slug: string): this {
    this.blogPost.slug = slug;
    return this;
  }

  withTitle(title: string): this {
    this.blogPost.title = title;
    return this;
  }

  withDescription(description: string): this {
    this.blogPost.description = description;
    return this;
  }

  withDate(date: string): this {
    this.blogPost.date = date;
    return this;
  }

  withAuthor(author: string): this {
    this.blogPost.author = author;
    return this;
  }

  withTags(tags: string[]): this {
    this.blogPost.tags = tags;
    return this;
  }

  withReadTime(readTime: string): this {
    this.blogPost.readTime = readTime;
    return this;
  }

  withFeatured(featured: boolean): this {
    this.blogPost.featured = featured;
    return this;
  }

  build(): BlogPost {
    return { ...this.blogPost };
  }
}

/**
 * Builder para crear objetos BlogPostDetail en tests
 * Extiende BlogPostBuilder añadiendo el campo content
 */
export class BlogPostDetailBuilder extends BlogPostBuilder {
  private content: string = '# Test Content\n\nThis is test markdown content.';

  withContent(content: string): this {
    this.content = content;
    return this;
  }

  build(): BlogPostDetail {
    const blogPost = super.build();
    return {
      ...blogPost,
      content: this.content,
    };
  }
}

/**
 * Función helper para crear un BlogPost con valores por defecto
 */
export const aBlogPost = () => new BlogPostBuilder();

/**
 * Función helper para crear un BlogPostDetail con valores por defecto
 */
export const aBlogPostDetail = () => new BlogPostDetailBuilder();
