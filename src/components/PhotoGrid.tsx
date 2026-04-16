import type { Photo, PhotoCategory } from '../types';
import { PhotoCard } from './PhotoCard';
import { EmptyState } from './EmptyState';

interface PhotoGridProps {
  photos: Photo[];
  selectedCategory: PhotoCategory | 'hepsi';
  onPhotoClick?: (photo: Photo) => void;
  onResetFilters?: () => void;
  onExploreAll?: () => void;
}

export function PhotoGrid({ photos, selectedCategory, onPhotoClick, onResetFilters, onExploreAll }: PhotoGridProps) {
  const filteredPhotos =
    selectedCategory === 'hepsi'
      ? photos
      : photos.filter(p => p.category === selectedCategory);

  if (filteredPhotos.length === 0) {
    return (
      <EmptyState
        onResetFilters={onResetFilters}
        onExploreAll={onExploreAll}
      />
    );
  }

  const getVariant = (index: number): 'large' | 'vertical' | 'default' => {
    const pattern = index % 8;
    if (pattern === 0) return 'large';
    if (pattern === 4) return 'vertical';
    if (pattern === 7) return 'large';
    return 'default';
  };

  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 pb-24"
      role="list"
      aria-label="Fotoğraf galerisi"
    >
      {filteredPhotos.map((photo, index) => (
        <div key={photo.id} role="listitem">
          <PhotoCard
            photo={photo}
            variant={getVariant(index)}
            onPhotoClick={onPhotoClick}
          />
        </div>
      ))}
    </section>
  );
}
