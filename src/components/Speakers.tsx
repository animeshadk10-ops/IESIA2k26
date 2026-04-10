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

        {/* Speaker Information Pending */}
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={1}
          className="flex justify-center items-center py-20 px-4 glass-panel rounded-2xl border border-border"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-center uppercase tracking-wider drop-shadow-md">
            Speakers to be notified later
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
