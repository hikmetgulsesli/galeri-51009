import { useState } from 'react';
import type { Photo, PhotoCategory } from '../types';
import { PHOTO_CATEGORIES } from '../types';

interface PhotoCardProps {
  photo: Photo;
  variant?: 'large' | 'vertical' | 'default';
  onPhotoClick?: (photo: Photo) => void;
}

export function PhotoCard({ photo, variant = 'default', onPhotoClick }: PhotoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses = {
    large: 'aspect-[16/10]',
    vertical: 'aspect-[3/4]',
    default: 'aspect-square',
  };

  const gridClasses = {
    large: 'md:col-span-2 xl:col-span-2',
    vertical: 'xl:row-span-2',
    default: '',
  };

  const categoryLabel = PHOTO_CATEGORIES.find(c => c.value === photo.category)?.label || photo.category;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-surface-container ${gridClasses[variant]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${aspectClasses[variant]} overflow-hidden`}>
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={photo.src}
          alt={photo.alt}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060e20] via-transparent to-transparent opacity-80" />
      <div className={`absolute bottom-0 left-0 w-full p-${variant === 'large' ? '8' : '6'} ${variant === 'large' ? 'translate-y-2 group-hover:translate-y-0' : ''} transition-transform duration-500`}>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary-container mb-1 block">
          {categoryLabel.toUpperCase()}
        </span>
        <h3 className={`${variant === 'large' ? 'text-3xl' : 'text-xl'} font-bold text-white mb-2`}>
          {photo.alt.split("'")[0]}
        </h3>
        {variant === 'large' && (
          <p className={`text-on-surface-variant text-sm ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
            {photo.photographer ? `${photo.photographer} • ` : ''}{new Date(photo.createdAt).toLocaleDateString('tr-TR')}
          </p>
        )}
      </div>
      <button
        className="absolute inset-0 w-full h-full cursor-pointer"
        onClick={() => onPhotoClick?.(photo)}
        aria-label={photo.alt}
      />
    </div>
  );
}
