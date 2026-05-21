

export default function ConferencePoster() {
  const posterPath = '/Logos/IESIA FINAL POSTER.png';

  return (
    <section className="relative w-full bg-[#0B2524] py-20 px-6 lg:px-12 flex flex-col items-center">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#6BC4C8]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl w-full text-center relative z-10">
        <h2 className="text-[#E4AC3D] font-black text-3xl md:text-4xl uppercase tracking-wider mb-4">
          Official Conference Poster
        </h2>
        <p className="text-[#FCE4A8]/80 text-sm md:text-base max-w-2xl mx-auto mb-12 font-medium">
          Download or view the official event poster for detailed information regarding the advisory committee, submission tracks, and registration guidelines.
        </p>

        {/* Poster Image Container with a premium glassmorphic border */}
        <div className="relative group rounded-2xl overflow-hidden bg-white/5 p-3 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-2xl mx-auto backdrop-blur-sm transition-all duration-500 hover:border-[#6BC4C8]/30">
          <img 
            src={posterPath} 
            alt="IESIA 2026 Official Conference Poster" 
            className="w-full h-auto rounded-xl shadow-inner object-cover"
          />
          
          {/* Subtle Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2524]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {/* Action Button Container */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href={posterPath} 
            download="IESIA_FINAL_POSTER.jpg"
            className="flex items-center gap-2 bg-[#E4AC3D] text-[#1B7B79] font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#FFD43A] hover:shadow-[0_4px_25px_rgba(228,172,61,0.4)] transition-all duration-300 hover:scale-[1.03] text-sm group"
          >
            <svg 
              className="w-5 h-5 transition-transform group-hover:translate-y-0.5" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Poster
          </a>
        </div>
      </div>
    </section>
  );
}