import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const row1Images = [
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800&h=600', aspect: 'w-[250px] md:w-[500px]' },
  { url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600&h=600', aspect: 'w-[200px] md:w-[350px] aspect-square' },
  { url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600', aspect: 'w-[250px] md:w-[500px]' },
  { url: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=600&h=600', aspect: 'w-[200px] md:w-[350px] aspect-square' },
  { url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=600', aspect: 'w-[250px] md:w-[500px]' },
];

const row2Images = [
  { url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=600&h=600', aspect: 'w-[200px] md:w-[350px] aspect-square' },
  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=600', aspect: 'w-[250px] md:w-[500px]' },
  { url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600&h=600', aspect: 'w-[200px] md:w-[350px] aspect-square' },
  { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=600', aspect: 'w-[250px] md:w-[500px]' },
  { url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600&h=600', aspect: 'w-[200px] md:w-[350px] aspect-square' },
];

function MarqueeRow({ images, direction = 'left', speed = 40 }: { images: { url: string, aspect: string }[], direction?: 'left' | 'right', speed?: number }) {
  // Duplicate images to create seamless loop
  const tripledImages = [...images, ...images, ...images];
  
  return (
    <div className="relative w-full overflow-hidden py-4 group">
      <div 
        className={`flex w-max gap-8 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'} group-hover:[animation-play-state:paused]`}
        style={{ '--marquee-speed': `${speed}s` } as React.CSSProperties}
      >
        {tripledImages.map((img, i) => (
          <div 
            key={i} 
            className={`relative rounded-[32px] overflow-hidden shadow-2xl shadow-[#1B7B79]/15 border-4 border-white shrink-0 h-[250px] md:h-[300px] lg:h-[350px] ${img.aspect} cursor-pointer group/card`}
          >
            <img 
              src={img.url} 
              alt="IESIA Conference Glimpse" 
              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Subtle overlay for contrast */}
            <div className="absolute inset-0 bg-[#1B7B79]/10 mix-blend-overlay opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="gallery" className="relative w-full bg-[#FCE4A8] pt-16 md:pt-32 pb-16 overflow-hidden" ref={ref}>
      {/* Top Transition SVG Wave (Deep Teal to Pale Cream) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0 -translate-y-[2px]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[100px] md:h-[150px]" fill="#1B7B79">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center mt-12 mb-16">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="relative text-center px-4"
        >
          {/* Light Aqua Glow Blob Behind Text */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm h-16 bg-[#6BC4C8]/50 blur-3xl rounded-full z-0 pointer-events-none" />
          
          <h2 className="text-[#1B7B79] text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 relative z-10 uppercase drop-shadow-sm">
            Glimpses of IESIA 2025
          </h2>
          <p className="text-[#E4AC3D] text-lg md:text-xl font-bold max-w-2xl mx-auto relative z-10">
            Experience the energy, innovation, and global collaboration at IEM Kolkata.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full flex flex-col gap-6 md:gap-8 z-10 py-8">
        <MarqueeRow images={row1Images} direction="left" speed={40} />
        <MarqueeRow images={row2Images} direction="right" speed={50} />
      </div>

      {/* Note: The bottom wave transition to Deep Teal is handled by the adjacent Venue.tsx component, 
          which draws a Pale Cream wave over its Deep Teal background, perfectly connecting to this section. */}
    </section>
  );
}
