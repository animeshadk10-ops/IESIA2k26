import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = ['Home', 'About', 'Tracks', 'Speakers', 'Dates', 'Committee'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4 transition-all duration-300"
    >
      <div 
        className={`w-full flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-2xl bg-[#1B7B79]/85 border border-white/20 shadow-2xl shadow-[#1B7B79]/20'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Brand */}
        <a href="#" className="text-[#FCE4A8] text-xl font-black tracking-widest uppercase relative z-20">
          IESIA
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2 relative">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative px-4 py-2 text-sm font-medium text-[#FCE4A8] transition-colors rounded-full"
            >
              {hoveredLink === link && (
                <motion.div
                  layoutId="navbar-hover-bubble"
                  className="absolute inset-0 bg-[#6BC4C8]/30 rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{link}</span>
            </a>
          ))}
        </div>

        {/* CTA (Desktop) */}
        <div className="hidden md:block">
          <a
            href="#register"
            className="inline-block bg-[#E4AC3D] text-[#1B7B79] font-bold px-6 py-2 rounded-full hover:bg-[#FFD43A] hover:scale-105 hover:shadow-[0_0_15px_rgba(228,172,61,0.6)] transition-all duration-300"
          >
            Register
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center relative z-20">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#FCE4A8] p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            className="fixed inset-0 z-[999] w-screen h-screen bg-[#1B7B79] flex flex-col items-center justify-center overflow-hidden md:hidden"
          >
            {/* Close 'X' Button */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#FCE4A8] hover:text-white transition-colors cursor-pointer"
              aria-label="Close Mobile Menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Staggered Links */}
            <motion.div 
              initial="hidden" animate="visible" exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="text-3xl font-black tracking-wide text-[#FCE4A8] hover:text-[#FFD43A] hover:scale-110 transition-all duration-300"
                >
                  {link}
                </motion.a>
              ))}
              
              <motion.a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8 bg-[#E4AC3D] text-[#1B7B79] px-12 py-4 rounded-full text-2xl font-bold shadow-[0_0_20px_rgba(228,172,61,0.5)] hover:scale-105 transition-all duration-300"
              >
                Register Now
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
