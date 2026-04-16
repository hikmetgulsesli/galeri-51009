import { useEffect, useCallback, useState } from 'react';
import type { Photo } from '../types';
import { PHOTO_CATEGORIES } from '../types';

interface LightboxProps {
  photo: Photo | null;
  photos: Photo[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
}

const CATEGORY_LABELS: Record<string, string> = {};
PHOTO_CATEGORIES.forEach(c => {
  CATEGORY_LABELS[c.value] = c.label;
});

export function Lightbox({ photo, photos, isOpen, onClose, onNavigate }: LightboxProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const currentIndex = photo ? photos.findIndex(p => p.id === photo.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(photos[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, photos, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext) {
      onNavigate(photos[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, photos, onNavigate]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        handlePrev();
        break;
      case 'ArrowRight':
        handleNext();
        break;
    }
  }, [isOpen, onClose, handlePrev, handleNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  const categoryLabel = CATEGORY_LABELS[photo.category] || photo.category;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-[#060e20]/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Fotoğraf detay görünümü"
    >
      {/* Top Toolbar */}
      <div className="flex justify-between items-center px-8 py-6 w-full z-20">
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-on-surface-variant mb-1 font-medium">Sergi Parçası</span>
          <h1 className="text-2xl font-bold tracking-tight text-white">{photo.alt.split("'")[0].split(',')[0]}</h1>
        </div>
        <button
          onClick={onClose}
          className="glass-panel p-3 rounded-full text-on-surface hover:text-white transition-all active:scale-95 group"
          aria-label="Kapat"
        >
          <span className="material-symbols-outlined block group-hover:rotate-90 transition-transform duration-300">close</span>
        </button>
      </div>

      {/* Main Display Area */}
      <div className="flex-1 relative flex items-center justify-center px-4 md:px-20 overflow-hidden">
        {/* Navigation - Left */}
        <button
          onClick={handlePrev}
          disabled={!hasPrev}
          className={`absolute left-6 md:left-12 z-20 glass-panel p-4 rounded-full transition-all active:scale-90 group ${
            hasPrev 
              ? 'text-on-surface hover:bg-primary-container/20 hover:text-primary' 
              : 'text-on-surface/30 cursor-not-allowed'
          }`}
          aria-label="Önceki fotoğraf"
        >
          <span className="material-symbols-outlined text-3xl">chevron_left</span>
        </button>

        {/* Image Container */}
        <div 
          className="relative w-full h-full max-h-[870px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative group max-w-full h-full flex items-center justify-center">
            <img
              className="max-w-full max-h-full object-contain rounded-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-outline-variant/10"
              src={photo.src}
              alt={photo.alt}
            />
            {/* Floating Tech Specs */}
            <div className={`absolute top-6 left-6 glass-panel px-4 py-2 rounded-full hidden md:flex items-center gap-4 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">camera</span>
                <span className="text-[10px] font-bold text-on-surface">ISO 400</span>
              </div>
              <div className="w-px h-3 bg-outline-variant/30"></div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">shutter_speed</span>
                <span className="text-[10px] font-bold text-on-surface">1/250s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation - Right */}
        <button
          onClick={handleNext}
          disabled={!hasNext}
          className={`absolute right-6 md:right-12 z-20 glass-panel p-4 rounded-full transition-all active:scale-90 group ${
            hasNext 
              ? 'text-on-surface hover:bg-primary-container/20 hover:text-primary' 
              : 'text-on-surface/30 cursor-not-allowed'
          }`}
          aria-label="Sonraki fotoğraf"
        >
          <span className="material-symbols-outlined text-3xl">chevron_right</span>
        </button>
      </div>

      {/* Bottom Metadata & Actions */}
      <div className="w-full px-8 py-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-6 z-20">
        <div className="flex flex-col gap-3">
          {/* Category Tags */}
          <div className="flex gap-2">
            <span className="bg-primary-container/20 text-primary-container px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-container/20">
              {categoryLabel}
            </span>
            <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Koleksiyon: Sessizlik
            </span>
          </div>
          
          {/* Photographer Info */}
          {photo.photographer && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
                <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-on-surface-variant">Sanatçı</span>
                <span className="text-sm font-bold text-white">{photo.photographer}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all group ${
              isSaved 
                ? 'bg-primary-container text-white' 
                : 'bg-surface-container-highest text-on-surface hover:bg-surface-bright'
            }`}
            aria-label={isSaved ? 'Kaydedildi' : 'Kaydet'}
          >
            <span className={`material-symbols-outlined text-xl transition-transform ${isSaved ? 'scale-110' : 'group-hover:scale-110'}`}>
              {isSaved ? 'favorite' : 'favorite'}
            </span>
            <span className="text-sm font-bold">{isSaved ? 'Kaydedildi' : 'Kaydet'}</span>
          </button>
          
          <button
            onClick={() => {/* Download action */}}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-primary-container text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:brightness-110 transition-all active:scale-95"
            aria-label="Yüksek çözünürlük indir"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            <span className="text-sm font-bold">Yüksek Çözünürlük</span>
          </button>
          
          <button
            onClick={() => {/* Share action */}}
            className="glass-panel p-3 rounded-xl text-on-surface hover:text-primary transition-all"
            aria-label="Paylaş"
          >
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tertiary/5 blur-[120px] -z-10 pointer-events-none"></div>
    </div>
  );
}
