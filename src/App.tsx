import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PhotoGrid } from './components/PhotoGrid';
import { Lightbox } from './components/Lightbox';
import { ErrorState } from './components/ErrorState';
import { usePhotos } from './hooks/usePhotos';
import { useLightbox } from './hooks/useLightbox';
import type { Photo, PhotoCategory } from './types';

function App() {
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState<'galeri' | 'ara' | 'favoriler' | 'ayarlar'>('ara');

  const {
    filteredPhotos,
    selectedCategory,
    setSelectedCategory,
    resetFilters,
  } = usePhotos('hepsi');

  const {
    isOpen: isLightboxOpen,
    currentPhoto,
    openLightbox,
    closeLightbox,
  } = useLightbox(filteredPhotos);

  const handleCategoryChange = useCallback((category: PhotoCategory | 'hepsi') => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  const handlePhotoClick = useCallback((photo: Photo) => {
    openLightbox(photo, filteredPhotos);
  }, [openLightbox, filteredPhotos]);

  const handleNavigateLightbox = useCallback((photo: Photo) => {
    openLightbox(photo);
  }, [openLightbox]);

  const handleExploreAll = useCallback(() => {
    setSelectedCategory('hepsi');
  }, [setSelectedCategory]);

  const handleRetry = useCallback(() => {
    setHasError(false);
  }, []);

  const handleTabChange = useCallback((tab: 'galeri' | 'ara' | 'favoriler' | 'ayarlar') => {
    setActiveTab(tab);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Main Content */}
      <main id="photo-gallery" className="min-h-screen pt-24 lg:pl-64 px-6 md:px-12 lg:px-16 pb-24">
        {hasError ? (
          <ErrorState onRetry={handleRetry} />
        ) : (
          <>
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <PhotoGrid
              photos={filteredPhotos}
              selectedCategory={selectedCategory}
              onPhotoClick={handlePhotoClick}
              onResetFilters={resetFilters}
              onExploreAll={handleExploreAll}
            />
          </>
        )}
      </main>

      <Lightbox
        photo={currentPhoto}
        photos={filteredPhotos}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
}

export default App;
