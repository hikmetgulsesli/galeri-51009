import { useState, useCallback } from 'react';
import type { Photo } from '../types';

export interface UseLightboxReturn {
  isOpen: boolean;
  currentPhoto: Photo | null;
  openLightbox: (photo: Photo) => void;
  closeLightbox: () => void;
  navigateNext: (photos: Photo[]) => void;
  navigatePrev: (photos: Photo[]) => void;
}

export function useLightbox(): UseLightboxReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  const openLightbox = useCallback((photo: Photo) => {
    setCurrentPhoto(photo);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigateNext = useCallback((photos: Photo[]) => {
    if (!currentPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === currentPhoto.id);
    if (currentIndex < photos.length - 1) {
      setCurrentPhoto(photos[currentIndex + 1]);
    }
  }, [currentPhoto]);

  const navigatePrev = useCallback((photos: Photo[]) => {
    if (!currentPhoto) return;
    const currentIndex = photos.findIndex(p => p.id === currentPhoto.id);
    if (currentIndex > 0) {
      setCurrentPhoto(photos[currentIndex - 1]);
    }
  }, [currentPhoto]);

  return {
    isOpen,
    currentPhoto,
    openLightbox,
    closeLightbox,
    navigateNext,
    navigatePrev,
  };
}