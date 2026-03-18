import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Venue() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="venue" className="relative w-full bg-[#1B7B79] pt-16 md:pt-32 pb-16 overflow-hidden" ref={ref}>
      {/* =========================================
          TOP TRANSITION WAVE (Pale Cream to Deep Teal)
          ========================================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0 -translate-y-[2px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[150px] md:h-[200px]" fill="#FCE4A8">
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mt-16 md:mt-24">
        <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 30 }}
           animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 p-8 lg:p-12 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left Column (Details) */}
            <div className="flex-1 flex flex-col justify-center text-left w-full">
              <h2 className="text-[#E4AC3D] text-4xl md:text-5xl lg:text-6xl font-black mb-6 uppercase tracking-wide drop-shadow-md">
                Conference Venue
              </h2>
              <h3 className="text-white text-2xl lg:text-3xl font-bold tracking-wide mb-3">
                IEM Kolkata
              </h3>
              <p className="text-[#6BC4C8] text-lg lg:text-xl font-medium leading-relaxed mb-10 max-w-lg">
                JDS House, Electronics Complex, Gurukul, Y-12, EP Block, Sector V, Bidhannagar, Kolkata, West Bengal 700091
              </p>
              
              <a 
                href="https://goo.gl/maps/placeholder" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-fit bg-[#FFD43A] text-[#1B7B79] font-black uppercase tracking-wider px-8 py-4 rounded-full shadow-[0_4px_20px_rgba(255,212,58,0.4)] hover:bg-white hover:scale-105 transition-all duration-300"
              >
                Get Directions &rarr;
              </a>
            </div>

            {/* Right Column (The Map) */}
            <div className="flex-1 w-full relative">
              <div className="w-full aspect-video lg:aspect-square max-h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 relative z-10 group">
                <div className="absolute inset-0 bg-[#E4AC3D]/20 mix-blend-overlay pointer-events-none z-20 transition-opacity duration-500 group-hover:opacity-0" />
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3a0275cc1eb3e0ab%3A0xbcc0e52dd49dffd6!2sInstitute%20of%20Engineering%20%26%20Management%20(IEM)!5e0!3m2!1sen!2sin!4v1714412345678!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full contrast-125 saturate-150 transition-all duration-700"
                  title="IEM Kolkata Map"
                ></iframe>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
