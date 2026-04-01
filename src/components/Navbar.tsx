"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'TRACKS', href: '#tracks' },
  { label: 'SPEAKERS', href: '#speakers' },
  { label: 'DATES', href: '#dates' },
  { label: 'COMMITTEE', href: '#committee' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          FLOATING GLASS PILL NAVBAR
          ───────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-2 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-[100]"
      >
        <div
          className={`
            bg-[#01030D]/40 backdrop-blur-2xl border border-white/10 rounded-full 
            px-6 py-3 flex items-center justify-between 
            shadow-[0_20px_40px_rgba(0,0,0,0.4)]
            transition-all duration-500
            ${scrolled ? 'bg-[#01030D]/70 shadow-[0_20px_60px_rgba(0,0,0,0.6)]' : ''}
          `}
        >
          {/* ── BRAND ZONE ── */}
          <a href="#hero" className="flex items-center gap-3 shrink-0 hover:scale-105 transition-transform duration-300">
            {/* Logo */}
            <div className="relative h-14 w-14 md:h-16 md:w-16 shrink-0 flex items-center justify-center">
              <img
                src="/Logos/IESIA26_logo.png"
                alt="IESIA 2026 Logo"
                className="object-contain w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
              />
            </div>
            <span className="text-[#FFD43A] text-xl font-black tracking-[0.15em] drop-shadow-[0_0_10px_rgba(255,212,58,0.3)] uppercase">
              IESIA 2026
            </span>
          </a>

          {/* ── NAV LINKS (Desktop) ── */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative group text-white text-xs font-bold tracking-[0.1em] uppercase opacity-80 hover:opacity-100 hover:text-[#FFD43A] hover:drop-shadow-[0_0_10px_rgba(255,212,58,0.6)] transition-all duration-300"
              >
                {label}
                {/* Animated underline */}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-[#FFD43A] group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* ── ACTION BUTTON + MOBILE HAMBURGER ── */}
          <div className="flex items-center gap-4">
            <a
              href="#registration"
              className="hidden sm:inline-block bg-gradient-to-r from-[#FFD43A] to-[#E4AC3D] text-[#01030D] text-xs font-bold tracking-wide uppercase px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(228,172,61,0.4)] hover:shadow-[0_0_30px_rgba(228,172,61,0.7)] hover:scale-105 transition-all duration-300"
            >
              REGISTER
            </a>
            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-[#FFD43A] p-1 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ─────────────────────────────────────────────────────────
          FULL-SCREEN MOBILE OVERLAY
          ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] w-screen h-screen bg-[#01030D]/95 backdrop-blur-3xl flex flex-col items-center justify-center lg:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-8 right-6 text-[#FFD43A] p-2"
              aria-label="Close Menu"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="flex flex-col items-center gap-8"
            >
              {NAV_LINKS.map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  className="text-3xl font-black tracking-widest uppercase text-white/90 hover:text-[#FFD43A] hover:scale-110 transition-all duration-300"
                >
                  {label}
                </motion.a>
              ))}

              <motion.a
                href="#registration"
                onClick={() => setMobileOpen(false)}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="mt-8 bg-gradient-to-r from-[#FFD43A] to-[#E4AC3D] text-[#01030D] px-12 py-4 rounded-full text-xl font-black shadow-[0_0_25px_rgba(228,172,61,0.6)] hover:scale-105 transition-all duration-300 uppercase tracking-widest"
              >
                Register Now
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
