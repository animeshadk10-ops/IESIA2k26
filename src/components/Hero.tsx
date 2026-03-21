import { motion, type Variants } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   UTILITIES & ANIMATIONS
   ═══════════════════════════════════════════════════════════════ */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative w-full h-[100vh] min-h-[900px] flex flex-col items-center overflow-hidden font-sans"
    >
      
      {/* =========================================
          BACKGROUND / ENVIRONMENT
          ========================================= */}
      
      {/* 1. Base Photo Layer: The hero-bg.jpg provided by user */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat"
      />

      {/* 2. Optional subtle overlay to ensure white text pops */}
      <div className="absolute inset-0 z-0 bg-black/10 mix-blend-multiply" />

      {/* =========================================
          MAIN CENTER WRAPPER
          ========================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center flex flex-col items-center justify-center flex-grow -translate-y-8">
        
        {/* Overline */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp}>
          <h2 className="text-white/90 text-sm md:text-base font-bold tracking-[0.25em] uppercase mb-4 md:mb-6 drop-shadow-md">
            2ND INTERNATIONAL CONFERENCE
          </h2>
        </motion.div>

        {/* Massive H1 title with GLOW */}
        <motion.div custom={1} initial="hidden" animate="visible" variants={fadeUp}>
          <h1 className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] font-bold tracking-tighter text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] leading-[0.9] mb-4 md:mb-6">
            IESIA 2025
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div custom={2} initial="hidden" animate="visible" variants={fadeUp}>
          <p className="text-[#FCE4A8] text-base md:text-2xl font-medium mt-2 max-w-3xl mx-auto px-4 drop-shadow-md">
            Intelligent Electrical Systems & Industrial Automation.
          </p>
        </motion.div>

        {/* Glowing Call To Action */}
        <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp} className="mt-8">
          <a href="#registration" className="bg-[#E4AC3D]/90 backdrop-blur-md border border-[#FFD43A] text-gray-900 shadow-[0_0_30px_rgba(228,172,61,0.6)] hover:shadow-[0_0_50px_rgba(255,212,58,0.8)] hover:-translate-y-1 transition-all px-8 py-3.5 md:py-4 rounded-full text-base md:text-lg font-bold flex items-center justify-center gap-3 mx-auto w-fit group">
            Initiate Registration
            
            {/* White Circular Icon inside button */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex justify-center items-center shadow-inner group-hover:bg-[#1B7B79] group-hover:text-white transition-colors">
              <svg className="w-4 h-4 md:w-5 md:h-5 text-current" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </a>
        </motion.div>

        {/* =========================================
            THE GLASS DATA CHIPS (Bottom row)
            ========================================= */}
        <motion.div custom={4} initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap justify-center gap-4 md:gap-6 mt-12 md:mt-16 max-w-5xl mx-auto pb-12 z-10 relative">
          
          {/* Chip 1 */}
          <div className="bg-[#01030D]/40 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 md:px-8 md:py-5 flex flex-col items-center shadow-2xl hover:bg-[#01030D]/60 transition-colors hover:-translate-y-1 w-[240px]">
            <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-1">DATE</span>
            <span className="text-[#E4AC3D] text-lg font-black tracking-wide">10-11 April 2025</span>
          </div>
          
          {/* Chip 2 */}
          <div className="bg-[#01030D]/40 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 md:px-8 md:py-5 flex flex-col items-center shadow-2xl hover:bg-[#01030D]/60 transition-colors hover:-translate-y-1 w-[240px]">
            <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-1">INDEXED IN</span>
            <span className="text-[#E4AC3D] text-lg font-black tracking-wide text-center">Springer Book Series</span>
          </div>

          {/* Chip 3 */}
          <div className="bg-[#01030D]/40 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 md:px-8 md:py-5 flex flex-col items-center shadow-2xl hover:bg-[#01030D]/60 transition-colors hover:-translate-y-1 w-[240px]">
            <span className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-1">VENUE</span>
            <span className="text-[#E4AC3D] text-lg font-black tracking-wide">IEM, Kolkata</span>
          </div>

        </motion.div>

      </div>

      {/* =========================================
          BOTTOM TRANSITION WAVE (Pale Cream)
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none translate-y-[2px]">
        {/* The precise wave path mirroring the aesthetic of the provided image */}
        <svg 
          viewBox="0 0 1440 160" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[80px] md:h-[150px]"
          fill="#FCE4A8"
        >
          <path d="M0,96L48,106.7C96,117,192,139,288,144C384,149,480,139,576,122.7C672,107,768,85,864,85.3C960,85,1056,107,1152,117.3C1248,128,1344,128,1392,128L1440,128L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z"></path>
        </svg>
      </div>

    </section>
  );
}
