import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'All Works', path: '/' },
    { name: 'Film', path: '/?category=Film' },
    { name: 'Song', path: '/?category=Song' },
    { name: 'Company', path: '/?category=Company' },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname + location.search;
    if (path === '/') {
      return currentPath === '/' || currentPath === '';
    }
    return currentPath === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center hover:opacity-85 transition-opacity">
              <img 
                src="/bgshade.png"
                alt="Shade Logo" 
                className="h-30 w-auto object-contain" //(h-8 = 32px)
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors duration-200",
                  isActive(link.path) 
                    ? "text-black underline underline-offset-4"
                    : "text-black/60 hover:text-black"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Store Button */}
          <div className="hidden md:flex items-center">
            <a
              href="https://shade-store.example.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-all active:scale-95"
            >
              <ShoppingBag size={16} />
              Official Store Shade
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black/60 hover:text-black transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 w-full bg-white border-b border-black/5 transition-all duration-300 ease-in-out overflow-hidden",
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "block text-lg font-medium transition-colors",
                isActive(link.path) ? "text-black" : "text-black/60"
              )}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://shade-store.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-black text-white text-sm font-medium rounded-xl"
          >
            <ShoppingBag size={16} />
            Official Store Shade
          </a>
        </div>
      </div>
    </nav>
  );
}