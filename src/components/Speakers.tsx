import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const speakers = [
  {
    name: 'Dr. Arpita Ghosh',
    title: 'Professor, Power Systems',
    university: 'IIT Kharagpur',
    initials: 'AG',
  },
  {
    name: 'Dr. Rajesh Kumar',
    title: 'Lead Researcher, AI & Automation',
    university: 'IIEST Shibpur',
    initials: 'RK',
  },
  {
    name: 'Dr. Suman Dey',
    title: 'HOD, Electrical Engineering',
    university: 'Jadavpur University',
    initials: 'SD',
  },
  {
    name: 'Dr. Priya Sharma',
    title: 'IoT Architecture Lead',
    university: 'NIT Durgapur',
    initials: 'PS',
  },
  {
    name: 'Dr. Anirban Mukherjee',
    title: 'Machine Learning Researcher',
    university: 'ISI Kolkata',
    initials: 'AM',
  },
];

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Speakers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="speakers" className="section-padding" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={0}
          className="mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-thermal-copper font-semibold">
            Distinguished Faculty
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            THE SPEAKERS
          </h2>
          <p className="mt-4 text-text-secondary max-w-xl text-base">
            Meet the leading minds steering the discourse in electrical systems and industrial automation.
          </p>
        </motion.div>

        {/* Speaker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.name}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i + 1}
              className="group glass-panel rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-500 hover:glow-blue cursor-pointer"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-surface-light border border-border flex items-center justify-center mb-5 transition-all duration-500 group-hover:border-silicon-blue/50 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.15)]">
                <span className="text-xl font-bold text-text-muted group-hover:text-silicon-blue transition-colors duration-500">
                  {speaker.initials}
                </span>
              </div>

              <h3 className="text-sm font-bold text-text-primary tracking-tight">{speaker.name}</h3>
              <p className="text-[12px] text-text-muted mt-1 leading-relaxed">{speaker.title}</p>
              <p className="text-[11px] text-text-muted/60 mt-0.5">{speaker.university}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
