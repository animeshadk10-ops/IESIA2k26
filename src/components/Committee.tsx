import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   DATA MAPPING (EQUALIZED HIERARCHY)
   ═══════════════════════════════════════════════════════════════ */

const programCommitteeData = [
  {
    id: 1,
    name: "Prof. Banani Chakrabarti",
    role: "Chief Patron",
    desc: "President, IEM Kolkata. Guiding the future of electrical innovation through global leadership.",
    image: "/program committe/Banani Chakrabarti.jpg"
  },
  {
    id: 2,
    name: "Prof. Dr. Satyajit Chakrabarti",
    role: "Patron",
    desc: "Director, IEM Kolkata. Academic leader fostering practical teaching methodology.",
    image: "/program committe/director Prof. Dr. Satyajit Chakrabarti.jpg"
  },
  {
    id: 3,
    name: "Prof. Dr. Arun Kumar Bar",
    role: "General Chair",
    desc: "Principal, IEM Kolkata. Orchestrating the technical and logistical core of IESIA 2025.",
    image: "/program committe/Prof. Dr. Arun Kumar Bar.jpg"
  },
  {
    id: 4,
    name: "Prof. Rajat Subhra Pal",
    role: "General Chair",
    desc: "H.O.D (EEE Dept), IEM Kolkata. Expert in intelligent systems and industrial automation.",
    image: null // Dummy icon
  },
  {
    id: 5,
    name: "Prof. Dr. Subhajit Kar",
    role: "General Chair",
    desc: "H.O.D (EE Dept), IEM Kolkata. Leading researcher in smart grid technology.",
    image: "/program committe/Prof Dr Subhajit Kar.jpg"
  },
  {
    id: 6,
    name: "Prof. Dr. Sanjoy Mondal",
    role: "Convenor",
    desc: "Associate Professor, IEM Kolkata.",
    image: "/program committe/Prof. Dr. Sanjoy Mondal.jpg"
  },
  {
    id: 7,
    name: "Prof. (Dr.) Mandakinee Bandyopadhyay",
    role: "Convenor",
    desc: "Associate Professor, IEM Kolkata.",
    image: "/program committe/Prof. (Dr.) Mandakinee Bandyopadhyay.jpg"
  },
  {
    id: 8,
    name: "Prof. Pratik De Sarkar",
    role: "Co-Convenor",
    desc: "Assistant Professor, IEM Kolkata.",
    image: "/program committe/Pratik De Sarkar.jpg"
  }
];

// MOCKUP DATA GENERATOR
const generateMockups = (roleTitle: string) => Array.from({ length: 8 }).map((_, i) => ({
  id: `mock-${i}`,
  name: `Dr. John Doe ${i + 1}`,
  role: roleTitle,
  desc: `International expert in emerging technologies and academic excellence. Serving as a key ${roleTitle.toLowerCase()} for the conference.`,
  image: null
}));

const mockAdvisory = generateMockups('Technical Advisor');
const mockTechnical = generateMockups('Technical Member');
const mockOrganizing = generateMockups('Organizing Coordinator');

