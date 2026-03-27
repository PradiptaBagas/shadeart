/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PosterDetail from './pages/PosterDetail';
import ChatWidget from './components/ChatWidget';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-black antialiased">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/poster/:id" element={<PosterDetail />} />
        </Routes>
        
        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-xl font-bold tracking-tighter">SHADE</div>
            <div className="flex gap-8 text-sm font-medium text-black/40">
            <a 
              href="https://www.instagram.com/shdeart?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Instagram
            </a>

            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Shade Official
            </a>

            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Behance
            </a>
            </div>
            <div className="text-xs text-black/20">
              © 2025 Shade Art Collective. All rights reserved.
            </div>
          </div>
        </footer>
        <ChatWidget />
      </div>
    </Router>
  );
}

