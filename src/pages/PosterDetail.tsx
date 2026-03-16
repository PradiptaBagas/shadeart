import { useParams, Link, useNavigate } from 'react-router-dom';
import { posters } from '../data/posters';
import PosterCarousel from '../components/PosterCarousel';
import { motion } from 'motion/react';
import { ArrowLeft, Instagram, ExternalLink } from 'lucide-react';
import { cn } from '../components/Navbar';

export default function PosterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const poster = posters.find((p) => p.id === id);

  if (!poster) return null; // Logic handle not found

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // h-screen dan overflow-hidden pada desktop agar page tidak scroll jika tidak perlu
      className="min-h-screen lg:h-screen bg-white lg:overflow-hidden flex flex-col"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-black/60 hover:text-black transition-colors mb-8"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Gallery</span>
        </button>

        {/* Container Utama: flex-1 agar memenuhi sisa layar */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center min-h-0">
          
         {/* SISI KIRI: Gambar */}
          <div className="relative w-full flex justify-center overflow-hidden mb-6 lg:mb-0">
            <div 
              className={cn(
                "w-full flex items-center justify-center transition-all duration-500",
                // Portrait: atur potrait biar ngga terlalu raksasa gambarnya
                // Landscape: atur landscape biar ada ruang
                poster.orientation === "portrait"
                ? "max-w-[85vw] sm:max-w-[420px]"
                : "max-w-full lg:max-w-[1050px]"
              )}
            >
              <PosterCarousel images={poster.images} />
            </div>
          </div>

          {/* SISI KANAN: Detail Info */}
          <div className="flex flex-col h-full lg:overflow-y-auto pr-4 custom-scrollbar justify-center py-4">
            <div className="space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 mb-2">
                  {poster.category}
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-4 leading-tight">
                  {poster.title}
                </h1>
                <p className="text-2xl font-medium text-black/80">
                  {poster.price}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold">About this work</h3>
                <p className="text-base text-black/60 leading-relaxed">
                  {poster.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-black/5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-black/40">Production Details</h3>
                <p className="text-sm font-medium text-black/60">
                  {poster.productionDetails}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href={`https://ig.me/m/shdeart?text=Hi%20Shade%2C%20I%20want%20to%20purchase%20the%20poster%20%22${poster.title}%22%20for%20${poster.price}.%20Is%20it%20available%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-black text-white font-bold rounded-2xl hover:bg-black/90 transition-all active:scale-95 text-sm"
                >
                  Purchase Poster
                </a>
                <a
                href={`https://ig.me/m/shdeart?text=Hi%20Shade%2C%20I%20want%20to%20request%20a%20custom%20poster%20similar%20to%20%22${poster.title}%22.%20Can%20we%20discuss%20the%20design%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border-2 border-black text-black font-bold rounded-2xl hover:bg-black/5 transition-all active:scale-95 text-sm"
              >
                <Instagram size={18} />
                Custom Order
              </a>
              </div>

              <p className="text-[10px] text-black/40 leading-relaxed italic pt-4">
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