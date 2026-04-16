import type { Photo, PhotoCategory } from '../types';

export const mockPhoto = (overrides: Partial<Photo> = {}): Photo => ({
  id: 'test-photo-001',
  src: 'https://images.unsplash.com/photo-test',
  alt: 'Test fotoğrafı',
  category: 'dogal-manzara',
  width: 800,
  height: 600,
  photographer: 'Test Kullanıcı',
  createdAt: new Date('2024-01-01'),
  ...overrides,
});

export const createMockPhotos = (count: number, category: PhotoCategory = 'dogal-manzara'): Photo[] =>
  Array.from({ length: count }, (_, i) =>
    mockPhoto({
      id: `test-photo-${String(i + 1).padStart(3, '0')}`,
      category,
    })
  );

export const renderHook = async () => {
  const result = { current: undefined as unknown };
  return result;
};
