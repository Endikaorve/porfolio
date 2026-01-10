import { describe, it, expect, vi, beforeEach } from 'vitest';
import { blogService, setBlogRepository } from '../blog.service';
import type { BlogRepository } from '../../domain/blog-repository';
import {
  aBlogPost,
  aBlogPostDetail,
} from '../../domain/__builders__/blog-post.builder';

describe('blogService', () => {
  let mockRepository: BlogRepository;

  beforeEach(() => {
    // Crear mock del repositorio
    mockRepository = {
      listSlugs: vi.fn(),
      getBlogPostDetailBySlug: vi.fn(),
      listBlogPosts: vi.fn(),
    };

    // Inyectar mock
    setBlogRepository(mockRepository);
  });

  describe('listBlogPosts', () => {
    it('should delegate to repository.listBlogPosts and filter published', async () => {
      const mockPosts = [
        aBlogPost().withSlug('post-1').withPublished(true).build(),
        aBlogPost().withSlug('post-2').withPublished(true).build(),
      ];

      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue(mockPosts);

      const result = await blogService.listBlogPosts('es');

      expect(mockRepository.listBlogPosts).toHaveBeenCalledWith('es');
      expect(result).toEqual(mockPosts);
    });

    it('should pass locale parameter to repository', async () => {
      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue([]);

      await blogService.listBlogPosts('en');

      expect(mockRepository.listBlogPosts).toHaveBeenCalledWith('en');
    });

    it('should return empty array when repository returns empty', async () => {
      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue([]);

      const result = await blogService.listBlogPosts('es');

      expect(result).toEqual([]);
    });

    it('should return posts in order from repository', async () => {
      const post1 = aBlogPost()
        .withSlug('first')
        .withDate('2024-01-15')
        .withPublished(true)
        .build();
      const post2 = aBlogPost()
        .withSlug('second')
        .withDate('2024-01-10')
        .withPublished(true)
        .build();

      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue([post1, post2]);

      const result = await blogService.listBlogPosts('es');

      expect(result[0].slug).toBe('first');
      expect(result[1].slug).toBe('second');
    });

    it('should filter out unpublished posts', async () => {
      const publishedPost = aBlogPost()
        .withSlug('published')
        .withPublished(true)
        .build();
      const unpublishedPost = aBlogPost()
        .withSlug('unpublished')
        .withPublished(false)
        .build();

      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue([
        publishedPost,
        unpublishedPost,
      ]);

      const result = await blogService.listBlogPosts('es');

      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('published');
    });

    it('should return empty array when all posts are unpublished', async () => {
      const unpublishedPosts = [
        aBlogPost().withSlug('draft-1').withPublished(false).build(),
        aBlogPost().withSlug('draft-2').withPublished(false).build(),
      ];

      vi.mocked(mockRepository.listBlogPosts).mockResolvedValue(unpublishedPosts);

      const result = await blogService.listBlogPosts('es');

      expect(result).toEqual([]);
    });
  });

  describe('getBlogPostDetailBySlug', () => {
    it('should delegate to repository.getBlogPostDetailBySlug', async () => {
      const mockPost = aBlogPostDetail()
        .withSlug('test-post')
        .withPublished(true)
        .build();

      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(
        mockPost
      );

      const result = await blogService.getBlogPostDetailBySlug(
        'test-post',
        'es'
      );

      expect(mockRepository.getBlogPostDetailBySlug).toHaveBeenCalledWith(
        'test-post',
        'es'
      );
      expect(result).toEqual(mockPost);
    });

    it('should return null when post does not exist', async () => {
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(null);

      const result = await blogService.getBlogPostDetailBySlug(
        'non-existent',
        'es'
      );

      expect(result).toBeNull();
    });

    it('should pass both slug and locale to repository', async () => {
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(null);

      await blogService.getBlogPostDetailBySlug('my-post', 'en');

      expect(mockRepository.getBlogPostDetailBySlug).toHaveBeenCalledWith(
        'my-post',
        'en'
      );
    });

    it('should return BlogPostDetail with content when published', async () => {
      const mockPost = aBlogPostDetail()
        .withSlug('detailed')
        .withContent('# Full Content')
        .withPublished(true)
        .build();

      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(
        mockPost
      );

      const result = await blogService.getBlogPostDetailBySlug(
        'detailed',
        'es'
      );

      expect(result?.content).toBe('# Full Content');
      expect(result?.slug).toBe('detailed');
    });

    it('should return null when post exists but is not published', async () => {
      const unpublishedPost = aBlogPostDetail()
        .withSlug('draft-post')
        .withPublished(false)
        .build();

      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(
        unpublishedPost
      );

      const result = await blogService.getBlogPostDetailBySlug(
        'draft-post',
        'es'
      );

      expect(result).toBeNull();
    });
  });

  describe('listSlugs', () => {
    it('should return only slugs of published posts', async () => {
      const mockSlugs = ['published-post', 'draft-post'];
      const publishedPost = aBlogPostDetail()
        .withSlug('published-post')
        .withPublished(true)
        .build();
      const draftPost = aBlogPostDetail()
        .withSlug('draft-post')
        .withPublished(false)
        .build();

      vi.mocked(mockRepository.listSlugs).mockResolvedValue(mockSlugs);
      vi.mocked(mockRepository.getBlogPostDetailBySlug)
        .mockResolvedValueOnce(publishedPost)
        .mockResolvedValueOnce(draftPost);

      const result = await blogService.listSlugs();

      expect(result).toEqual(['published-post']);
    });

    it('should return empty array when no slugs exist', async () => {
      vi.mocked(mockRepository.listSlugs).mockResolvedValue([]);

      const result = await blogService.listSlugs();

      expect(result).toEqual([]);
    });

    it('should use default locale es when not specified', async () => {
      const mockSlugs = ['post'];
      const post = aBlogPostDetail()
        .withSlug('post')
        .withPublished(true)
        .build();

      vi.mocked(mockRepository.listSlugs).mockResolvedValue(mockSlugs);
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(post);

      await blogService.listSlugs();

      expect(mockRepository.getBlogPostDetailBySlug).toHaveBeenCalledWith(
        'post',
        'es'
      );
    });

    it('should use provided locale parameter', async () => {
      const mockSlugs = ['post'];
      const post = aBlogPostDetail()
        .withSlug('post')
        .withPublished(true)
        .build();

      vi.mocked(mockRepository.listSlugs).mockResolvedValue(mockSlugs);
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockResolvedValue(post);

      await blogService.listSlugs('en');

      expect(mockRepository.getBlogPostDetailBySlug).toHaveBeenCalledWith(
        'post',
        'en'
      );
    });

    it('should return all slugs when all posts are published', async () => {
      const mockSlugs = ['post-a', 'post-b', 'post-c'];
      
      vi.mocked(mockRepository.listSlugs).mockResolvedValue(mockSlugs);
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockImplementation(
        async (slug) =>
          aBlogPostDetail().withSlug(slug).withPublished(true).build()
      );

      const result = await blogService.listSlugs();

      expect(result).toEqual(['post-a', 'post-b', 'post-c']);
    });

    it('should return empty array when all posts are unpublished', async () => {
      const mockSlugs = ['draft-1', 'draft-2'];

      vi.mocked(mockRepository.listSlugs).mockResolvedValue(mockSlugs);
      vi.mocked(mockRepository.getBlogPostDetailBySlug).mockImplementation(
        async (slug) =>
          aBlogPostDetail().withSlug(slug).withPublished(false).build()
      );

      const result = await blogService.listSlugs();

      expect(result).toEqual([]);
    });
  });

  describe('setBlogRepository', () => {
    it('should inject repository dependency', async () => {
      const publishedPost = aBlogPostDetail()
        .withSlug('new-slug')
        .withPublished(true)
        .build();

      const newMockRepository: BlogRepository = {
        listSlugs: vi.fn().mockResolvedValue(['new-slug']),
        getBlogPostDetailBySlug: vi.fn().mockResolvedValue(publishedPost),
        listBlogPosts: vi.fn(),
      };

      setBlogRepository(newMockRepository);

      const result = await blogService.listSlugs();

      expect(result).toEqual(['new-slug']);
      expect(newMockRepository.listSlugs).toHaveBeenCalled();
    });

    it('should replace previous repository', async () => {
      const publishedPost = aBlogPostDetail()
        .withSlug('second')
        .withPublished(true)
        .build();

      const firstRepo: BlogRepository = {
        listSlugs: vi.fn().mockResolvedValue(['first']),
        getBlogPostDetailBySlug: vi.fn(),
        listBlogPosts: vi.fn(),
      };

      const secondRepo: BlogRepository = {
        listSlugs: vi.fn().mockResolvedValue(['second']),
        getBlogPostDetailBySlug: vi.fn().mockResolvedValue(publishedPost),
        listBlogPosts: vi.fn(),
      };

      setBlogRepository(firstRepo);
      setBlogRepository(secondRepo);

      const result = await blogService.listSlugs();

      expect(result).toEqual(['second']);
      expect(firstRepo.listSlugs).not.toHaveBeenCalled();
      expect(secondRepo.listSlugs).toHaveBeenCalled();
    });
  });
});
