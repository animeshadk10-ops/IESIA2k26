import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

/* ═══════════════════════════════════════════════════════════════
   CHRONO-TIMELINE 
   ═══════════════════════════════════════════════════════════════ */
const timelineNodes = [
  { title: 'PAPER SUBMISSION STARTS', status: 'ONGOING', active: true, date: '1st March, 2025' },
  { title: 'PAPER SUBMISSION DEADLINE', status: 'CLOSED', active: false, date: '15th April, 2025' },
  { title: 'ACCEPTANCE NOTIFICATION', status: 'UPCOMING', active: false, date: '15th May, 2025' },
  { title: 'CAMERA-READY SUBMISSION', status: 'UPCOMING', active: false, date: '1st June, 2025' },
  { title: 'CONFERENCE DATES', status: 'UPCOMING', active: true, date: '25th–27th June, 2025' }
];

function ChronoTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative flex flex-col h-full z-10 pt-12 md:pt-0">
      <motion.h2 
        custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
        className="text-[#1B7B79] font-black uppercase tracking-[0.1em] text-3xl md:text-5xl mb-12"
      >
        Important Dates
      </motion.h2>

      <div className="relative pl-8 md:pl-12 flex-1">
        {/* Simple vertical line */}
        <div className="absolute top-0 bottom-0 left-3 w-1 bg-[#1B7B79]/20 rounded-full" />

        <div className="flex flex-col gap-8">
          {timelineNodes.map((node, i) => (
            <motion.div 
              key={i} custom={i + 1} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
              className="relative"
            >
              {/* Circular Node Dot */}
              <div 
                className={`absolute -left-[41px] top-6 w-5 h-5 rounded-full border-4 border-white z-10
                  ${node.active ? 'bg-[#E4AC3D]' : 'bg-[#1B7B79]'}`}
              />

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#1B7B79]/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <h3 className={`text-lg md:text-xl font-bold uppercase tracking-wider ${node.active ? 'text-[#E4AC3D]' : 'text-[#D97757]'}`}>
                    {node.title}
                  </h3>
                  <span className={`text-[10px] md:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shrink-0
                    ${node.status === 'ONGOING' ? 'bg-[#1B7B79] text-white' : 
                      node.status === 'CLOSED' ? 'bg-[#1B7B79]/20 text-[#1B7B79]' : 
                      'bg-[#E4AC3D] text-white'}`}>
                    {node.status}
                  </span>
                </div>
                <div className="text-[#1B7B79] font-medium text-lg tracking-wide">
                  {node.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UPLOAD PROTOCOL
   ═══════════════════════════════════════════════════════════════ */
function UploadProtocol() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative flex flex-col h-full z-10 w-full pt-16 lg:pt-0">
      <motion.h2 
        custom={0} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
        className="text-[#1B7B79] font-black uppercase tracking-[0.1em] text-3xl md:text-5xl mb-12"
      >
        Submission Info
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 auto-rows-min">
        {/* Main Details Panel */}
        <motion.div 
          custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-[#1B7B79]/10"
        >
          <h3 className="text-[#D97757] text-xl font-bold uppercase tracking-wider mb-4">
            Submission Portal
          </h3>
          <p className="text-[#1B7B79] text-base md:text-lg font-medium leading-relaxed mb-6">
            Submit full paper(s) electronically through {' '}
            <a href="https://cmt3.research.microsoft.com/" target="_blank" rel="noopener noreferrer" 
               className="text-[#D97757] font-black hover:text-[#1B7B79] transition-colors underline">
              Microsoft CMT
            </a>. All papers will be double-blind peer-reviewed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rules Panel */}
          <motion.div 
            custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-[#1B7B79]/10"
          >
            <h3 className="text-[#1B7B79] text-lg font-bold uppercase tracking-wider mb-4">
              Formatting Rules
            </h3>
            <ul className="space-y-3 text-[#1B7B79]/80 font-semibold">
              <li>• English language only</li>
              <li>• Minimum of 10 pages</li>
              <li>• Original content strictly required</li>
              <li>• High-resolution figures</li>
            </ul>
          </motion.div>

          {/* Specs Panel */}
          <motion.div 
            custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-[#1B7B79]/10"
          >
            <h3 className="text-[#1B7B79] text-lg font-bold uppercase tracking-wider mb-4">
              File Specs
            </h3>
            <ul className="space-y-3 text-[#1B7B79]/80 font-semibold">
              <li>• Acceptable: PDF, DOCX, LateX.</li>
              <li>• Include author details initially.</li>
            </ul>
          </motion.div>
        </div>

        {/* CTA Panel (Simple Button) */}
        <motion.div 
          custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="mt-6"
        >
          <a href="https://cmt3.research.microsoft.com/" target="_blank" rel="noopener noreferrer"
             className="bg-[#1B7B79] text-white px-12 py-6 rounded-3xl text-2xl font-bold hover:bg-[#145d5c] transition-colors flex items-center justify-center gap-2">
            SUBMIT PAPER <span>→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Dates() {
  return (
    <section id="dates" className="relative w-full overflow-hidden flex flex-col">
      
      {/* Top Half: Solid Pale Cream (#FCE4A8) Padding */}
      <div className="w-full bg-[#FCE4A8] pt-2 md:pt-4" />
      
      {/* The Wave Divider (Light Aqua connecting natively into the gradient) */}
      <div className="relative w-full overflow-hidden leading-[0] z-20 -mt-px bg-[#FCE4A8]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[60px] md:h-[120px]"
          fill="#6BC4C8"
        >
          {/* Simple classic wave */}
          <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

      {/* Bottom Half: Beautiful Aqua-to-Cream Gradient housing the core content */}
      <div className="bg-gradient-to-b from-[#6BC4C8] to-[#FCE4A8] pt-8 pb-32 relative z-10 w-full flex-1">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            <div className="w-full lg:w-[45%] lg:sticky lg:top-24">
              <ChronoTimeline />
            </div>
            <div className="w-full lg:w-[55%]">
              <UploadProtocol />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
