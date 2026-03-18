import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const sponsorsList = [
  { name: 'Springer', role: 'Publisher - Scopus' },
  { name: 'CI²S Labs, Argentina', role: 'Technical Co-Sponsor' },
  { name: '91.9 Friends FM', role: 'Media Partner' },
  { name: 'UEM Group', role: 'Organizer' },
  { name: 'SMART Society', role: 'Co-Sponsor' },
  { name: 'IEM', role: 'Host Institute' },
];

function SponsorCard({ name, role }: { name: string, role: string }) {
  const initial = name.substring(0, 1).toUpperCase();
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center gap-4 shrink-0 cursor-pointer group/sponsor hover:scale-110 hover:bg-white/10 hover:border-[#E4AC3D] hover:shadow-[0_0_30px_rgba(228,172,61,0.3)] transition-all duration-500">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6BC4C8]/20 flex items-center justify-center text-white font-black text-lg md:text-xl shrink-0 group-hover/sponsor:bg-[#E4AC3D]/20 transition-colors duration-500 shadow-inner">
        {initial}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold text-base md:text-lg leading-tight group-hover/sponsor:text-[#FCE4A8] transition-colors duration-300 tracking-wide">{name}</span>
        <span className="text-[#6BC4C8] text-xs md:text-sm uppercase tracking-widest font-bold mt-0.5">{role}</span>
      </div>
    </div>
  );
}

function MarqueeTrack({ items, direction = 'left', speed = 35 }: { items: typeof sponsorsList, direction?: 'left' | 'right', speed?: number }) {
  // Multiply items to ensure continuous seamless loop across ultra-wide monitors
  const loopItems = [...items, ...items, ...items, ...items, ...items];
  
  return (
    <div className="w-full overflow-visible group flex">
      <div 
        className={`flex w-max gap-4 md:gap-8 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'} group-hover:[animation-play-state:paused] py-4 px-2 md:px-4`}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {loopItems.map((sponsor, i) => (
          <SponsorCard key={`${direction}-${sponsor.name}-${i}`} name={sponsor.name} role={sponsor.role} />
        ))}
      </div>
    </div>
  );
}

export default function Sponsors() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Rows with slightly different orders so they don't look completely mirrored
  const row1 = [...sponsorsList];
  const row2 = [...sponsorsList].reverse();

  return (
    <section id="sponsors" className="relative w-full bg-[#1B7B79] pt-12 md:pt-24 pb-16 md:pb-32 min-h-[500px] flex flex-col justify-center overflow-hidden" ref={ref}>
      
      {/* Soft Center Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#6BC4C8] rounded-full mix-blend-screen opacity-15 blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Typography Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center px-4"
      >
        <span className="text-[#E4AC3D] text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase text-center mb-4 drop-shadow-sm">
          // Powered By Global Innovators
        </span>
        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-black text-center mb-16 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] tracking-tighter">
          The Alliance
        </h2>
      </motion.div>

      {/* Infinite Dual-Marquee Tracks */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-full flex flex-col gap-4 md:gap-6 z-10 max-w-[100vw] mx-auto select-none"
        style={{ 
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' 
        }}
      >
        <MarqueeTrack items={row1} direction="left" speed={35} />
        <MarqueeTrack items={row2} direction="right" speed={45} />
      </motion.div>
    </section>
  );
}