const tabs = ['Program', 'Advisory', 'Technical', 'Organizing'];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function Committee() {
  const [activeTab, setActiveTab] = useState('Program');

  // Unified Sub-Card Component
  const CommitteeSubCard = ({ person }: { person: any }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="relative group h-full"
    >
      <div className="relative group h-full bg-white/10 border border-white/20 rounded-[2rem] p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:bg-white/20 hover:border-[#FCE4A8] hover:shadow-2xl shadow-xl shadow-[#1B7B79]/10">
        
        {/* Subtle hover background sweep */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative w-32 h-32 rounded-full border-4 border-[#FCE4A8] shadow-xl mb-6 shrink-0 group-hover:border-[#FFD43A] transition-all duration-500 p-1 bg-white/20">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#1B7B79] flex items-center justify-center">
            {person.image ? (
              <img src={person.image} alt={person.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            ) : (
              <svg className="w-12 h-12 text-white/50 group-hover:text-[#FFD43A]/80 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
        </div>
        
        <h4 className="text-white text-xl md:text-2xl font-bold tracking-wide leading-tight group-hover:text-[#FFD43A] transition-colors drop-shadow-md">
          {person.name}
        </h4>
        
        <span className="text-[#E4AC3D] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mt-3 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-[#E4AC3D]/20">
          {person.role}
        </span>
        
        <p className="text-[#FCE4A8] text-sm mt-5 leading-relaxed font-medium">
          {person.desc}
        </p>

      </div>
    </motion.div>
  );

  return (
    <section 
      id="committee" 
      className="relative pt-32 pb-48 min-h-screen bg-gradient-to-br from-[#1B7B79] via-[#1B7B79] to-[#6BC4C8] overflow-hidden font-sans text-white/90 selection:bg-[#E4AC3D]/40"
    >
      {/* =========================================
          BACKGROUND / ENVIRONMENT: THE COLOR PLASMA
          ========================================= */}
      
      {/* Orb 1: Top Left Gold */}
      <div className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[#E4AC3D]/40 rounded-full blur-[150px] pointer-events-none mix-blend-overlay z-0" />
      
      {/* Orb 2: Bottom Right Yellow */}
      <div className="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-[#FFD43A]/30 rounded-full blur-[150px] pointer-events-none mix-blend-overlay z-0" />
      
      {/* Orb 3: Center Aqua */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[#6BC4C8]/50 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* =========================================
          CONTENT WRAPPER
          ========================================= */}
      <div className="relative z-10 w-full flex flex-col items-center mx-auto px-6">
        
        {/* Holographic Department Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FCE4A8] via-[#FFD43A] to-[#FCE4A8] rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-700" />
          <div className="relative backdrop-blur-xl bg-white/20 border border-white/40 px-6 py-2 rounded-full uppercase tracking-[0.2em] text-[10px] md:text-xs text-white font-black text-center shadow-[0_4px_20px_rgba(255,255,255,0.2)]">
            IESIA 2025 <span className="text-[#FFD43A] mx-2">//</span> HOSTED BY DEPT. OF EE & EEE <span className="text-[#FFD43A] mx-2">|</span> IEM KOLKATA
          </div>
        </motion.div>

        {/* Main Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-black uppercase tracking-[0.1em] text-white leading-none drop-shadow-[0_4px_20px_rgba(27,123,121,0.5)]"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.1)' }}
          >
            The Leadership Hub
          </motion.h2>
        </div>

        {/* =========================================
            1. INTERACTIVE TABS
            ========================================= */}
        <div className="flex items-center justify-center mb-4 w-full px-2 max-w-full z-20 relative">
          <div className="flex bg-white/20 backdrop-blur-2xl rounded-full p-2 border border-white/30 max-w-full overflow-x-auto scrollbar-hide shrink-0 shadow-[0_8px_32px_rgba(27,123,121,0.4)]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-3 rounded-full text-xs md:text-sm font-black tracking-widest uppercase transition-colors duration-300 outline-none shrink-0 ${
                    isActive ? 'text-[#1B7B79]' : 'text-white hover:text-[#FCE4A8]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="committeeTabsLight"
                      className="absolute inset-0 bg-[#FCE4A8] rounded-full shadow-[0_0_20px_rgba(252,228,168,0.6)]"
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
            2. THE "BIG CARD" (The Glass Vault)
            ========================================= */}
        <div className="w-full max-w-7xl mx-auto mt-12 bg-white/10 backdrop-blur-3xl border-2 border-white/20 rounded-[3rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(27,123,121,0.5)] relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            
            {/* TAB 1: PROGRAM COMMITTEE */}
            {activeTab === 'Program' && (
              <motion.div
                key="Program"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
              >
                {programCommitteeData.map((person) => (
                  <CommitteeSubCard key={person.id} person={person} />
                ))}
              </motion.div>
            )}

            {/* TAB 2: ADVISORY COMMITTEE (MOCKUP) */}
            {activeTab === 'Advisory' && (
              <motion.div
                key="Advisory"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
              >
                {mockAdvisory.map((person) => (
                  <CommitteeSubCard key={person.id} person={person} />
                ))}
              </motion.div>
            )}

            {/* TAB 3: TECHNICAL COMMITTEE (MOCKUP) */}
            {activeTab === 'Technical' && (
              <motion.div
                key="Technical"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
              >
                {mockTechnical.map((person) => (
                  <CommitteeSubCard key={person.id} person={person} />
                ))}
              </motion.div>
            )}

            {/* TAB 4: ORGANIZING COMMITTEE (MOCKUP) */}
            {activeTab === 'Organizing' && (
              <motion.div
                key="Organizing"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
              >
                {mockOrganizing.map((person) => (
                  <CommitteeSubCard key={person.id} person={person} />
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
