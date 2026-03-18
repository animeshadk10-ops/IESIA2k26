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
        className="text-white font-black uppercase tracking-[0.1em] text-3xl md:text-5xl mb-12"
      >
        Important Dates
      </motion.h2>

      <div className="relative pl-8 md:pl-12 flex-1">
        {/* Timeline Line */}
        <div className="absolute top-0 bottom-0 left-3 w-1 bg-white/20 rounded-full" />

        <div className="flex flex-col gap-8">
          {timelineNodes.map((node, i) => (
            <motion.div 
              key={i} custom={i + 1} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
              className="relative"
            >
              {/* Node Dot */}
              <div 
                className={`absolute -left-[41px] top-6 w-5 h-5 rounded-full border-4 border-[#1B7B79] z-10
                  ${node.active ? 'bg-[#6BC4C8] shadow-[0_0_15px_#6BC4C8]' : 'bg-[#FCE4A8]'}`}
              />

              <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/20 shadow-xl shadow-[#1B7B79]/10 ${node.active ? 'border-[#6BC4C8]/50' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                  <h3 className={`text-lg md:text-xl font-bold uppercase tracking-wider ${node.active ? 'text-[#FCE4A8]' : 'text-white'}`}>
                    {node.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shrink-0
                    ${node.status === 'ONGOING' ? 'bg-[#6BC4C8] text-[#1B7B79]' : 
                      node.status === 'CLOSED' ? 'bg-white/20 text-white/60' : 
                      'bg-[#E4AC3D] text-[#1B7B79]'}`}>
                    {node.status}
                  </span>
                </div>
                <div className="text-white/90 font-medium text-lg tracking-wide">
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
        className="text-[#FCE4A8] font-black uppercase tracking-[0.1em] text-3xl md:text-5xl mb-12"
      >
        Submission Info
      </motion.h2>

      <div className="grid grid-cols-1 gap-6 auto-rows-min">
        {/* Main Details Panel */}
        <motion.div 
          custom={1} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 relative overflow-hidden group shadow-xl shadow-[#1B7B79]/10"
        >
          <h3 className="text-[#FCE4A8] text-xl font-bold uppercase tracking-wider mb-4">
            Submission Portal
          </h3>
          <p className="text-white text-base md:text-lg font-medium leading-relaxed mb-6">
            Submit full paper(s) electronically through {' '}
            <a href="https://cmt3.research.microsoft.com/" target="_blank" rel="noopener noreferrer" 
               className="text-[#FFD43A] font-bold hover:text-white transition-all hover:underline drop-shadow-sm">
              Microsoft CMT
            </a>. All papers will be double-blind peer-reviewed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Rules Panel */}
          <motion.div 
            custom={2} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-white text-lg font-bold uppercase tracking-wider mb-4">
              Formatting Rules
            </h3>
            <ul className="space-y-3 text-white/90 font-medium">
              <li>• English language only</li>
              <li>• Minimum of 10 pages</li>
              <li>• Original content strictly required</li>
              <li>• High-resolution figures</li>
            </ul>
          </motion.div>

          {/* Specs Panel */}
          <motion.div 
            custom={3} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-white text-lg font-bold uppercase tracking-wider mb-4">
              File Specs
            </h3>
            <ul className="space-y-3 text-white/90 font-medium">
              <li>• Acceptable: PDF, DOCX, LateX.</li>
              <li>• Include author details initially.</li>
            </ul>
          </motion.div>
        </div>

        {/* CTA Panel */}
        <motion.div 
          custom={4} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}
          className="mt-4"
        >
          <a href="https://cmt3.research.microsoft.com/" target="_blank" rel="noopener noreferrer"
             className="block w-full bg-[#E4AC3D] border border-transparent hover:bg-[#FFD43A] transition-all duration-300 rounded-3xl p-8 md:p-10 text-center shadow-2xl hover:-translate-y-1">
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-wider text-[#1B7B79] flex items-center justify-center gap-3">
              Submit Paper <span>→</span>
            </h1>
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
    <section id="dates" className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#1B7B79]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="w-full lg:w-[45%] lg:sticky lg:top-24">
            <ChronoTimeline />
          </div>
          <div className="w-full lg:w-[55%]">
            <UploadProtocol />
          </div>
        </div>
      </div>
    </section>
  );
}
