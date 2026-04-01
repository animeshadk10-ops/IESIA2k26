import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   TRACK DATA
   ══════════════════════════════════════════════════════════════ */
const TRACKS = [
  {
    num: '01',
    label: 'TRACK 01 //',
    title: 'INTELLIGENT SYSTEMS',
    subtitle: '& Network Control',
    pills: [
      'AI In Robotics Vision', 'Autonomous Systems', 'Man-Machine System', 'Mechanical Drives', 'Arms And Mobile Manipulators', 'Under Water Systems', 'Cooperative Systems', 'Machine & Deep Learning In Robotics', 'Multi-Agent Systems', 'Navigation & Path Planning', 'Intelligent Control Architectures', 'Adaptive Control', 'Iterative Learning', 'Advanced Control Theory', 'Network Control', 'Nonlinear Systems', 'Robotic Vision'
    ],
  },
  {
    num: '02',
    label: 'TRACK 02 //',
    title: 'IOT',
    subtitle: '(Internet of Things)',
    pills: [
      'Scalable IoT Architectures', 'Edge AI & Computing', 'Novel IoT Communication', 'Energy Efficiency & Battery-Less Computing', 'Large-Scale Pilots', 'Safety & Security Privacy', 'Distributed Ledger/Blockchain', 'Human Interaction & AR/VR/MR', 'Cyber-Physical Systems & Digital Twins', 'Large-Scale IoT Analytics', 'V2V/V2X Networks', 'Real-World Deployments', 'Industrial IoT (Manufacturing/Agri)', 'Environmental Sensing', 'Societal Impacts'
    ],
  },
  {
    num: '03',
    label: 'TRACK 03 //',
    title: 'COMPUTING',
    subtitle: '& Machine Intelligence',
    pills: [
      'Scientific Computing', 'Computer Modeling', 'Cloud Computing', 'Parallel Computing', 'Mobile Computing', 'AI Tools & Applications', 'Hybrid Intelligent Systems', 'Natural Language Processing', 'Computer Vision', 'Image Processing', 'Heuristic AI Planning', 'Computational Learning Theories', 'Intelligent System Architectures', 'Neural Networks', 'Pervasive Computing', 'Reasoning And Evolution'
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   DATA PILL COMPONENT
   ══════════════════════════════════════════════════════════════ */
function DataPill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white px-6 py-3.5 rounded-full text-[#1B7B79] font-bold text-sm md:text-base shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(27,123,121,0.15)] hover:-translate-y-1.5 transition-all duration-300 cursor-default border border-white hover:border-[#6BC4C8]/30"
    >
      {label}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SINGLE TRACK SECTION
   ══════════════════════════════════════════════════════════════ */
function TrackSection({ track }: { track: typeof TRACKS[0] }) {
  const ref = useRef(null);
  
  return (
    <div 
      ref={ref} 
      className="w-full bg-[#FCE4A8] rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden flex flex-col lg:flex-row gap-12 shadow-lg items-center"
    >
      {/* 1. Left Side (The Title Zone) */}
      <div className="w-full lg:w-[35%] relative">
        <div className="absolute top-4 left-4 text-[12rem] font-black text-white/60 select-none z-0 pointer-events-none leading-none -translate-x-8 -translate-y-8">
          {track.num}
        </div>
        <div className="relative z-10">
          <div className="text-[#6BC4C8] uppercase font-black text-sm tracking-[0.2em] mb-4">
            {track.label}
          </div>
          <h3 className="text-[#1B7B79] text-4xl md:text-5xl font-black leading-tight relative z-10">
            {track.title}
          </h3>
          {track.subtitle && (
            <p className="text-[#1B7B79]/80 text-xl font-bold mt-2 relative z-10">
              {track.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* 2. Right Side (The Topic Cloud) */}
      <div className="w-full lg:w-[65%] flex flex-wrap gap-4 md:gap-5 relative z-10">
        {track.pills.map((pill, i) => (
          <DataPill key={pill} label={pill} delay={Math.min(i * 0.05, 0.4)} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ══════════════════════════════════════════════════════════════ */
export default function Tracks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="tracks" className="relative w-full overflow-hidden bg-gradient-to-br from-[#E4AC3D] to-[#FFD43A] pt-40" ref={sectionRef}>
      
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/20 blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="relative z-10 pb-40">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center max-w-[90rem] mx-auto px-4"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#1B7B79]/70 block mb-4">
            Call for Papers
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#1B7B79] tracking-tight leading-tight">
            Conference Tracks
          </h2>
        </motion.div>

        {/* Track Sections */}
        <div className="flex flex-col gap-10 max-w-[90rem] mx-auto w-full px-4">
          {TRACKS.map((track) => (
            <TrackSection key={track.num} track={track} />
          ))}
        </div>
      </div>

      {/* =========================================
          SVG SLANTED DIVIDER TO DATES/REGISTRATION (PALE CREAM)
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-30 translate-y-[1px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[40px] md:h-[80px]"
          fill="#FCE4A8"
        >
          {/* Soft sweeping organic wave */}
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
