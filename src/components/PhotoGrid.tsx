import type { Photo, PhotoCategory } from '../types';
import { PhotoCard } from './PhotoCard';

interface PhotoGridProps {
  photos: Photo[];
  selectedCategory: PhotoCategory | 'hepsi';
  onPhotoClick?: (photo: Photo) => void;
}

export function PhotoGrid({ photos, selectedCategory, onPhotoClick }: PhotoGridProps) {
  const filteredPhotos = selectedCategory === 'hepsi'
    ? photos
    : photos.filter(p => p.category === selectedCategory);

  if (filteredPhotos.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">photo_library</span>
        <p className="text-xl font-medium text-white mb-2">Fotoğraf Bulunamadı</p>
        <p className="text-on-surface-variant">Bu kategoride henüz fotoğraf yok.</p>
      </div>
    );
  }

  const getVariant = (index: number): 'large' | 'vertical' | 'default' => {
    if (index === 0) return 'large';
    if (index === 4) return 'vertical';
    if (index === 7) return 'large';
    return 'default';
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 pb-24">
      {filteredPhotos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          variant={getVariant(index)}
          onPhotoClick={onPhotoClick}
        />
      ))}
    </section>
  );
}
