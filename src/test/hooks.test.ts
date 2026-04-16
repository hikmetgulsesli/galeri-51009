import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePhotos } from '../hooks/usePhotos';
import { useLightbox } from '../hooks/useLightbox';
import type { Photo } from '../types';

const mockPhotos: Photo[] = [
  {
    id: '1',
    src: 'https://example.com/photo1.jpg',
    alt: 'Doğa manzarası',
    category: 'dogal-manzara',
    width: 1920,
    height: 1080,
    photographer: 'Ahmet Yılmaz',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    src: 'https://example.com/photo2.jpg',
    alt: 'Şehir silueti',
    category: 'sehir',
    width: 1920,
    height: 1080,
    photographer: 'Elif Kaya',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    src: 'https://example.com/photo3.jpg',
    alt: 'Portre çalışması',
    category: 'insan',
    width: 1920,
    height: 1080,
    photographer: 'Mehmet Demir',
    createdAt: new Date('2024-03-10'),
  },
];

describe('usePhotos', () => {
  it('tüm fotoğrafları döndürür', () => {
    const { result } = renderHook(() => usePhotos());
    expect(result.current.photos).toHaveLength(20);
    expect(result.current.filteredPhotos).toHaveLength(20);
  });

  it('varsayılan olarak hepsi kategorisini seçer', () => {
    const { result } = renderHook(() => usePhotos());
    expect(result.current.selectedCategory).toBe('hepsi');
  });

  it('belirli bir başlangıç kategorisi kabul eder', () => {
    const { result } = renderHook(() => usePhotos('dogal-manzara'));
    expect(result.current.selectedCategory).toBe('dogal-manzara');
  });

  it('kategori değiştiğinde filtrelenmiş fotoğrafları döndürür', () => {
    const { result } = renderHook(() => usePhotos());

    act(() => {
      result.current.setSelectedCategory('sehir');
    });

    expect(result.current.selectedCategory).toBe('sehir');
    expect(result.current.filteredPhotos.every(p => p.category === 'sehir')).toBe(true);
  });

  it('hepsi kategorisinde tüm fotoğrafları döndürür', () => {
    const { result } = renderHook(() => usePhotos());

    act(() => {
      result.current.setSelectedCategory('sehir');
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.selectedCategory).toBe('hepsi');
    expect(result.current.filteredPhotos).toHaveLength(20);
  });

  it('geçersiz kategori id ile fotoğraf bulamaz', () => {
    const { result } = renderHook(() => usePhotos());
    const photo = result.current.getPhotoById('nonexistent-id');
    expect(photo).toBeUndefined();
  });

  it('mevcut bir fotoğraf id ile fotoğrafı bulabilir', () => {
    const { result } = renderHook(() => usePhotos());
    const allPhotos = result.current.photos;
    if (allPhotos.length > 0) {
      const firstPhoto = allPhotos[0];
      const found = result.current.getPhotoById(firstPhoto.id);
      expect(found).toEqual(firstPhoto);
    }
  });
});

describe('useLightbox', () => {
  it('başlangıçta kapalı durumdadır', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));
    expect(result.current.isOpen).toBe(false);
    expect(result.current.currentPhoto).toBeNull();
    expect(result.current.currentIndex).toBe(-1);
  });

  it('fotoğraf seçildiğinde açılır', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));
    const testPhoto = mockPhotos[0];

    act(() => {
      result.current.openLightbox(testPhoto);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.currentPhoto).toEqual(testPhoto);
    expect(result.current.currentIndex).toBe(0);
  });

  it('kapatıldığında durumu sıfırlar', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));

    act(() => {
      result.current.openLightbox(mockPhotos[0]);
    });

    act(() => {
      result.current.closeLightbox();
    });

    expect(result.current.isOpen).toBe(false);
    expect(result.current.currentPhoto).toBeNull();
  });

  it('sonraki fotoğrafa gidebilir', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));

    act(() => {
      result.current.openLightbox(mockPhotos[0]);
    });

    expect(result.current.hasNext).toBe(true);
    expect(result.current.hasPrev).toBe(false);

    act(() => {
      result.current.navigateNext();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentPhoto).toEqual(mockPhotos[1]);
  });

  it('önceki fotoğrafa gidebilir', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));

    act(() => {
      result.current.openLightbox(mockPhotos[2]);
    });

    expect(result.current.hasPrev).toBe(true);
    expect(result.current.hasNext).toBe(false);

    act(() => {
      result.current.navigatePrev();
    });

    expect(result.current.currentIndex).toBe(1);
    expect(result.current.currentPhoto).toEqual(mockPhotos[1]);
  });

  it('ilk fotoğrafta önceki navigasyon yapamaz', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));

    act(() => {
      result.current.openLightbox(mockPhotos[0]);
    });

    expect(result.current.hasPrev).toBe(false);

    act(() => {
      result.current.navigatePrev();
    });

    expect(result.current.currentIndex).toBe(0);
  });

  it('son fotoğrafta sonraki navigasyon yapamaz', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));

    act(() => {
      result.current.openLightbox(mockPhotos[mockPhotos.length - 1]);
    });

    expect(result.current.hasNext).toBe(false);

    act(() => {
      result.current.navigateNext();
    });

    expect(result.current.currentIndex).toBe(mockPhotos.length - 1);
  });

  it('openLightbox ile fotoğraf listesi güncellenebilir', () => {
    const { result } = renderHook(() => useLightbox(mockPhotos));
    const newPhoto: Photo = {
      id: '99',
      src: 'https://example.com/new.jpg',
      alt: 'Yeni fotoğraf',
      category: 'mimari',
      width: 1920,
      height: 1080,
      createdAt: new Date(),
    };
    const newPhotoList = [...mockPhotos, newPhoto];

    act(() => {
      result.current.openLightbox(newPhoto, newPhotoList);
    });

    expect(result.current.currentPhoto).toEqual(newPhoto);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.hasPrev).toBe(true);
  });
});
