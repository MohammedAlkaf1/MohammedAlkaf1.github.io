import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden bg-radial-glow"
    >
      <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="relative z-10 eyebrow-pill mb-8"
      >
        Software Engineering
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        className="relative z-10 text-center font-sans font-extrabold text-[13vw] leading-[1.02] md:text-[4.6rem] md:leading-[1.04] tracking-tight max-w-4xl text-[#f2f2f0]"
      >
        I build software.
        <br />
        <span className="emphasis">Carefully.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.38 }}
        className="relative z-10 text-center text-[#8a8a92] text-base md:text-lg max-w-xl mt-7"
      >
        Full-stack web applications and backend systems built with Laravel,
        FastAPI, and modern JavaScript — for problems that are actually worth
        solving, not just portfolio filler.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-4 mt-11"
      >
        <a href="#work" className="btn-pill-primary">
          See my work
          <ArrowUpRight size={15} />
        </a>
        <a href="#contact" className="btn-pill">
          Get in touch
        </a>
      </motion.div>
    </section>
  )
}
