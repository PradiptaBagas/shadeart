import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router-dom'; // Tambahkan ini
import { Poster } from '../data/posters';
import PosterCard from './PosterCard';

interface GalleryGridProps {
  posters: Poster[];
}

export default function GalleryGrid({ posters }: GalleryGridProps) {
  const location = useLocation();
  
  // Logic untuk cek apakah kita sedang memfilter kategori
  // true jika URL mengandung "?category="
  const isFiltered = location.search.includes('category');

  const portrait = posters.filter(p => p.orientation === "portrait");
  const landscape = posters.filter(p => p.orientation === "landscape");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* 1. KONDISI: (PINTEREST STYLE) */}
      {isFiltered ? (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {posters.map((poster) => (
              <div key={poster.id} className="break-inside-avoid mb-6">
                <PosterCard poster={poster} />
              </div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        
        /* 2. KONDISI: (LAYOUT SPLIT BIASA) */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* LEFT SIDE - PORTRAIT */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {portrait.map((poster) => (
                <PosterCard key={poster.id} poster={poster} />
              ))}
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - LANDSCAPE */}
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {landscape.map((poster) => (
                <PosterCard key={poster.id} poster={poster} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* KALAU DATA KOSONG */}
      {posters.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-black/40">
          <p className="text-lg font-medium">No posters found in this category.</p>
        </div>
      )}

    </div>
  );
}