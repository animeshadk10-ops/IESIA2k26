import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════ */
const programData = [
  { name: 'Prof. Banani Chakrabarti', role: 'Chief Patron' },
  { name: 'Prof. Dr. Satyajit Chakrabarti', role: 'Patron' },
  { name: 'Prof. Rajat Subhra Pal', role: 'General Chair' },
  { name: 'Prof. Dr. Subhajit Kar', role: 'General Chair' }
];

const advisoryData = [
  { name: 'Prof Abdus Samad', role: 'IIT Madras' },
  { name: 'Dr. Bhim Singh', role: 'IIT Delhi' },
  { name: 'Prof. Su Rong', role: 'NTU Singapore' },
  { name: 'Prof. XYZ', role: 'MIT USA' },
  { name: 'Dr. ABC', role: 'IEM Kolkata' },
  { name: 'Prof. DEF', role: 'Stanford' }
];

const technicalData = [
  { name: 'Dr. Tamal Roy', role: 'Member' },
  { name: 'Dr. Subrata Chattopadhyay', role: 'Member' },
  { name: 'Dr. Soumya Chatterjee', role: 'Member' },
  { name: 'Dr. Alpha Beta', role: 'Reviewer' },
  { name: 'Prof. Gamma Delta', role: 'Reviewer' }
];

const organizingData = [
  { name: 'Prof. A', role: 'Convener' },
  { name: 'Prof. B', role: 'Co-Convener' },
  { name: 'Dr. C', role: 'Coordinator' },
  { name: 'Dr. D', role: 'Coordinator' }
];

const tabs = ['Program', 'Advisory', 'Technical', 'Organizing'];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Committee() {
  const [activeTab, setActiveTab] = useState('Program');

  return (
    <section id="committee" className="relative pt-32 pb-24 min-h-screen bg-gradient-to-b from-[#6BC4C8] to-[#FCE4A8] overflow-hidden">
      
      {/* =========================================
          TOP TRANSITION WAVE (Deep Teal to #6BC4C8)
          ========================================= */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0 -translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] md:h-[120px]" fill="#1B7B79">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-[#1B7B79] font-black uppercase tracking-[0.1em] text-4xl md:text-5xl lg:text-6xl drop-shadow-sm">
            The Leadership Hub
          </h2>
        </div>

        {/* =========================================
            THE TAB MENU 
            ========================================= */}
        <div className="flex items-center justify-start md:justify-center w-full mb-12 px-2 max-w-full overflow-hidden">
          <div className="flex flex-row overflow-x-auto whitespace-nowrap scrollbar-hide pb-4 md:pb-0 items-center gap-2 bg-white/20 backdrop-blur-xl rounded-2xl md:rounded-full p-3 md:p-2 border border-white/40 shadow-lg w-full md:w-auto md:justify-center snap-x lg:flex-nowrap">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-3 rounded-full text-sm md:text-base font-bold tracking-wide transition-all duration-300 outline-none shrink-0 snap-center
                    ${isActive ? 'text-white' : 'text-[#1B7B79] hover:bg-white/30'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="committee-tab-bubble"
                      className="absolute inset-0 bg-[#E4AC3D] rounded-full shadow-[0_5px_15px_rgba(228,172,61,0.5)]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      style={{ zIndex: -1 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================
            THE DATA VAULT
            ========================================= */}
        <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 md:p-10 shadow-xl min-h-[500px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: PROGRAM COMMITTEE */}
            {activeTab === 'Program' && (
              <motion.div
                key="Program"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap justify-center gap-8"
              >
                {programData.map((person, i) => (
                  <div key={i} className="flex flex-col items-center w-full sm:w-[250px] bg-white/50 rounded-2xl p-6 border border-white/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
                    <div className="w-32 h-32 rounded-full border-4 border-[#1B7B79] bg-white/80 mb-6 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {/* Placeholder Icon */}
                      <svg className="w-16 h-16 text-[#1B7B79]/30" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <h3 className="text-[#1B7B79] font-bold text-lg text-center mb-2 leading-tight">
                      {person.name}
                    </h3>
                    <span className="text-[#E4AC3D] font-black uppercase text-xs tracking-widest text-center">
                      {person.role}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 2: ADVISORY COMMITTEE */}
            {activeTab === 'Advisory' && (
              <motion.div
                key="Advisory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {advisoryData.map((person, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-transparent hover:border-[#6BC4C8]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-center">
                    <h4 className="text-[#1B7B79] font-semibold text-base mb-1">{person.name}</h4>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{person.role}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 3: TECHNICAL COMMITTEE */}
            {activeTab === 'Technical' && (
              <motion.div
                key="Technical"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {technicalData.map((person, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-transparent hover:border-[#6BC4C8]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-center">
                    <h4 className="text-[#1B7B79] font-semibold text-sm mb-1">{person.name}</h4>
                    {person.role && (
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{person.role}</p>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 4: ORGANIZING COMMITTEE & DEVELOPER */}
            {activeTab === 'Organizing' && (
              <motion.div
                key="Organizing"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col min-h-full"
              >
                {/* 2-Column Masonry/List for Professors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 flex-grow">
                  {organizingData.map((person, i) => (
                    <div key={i} className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/80 shadow-sm flex items-center justify-between hover:bg-white transition-colors">
                      <span className="text-[#1B7B79] font-bold text-sm">{person.name}</span>
                      <span className="text-[#E4AC3D] font-black text-[10px] uppercase tracking-widest">{person.role}</span>
                    </div>
                  ))}
                </div>

                {/* THE CLIMAX (Web Developer Badge) */}
                <div className="w-full flex justify-center mt-auto pb-6">
                  <div className="relative group cursor-default">
                    {/* Glowing background */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD43A] to-[#E4AC3D] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
                    
                    <div className="relative bg-gradient-to-r from-[#FFD43A] to-[#E4AC3D] rounded-full px-10 py-5 shadow-[0_10px_30px_rgba(228,172,61,0.4)] flex flex-col items-center text-center border border-[#FFD43A]/50">
                      <span className="text-teal-900 font-medium text-xs tracking-[0.2em] uppercase mb-1 drop-shadow-sm/50">
                        Web Developer
                      </span>
                      <span className="text-teal-900 font-black text-2xl tracking-tight leading-none mb-1">
                        Animesh Adhikari
                      </span>
                      <span className="text-teal-800 text-sm font-semibold opacity-80">
                        Student, IEM Kolkata
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* =========================================
          BOTTOM TRANSITION WAVE (to Deep Teal)
          ========================================= */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 translate-y-[2px] rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] md:h-[120px]" fill="#1B7B79">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
