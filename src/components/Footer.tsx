export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-[#1B7B79] to-[#104F4D] pt-24 pb-8">
      {/* 4-column Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10 text-center lg:text-left">
        
        {/* COLUMN 1: CONTACT US */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-[#E4AC3D] font-bold text-xl uppercase tracking-wider mb-6">Contact Us</h3>
          <p className="text-[#FCE4A8] text-sm mb-4 leading-relaxed font-medium">
            D-1, EP Block, Sector V, Salt Lake City, Kolkata, WB 700091
          </p>
          <a href="mailto:IESIA2025@iem.edu.in" className="text-[#6BC4C8] hover:text-white transition-colors text-sm font-bold mb-4 block underline underline-offset-4">
            IESIA2025@iem.edu.in
          </a>
          <p className="text-[#FCE4A8] text-sm mb-6 leading-relaxed font-semibold">
            8436443479 <br /> 9163748403 <br /> 7003254267
          </p>
          <div className="rounded-xl p-2 bg-white inline-block mt-auto shadow-[0_4px_20px_rgba(255,255,255,0.2)] border border-[#6BC4C8]/30 hover:scale-105 transition-transform">
            {/* QR Placeholder */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
              <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
              </svg>
              <span className="text-gray-500 font-bold text-[10px] tracking-widest uppercase">Scan</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: QUICK LINKS */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-[#E4AC3D] font-bold text-xl uppercase tracking-wider mb-6">Quick Links</h3>
          <ul className="flex flex-col gap-4 items-center lg:items-start">
            {['Home', 'About Us', 'Speakers', 'Call for Papers', 'Key Dates', 'Submission Details', 'Register Now'].map(link => (
              <li key={link} className="group flex items-center">
                <span className="text-[#6BC4C8] opacity-0 group-hover:opacity-100 transition-opacity mr-2 text-xs">▹</span>
                <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-[#FCE4A8] text-sm font-medium group-hover:text-[#FFD43A] group-hover:translate-x-2 transition-all duration-300 block">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: FOLLOW US */}
        <div className="flex flex-col items-center lg:items-start">
          <h3 className="text-[#E4AC3D] font-bold text-xl uppercase tracking-wider mb-6">Follow Us</h3>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            {/* Facebook */}
            <a href="#" className="bg-white/10 hover:bg-[#6BC4C8] rounded-full p-4 transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-[#6BC4C8]/40 group border border-white/5">
              <svg className="w-5 h-5 text-[#FCE4A8] group-hover:text-[#1B7B79]" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="bg-white/10 hover:bg-[#6BC4C8] rounded-full p-4 transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-[#6BC4C8]/40 group border border-white/5">
              <svg className="w-5 h-5 text-[#FCE4A8] group-hover:text-[#1B7B79]" fill="currentColor" viewBox="0 0 24 24"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path></svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="bg-white/10 hover:bg-[#6BC4C8] rounded-full p-4 transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-[#6BC4C8]/40 group border border-white/5">
              <svg className="w-5 h-5 text-[#FCE4A8] group-hover:text-[#1B7B79]" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
            </a>
          </div>
        </div>

        {/* COLUMN 4: SEND US A MESSAGE */}
        <div className="flex flex-col items-center lg:items-start w-full">
          <h3 className="text-[#E4AC3D] font-bold text-xl uppercase tracking-wider mb-6">Send Us A Message</h3>
          <form className="flex flex-col gap-6 relative group w-full max-w-sm lg:max-w-none">
            <div className="relative">
              <input type="text" id="name" required className="peer bg-transparent border-b-2 border-white/20 focus:border-[#E4AC3D] text-white w-full py-2 outline-none transition-colors text-sm" placeholder=" " />
              <label htmlFor="name" className="absolute left-0 top-2 text-white/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#E4AC3D] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#6BC4C8] transition-all duration-300 pointer-events-none">Name</label>
            </div>
            
            <div className="relative">
              <input type="email" id="email" required className="peer bg-transparent border-b-2 border-white/20 focus:border-[#E4AC3D] text-white w-full py-2 outline-none transition-colors text-sm" placeholder=" " />
              <label htmlFor="email" className="absolute left-0 top-2 text-white/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#E4AC3D] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#6BC4C8] transition-all duration-300 pointer-events-none">Email Address</label>
            </div>
            
            <div className="relative mt-2">
              <textarea id="message" required rows={3} className="peer bg-transparent border-b-2 border-white/20 focus:border-[#E4AC3D] text-white w-full py-2 outline-none transition-colors text-sm resize-none" placeholder=" "></textarea>
              <label htmlFor="message" className="absolute left-0 top-2 text-white/50 text-sm peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#E4AC3D] peer-valid:-top-4 peer-valid:text-xs peer-valid:text-[#6BC4C8] transition-all duration-300 pointer-events-none">Your Message</label>
            </div>
            
            <button type="button" className="mt-4 bg-[#E4AC3D] text-[#1B7B79] font-black uppercase tracking-wider py-4 rounded-full hover:bg-[#FFD43A] hover:shadow-[0_4px_20px_rgba(228,172,61,0.5)] transition-all duration-300 hover:scale-[1.03] text-sm">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-24 pt-8 border-t border-white/10 relative z-10">
        <p className="text-center text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} Intelligent Electrical System & Industrial Automation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
