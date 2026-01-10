import { describe, it, expect } from 'vitest';
import type { BlogPost, BlogPostDetail } from '../blog';
import { aBlogPost, aBlogPostDetail } from '../__builders__/blog-post.builder';

describe('BlogPost interface', () => {
  it('should create a valid BlogPost with all required fields', () => {
    const blogPost: BlogPost = aBlogPost()
      .withSlug('my-post')
      .withTitle('My Post Title')
      .withDescription('Post description')
      .withDate('2024-01-15')
      .withTags(['typescript', 'testing'])
      .withReadTime('10 min')
      .withPublished(true)
      .build();

    expect(blogPost.slug).toBe('my-post');
    expect(blogPost.title).toBe('My Post Title');
    expect(blogPost.description).toBe('Post description');
    expect(blogPost.date).toBe('2024-01-15');
    expect(blogPost.tags).toEqual(['typescript', 'testing']);
    expect(blogPost.readTime).toBe('10 min');
    expect(blogPost.published).toBe(true);
  });

  it('should create a BlogPost with default values from builder', () => {
    const blogPost = aBlogPost().build();

    expect(blogPost.slug).toBeDefined();
    expect(blogPost.title).toBeDefined();
    expect(blogPost.description).toBeDefined();
    expect(blogPost.date).toBeDefined();
    expect(blogPost.tags).toBeInstanceOf(Array);
    expect(blogPost.readTime).toBeDefined();
    expect(blogPost.published).toBe(true);
  });

  it('should create an unpublished BlogPost', () => {
    const blogPost = aBlogPost().withPublished(false).build();

    expect(blogPost.published).toBe(false);
  });
});

describe('BlogPostDetail interface', () => {
  it('should extend BlogPost with content field', () => {
    const blogPostDetail: BlogPostDetail = aBlogPostDetail()
      .withSlug('detailed-post')
      .withTitle('Detailed Post')
      .withContent('# Markdown Content\n\nThis is the content.')
      .build();

    // Should have all BlogPost fields
    expect(blogPostDetail.slug).toBe('detailed-post');
    expect(blogPostDetail.title).toBe('Detailed Post');
    expect(blogPostDetail.description).toBeDefined();
    expect(blogPostDetail.date).toBeDefined();
    expect(blogPostDetail.tags).toBeInstanceOf(Array);
    expect(blogPostDetail.readTime).toBeDefined();

    // Should have content field
    expect(blogPostDetail.content).toBe(
      '# Markdown Content\n\nThis is the content.'
    );
  });

  it('should be assignable to BlogPost (inheritance)', () => {
    const blogPostDetail: BlogPostDetail = aBlogPostDetail().build();
    const blogPost: BlogPost = blogPostDetail; // Should not cause type error

    expect(blogPost.slug).toBe(blogPostDetail.slug);
    expect(blogPost.title).toBe(blogPostDetail.title);
  });

  it('should create BlogPostDetail with markdown content', () => {
    const content = `
# Title
## Subtitle
- List item 1
- List item 2

\`\`\`typescript
const test = 'code block';
\`\`\`
    `.trim();

    const blogPostDetail = aBlogPostDetail().withContent(content).build();

    expect(blogPostDetail.content).toContain('# Title');
    expect(blogPostDetail.content).toContain('```typescript');
  });
});
