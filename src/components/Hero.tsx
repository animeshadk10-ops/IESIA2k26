import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen bg-gradient-to-br from-[#1B7B79] to-[#6BC4C8] overflow-hidden flex flex-col justify-between">
      {/* =========================================
          BACKGROUND: IMAGE & SOFT BLEND
          ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* User's Uploaded Background Image (Audience/Architecture) blended with the Teal Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
          style={{ backgroundImage: 'url("/hero-bg.jpg")' }}
        />
        {/* Soft vignette for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B7B79]/80 via-transparent to-black/30" />
      </div>



      {/* =========================================
          2. THE HERO CONTENT (Centered Minimalism)
          ========================================= */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 w-full h-full pb-32">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#FCE4A8] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-6"
        >
          2ND INTERNATIONAL CONFERENCE
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white tracking-tighter leading-[1] md:leading-[0.95] mb-4 md:mb-6 drop-shadow-2xl px-4"
        >
          IESIA 2025
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[#FCE4A8]/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10 md:mb-12 shadow-sm px-4"
        >
          Intelligent Electrical Systems & Industrial Automation.
        </motion.p>

        {/* =========================================
            3. THE ACTION PILL
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full sm:w-auto px-6 sm:px-0"
        >
          <a href="#registration" className="group rounded-full bg-[#E4AC3D] pl-6 sm:pl-8 pr-2 py-2 flex items-center justify-between sm:justify-start gap-4 sm:gap-6 hover:bg-[#FFD43A] transition-all duration-300 shadow-xl shadow-[#E4AC3D]/20 hover:shadow-[#FFD43A]/40 hover:-translate-y-1 w-full sm:w-auto">
            <span className="text-[#1B7B79] text-sm sm:text-base font-bold tracking-wide">
              Initiate Registration
            </span>
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full bg-white text-[#1B7B79] flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-md">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="translate-x-[1px]">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[2px]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[100px] md:h-[150px]"
          fill="#FCE4A8"
        >
          <path d="M0,30 C300,100 600,-40 1200,30 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
