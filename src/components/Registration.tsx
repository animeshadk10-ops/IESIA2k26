import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   DATA MAPPING
   ═══════════════════════════════════════════════════════════════ */
const indianPricing = [
  { role: 'Student', price: 'Rs. 4000', featured: true },
  { role: 'Faculty / Post Doc', price: 'Rs. 4500' },
  { role: 'Corporate', price: 'Rs. 5000', featured: true },
  { role: 'Participation Only', price: 'Rs. 1000' },
  { role: 'Double Submission', price: 'Rs. 8000' }
];

const foreignPricing = [
  { role: 'Faculty / Post Doc', price: '$ 100', featured: false },
  { role: 'Double Submission', price: '$ 150', featured: false }
];

/* ═══════════════════════════════════════════════════════════════
   SECTION 1: THE SCOPUS BANNER & TOGGLE
   ═══════════════════════════════════════════════════════════════ */
function VaultHeader({ isIndian, setIsIndian }: { isIndian: boolean, setIsIndian: (v: boolean) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div 
      ref={ref} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
      className="w-full relative py-16 flex flex-col items-center justify-center text-center px-4 z-10"
    >
      {/* Ambient Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#6BC4C8]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* STEP 1: THE SCOPUS HERO TEXT */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto relative z-10">
        <span className="text-[#E4AC3D] text-sm font-black tracking-[0.3em] uppercase mb-4">
          ALL ACCEPTED PROCEEDINGS WILL BE PUBLISHED IN
        </span>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none text-center text-white drop-shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
          SCOPUS INDEXED BOOK SERIES
        </h1>
      </div>

      {/* STEP 2: THE GLOWING DIVIDER */}
      <div className="h-px w-full max-w-5xl mx-auto bg-gradient-to-r from-transparent via-[#6BC4C8]/40 to-transparent my-12" />

      {/* STEP 3: REGISTRATION TIERS & TOGGLE */}
      <h2 className="text-[#FCE4A8] text-3xl md:text-4xl font-extrabold tracking-[0.15em] uppercase mb-8 text-center drop-shadow-md">
        REGISTRATION TIERS
      </h2>

      {/* Premium Glass Toggle */}
      <div className="bg-[#01030D]/20 backdrop-blur-xl border border-white/10 rounded-full p-1.5 inline-flex relative mx-auto shadow-inner">
        {['INDIAN (INR)', 'FOREIGN (USD)'].map((label, index) => {
          const isThisIndian = index === 0;
          const isActive = isIndian === isThisIndian;
          return (
            <button
              key={label}
              onClick={() => setIsIndian(isThisIndian)}
              className={`relative z-10 px-8 py-3 w-40 md:w-48 rounded-full text-sm font-bold tracking-widest uppercase transition-colors duration-300 outline-none ${
                isActive ? 'text-[#1B7B79]' : 'text-white/70 hover:text-white'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="currencyTogglePill"
                  className="absolute inset-0 bg-[#6BC4C8] rounded-full shadow-[0_0_15px_rgba(107,196,200,0.4)]"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2: PRICING MONOLITHS
   ═══════════════════════════════════════════════════════════════ */
function PricingMonoliths({ isIndian }: { isIndian: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const pricingData = isIndian ? indianPricing : foreignPricing;

  return (
    <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pb-24">
      <AnimatePresence mode="wait">
        <motion.div 
          key={isIndian ? 'inr' : 'usd'}
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`grid gap-8 ${
            pricingData.length > 3 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'
          }`}
        >
          {pricingData.map((tier, i) => (
            <motion.div 
              key={tier.role} custom={i} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
              className={`relative group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 flex flex-col justify-between hover:-translate-y-3 hover:bg-white/10 hover:border-[#6BC4C8]/60 hover:shadow-[0_20px_50px_rgba(107,196,200,0.2)] transition-all duration-500 min-h-[260px] 
              ${i === 3 && pricingData.length === 5 ? 'lg:col-start-2 lg:translate-x-[-50%]' : ''} 
              ${i === 4 && pricingData.length === 5 ? 'lg:col-start-3 lg:translate-x-[-50%]' : ''}`}
            >            
               <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity text-[#6BC4C8] pointer-events-none">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
               </div>

              <div>
                <h5 className="text-[#FCE4A8]/70 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2 group-hover:text-[#FCE4A8] transition-colors">
                  {tier.featured ? 'Premium Pass' : 'Tier Detail'}
                </h5>
                <h4 className="text-white text-2xl font-bold mt-2 drop-shadow-md">
                  {tier.role}
                </h4>
              </div>
              
              <div className="mt-8 flex items-baseline">
                <span className="text-[#6BC4C8] text-5xl md:text-6xl font-black mt-6 group-hover:text-white transition-colors duration-500 drop-shadow-[0_0_15px_rgba(107,196,200,0.3)]">
                  {tier.price}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3: SECURE FINTECH BANK TERMINAL
   ═══════════════════════════════════════════════════════════════ */
function BankTerminal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pb-32">
      <motion.div custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}>
        <div className="bg-[#01030D]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group">
            
            {/* Ambient terminal scanner effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00E5FF] opacity-0 group-hover:opacity-30 group-hover:animate-pulse transition-opacity duration-1000" />

            <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
              <svg className="w-8 h-8 text-[#E4AC3D]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
              <h4 className="text-[#E4AC3D] font-black text-xl md:text-2xl uppercase tracking-widest drop-shadow-[0_0_10px_rgba(228,172,61,0.5)]">
                Secure Wire Transfer Details
              </h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 text-sm md:text-base text-white relative">
              
              <div className="flex flex-col">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Bank Institution</span>
                <span className="font-bold text-lg text-white">IDBI Bank Ltd</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Branch</span>
                <span className="font-bold text-lg text-white">Sector-V</span>
              </div>
              
              <div className="flex flex-col md:col-span-2">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Registered Address</span>
                <span className="font-medium text-white/80">D-1 Salt Lake Electronics Complex, Sector-V, Kolkata- 700091</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">IFSC Code</span>
                <span className="font-mono text-xl tracking-wider text-[#FFD43A] bg-[#FFD43A]/10 px-4 py-2 rounded-lg inline-block mt-1 border border-[#FFD43A]/20 w-fit">
                  IBKL0000184
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">MICR Code</span>
                <span className="font-mono text-xl tracking-wider text-white bg-white/5 px-4 py-2 rounded-lg inline-block mt-1 border border-white/10 w-fit">
                  700259009
                </span>
              </div>

              <div className="flex flex-col md:col-span-2 mt-4">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Beneficiary Account Name</span>
                <span className="font-bold text-lg text-white">Institute of Engineering & Management Trust</span>
              </div>
              
              <div className="flex flex-col md:col-span-2">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Account Number</span>
                <span className="font-mono text-2xl md:text-3xl font-black tracking-widest text-[#00E5FF] bg-[#00E5FF]/10 px-5 py-3 rounded-xl inline-block mt-1 border border-[#00E5FF]/20 w-fit shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                  184104000054214
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[#6BC4C8] text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Account Type</span>
                <span className="font-bold text-lg text-white bg-white/5 px-4 py-1.5 rounded-lg inline-block w-fit">Savings</span>
              </div>
            </div>

            {/* Verification Step Box */}
            <div className="border border-[#6BC4C8]/40 bg-[#6BC4C8]/5 p-6 rounded-2xl mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#6BC4C8]/10 rounded-full blur-2xl pointer-events-none" />
               <div>
                  <span className="text-[#E4AC3D] text-[10px] font-black uppercase tracking-[0.2em] block mb-2 drop-shadow-sm">Mandatory Verification Step</span>
                  <span className="text-white font-medium text-sm md:text-base">Mail your transaction receipt to:</span>
               </div>
               <a href="mailto:IESIA2025@iem.edu.in" className="text-[#1B7B79] bg-[#6BC4C8] hover:bg-white px-6 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(107,196,200,0.4)] whitespace-nowrap">
                  IESIA2025@iem.edu.in
               </a>
            </div>
            
            <div className="mt-8 text-xs text-white/50 font-medium uppercase tracking-widest text-center border-t border-white/5 pt-6">
              IFSC required for National transfers // SWIFT required for International transfers
            </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Registration() {
  const [isIndian, setIsIndian] = useState(true);

  return (
    <section id="registration" className="relative w-full overflow-hidden bg-[#1B7B79]">
      
      {/* =========================================
          AMBIENT VAULT BACKGROUND (Deep Teal Spotlight)
          ========================================= */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(107,196,200,0.15),_transparent_70%)] pointer-events-none z-0" />
      
      {/* Orb 1: Center Left Aqua */}
      <div className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] bg-[#6BC4C8]/30 rounded-full mix-blend-overlay blur-[150px] pointer-events-none z-0" />
      
      {/* Orb 2: Center Right Cream */}
      <div className="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] bg-[#FCE4A8]/20 rounded-full mix-blend-overlay blur-[150px] pointer-events-none z-0" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
           style={{ 
             backgroundImage: `linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)`,
             backgroundSize: '80px 80px' 
           }} 
      />

      <div className="relative z-10 w-full flex flex-col pt-12">
        <VaultHeader isIndian={isIndian} setIsIndian={setIsIndian} />
        <PricingMonoliths isIndian={isIndian} />
        <BankTerminal />
      </div>

      {/* =========================================
          SVG SWEEPING DIVIDER DOWN TO FOOTER
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-30 translate-y-[2px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[100px] md:h-[150px]"
          fill="#01030D" /* Seamless transition out (Maybe to Speakers/Footer) */
        >
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
