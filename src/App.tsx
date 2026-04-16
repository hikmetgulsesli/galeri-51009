import { useState, useCallback } from 'react';
import { demoPhotos } from './data/photos';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PhotoGrid } from './components/PhotoGrid';
import { Lightbox } from './components/Lightbox';
import { ErrorState } from './components/ErrorState';
import type { Photo, PhotoCategory } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'hepsi'>('hepsi');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hasError, setHasError] = useState(false);
  const [activeTab, setActiveTab] = useState<'galeri' | 'ara' | 'favoriler' | 'ayarlar'>('ara');

  const handleCategoryChange = useCallback((category: PhotoCategory | 'hepsi') => {
    setSelectedCategory(category);
  }, []);

  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedPhoto(null);
  }, []);

  const handleNavigateLightbox = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
  }, []);

  const handleResetFilters = useCallback(() => {
    setSelectedCategory('hepsi');
  }, []);

  const handleExploreAll = useCallback(() => {
    setSelectedCategory('hepsi');
  }, []);

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
      <main className="min-h-screen pt-24 lg:pl-64 px-6 md:px-12 lg:px-16 pb-24">
        {hasError ? (
          <ErrorState onRetry={handleRetry} />
        ) : (
          <>
            <FilterBar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            <PhotoGrid
              photos={demoPhotos}
              selectedCategory={selectedCategory}
              onPhotoClick={handlePhotoClick}
              onResetFilters={handleResetFilters}
              onExploreAll={handleExploreAll}
            />
          </>
        )}
      </main>

      <Lightbox
        photo={selectedPhoto}
        photos={demoPhotos}
        isOpen={!!selectedPhoto}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
}

export default App;
