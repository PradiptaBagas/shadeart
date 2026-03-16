import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PosterCarouselProps {
  images: string[];
}
export default function PosterCarousel({ images }: PosterCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Class dasar untuk wrapper agar gambar tetap konsisten
const containerStyle = "relative w-full overflow-hidden rounded-3xl bg-neutral-100 shadow-lg";

  if (images.length === 1) {
    return (
      <div className={containerStyle}>
        <img
          src={images[0]}
          alt="Poster"
          referrerPolicy="no-referrer"
          // Pakai h-auto agar tinggi mengikuti proporsi asli gambar
          className="w-full h-auto block"
        />
      </div>
    );
  }

  return (
    <div className={`${containerStyle} group`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Poster ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          referrerPolicy="no-referrer"
          // w-full h-auto adalah kunci agar landscape melebar dan portrait memanjang secara jujur
          className="w-full h-auto block"
        />
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-black w-6" : "bg-black/20 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}