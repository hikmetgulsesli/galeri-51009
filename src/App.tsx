import { demoPhotos } from './data/photos';

function App() {
  return (
    <div className="min-h-screen bg-[#0b1326]">
      <header className="bg-[#0b1326] flex justify-between items-center px-8 py-4 w-full">
        <h1 className="text-[#dae2fd] font-['Inter'] font-bold text-xl">Foto Galerisi</h1>
        <button className="p-2 text-[#c3c6d7] hover:bg-[#2d3449]/50 transition-all duration-300 rounded-full">
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-6 md:p-12">
        <p className="text-[#c3c6d7]">{demoPhotos.length} fotoğraf</p>
      </main>
    </div>
  );
}

export default App;
