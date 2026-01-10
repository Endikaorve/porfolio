import { describe, it, expect } from 'vitest';
import { buildBlogPost, buildBlogPostDetail } from '../blog-file.mapper';
import type { BlogFileDTO } from '../../dto/blog-file.dto';

describe('buildBlogPost', () => {
  it('should build BlogPost from complete DTO', () => {
    const dto: BlogFileDTO = {
      slug: 'test-post',
      metadata: {
        date: '2024-01-15',
        tags: ['test', 'typescript'],
        readTime: '8 min',
        published: true,
      },
      frontmatter: {
        title: 'Test Post',
        description: 'Test description',
      },
      content: 'Test content',
    };

    const result = buildBlogPost(dto);

    expect(result).toEqual({
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-01-15',
      tags: ['test', 'typescript'],
      readTime: '8 min',
      published: true,
    });
  });

  it('should default published to false when not specified', () => {
    const dto: BlogFileDTO = {
      slug: 'test-post',
      metadata: {
        date: '2024-01-15',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: {
        title: 'Test Post',
      },
      content: 'Test content',
    };

    const result = buildBlogPost(dto);

    expect(result.published).toBe(false);
  });

  it('should respect published: false in metadata', () => {
    const dto: BlogFileDTO = {
      slug: 'draft-post',
      metadata: {
        date: '2024-01-15',
        tags: [],
        readTime: '5 min',
        published: false,
      },
      frontmatter: {
        title: 'Draft Post',
      },
      content: 'Draft content',
    };

    const result = buildBlogPost(dto);

    expect(result.published).toBe(false);
  });

  it('should apply default values for missing frontmatter fields', () => {
    const dto: BlogFileDTO = {
      slug: 'minimal-post',
      metadata: {
        date: '',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: {},
      content: 'Content',
    };

    const result = buildBlogPost(dto);

    expect(result.slug).toBe('minimal-post');
    expect(result.title).toBe('minimal-post'); // Default: slug
    expect(result.description).toBe(''); // Default: empty
    expect(result.date).toBe(''); // From metadata
    expect(result.tags).toEqual([]); // From metadata
    expect(result.readTime).toBe('5 min'); // From metadata
    expect(result.published).toBe(false); // Default: false (debe ser explícito)
  });

  it('should use slug as title when title is missing', () => {
    const dto: BlogFileDTO = {
      slug: 'my-awesome-post',
      metadata: {
        date: '2024-01-01',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: {
        description: 'Description here',
      },
      content: 'Content',
    };

    const result = buildBlogPost(dto);

    expect(result.title).toBe('my-awesome-post');
  });

  it('should handle partial frontmatter data', () => {
    const dto: BlogFileDTO = {
      slug: 'partial-post',
      metadata: {
        date: '2024-01-01',
        tags: ['tag1'],
        readTime: '5 min',
      },
      frontmatter: {
        title: 'Only Title',
      },
      content: 'Content',
    };

    const result = buildBlogPost(dto);

    expect(result.title).toBe('Only Title');
    expect(result.tags).toEqual(['tag1']);
    expect(result.description).toBe('');
    expect(result.readTime).toBe('5 min');
  });

  it('should not include content in BlogPost', () => {
    const dto: BlogFileDTO = {
      slug: 'test',
      metadata: {
        date: '2024-01-01',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: { title: 'Test' },
      content: 'This should not be in BlogPost',
    };

    const result = buildBlogPost(dto);

    expect(result).not.toHaveProperty('content');
  });
});

describe('buildBlogPostDetail', () => {
  it('should build BlogPostDetail from complete DTO', () => {
    const dto: BlogFileDTO = {
      slug: 'detailed-post',
      metadata: {
        date: '2024-01-15',
        tags: ['vitest', 'testing'],
        readTime: '12 min',
        published: true,
      },
      frontmatter: {
        title: 'Detailed Post',
        description: 'Full description',
      },
      content: '# Markdown Title\n\nContent here.',
    };

    const result = buildBlogPostDetail(dto);

    expect(result).toEqual({
      slug: 'detailed-post',
      title: 'Detailed Post',
      description: 'Full description',
      date: '2024-01-15',
      tags: ['vitest', 'testing'],
      readTime: '12 min',
      published: true,
      content: '# Markdown Title\n\nContent here.',
    });
  });

  it('should default published to false when not specified in detail', () => {
    const dto: BlogFileDTO = {
      slug: 'test',
      metadata: {
        date: '2024-01-01',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: {},
      content: 'Content',
    };

    const result = buildBlogPostDetail(dto);

    expect(result.published).toBe(false);
  });

  it('should respect published: false in detail', () => {
    const dto: BlogFileDTO = {
      slug: 'draft',
      metadata: {
        date: '2024-01-01',
        tags: [],
        readTime: '5 min',
        published: false,
      },
      frontmatter: {},
      content: 'Draft content',
    };

    const result = buildBlogPostDetail(dto);

    expect(result.published).toBe(false);
  });

  it('should include content field in BlogPostDetail', () => {
    const dto: BlogFileDTO = {
      slug: 'test',
      metadata: {
        date: '2024-01-01',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: {},
      content: 'This is the post content',
    };

    const result = buildBlogPostDetail(dto);

    expect(result.content).toBe('This is the post content');
  });

  it('should apply default values for missing frontmatter fields', () => {
    const dto: BlogFileDTO = {
      slug: 'minimal-detail',
      metadata: {
        date: '',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: {},
      content: 'Minimal content',
    };

    const result = buildBlogPostDetail(dto);

    expect(result.slug).toBe('minimal-detail');
    expect(result.title).toBe('minimal-detail');
    expect(result.readTime).toBe('5 min');
    expect(result.content).toBe('Minimal content');
  });

  it('should handle markdown content with code blocks', () => {
    const content = `
# Title

Some text

\`\`\`typescript
const test = 'value';
\`\`\`

More text
    `.trim();

    const dto: BlogFileDTO = {
      slug: 'code-post',
      metadata: {
        date: '2024-01-01',
        tags: [],
        readTime: '5 min',
      },
      frontmatter: { title: 'Code Post' },
      content,
    };

    const result = buildBlogPostDetail(dto);

    expect(result.content).toContain('```typescript');
    expect(result.content).toContain("const test = 'value';");
  });

  it('should extend BlogPost properties', () => {
    const dto: BlogFileDTO = {
      slug: 'inheritance-test',
      metadata: {
        date: '2024-01-01',
        tags: ['test'],
        readTime: '5 min',
      },
      frontmatter: {
        title: 'Inheritance Test',
      },
      content: 'Content',
    };

    const result = buildBlogPostDetail(dto);

    // Should have all BlogPost properties
    expect(result.slug).toBeDefined();
    expect(result.title).toBeDefined();
    expect(result.description).toBeDefined();
    expect(result.date).toBeDefined();
    expect(result.tags).toBeDefined();
    expect(result.readTime).toBeDefined();

    // Plus content
    expect(result.content).toBeDefined();
  });
});
