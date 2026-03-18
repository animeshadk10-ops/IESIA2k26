import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp: any = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  return (
    <section id="about" className="relative w-full bg-[#FCE4A8] overflow-hidden pt-20 pb-32" ref={ref}>
      
      {/* Top Transition: Smoothly connects from Hero's Pale Cream bottom wave automatically */}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* =========================================
            PART 1: THE VISION (About The Conference)
            ========================================= */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-24">
          
          {/* Left Column (Text & Mission - span 7) */}
          <motion.div 
            initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
            className="lg:col-span-7 flex flex-col"
          >
            <motion.span variants={fadeUp} className="text-[#E4AC3D] uppercase tracking-widest text-[10px] md:text-xs font-bold mb-4 block">
              THE INTERSECTION OF TECH & AUTOMATION
            </motion.span>
            
            <motion.h2 variants={fadeUp} className="text-[#1B7B79] font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
              About The Conference
            </motion.h2>
            
            <motion.p variants={fadeUp} className="text-[#1B7B79] text-base md:text-lg lg:text-xl font-semibold leading-relaxed mb-6">
              The 'Intelligent Electrical System and Industrial Automation' (IESIA-2025) conference is a premier event dedicated to exploring the intersection of cutting-edge technology and industrial automation. With a focus on intelligent electrical systems, this conference brings together experts, researchers, and practitioners from around the world to share insights, advancements, and best practices in the field.
            </motion.p>
            
            <motion.p variants={fadeUp} className="text-teal-900/70 text-sm md:text-base font-medium leading-relaxed text-left md:text-justify mb-8">
              The conference provides a platform for participants to delve into the challenges and opportunities of integrating intelligent electrical systems into industrial automation processes. Industry leaders will present case studies showcasing successful implementations, highlighting the benefits of improved efficiency, reduced downtime, and increased safety. Additionally, the event fosters networking opportunities, allowing participants to forge valuable connections with peers, potential collaborators, and technology providers. Whether you're an electrical engineer, automation specialist, or a researcher in the field, this conference offers a unique opportunity to stay abreast of the latest trends and innovations shaping the future of industrial automation. By attending, you'll gain valuable insights that can be directly applied to enhance productivity, optimize processes, and drive innovation in the industrial sector.
            </motion.p>
          </motion.div>

          {/* Right Column (The Visuals - span 5) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} transition={{ duration: 1, delay: 0.3 }}
            className="lg:col-span-5 relative w-full h-[400px] md:h-[500px]"
          >
            {/* Image 1 (Large - Restored Arduino Upload) */}
            <div className="absolute top-0 right-0 w-[85%] h-[75%] rounded-[40px] shadow-2xl overflow-hidden shadow-teal-900/20 border-4 border-white/40 group">
              <img src="/electronics-asthe.png" alt="Arduino Advanced Engineering" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            
            {/* Image 2 (Small, overlapping) */}
            <div className="absolute bottom-4 left-0 w-[60%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#FCE4A8] -ml-2 md:-ml-12 mt-24 shadow-teal-900/30 group">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Networking Professionals" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>
        </div>

        {/* The Topics Bento Row */}
        <motion.div 
          initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full relative z-20"
        >
          {/* Card 1: Smart Sensors */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-teal-900/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 border border-teal-900/5 cursor-default flex flex-col justify-between min-h-[140px] group">
            <div className="w-10 h-10 rounded-full bg-[#6BC4C8]/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5 text-[#1B7B79]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <p className="text-[#1B7B79] font-bold text-sm lg:text-[15px] leading-snug">Smart Sensors</p>
          </motion.div>

          {/* Card 2: Automation Control Algorithms */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-teal-900/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 border border-teal-900/5 cursor-default flex flex-col justify-between min-h-[140px] group">
            <div className="w-10 h-10 rounded-full bg-[#6BC4C8]/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5 text-[#1B7B79]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <p className="text-[#1B7B79] font-bold text-sm lg:text-[15px] leading-snug">Automation Control Algorithms</p>
          </motion.div>

          {/* Card 3: Energy-Efficient Solutions */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-teal-900/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 border border-teal-900/5 cursor-default flex flex-col justify-between min-h-[140px] group">
            <div className="w-10 h-10 rounded-full bg-[#6BC4C8]/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5 text-[#1B7B79]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <p className="text-[#1B7B79] font-bold text-sm lg:text-[15px] leading-snug">Energy-Efficient Solutions</p>
          </motion.div>

          {/* Card 4: Real-Time Data Analytics */}
          <motion.div variants={fadeUp} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg shadow-teal-900/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 border border-teal-900/5 cursor-default flex flex-col justify-between min-h-[140px] group">
            <div className="w-10 h-10 rounded-full bg-[#6BC4C8]/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5 text-[#1B7B79]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <p className="text-[#1B7B79] font-bold text-sm lg:text-[15px] leading-snug">Real-Time Data Analytics</p>
          </motion.div>
        </motion.div>


        {/* =========================================
            PART 2: THE LEGACY (About The Department)
            ========================================= */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }} animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 30 }} transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-[#1B7B79] rounded-[40px] md:rounded-[60px] p-6 md:p-14 lg:p-16 mt-16 md:mt-24 relative overflow-hidden shadow-2xl shadow-teal-900/40 border border-[#6BC4C8]/20 z-10"
        >
          {/* Ambient Glows inside the box */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#6BC4C8] rounded-full mix-blend-overlay opacity-30 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#FFD43A] rounded-full mix-blend-overlay opacity-20 blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow-sm tracking-tight">
              About The Department
            </h2>
            <p className="text-[#6BC4C8] text-base md:text-xl font-medium max-w-3xl mb-12">
              Join us on this exciting journey of knowledge exchange and innovation as we pave the way for a brighter tomorrow.
            </p>

            {/* THE DEPARTMENTAL SPLIT */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 border-t border-white/10 pt-10">
              <div className="flex flex-col gap-2">
                <span className="text-[#FFD43A] font-bold text-xs uppercase tracking-widest block mb-2">Electrical Engineering</span>
                <p className="text-white/80 text-sm md:text-base leading-relaxed text-justify md:text-left">
                  The Electrical Engineering Department (EE) has started their journey in the year of 2013. We have continued to grow our expertise and competence in the core Electrical Engineering curriculum and research. The department has a distinguished record in both teaching and research. Our department offers science-based engineering curriculum to the students to pursue their interest. Undergraduate students are encouraged to undertake various research projects. The departmental faculty members maintain active interdisciplinary research.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#FFD43A] font-bold text-xs uppercase tracking-widest block mb-2">Electrical and Electronics Engineering</span>
                <p className="text-white/80 text-sm md:text-base leading-relaxed text-justify md:text-left">
                  The Electrical and Electronics Engineering Department (EEE), established in 2015, has a fine blend of academically competent, industrially experienced as well as dynamic and young faculties fostering learning with their analytical and practical teaching methodology. We encourage project based learning and emphasize on teaching the concepts and not the mere facts. Students are not only prepared to develop the skills for tests but also to pursue the knowledge to innovate. We make constant endeavor to inculcate the spirit of team work.
                </p>
              </div>
            </div>

            {/* THE STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mt-12 pt-10 border-t border-white/10">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-[#FFD43A] text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tighter drop-shadow-md">
                  2013 <span className="text-[#6BC4C8]">&</span> 2015
                </span>
                <span className="text-white font-semibold text-sm md:text-base opacity-90 max-w-[200px] md:max-w-none">
                  Years Established (EE & EEE)
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-[#FFD43A] text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tighter drop-shadow-md">
                  3 Years
                </span>
                <span className="text-white font-semibold text-sm md:text-base opacity-90 max-w-[200px] md:max-w-none">
                  NBA Accreditation Awarded in 2024
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-[#FFD43A] text-4xl md:text-5xl lg:text-6xl font-black mb-2 tracking-tighter drop-shadow-md">
                  100%
                </span>
                <span className="text-white font-semibold text-sm md:text-base opacity-90 max-w-[200px] md:max-w-none">
                  Focus on Project-Based Learning
                </span>
              </div>
            </div>

            {/* THE EXPERTISE HIGHLIGHT */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 mt-16 border border-white/20 shadow-xl flex flex-col md:flex-row items-start md:items-center gap-6 group hover:bg-white/15 transition-colors duration-500">
              <div className="w-16 h-16 rounded-full bg-[#E4AC3D] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(228,172,61,0.4)] group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 text-[#1B7B79]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <span className="text-[#FCE4A8] text-xs font-bold uppercase tracking-widest block mb-2">Frontier Technologies</span>
                <p className="text-white text-sm md:text-[15px] font-medium leading-relaxed tracking-wide">
                  Power quality studies &nbsp;&bull;&nbsp; Application of micro-processors and micro-controllers &nbsp;&bull;&nbsp; Smart grid design &nbsp;&bull;&nbsp; Non-conventional energy sources etc.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* =========================================
          SVG SWEEPING UPWARD CURVE TO TRACKS SECTION
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[2px]">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-[120px] md:h-[180px]"
          // Needs to match the top of the TRACKS gradient which is Mustard Gold (#E4AC3D)
          fill="#E4AC3D"
        >
          {/* Smooth sweeping upward curve */}
          <path d="M0,120 C400,0 800,120 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
