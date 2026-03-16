import { useSearchParams } from 'react-router-dom';
import { posters } from '../data/posters';
import GalleryGrid from '../components/GalleryGrid';
import { motion } from 'motion/react';

export default function Home() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredPosters = categoryFilter
    ? posters.filter((p) => p.category === categoryFilter)
    : posters;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      {/* Hero Section
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
          >
            Shade Art Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-black/60 font-medium leading-relaxed"
          >
            A curated collection of visual storytelling. From cinematic posters to corporate identities, crafted with precision by the Shade team.
          </motion.p>
        </div>
      </header> */}

      {/* Category Tabs (Optional but nice for UX)
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-8">
        <div className="flex flex-wrap gap-4 border-b border-black/5 pb-4">
          <FilterButton label="All Works" active={!categoryFilter} to="/" />
          <FilterButton label="Film" active={categoryFilter === 'Film'} to="/?category=Film" />
          <FilterButton label="Song" active={categoryFilter === 'Song'} to="/?category=Song" />
          <FilterButton label="Company" active={categoryFilter === 'Company'} to="/?category=Company" />
        </div>
      </div> */}
      <GalleryGrid posters={filteredPosters} />
    </motion.main>
  );
}

function FilterButton({ label, active, to }: { label: string; active: boolean; to: string }) {
  return (
    <a
      href={to}
      className={`text-sm font-semibold px-4 py-2 rounded-full transition-all ${
        active 
          ? "bg-black text-white" 
          : "bg-neutral-100 text-black/60 hover:bg-neutral-200"
      }`}
    >
      {label}
    </a>
  );
}