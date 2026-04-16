import { useState } from 'react';
import type { Photo } from '../types';
import { PHOTO_CATEGORIES } from '../types';

interface PhotoCardProps {
  photo: Photo;
  variant?: 'large' | 'vertical' | 'default';
  onPhotoClick?: (photo: Photo) => void;
}

const CATEGORY_LABELS: Record<string, string> = {};
PHOTO_CATEGORIES.forEach(c => {
  CATEGORY_LABELS[c.value] = c.label;
});

export function PhotoCard({ photo, variant = 'default', onPhotoClick }: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses: Record<string, string> = {
    large: 'aspect-[16/10]',
    vertical: '',
    default: 'aspect-square',
  };

  const gridClasses: Record<string, string> = {
    large: 'md:col-span-2 xl:col-span-2',
    vertical: 'xl:row-span-2',
    default: '',
  };

  const categoryLabel = CATEGORY_LABELS[photo.category] || photo.category;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPhotoClick?.(photo);
    }
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-surface-container cursor-pointer ${gridClasses[variant] || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPhotoClick?.(photo)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`${photo.alt} - ${categoryLabel}`}
    >
      <div className={`${aspectClasses[variant] || 'aspect-square'} overflow-hidden${variant === 'vertical' ? ' h-full' : ''}`}>
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent opacity-80" />
      <div
        className={`absolute bottom-0 left-0 w-full ${
          variant === 'large' ? 'p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500' : 'p-6'
        }`}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container mb-1 block">
          {categoryLabel.toUpperCase()}
        </span>
        <h3 className={`${variant === 'large' ? 'text-3xl' : 'text-xl'} font-bold text-white`}>
          {photo.alt.split("'")[0].split(',')[0]}
        </h3>
        {variant === 'large' && (
          <p
            className={`text-on-surface-variant text-sm transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {photo.photographer ? `${photo.photographer} • ` : ''}
            {new Date(photo.createdAt).toLocaleDateString('tr-TR')}
          </p>
        )}
      </div>
      <div className="sr-only">
        <span>{photo.alt}</span>
      </div>
    </div>
  );
}
