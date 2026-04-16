import { useState, useCallback } from 'react';
import { demoPhotos } from './data/photos';
import { FilterBar } from './components/FilterBar';
import { PhotoGrid } from './components/PhotoGrid';
import { Lightbox } from './components/Lightbox';
import { ErrorState } from './components/ErrorState';
import type { Photo, PhotoCategory } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'hepsi'>('hepsi');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hasError, setHasError] = useState(false);

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

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Navigation Bar */}
      <nav className="bg-[#0b1326] dark:bg-[#0b1326] flex justify-between items-center px-8 py-4 w-full max-w-full fixed top-0 z-50 font-['Inter'] tracking-[-0.02em]">
        <div className="text-xl font-black text-white tracking-tight">The Nocturnal Curator</div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-[#c3c6d7] hover:text-white transition-colors" href="/kesfet">Keşfet</a>
          <a className="text-[#c3c6d7] hover:text-white transition-colors" href="/koleksiyonlar">Koleksiyonlar</a>
          <a className="text-[#c3c6d7] hover:text-white transition-colors" href="/kurasyon">Kürasyon</a>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              className="bg-[#171f33] border-none text-[#dae2fd] rounded-xl px-4 py-2 focus:ring-2 focus:ring-[#2563EB] w-64 placeholder:text-[#8d90a0]"
              placeholder="Ara..."
              type="text"
              aria-label="Ara"
            />
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#8d90a0] pointer-events-none">search</span>
          </div>
          <button
            className="p-2 text-[#c3c6d7] hover:bg-[#2d3449]/50 transition-all duration-300 rounded-full active:scale-95 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
            aria-label="Profil"
          >
            <span className="material-symbols-outlined text-2xl">account_circle</span>
          </button>
        </div>
      </nav>

      <div className="bg-[#171f33] h-[1px] w-full fixed top-[65px] z-50" />

      {/* Side Navigation Bar */}
      <aside className="fixed left-0 top-0 h-full z-40 hidden lg:flex flex-col bg-[#060e20] dark:bg-[#060e20] w-64 shadow-[40px_0_60px_-15px_rgba(0,0,0,0.3)] transition-all ease-out duration-400">
        <div className="p-8 pt-24">
          <div className="text-lg font-bold text-white mb-10">Küratör</div>
          <nav className="space-y-1">
            <a className="flex items-center gap-4 text-[#c3c6d7] py-3 px-6 hover:bg-[#171f33] rounded-xl transition-all" href="/galeri">
              <span className="material-symbols-outlined">grid_view</span>
              <span className="font-['Inter'] text-sm">Galeri</span>
            </a>
            <a className="flex items-center gap-4 bg-[#2563EB]/10 text-[#2563EB] border-r-4 border-[#2563EB] py-3 px-6 rounded-l-xl transition-all" href="/ara">
              <span className="material-symbols-outlined">search</span>
              <span className="font-['Inter'] text-sm font-bold">Ara</span>
            </a>
            <a className="flex items-center gap-4 text-[#c3c6d7] py-3 px-6 hover:bg-[#171f33] rounded-xl transition-all" href="/favoriler">
              <span className="material-symbols-outlined">favorite</span>
              <span className="font-['Inter'] text-sm">Favoriler</span>
            </a>
            <a className="flex items-center gap-4 text-[#c3c6d7] py-3 px-6 hover:bg-[#171f33] rounded-xl transition-all" href="/ayarlar">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-['Inter'] text-sm">Ayarlar</span>
            </a>
          </nav>
        </div>
        <div className="mt-auto p-8">
          <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-surface-container-low">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeF7RJ5lM8T1jjrGdP5M4mSQJcu833mWbdna8PYzzTzigTnqPLLpDCKhN7jcVxZYxwvMpBoSaP7m5aKPNkEClgQkLoqU9wuY9bR23VVwjREDoH_trnkOJAoDjFcdmLmvPNZ63vl5eaWV6MB39ASCxLFbgoG5_lJE8rjr0rVTvT-LehwtmvyfjH7-1AVZKwzqWewSnruWC9hHwrWby2BAYOQ4VlJWcP0ztqkvYJFzvtxXoyuSVT7lzBQQamVoCf18JjsbdKNvuUfpk"
                alt="Kullanıcı Profili"
              />
            </div>
            <div className="overflow-hidden">
              <div className="text-white text-sm font-bold truncate">Premium Üye</div>
              <div className="text-on-surface-variant text-xs truncate">Kullanıcı Profili</div>
            </div>
          </div>
          <button className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container">
            <span className="material-symbols-outlined text-lg">cloud_upload</span>
            Fotoğraf Yükle
          </button>
        </div>
      </aside>

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

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-white/5 flex justify-around items-center py-4 px-6 z-50">
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="/galeri">
          <span className="material-symbols-outlined">grid_view</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-primary-container" href="/ara">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>search</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="/favoriler">
          <span className="material-symbols-outlined">favorite</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="/profil">
          <span className="material-symbols-outlined">account_circle</span>
        </a>
      </nav>

      {/* Decorative Corner Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-tertiary/5 rounded-full blur-[100px]" />
      </div>

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
