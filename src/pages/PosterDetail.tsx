import { useParams, useNavigate } from 'react-router-dom';
import { posters } from '../data/posters';
import PosterCarousel from '../components/PosterCarousel';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram } from 'lucide-react';
import { cn } from '../components/Navbar';

export default function PosterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const poster = posters.find((p) => p.id === id);

  if (!poster) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Tetap menjaga agar tidak scroll di desktop, tapi memberikan fleksibilitas tinggi
      className="lg:h-[calc(100vh-160px)] lg:max-h-[calc(100vh-160px)] bg-white lg:overflow-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6 flex-1 flex flex-col min-h-0 w-full">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-4 lg:mb-8 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Gallery</span>
        </button>

        {/* Grid: Mengubah col ratio dari 1.2fr menjadi 1fr agar gap mengecil dan gambar tidak terlalu besar */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-2 items-start min-h-0 w-full overflow-hidden">
          
          {/* SISI KIRI: Gambar Poster */}
          <div className="relative w-full flex justify-center lg:justify-center items-start min-h-0">
            <div 
              className={cn(
                "w-full transition-all duration-500",
                // Menghapus max-h yang kaku agar gambar tidak terpotong, 
                // Menggunakan max-w yang lebih kecil agar otomatis gambar mengecil secara proporsional
                poster.orientation === "portrait"
                  ? "max-w-[320px] lg:max-w-[370px]" 
                  : "max-w-full lg:max-w-[550px]"
              )}
            >
              <PosterCarousel images={poster.images} />
            </div>
          </div>

          {/* SISI KANAN: Detail Info */}
          <div className="flex flex-col h-full min-h-0 w-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <div className="space-y-6 lg:space-y-8 w-full">
                <div>
                  <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-1 lg:mb-2">
                    {poster.category}
                  </p>
                  <h1 className="text-2xl lg:text-5xl font-bold tracking-tighter mb-2 lg:mb-4 leading-tight break-words">
                    {poster.title}
                  </h1>
                  <p className="text-lg lg:text-2xl font-medium text-black/80">
                    {poster.price}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm lg:text-lg font-bold uppercase tracking-tight">About this work</h3>
                  <p className="text-xs lg:text-base text-black/60 leading-relaxed whitespace-pre-wrap break-words">
                    {poster.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-black/5">
                  <h3 className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-black/40">Production Details</h3>
                  <p className="text-[11px] lg:text-sm font-medium text-black/60 break-words">
                    {poster.productionDetails}
                  </p>
                </div>
              </div>
            </div>

            {/* Tombol Statis */}
            <div className="pt-6 space-y-4 bg-white">
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <a
                  href={`https://ig.me/m/shdeart`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 lg:py-4 bg-black text-white font-bold rounded-xl lg:rounded-2xl hover:bg-black/90 transition-all active:scale-95 text-xs lg:text-sm shrink-0"
                >
                  Purchase Poster
                </a>
                <a
                  href={`https://ig.me/m/shdeart`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 lg:py-4 border-2 border-black text-black font-bold rounded-xl lg:rounded-2xl hover:bg-black/5 transition-all active:scale-95 text-xs lg:text-sm shrink-0"
                >
                  <Instagram size={16} />
                  Custom Order
                </a>
              </div>
              <p className="text-[9px] lg:text-[11px] text-black/30 italic pb-2">
                * All posters are printed on high-quality 250gsm matte paper.
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}