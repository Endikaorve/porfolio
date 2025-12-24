import { describe, it, expect } from 'vitest'
import { buildBlogPost, buildBlogPostDetail } from '../blog-file.mapper'
import type { BlogFileDTO } from '../../dto/blog-file.dto'

describe('buildBlogPost', () => {
  it('should build BlogPost from complete DTO', () => {
    const dto: BlogFileDTO = {
      slug: 'test-post',
      frontmatter: {
        title: 'Test Post',
        description: 'Test description',
        date: '2024-01-15',
        author: 'John Doe',
        tags: ['test', 'typescript'],
        readTime: '8 min',
        featured: true,
      },
      content: 'Test content',
    }

    const result = buildBlogPost(dto)

    expect(result).toEqual({
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test description',
      date: '2024-01-15',
      author: 'John Doe',
      tags: ['test', 'typescript'],
      readTime: '8 min',
      featured: true,
    })
  })

  it('should apply default values for missing frontmatter fields', () => {
    const dto: BlogFileDTO = {
      slug: 'minimal-post',
      frontmatter: {},
      content: 'Content',
    }

    const result = buildBlogPost(dto)

    expect(result.slug).toBe('minimal-post')
    expect(result.title).toBe('minimal-post') // Default: slug
    expect(result.description).toBe('') // Default: empty
    expect(result.date).toBe('') // Default: empty
    expect(result.author).toBe('Endika Orube') // Default author
    expect(result.tags).toEqual([]) // Default: empty array
    expect(result.readTime).toBe('5 min') // Default: 5 min
    expect(result.featured).toBe(false) // Default: false
  })

  it('should use slug as title when title is missing', () => {
    const dto: BlogFileDTO = {
      slug: 'my-awesome-post',
      frontmatter: {
        description: 'Description here',
      },
      content: 'Content',
    }

    const result = buildBlogPost(dto)

    expect(result.title).toBe('my-awesome-post')
  })

  it('should handle partial frontmatter data', () => {
    const dto: BlogFileDTO = {
      slug: 'partial-post',
      frontmatter: {
        title: 'Only Title',
        tags: ['tag1'],
      },
      content: 'Content',
    }

    const result = buildBlogPost(dto)

    expect(result.title).toBe('Only Title')
    expect(result.tags).toEqual(['tag1'])
    expect(result.description).toBe('')
    expect(result.author).toBe('Endika Orube')
    expect(result.readTime).toBe('5 min')
  })

  it('should not include content in BlogPost', () => {
    const dto: BlogFileDTO = {
      slug: 'test',
      frontmatter: { title: 'Test' },
      content: 'This should not be in BlogPost',
    }

    const result = buildBlogPost(dto)

    expect(result).not.toHaveProperty('content')
  })
})

describe('buildBlogPostDetail', () => {
  it('should build BlogPostDetail from complete DTO', () => {
    const dto: BlogFileDTO = {
      slug: 'detailed-post',
      frontmatter: {
        title: 'Detailed Post',
        description: 'Full description',
        date: '2024-01-15',
        author: 'Jane Doe',
        tags: ['vitest', 'testing'],
        readTime: '12 min',
        featured: false,
      },
      content: '# Markdown Title\n\nContent here.',
    }

    const result = buildBlogPostDetail(dto)

    expect(result).toEqual({
      slug: 'detailed-post',
      title: 'Detailed Post',
      description: 'Full description',
      date: '2024-01-15',
      author: 'Jane Doe',
      tags: ['vitest', 'testing'],
      readTime: '12 min',
      featured: false,
      content: '# Markdown Title\n\nContent here.',
    })
  })

  it('should include content field in BlogPostDetail', () => {
    const dto: BlogFileDTO = {
      slug: 'test',
      frontmatter: {},
      content: 'This is the post content',
    }

    const result = buildBlogPostDetail(dto)

    expect(result.content).toBe('This is the post content')
  })

  it('should apply default values for missing frontmatter fields', () => {
    const dto: BlogFileDTO = {
      slug: 'minimal-detail',
      frontmatter: {},
      content: 'Minimal content',
    }

    const result = buildBlogPostDetail(dto)

    expect(result.slug).toBe('minimal-detail')
    expect(result.title).toBe('minimal-detail')
    expect(result.author).toBe('Endika Orube')
    expect(result.readTime).toBe('5 min')
    expect(result.content).toBe('Minimal content')
  })

  it('should handle markdown content with code blocks', () => {
    const content = `
# Title

Some text

\`\`\`typescript
const test = 'value';
\`\`\`

More text
    `.trim()

    const dto: BlogFileDTO = {
      slug: 'code-post',
      frontmatter: { title: 'Code Post' },
      content,
    }

    const result = buildBlogPostDetail(dto)

    expect(result.content).toContain('```typescript')
    expect(result.content).toContain("const test = 'value';")
  })

  it('should extend BlogPost properties', () => {
    const dto: BlogFileDTO = {
      slug: 'inheritance-test',
      frontmatter: {
        title: 'Inheritance Test',
        tags: ['test'],
      },
      content: 'Content',
    }

    const result = buildBlogPostDetail(dto)

    // Should have all BlogPost properties
    expect(result.slug).toBeDefined()
    expect(result.title).toBeDefined()
    expect(result.description).toBeDefined()
    expect(result.date).toBeDefined()
    expect(result.author).toBeDefined()
    expect(result.tags).toBeDefined()
    expect(result.readTime).toBeDefined()

    // Plus content
    expect(result.content).toBeDefined()
  })
})

