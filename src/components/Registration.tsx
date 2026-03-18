import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
   SECTION 1: THE SCOPUS RIBBON
   ═══════════════════════════════════════════════════════════════ */
function ScopusRibbon() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div 
      ref={ref} custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
      className="w-full relative py-12 md:py-16 flex flex-col items-center justify-center text-center px-4"
    >
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border-y border-white/20" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <h4 className="text-[#FCE4A8] text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-4">
          All Accepted Proceedings Will Be Published In
        </h4>
        <h2 className="text-white font-black uppercase text-3xl md:text-5xl lg:text-6xl tracking-wide drop-shadow-lg">
          Scopus Indexed Book Series
        </h2>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2: THE PRICING MATRIX
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

function PricingMatrix() {
  const [isIndian, setIsIndian] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const pricingData = isIndian ? indianPricing : foreignPricing;

  return (
    <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-16">
      <motion.div custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} className="flex flex-col items-center mb-16">
        <h3 className="text-[#FCE4A8] font-black uppercase tracking-[0.1em] text-3xl md:text-5xl mb-8">
          Registration Tiers
        </h3>
        
        {/* Toggle Switch */}
        <div className="flex items-center p-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full w-fit mx-auto relative shadow-xl shadow-[#1B7B79]/20">
          <div className={`absolute top-1.5 bottom-1.5 w-[50%] bg-[#6BC4C8] rounded-full transition-transform duration-500 ease-out shadow-sm ${isIndian ? 'translate-x-[2px]' : 'translate-x-[calc(100%-2px)]'}`} />
          <button 
            className={`relative z-10 px-6 py-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-300 w-36 md:w-48 ${isIndian ? 'text-[#1B7B79]' : 'text-white'}`}
            onClick={() => setIsIndian(true)}
          >
            INDIAN (INR)
          </button>
          <button 
            className={`relative z-10 px-6 py-3 rounded-full text-xs font-bold tracking-[0.1em] uppercase transition-colors duration-300 w-36 md:w-48 ${!isIndian ? 'text-[#1B7B79]' : 'text-white'}`}
            onClick={() => setIsIndian(false)}
          >
            FOREIGN (USD)
          </button>
        </div>
      </motion.div>

      {/* Grid */}
      <div className={`grid gap-6 ${isIndian ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto'}`}>
        {pricingData.map((tier, i) => (
          <motion.div 
            key={tier.role} custom={i + 2} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
            className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 hover:shadow-2xl shadow-[#1B7B79]/10 flex flex-col justify-between min-h-[220px] ${tier.featured ? 'border-[#6BC4C8]/60 shadow-[0_0_30px_rgba(107,196,200,0.2)]' : ''}`}
          >            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 font-bold text-xs uppercase tracking-[0.1em]">{tier.featured ? 'Popular' : 'Standard'}</span>
              </div>
              <h4 className="text-[#FCE4A8] font-bold text-xl md:text-2xl mt-2">{tier.role}</h4>
            </div>
            
            <div className="mt-8 flex items-baseline gap-2">
              <span className={`text-4xl md:text-5xl font-black tracking-tight ${tier.featured ? 'text-[#6BC4C8]' : 'text-white'}`}>
                {tier.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3: BANK DETAILS PROTOCOL
   ═══════════════════════════════════════════════════════════════ */
function BankDetails() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 pb-32">
      <motion.div custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}>
        <div className="bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md p-8 md:p-12">
            <h4 className="text-[#FCE4A8] font-bold text-xl md:text-2xl mb-8 uppercase tracking-wider">
              Wire Transfer Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-base md:text-lg text-white">
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">Bank Institution</span>
                <span className="font-semibold">IDBI Bank Ltd</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">Branch</span>
                <span className="font-semibold">Sector-V</span>
              </div>
              <div className="flex flex-col md:col-span-2 border-b border-white/10 pb-3">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">Address</span>
                <span className="font-semibold">D-1 Salt Lake Electronics Complex, Sector-V, Kolkata- 700091</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">IFSC Code</span>
                <span className="text-[#E4AC3D] font-bold">IBKL0000184</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">MICR Code</span>
                <span className="font-semibold">700259009</span>
              </div>
              <div className="flex flex-col md:col-span-2 border-b border-white/10 pb-3 mt-2">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">Account Name</span>
                <span className="font-semibold">Institute of Engineering & Management Trust</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">Account Number</span>
                <span className="font-black text-2xl text-[#6BC4C8]">184104000054214</span>
              </div>
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-white/60 text-xs font-bold uppercase mb-1">Type</span>
                <span className="font-semibold">Savings</span>
              </div>
            </div>

            <div className="mt-8 bg-white/5 border border-white/20 py-4 px-6 rounded-xl">
              <span className="text-[#E4AC3D] text-sm font-bold uppercase tracking-wider block mb-1">Verification Step</span>
              <span className="text-white font-medium">Mail payment confirmation to <a href="mailto:IESIA2025@iem.edu.in" className="underline hover:text-[#6BC4C8] transition-colors font-bold">IESIA2025@iem.edu.in</a></span>
            </div>
            
            <div className="mt-6 text-sm text-white/70 font-medium">
              Note: IFSC required for National India transfers. SWIFT required for International transfers.
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
  return (
    <section id="registration" className="relative w-full overflow-hidden bg-[#1B7B79]">
      <div className="relative z-10 w-full flex flex-col">
        <ScopusRibbon />
        <PricingMatrix />
        <BankDetails />
      </div>

      {/* =========================================
          SVG SWEEPING DIVIDER DOWN TO FOOTER
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-30 translate-y-[2px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[100px] md:h-[150px]"
          fill="#0f3c3b" /* Darker teal for Footer transition */
        >
          {/* Smooth wave connecting to footer */}
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
