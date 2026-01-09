import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock de los módulos nativos y server-only
vi.mock('server-only', () => ({}));
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    statSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}));
vi.mock('path', () => ({
  default: {
    join: vi.fn((...args) => args.join('/')),
  },
}));
vi.mock('gray-matter', () => ({
  default: vi.fn(),
}));

// Importamos el repositorio después de mockear
import { blogFileRepository } from '../blog-file.repository';

// Importamos después de mockear para acceder a los mocks
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

describe('blogFileRepository', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('listSlugs', () => {
    it('should return empty array when blog directory does not exist', async () => {
      (fs.existsSync as any).mockReturnValue(false);

      const result = await blogFileRepository.listSlugs();

      expect(result).toEqual([]);
      expect(fs.existsSync).toHaveBeenCalled();
    });

    it('should return list of directory names (slugs)', async () => {
      (fs.existsSync as any).mockReturnValue(true);
      (fs.readdirSync as any).mockReturnValue([
        'post-1',
        'post-2',
        'file.txt', // Should be filtered out (not a directory)
      ] as any);
      (fs.statSync as any).mockImplementation((path: any) => {
        const pathStr = path.toString();
        return {
          isDirectory: () =>
            pathStr.includes('post-1') || pathStr.includes('post-2'),
        } as any;
      });

      const result = await blogFileRepository.listSlugs();

      expect(result).toEqual(['post-1', 'post-2']);
      expect(fs.readdirSync).toHaveBeenCalled();
    });

    it('should filter out files and only return directories', async () => {
      (fs.existsSync as any).mockReturnValue(true);
      (fs.readdirSync as any).mockReturnValue([
        'valid-post',
        '.DS_Store',
        'another-post',
      ] as any);
      (fs.statSync as any).mockImplementation((path: any) => {
        const pathStr = path.toString();
        return {
          isDirectory: () =>
            pathStr.includes('valid-post') || pathStr.includes('another-post'),
        } as any;
      });

      const result = await blogFileRepository.listSlugs();

      expect(result).toEqual(['valid-post', 'another-post']);
    });
  });

  describe('getBlogPostDetailBySlug', () => {
    it('should return null when file does not exist', async () => {
      (path.join as any).mockReturnValue('/fake/path/post/es.mdx');
      (fs.existsSync as any).mockReturnValue(false);

      const result = await blogFileRepository.getBlogPostDetailBySlug(
        'post',
        'es'
      );

      expect(result).toBeNull();
      expect(fs.existsSync).toHaveBeenCalledWith('/fake/path/post/es.mdx');
    });

    it('should return BlogPostDetail when file exists', async () => {
      const mockContent = 'Post content here';
      const mockMetadata = {
        date: '2024-01-15',
        tags: ['test'],
        readTime: '5 min',
      };
      const mockFrontmatter = {
        title: 'Test Post',
        description: 'Test description',
      };

      (path.join as any).mockImplementation((...args: any[]) => args.join('/'));
      (fs.existsSync as any).mockReturnValue(true);
      
      // Mock para metadata.json
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify(mockMetadata) as any
      );
      
      // Mock para el archivo .mdx
      (fs.readFileSync as any).mockReturnValueOnce('frontmatter + content' as any);
      (matter as any).mockReturnValue({
        data: mockFrontmatter,
        content: mockContent,
      } as any);

      const result = await blogFileRepository.getBlogPostDetailBySlug(
        'test-post',
        'es'
      );

      expect(result).toEqual({
        slug: 'test-post',
        title: 'Test Post',
        description: 'Test description',
        date: '2024-01-15',
        tags: ['test'],
        readTime: '5 min',
        content: mockContent,
      });
    });

    it('should apply default values for missing frontmatter fields', async () => {
      const mockMetadata = {
        date: '',
        tags: [],
        readTime: '5 min',
      };

      (path.join as any).mockImplementation((...args: any[]) => args.join('/'));
      (fs.existsSync as any).mockReturnValue(true);
      
      // Mock para metadata.json
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify(mockMetadata) as any
      );
      
      // Mock para el archivo .mdx
      (fs.readFileSync as any).mockReturnValueOnce('content' as any);
      (matter as any).mockReturnValue({
        data: {},
        content: 'Minimal content',
      } as any);

      const result = await blogFileRepository.getBlogPostDetailBySlug(
        'minimal',
        'en'
      );

      expect(result).toEqual({
        slug: 'minimal',
        title: 'minimal', // Default: slug
        description: '',
        date: '',
        tags: [],
        readTime: '5 min',
        content: 'Minimal content',
      });
    });

    it('should handle different locales', async () => {
      const mockMetadata = {
        date: '2024-01-01',
        tags: [],
        readTime: '5 min',
      };

      (path.join as any).mockImplementation((...args: any[]) => args.join('/'));
      (fs.existsSync as any).mockReturnValue(true);
      
      // Mock para metadata.json
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify(mockMetadata) as any
      );
      
      // Mock para el archivo .mdx
      (fs.readFileSync as any).mockReturnValueOnce('content' as any);
      (matter as any).mockReturnValue({
        data: { title: 'English Post' },
        content: 'Content',
      } as any);

      await blogFileRepository.getBlogPostDetailBySlug('post', 'en');

      expect(path.join).toHaveBeenCalledWith(
        expect.anything(),
        'post',
        'en.mdx'
      );
    });
  });

  describe('listBlogPosts', () => {
    it('should return empty array when blog directory does not exist', async () => {
      (fs.existsSync as any).mockReturnValue(false);

      const result = await blogFileRepository.listBlogPosts('es');

      expect(result).toEqual([]);
    });

    it('should return list of BlogPost (without content)', async () => {
      (fs.existsSync as any).mockReturnValue(true);
      (fs.readdirSync as any).mockReturnValue(['post-1', 'post-2'] as any);
      (fs.statSync as any).mockReturnValue({
        isDirectory: () => true,
      } as any);
      (path.join as any).mockImplementation((...args: any[]) => args.join('/'));

      // Mock para post-1 .mdx (PRIMERO)
      (fs.readFileSync as any).mockReturnValueOnce('content1' as any);
      (matter as any).mockReturnValueOnce({
        data: {
          title: 'Post 1',
        },
        content: 'Content 1',
      } as any);
      // Mock para post-1 metadata.json (DESPUÉS)
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify({
          date: '2024-01-15',
          tags: [],
          readTime: '5 min',
        }) as any
      );

      // Mock para post-2 .mdx (PRIMERO)
      (fs.readFileSync as any).mockReturnValueOnce('content2' as any);
      (matter as any).mockReturnValueOnce({
        data: {
          title: 'Post 2',
        },
        content: 'Content 2',
      } as any);
      // Mock para post-2 metadata.json (DESPUÉS)
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify({
          date: '2024-01-10',
          tags: [],
          readTime: '5 min',
        }) as any
      );

      const result = await blogFileRepository.listBlogPosts('es');

      expect(result).toHaveLength(2);
      expect(result[0].slug).toBe('post-1');
      expect(result[0].title).toBe('Post 1');
      expect(result[0]).not.toHaveProperty('content'); // BlogPost no tiene content
      expect(result[1].slug).toBe('post-2');
    });

    it('should sort posts by date descending (newest first)', async () => {
      (fs.existsSync as any).mockReturnValue(true);
      (fs.readdirSync as any).mockReturnValue(['old-post', 'new-post'] as any);
      (fs.statSync as any).mockReturnValue({
        isDirectory: () => true,
      } as any);
      (path.join as any).mockImplementation((...args: any[]) => args.join('/'));

      // old-post .mdx (PRIMERO)
      (fs.readFileSync as any).mockReturnValueOnce('content' as any);
      (matter as any).mockReturnValueOnce({
        data: { title: 'Old Post' },
        content: 'Content',
      } as any);
      // old-post metadata.json (DESPUÉS) (fecha más antigua)
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify({
          date: '2024-01-01',
          tags: [],
          readTime: '5 min',
        }) as any
      );

      // new-post .mdx (PRIMERO)
      (fs.readFileSync as any).mockReturnValueOnce('content' as any);
      (matter as any).mockReturnValueOnce({
        data: { title: 'New Post' },
        content: 'Content',
      } as any);
      // new-post metadata.json (DESPUÉS) (fecha más reciente)
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify({
          date: '2024-12-31',
          tags: [],
          readTime: '5 min',
        }) as any
      );

      const result = await blogFileRepository.listBlogPosts('es');

      expect(result[0].slug).toBe('new-post'); // Más reciente primero
      expect(result[1].slug).toBe('old-post');
    });

    it('should skip posts without MDX file for specified locale', async () => {
      const existsSyncMock = fs.existsSync as any;
      existsSyncMock
        .mockReturnValueOnce(true) // Directory exists
        .mockReturnValueOnce(true) // post-1/es.mdx exists
        .mockReturnValueOnce(true) // post-1/metadata.json exists
        .mockReturnValueOnce(false); // post-2/es.mdx does NOT exist
      (fs.readdirSync as any).mockReturnValue(['post-1', 'post-2'] as any);
      (fs.statSync as any).mockReturnValue({
        isDirectory: () => true,
      } as any);
      (path.join as any).mockImplementation((...args: any[]) => args.join('/'));
      
      // Mock para post-1 .mdx (PRIMERO)
      (fs.readFileSync as any).mockReturnValueOnce('content' as any);
      (matter as any).mockReturnValue({
        data: { title: 'Post 1' },
        content: 'Content',
      } as any);
      // Mock para post-1 metadata.json (DESPUÉS)
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify({
          date: '2024-01-01',
          tags: [],
          readTime: '5 min',
        }) as any
      );

      const result = await blogFileRepository.listBlogPosts('es');

      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('post-1');
    });

    it('should handle locale parameter correctly', async () => {
      (fs.existsSync as any).mockReturnValue(true);
      (fs.readdirSync as any).mockReturnValue(['post'] as any);
      (fs.statSync as any).mockReturnValue({
        isDirectory: () => true,
      } as any);
      (path.join as any).mockImplementation((...args: any[]) => args.join('/'));
      
      // Mock para .mdx (PRIMERO)
      (fs.readFileSync as any).mockReturnValueOnce('content' as any);
      (matter as any).mockReturnValue({
        data: {},
        content: '',
      } as any);
      // Mock para metadata.json (DESPUÉS)
      (fs.readFileSync as any).mockReturnValueOnce(
        JSON.stringify({
          date: '2024-01-01',
          tags: [],
          readTime: '5 min',
        }) as any
      );

      await blogFileRepository.listBlogPosts('en');

      expect(path.join).toHaveBeenCalledWith(
        expect.anything(),
        'post',
        'en.mdx'
      );
    });
  });
});
