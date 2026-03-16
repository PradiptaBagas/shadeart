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
      // h-screen dan overflow-hidden adalah harga mati untuk no-scroll desktop
      className="min-h-screen lg:h-screen lg:max-h-screen bg-white lg:overflow-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-4 flex-1 flex flex-col min-h-0">
        
        {/* Back Button - Kita perkecil margin-nya */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-2 lg:mb-4 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Gallery</span>
        </button>

        {/* Container Utama: Kita ganti items-center jadi items-start di desktop */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-16 lg:items-start min-h-0 overflow-hidden">
          
          {/* SISI KIRI: Gambar */}
          <div className="relative w-full flex justify-center lg:justify-start items-start overflow-hidden min-h-0 h-full">
            <div 
              className={cn(
                "w-full transition-all duration-500 flex justify-center",
                // Kita kunci tinggi maksimal lebih ketat lagi (75-80%)
                poster.orientation === "portrait"
                  ? "max-w-[65vw] lg:max-w-[380px] max-h-[45vh] lg:max-h-[80%]"
                  : "max-w-full lg:max-w-[900px] max-h-[35vh] lg:max-h-[75%]"
              )}
            >
              <PosterCarousel images={poster.images} />
            </div>
          </div>

          {/* SISI KANAN: Detail Info */}
          <div className="flex flex-col h-full lg:overflow-y-auto custom-scrollbar justify-start py-2 lg:pt-4">
            {/* Pakai justify-start agar landscape nempel ke atas, gap footer pun jadi konsisten */}
            <div className="space-y-4 lg:space-y-5">
              <div>
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-1">
                  {poster.category}
                </p>
                <h1 className="text-2xl lg:text-4xl font-bold tracking-tighter mb-2 lg:mb-3 leading-tight">
                  {poster.title}
                </h1>
                <p className="text-lg lg:text-xl font-medium text-black/80">
                  {poster.price}
                </p>
              </div>

              <div className="space-y-1 lg:space-y-2">
                <h3 className="text-sm lg:text-base font-bold">About this work</h3>
                <p className="text-xs lg:text-sm text-black/60 leading-relaxed max-w-prose">
                  {poster.description}
                </p>
              </div>

              <div className="space-y-1 pt-3 border-t border-black/5">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/40">Production Details</h3>
                <p className="text-[11px] lg:text-xs font-medium text-black/60">
                  {poster.productionDetails}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://ig.me/m/shdeart`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-black/90 transition-all active:scale-95 text-xs lg:text-sm"
                >
                  Purchase Poster
                </a>
                <a
                  href={`https://ig.me/m/shdeart`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-black text-black font-bold rounded-xl hover:bg-black/5 transition-all active:scale-95 text-xs lg:text-sm"
                >
                  <Instagram size={16} />
                  Custom Order
                </a>
              </div>

              {/* Footer text - nempel rapat di bawah tombol */}
              <p className="text-[8px] lg:text-[10px] text-black/40 leading-relaxed italic pt-1">
                * All posters are printed on high-quality 250gsm matte paper. 
                Worldwide shipping available.
              </p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}