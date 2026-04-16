import { useState, useCallback } from 'react';
import type { Photo } from '../types';

export interface UseLightboxReturn {
  isOpen: boolean;
  currentPhoto: Photo | null;
  currentIndex: number;
  openLightbox: (photo: Photo, photos?: Photo[]) => void;
  closeLightbox: () => void;
  navigateNext: () => void;
  navigatePrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function useLightbox(photos: Photo[] = []): UseLightboxReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);
  const [photoList, setPhotoList] = useState<Photo[]>(photos);

  const currentIndex = currentPhoto
    ? photoList.findIndex((p) => p.id === currentPhoto.id)
    : -1;
  const hasNext = currentIndex < photoList.length - 1;
  const hasPrev = currentIndex > 0;

  const openLightbox = useCallback((photo: Photo, photosOverride?: Photo[]) => {
    if (photosOverride) {
      setPhotoList(photosOverride);
    }
    setCurrentPhoto(photo);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setCurrentPhoto(null);
  }, []);

  const navigateNext = useCallback(() => {
    if (hasNext && currentIndex >= 0) {
      setCurrentPhoto(photoList[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, photoList]);

  const navigatePrev = useCallback(() => {
    if (hasPrev && currentIndex >= 0) {
      setCurrentPhoto(photoList[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, photoList]);

  return {
    isOpen,
    currentPhoto,
    currentIndex,
    openLightbox,
    closeLightbox,
    navigateNext,
    navigatePrev,
    hasNext,
    hasPrev,
  };
}
