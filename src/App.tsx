import { useState, useCallback } from 'react';
import { demoPhotos } from './data/photos';
import { FilterBar } from './components/FilterBar';
import { PhotoGrid } from './components/PhotoGrid';
import type { Photo, PhotoCategory } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | 'hepsi'>('hepsi');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleCategoryChange = useCallback((category: PhotoCategory | 'hepsi') => {
    setSelectedCategory(category);
  }, []);

  const handlePhotoClick = useCallback((photo: Photo) => {
    setSelectedPhoto(photo);
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Navigation Bar */}
      <nav className="bg-[#0b1326] dark:bg-[#0b1326] flex justify-between items-center px-8 py-4 w-full max-w-full fixed top-0 z-50">
        <div className="text-xl font-black text-white tracking-tight">The Nocturnal Curator</div>
        <div className="hidden md:flex items-center space-x-8 font-['Inter'] tracking-[-0.02em]">
          <a className="text-[#2563EB] font-bold border-b-2 border-[#2563EB] pb-1" href="/kesfet">Keşfet</a>
          <a className="text-[#c3c6d7] hover:text-white transition-colors" href="/koleksiyonlar">Koleksiyonlar</a>
          <a className="text-[#c3c6d7] hover:text-white transition-colors" href="/kurasyon">Kürasyon</a>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative group hidden lg:block">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-sm">search</span>
            </div>
            <input
              className="bg-surface-container border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary-container w-64 transition-all"
              placeholder="Sanat eseri ara..."
              type="text"
              aria-label="Sanat eseri ara"
            />
          </div>
          <button
            className="active:scale-95 transition-transform p-2 rounded-full hover:bg-[#2d3449]/50 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
            aria-label="Profil"
          >
            <span className="material-symbols-outlined text-on-surface">account_circle</span>
          </button>
        </div>
      </nav>

      {/* Side Navigation Bar */}
      <aside className="fixed left-0 top-0 h-full z-40 hidden lg:flex flex-col bg-[#060e20] dark:bg-[#060e20] w-64 pt-24 shadow-[40px_0_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="px-6 mb-8 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant/20">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbX3ZjbWP8cduL5vJMjbWpm5034wYPmM7OWPHP6nuzkNMqQ4AdUpbO0i0jj0m0--utCtMgi8df9kQc_7t6n2mV2oay47UrKX9_OF1SaiJDZAw5qLtgtKnk4z8dCC4Pk168YlSeTj7ryUaoAuWk9Y"
              alt="Küratör profil fotoğrafı"
            />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Küratör</p>
            <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">Premium Üye</p>
          </div>
        </div>
        <nav className="flex-1 font-['Inter'] text-sm">
          <a className="flex items-center space-x-3 bg-[#2563EB]/10 text-[#2563EB] border-r-4 border-[#2563EB] py-3 px-6 ease-out duration-400" href="/galeri">
            <span className="material-symbols-outlined">grid_view</span>
            <span>Galeri</span>
          </a>
          <a className="flex items-center space-x-3 text-[#c3c6d7] py-3 px-6 hover:bg-[#171f33] transition-all" href="/ara">
            <span className="material-symbols-outlined">search</span>
            <span>Ara</span>
          </a>
          <a className="flex items-center space-x-3 text-[#c3c6d7] py-3 px-6 hover:bg-[#171f33] transition-all" href="/favoriler">
            <span className="material-symbols-outlined">favorite</span>
            <span>Favoriler</span>
          </a>
          <a className="flex items-center space-x-3 text-[#c3c6d7] py-3 px-6 hover:bg-[#171f33] transition-all" href="/ayarlar">
            <span className="material-symbols-outlined">settings</span>
            <span>Ayarlar</span>
          </a>
        </nav>
        <div className="p-6">
          <button className="w-full bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 active:scale-95 transition-transform shadow-lg shadow-primary-container/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container">
            <span className="material-symbols-outlined">add_a_photo</span>
            <span>Fotoğraf Yükle</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-24 min-h-screen px-8">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-4">Dijital Sergi</h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">
            Gecenin derinliğinden süzülen ışıkların, sessiz anların ve unutulmaz karelerin editoryal bir seçkisi.
          </p>
        </header>

        {/* Category Filter Bar */}
        <FilterBar selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

        {/* Photo Grid */}
        <div id="photo-gallery" role="tabpanel">
          <PhotoGrid selectedCategory={selectedCategory} onPhotoClick={handlePhotoClick} photos={demoPhotos} />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-panel border-t border-outline-variant/10 flex justify-around py-2 z-50">
        <a className="flex flex-col items-center text-primary-container p-2" href="/galeri" aria-label="Galeri">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] mt-1">Galeri</span>
        </a>
        <a className="flex flex-col items-center text-on-surface-variant hover:text-white transition-colors p-2" href="/ara" aria-label="Ara">
          <span className="material-symbols-outlined">search</span>
          <span className="text-[10px] mt-1">Ara</span>
        </a>
        <a className="flex flex-col items-center text-on-surface-variant hover:text-white transition-colors p-2" href="/favoriler" aria-label="Favoriler">
          <span className="material-symbols-outlined">favorite</span>
          <span className="text-[10px] mt-1">Favoriler</span>
        </a>
        <a className="flex flex-col items-center text-on-surface-variant hover:text-white transition-colors p-2" href="/profil" aria-label="Profil">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] mt-1">Profil</span>
        </a>
      </nav>
    </div>
  );
}

export default App;
