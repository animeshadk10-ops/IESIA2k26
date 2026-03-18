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
      'AI In Robotics Vision', 'Autonomous Systems', 'Man-Machine System',
      'Mechanical Drives', 'Arms And Mobile Manipulators', 'Under Water Systems',
      'Cooperative Systems', 'Machine & Deep Learning In Robotics', 'Multi-Agent Systems',
      'Navigation & Path Planning', 'Intelligent Control Architectures', 'Adaptive Control',
      'Iterative Learning', 'Advanced Control Theory', 'Network Control',
      'Nonlinear Systems', 'Robotic Vision',
    ],
  },
  {
    num: '02',
    label: 'TRACK 02 //',
    title: 'IOT',
    subtitle: '(Internet of Things)',
    pills: [
      'Scalable IoT Architectures', 'Edge AI & Computing', 'Novel IoT Communication',
      'Energy Efficiency & Battery-Less Computing', 'Large-Scale Pilots', 'Safety & Security Privacy',
      'Distributed Ledger/Blockchain', 'Human Interaction & AR/VR/MR',
      'Cyber-Physical Systems & Digital Twins', 'Large-Scale IoT Analytics',
      'V2V/V2X Networks', 'Real-World Deployments', 'Industrial IoT (Manufacturing/Agri)',
      'Environmental Sensing', 'Societal Impacts',
    ],
  },
  {
    num: '03',
    label: 'TRACK 03 //',
    title: 'COMPUTING',
    subtitle: '& Machine Intelligence',
    pills: [
      'Scientific Computing', 'Computer Modeling', 'Cloud Computing',
      'Parallel Computing', 'Mobile Computing', 'AI Tools & Applications',
      'Hybrid Intelligent Systems', 'Natural Language Processing', 'Computer Vision',
      'Image Processing', 'Heuristic AI Planning', 'Computational Learning Theories',
      'Intelligent System Architectures', 'Neural Networks', 'Pervasive Computing',
      'Reasoning And Evolution',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════
   DATA PILL COMPONENT
   ══════════════════════════════════════════════════════════════ */
function DataPill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-wide
                 bg-white/90 text-[#1B7B79] shadow-sm border border-white/60
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1B7B79]/20 cursor-default"
    >
      {label}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SINGLE TRACK SECTION
   ══════════════════════════════════════════════════════════════ */
function TrackSection({ track }: { track: typeof TRACKS[0] }) {
  const ref = useRef(null);
  
  return (
    <div ref={ref} className="relative py-8 md:py-12">
      <div className="bg-[#FCE4A8]/80 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-white/50 shadow-xl shadow-[#1B7B79]/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT — Track Info */}
          <div className="lg:col-span-4 relative">
            <div className="absolute -top-16 md:-top-20 -left-6 text-[100px] md:text-[140px] font-black leading-none text-white/50 select-none pointer-events-none z-0">
              {track.num}
            </div>
            <div className="relative z-10 pt-4 md:pt-8 text-[#1B7B79]">
              <span className="text-xs font-bold tracking-[0.3em] uppercase block mb-3 text-[#1B7B79]/60">
                {track.label}
              </span>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight mb-2 leading-tight">
                {track.title}
              </h3>
              <p className="text-lg md:text-xl font-medium opacity-80">
                {track.subtitle}
              </p>
            </div>
          </div>

          {/* RIGHT — Data Pill Grid */}
          <div className="lg:col-span-8 relative z-10">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {track.pills.map((pill, i) => (
                <DataPill key={pill} label={pill} delay={Math.min(i * 0.02, 0.4)} />
              ))}
            </div>
          </div>
        </div>
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-40">
        {/* Section Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#1B7B79]/70 block mb-4">
            Call for Papers
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#1B7B79] tracking-tight leading-tight">
            Conference Tracks
          </h2>
        </motion.div>

        {/* Track Sections */}
        <div className="space-y-4">
          {TRACKS.map((track) => (
            <TrackSection key={track.num} track={track} />
          ))}
        </div>
      </div>

      {/* =========================================
          SVG SLANTED DIVIDER TO DATES/REGISTRATION (DEEP TEAL)
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-30 translate-y-[2px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[150px] md:h-[200px]"
          fill="#1B7B79"
        >
          {/* Slanted diagonal curve */}
          <path d="M1200,0 L0,120 L1200,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
