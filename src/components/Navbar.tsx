"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = ['Home', 'About', 'Tracks', 'Speakers', 'Dates', 'Committee'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
        isScrolled
          ? 'bg-[#01030D]/85 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 flex-shrink-0 relative z-20 hover:scale-105 transition-transform group">
          <img 
            src="/Logos/iesialogo.png" 
            alt="IESIA Logo" 
            className="w-10 h-10 md:w-12 md:h-12 object-contain"
          />
          <span className="text-[#FFD43A] text-xl md:text-2xl font-black tracking-widest uppercase">
            IESIA
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link === 'Home' ? 'hero' : link.toLowerCase()}`}
              className="text-white/80 font-medium text-sm hover:text-[#FFD43A] transition-colors uppercase tracking-wider"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#registration"
            className="inline-block bg-gradient-to-r from-[#FFD43A] to-[#E4AC3D] text-[#1B7B79] px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(255,212,58,0.4)] hover:shadow-[0_0_25px_rgba(255,212,58,0.6)] hover:scale-105 transition-all"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center relative z-20">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#FFD43A] p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-8 h-8 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] w-screen h-screen bg-[#01030D]/95 backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden md:hidden shadow-2xl"
          >
            {/* Close 'X' Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-6 p-2 text-[#FFD43A] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Mobile Menu"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Staggered Mobile Links */}
            <motion.div 
              initial="hidden" animate="visible" exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link === 'Home' ? 'hero' : link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="text-3xl font-black tracking-widest uppercase text-white/90 hover:text-[#FFD43A] hover:scale-110 transition-all duration-300"
                >
                  {link}
                </motion.a>
              ))}
              
              <motion.a
                href="#registration"
                onClick={() => setMobileMenuOpen(false)}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="mt-10 bg-gradient-to-r from-[#FFD43A] to-[#E4AC3D] text-[#1B7B79] px-12 py-4 rounded-full text-2xl font-black shadow-[0_0_25px_rgba(228,172,61,0.6)] hover:scale-105 transition-all duration-300 uppercase tracking-widest"
              >
                Register Now
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
