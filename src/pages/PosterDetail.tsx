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
      // h-screen & overflow-hidden untuk memastikan tidak ada scroll di desktop
      className="min-h-screen lg:h-screen lg:max-h-screen bg-white lg:overflow-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-4 flex-1 flex flex-col min-h-0">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-2 lg:mb-6 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Gallery</span>
        </button>

        {/* Container Utama: Menggunakan items-start agar sejajar dari atas */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-16 items-start min-h-0">
          
          {/* SISI KIRI: Gambar Poster sejajar dengan kategori di kanan */}
          <div className="relative w-full flex justify-center lg:justify-start items-start min-h-0 pt-1">
            <div 
              className={cn(
                "w-full transition-all duration-500 flex justify-center",
                // Kunci tinggi gambar agar tidak melebihi sisa layar desktop
                poster.orientation === "portrait"
                  ? "max-w-[65vw] lg:max-w-[420px] max-h-[45vh] lg:max-h-[78vh]"
                  : "max-w-full lg:max-w-[900px] max-h-[35vh] lg:max-h-[60vh]"
              )}
            >
              <PosterCarousel images={poster.images} />
            </div>
          </div>

          {/* SISI KANAN: Detail Info */}
          <div className="flex flex-col h-full lg:overflow-y-auto custom-scrollbar pt-0">
            <div className="space-y-4 lg:space-y-6">
              <div>
                {/* Teks Kategori sebagai jangkar sejajar dengan atas gambar */}
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-1 lg:mb-2">
                  {poster.category}
                </p>
                <h1 className="text-2xl lg:text-5xl font-bold tracking-tighter mb-2 lg:mb-4 leading-tight">
                  {poster.title}
                </h1>
                <p className="text-lg lg:text-2xl font-medium text-black/80">
                  {poster.price}
                </p>
              </div>

              <div className="space-y-1 lg:space-y-3">
                <h3 className="text-sm lg:text-lg font-bold">About this work</h3>
                <p className="text-xs lg:text-base text-black/60 leading-relaxed max-w-prose">
                  {poster.description}
                </p>
              </div>

              <div className="space-y-1 lg:space-y-3 pt-3 lg:pt-4 border-t border-black/5">
                <h3 className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-black/40">Production Details</h3>
                <p className="text-[11px] lg:text-sm font-medium text-black/60">
                  {poster.productionDetails}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2">
                <a
                  href={`https://ig.me/m/shdeart`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 lg:py-4 bg-black text-white font-bold rounded-xl lg:rounded-2xl hover:bg-black/90 transition-all active:scale-95 text-xs lg:text-sm"
                >
                  Purchase Poster
                </a>
                <a
                  href={`https://ig.me/m/shdeart`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 lg:py-4 border-2 border-black text-black font-bold rounded-xl lg:rounded-2xl hover:bg-black/5 transition-all active:scale-95 text-xs lg:text-sm"
                >
                  <Instagram size={16} />
                  Custom Order
                </a>
              </div>

              {/* Footer text rapat di bawah tombol untuk mencegah overflow */}
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