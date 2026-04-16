import { useState, useMemo, useCallback } from 'react';
import type { Photo, PhotoCategory } from '../types';
import { demoPhotos } from '../data/photos';

export interface UsePhotosReturn {
  photos: Photo[];
  filteredPhotos: Photo[];
  selectedCategory: PhotoCategory | 'hepsi';
  setSelectedCategory: (category: PhotoCategory | 'hepsi') => void;
  resetFilters: () => void;
  getPhotoById: (id: string) => Photo | undefined;
}

export function usePhotos(initialCategory?: PhotoCategory | 'hepsi'): UsePhotosReturn {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'hepsi'>(
    initialCategory ?? 'hepsi'
  );

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'hepsi') {
      return demoPhotos;
    }
    return demoPhotos.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  const resetFilters = useCallback(() => {
    setSelectedCategory('hepsi');
  }, []);

  const getPhotoById = useCallback(
    (id: string): Photo | undefined => {
      return demoPhotos.find((photo) => photo.id === id);
    },
    []
  );

  return {
    photos: demoPhotos,
    filteredPhotos,
    selectedCategory,
    setSelectedCategory,
    resetFilters,
    getPhotoById,
  };
}
