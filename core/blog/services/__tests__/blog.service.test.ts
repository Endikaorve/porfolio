import { describe, it, expect, vi, beforeEach } from 'vitest'
import { blogService, setBlogRepository } from '../blog.service'
import type { BlogRepository } from '../../domain/blog-repository'
import {
  aBlogPost,
  aBlogPostDetail,
} from '../../domain/__builders__/blog-post.builder'

describe('blogService', () => {
  let mockRepository: BlogRepository

  beforeEach(() => {
    // Crear mock del repositorio
    mockRepository = {
      listSlugs: vi.fn(),
      getBlogPostDetailBySlug: vi.fn(),
      listBlogPosts: vi.fn(),
    }

    // Inyectar mock
    setBlogRepository(mockRepository)
  })

  describe('listBlogPosts', () => {
    it('should delegate to repository.listBlogPosts', async () => {
      const mockPosts = [
        aBlogPost().withSlug('post-1').build(),
        aBlogPost().withSlug('post-2').build(),
      ]

      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue(mockPosts)

      const result = await blogService.listBlogPosts('es')

      expect(mockRepository.listBlogPosts).toHaveBeenCalledWith('es')
      expect(result).toEqual(mockPosts)
    })

    it('should pass locale parameter to repository', async () => {
      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue([])

      await blogService.listBlogPosts('en')

      expect(mockRepository.listBlogPosts).toHaveBeenCalledWith('en')
    })

    it('should return empty array when repository returns empty', async () => {
      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue([])

      const result = await blogService.listBlogPosts('es')

      expect(result).toEqual([])
    })

    it('should return posts in order from repository', async () => {
      const post1 = aBlogPost().withSlug('first').withDate('2024-01-15').build()
      const post2 = aBlogPost()
        .withSlug('second')
        .withDate('2024-01-10')
        .build()

      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue([post1, post2])

      const result = await blogService.listBlogPosts('es')

      expect(result[0].slug).toBe('first')
      expect(result[1].slug).toBe('second')
    })
  })

  describe('getBlogPostDetailBySlug', () => {
    it('should delegate to repository.getBlogPostDetailBySlug', async () => {
      const mockPost = aBlogPostDetail().withSlug('test-post').build()

      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(
        mockPost
      )

      const result = await blogService.getBlogPostDetailBySlug('test-post', 'es')

      expect(mockRepository.getBlogPostDetailBySlug).toHaveBeenCalledWith(
        'test-post',
        'es'
      )
      expect(result).toEqual(mockPost)
    })

    it('should return null when post does not exist', async () => {
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(null)

      const result = await blogService.getBlogPostDetailBySlug(
        'non-existent',
        'es'
      )

      expect(result).toBeNull()
    })

    it('should pass both slug and locale to repository', async () => {
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(null)

      await blogService.getBlogPostDetailBySlug('my-post', 'en')

      expect(mockRepository.getBlogPostDetailBySlug).toHaveBeenCalledWith(
        'my-post',
        'en'
      )
    })

    it('should return BlogPostDetail with content', async () => {
      const mockPost = aBlogPostDetail()
        .withSlug('detailed')
        .withContent('# Full Content')
        .build()

      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(
        mockPost
      )

      const result = await blogService.getBlogPostDetailBySlug('detailed', 'es')

      expect(result?.content).toBe('# Full Content')
      expect(result?.slug).toBe('detailed')
    })
  })

  describe('listSlugs', () => {
    it('should delegate to repository.listSlugs', async () => {
      const mockSlugs = ['slug-1', 'slug-2', 'slug-3']

      vi.mocked(mockRepository.listSlugs).mockResolvedValue(mockSlugs)

      const result = await blogService.listSlugs()

      expect(mockRepository.listSlugs).toHaveBeenCalled()
      expect(result).toEqual(mockSlugs)
    })

    it('should return empty array when no slugs exist', async () => {
      vi.mocked(mockRepository.listSlugs).mockResolvedValue([])

      const result = await blogService.listSlugs()

      expect(result).toEqual([])
    })

    it('should call repository without parameters', async () => {
      vi.mocked(mockRepository.listSlugs).mockResolvedValue([])

      await blogService.listSlugs()

      expect(mockRepository.listSlugs).toHaveBeenCalledWith()
    })

    it('should return slugs in the order from repository', async () => {
      const mockSlugs = ['post-a', 'post-b', 'post-c']
      vi.mocked(mockRepository.listSlugs).mockResolvedValue(mockSlugs)

      const result = await blogService.listSlugs()

      expect(result).toEqual(['post-a', 'post-b', 'post-c'])
    })
  })

  describe('setBlogRepository', () => {
    it('should inject repository dependency', async () => {
      const newMockRepository: BlogRepository = {
        listSlugs: vi.fn().mockResolvedValue(['new-slug']),
        getBlogPostDetailBySlug: vi.fn(),
        listBlogPosts: vi.fn(),
      }

      setBlogRepository(newMockRepository)

      const result = await blogService.listSlugs()

      expect(result).toEqual(['new-slug'])
      expect(newMockRepository.listSlugs).toHaveBeenCalled()
    })

    it('should replace previous repository', async () => {
      const firstRepo: BlogRepository = {
        listSlugs: vi.fn().mockResolvedValue(['first']),
        getBlogPostDetailBySlug: vi.fn(),
        listBlogPosts: vi.fn(),
      }

      const secondRepo: BlogRepository = {
        listSlugs: vi.fn().mockResolvedValue(['second']),
        getBlogPostDetailBySlug: vi.fn(),
        listBlogPosts: vi.fn(),
      }

      setBlogRepository(firstRepo)
      setBlogRepository(secondRepo)

      const result = await blogService.listSlugs()

      expect(result).toEqual(['second'])
      expect(firstRepo.listSlugs).not.toHaveBeenCalled()
      expect(secondRepo.listSlugs).toHaveBeenCalled()
    })
  })
})

