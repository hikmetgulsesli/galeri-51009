import type { PhotoCategory } from '../types';
import { PHOTO_CATEGORIES } from '../types';

interface FilterBarProps {
  selectedCategory: PhotoCategory | 'hepsi';
  onCategoryChange: (category: PhotoCategory | 'hepsi') => void;
}

interface FilterOption {
  value: PhotoCategory | 'hepsi';
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'hepsi', label: 'Tümü' },
  ...PHOTO_CATEGORIES,
];

export function FilterBar({ selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <section
      className="flex flex-wrap items-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar"
      role="tablist"
      aria-label="Kategori filtreleri"
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = selectedCategory === option.value;
        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            aria-controls="photo-gallery"
            tabIndex={isActive ? 0 : -1}
            className={`px-6 py-2 rounded-full font-medium text-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container ${
              isActive
                ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                : 'bg-surface-container-high text-on-surface-variant hover:text-white hover:bg-surface-container-highest'
            }`}
            onClick={() => onCategoryChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </section>
  );
}