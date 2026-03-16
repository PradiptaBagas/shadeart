import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Poster } from '../data/posters';
import React from 'react';

interface PosterCardProps {
  poster: Poster;
}

const PosterCard: React.FC<PosterCardProps> = ({ poster }) => {
  // Gunakan data orientation dari props poster
  const isLandscape = poster.orientation === "landscape";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl bg-neutral-100 hover:scale-[1.02] transition w-full"
    >
      <Link to={`/poster/${poster.id}`} className="block w-full">
        {/* kunci rasionya disini */}
        <div className={`relative w-full overflow-hidden ${
          isLandscape ? 'aspect-[16/10]' : 'aspect-[3/4]'
        }`}>
          <img
            src={poster.images[0]}
            alt={poster.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            // object-cover penting biar gambar nggak penyet/gepeng
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">
                {poster.category}
              </p>
              <h3 className="text-white text-xl font-bold tracking-tight">
                {poster.title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PosterCard;

