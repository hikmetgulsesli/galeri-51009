interface EmptyStateProps {
  onResetFilters?: () => void;
  onExploreAll?: () => void;
}

export function EmptyState({ onResetFilters, onExploreAll }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Empty State Container */}
      <div className="max-w-md w-full relative z-10">
        {/* Icon Display */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 rounded-full bg-surface-container-highest/30 flex items-center justify-center relative">
            <span className="material-symbols-outlined text-7xl text-on-surface-variant/40 select-none" aria-hidden="true">
              search_off
            </span>
            <div className="absolute inset-0 rounded-full border border-outline-variant/10" />
          </div>
        </div>
        
        {/* Content */}
        <h1 className="text-3xl font-black text-on-surface mb-4 tracking-tight">Sonuç Bulunamadı</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
          Aradığınız kriterlere uygun fotoğraf bulunmamaktadır. Lütfen filtrelerinizi kontrol edin.
        </p>
        
        {/* Actions */}
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={onResetFilters}
            className="bg-primary-container text-white px-8 py-3.5 rounded-xl font-bold tracking-tight hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.2)] flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">filter_alt_off</span>
            Filtreleri Sıfırla
          </button>
          <button
            onClick={onExploreAll}
            className="text-on-surface-variant hover:text-on-surface transition-colors font-medium flex items-center gap-2 px-6 py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container rounded-xl"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">explore</span>
            Tüm Koleksiyonu Gör
          </button>
        </div>
      </div>
    </div>
  );
}
