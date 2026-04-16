export interface Photo {
  id: string;
  src: string;
  alt: string;
  category: PhotoCategory;
  width: number;
  height: number;
  photographer?: string;
  createdAt: Date;
}

export type PhotoCategory =
  | 'dogal-manzara'
  | 'sehir'
  | 'insan'
  | 'hayvan'
  | 'mimari';

export const PHOTO_CATEGORIES: { value: PhotoCategory; label: string }[] = [
  { value: 'dogal-manzara', label: 'Doğal Manzara' },
  { value: 'sehir', label: 'Şehir' },
  { value: 'insan', label: 'İnsan' },
  { value: 'hayvan', label: 'Hayvan' },
  { value: 'mimari', label: 'Mimari' },
];

export interface GalleryState {
  photos: Photo[];
  selectedCategory: PhotoCategory | 'hepsi';
  selectedPhoto: Photo | null;
  isLightboxOpen: boolean;
}

export interface FilterOption {
  value: PhotoCategory | 'hepsi';
  label: string;
}