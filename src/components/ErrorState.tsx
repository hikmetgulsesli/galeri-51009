interface ErrorStateProps {
  onRetry?: () => void;
  errorCode?: string;
}

export function ErrorState({ onRetry, errorCode = 'ERR_CONNECTION_FAILED' }: ErrorStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center relative min-h-[60vh]">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-error/5 rounded-full blur-[80px] -z-10" />
      
      {/* Empty Grid Skeleton (Faint in the background to suggest broken state) */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-8 p-12 -z-20 opacity-5 pointer-events-none">
        <div className="aspect-[3/4] bg-surface-container rounded-xl" />
        <div className="aspect-[4/5] bg-surface-container rounded-xl mt-12" />
        <div className="aspect-square bg-surface-container rounded-xl" />
        <div className="aspect-[3/4] bg-surface-container rounded-xl mt-6" />
        <div className="aspect-[4/3] bg-surface-container rounded-xl" />
        <div className="aspect-square bg-surface-container rounded-xl -mt-8" />
        <div className="aspect-[3/4] bg-surface-container rounded-xl" />
        <div className="aspect-[5/7] bg-surface-container rounded-xl mt-4" />
      </div>

      {/* Error Content Card */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Error Icon Cluster */}
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center border border-outline-variant/10">
            <span className="material-symbols-outlined text-error text-5xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
              error_outline
            </span>
          </div>
          {/* Small pulsing indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full animate-pulse border-2 border-background" />
        </div>
        
        {/* Text Content */}
        <div className="space-y-4">
          <h1 className="text-white text-3xl md:text-4xl font-black tracking-tight leading-tight">
            Bir Hata Oluştu
          </h1>
          <p className="text-on-surface-variant leading-relaxed font-medium">
            Fotoğraflar yüklenirken bir sorunla karşılaştık. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.
          </p>
        </div>
        
        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onRetry}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-primary-container rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl" aria-hidden="true">refresh</span>
              Tekrar Dene
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-container to-[#4176f5] opacity-100 transition-opacity" />
          </button>
        </div>
        
        {/* Technical Details (Low emphasis) */}
        <div className="pt-8 opacity-40">
          <p className="text-[0.7rem] uppercase tracking-widest font-bold text-on-surface-variant">
            Hata Kodu: {errorCode}
          </p>
        </div>
      </div>
    </div>
  );
}
