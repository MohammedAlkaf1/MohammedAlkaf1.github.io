import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/8 blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-600/8 blur-3xl animate-pulse-glow"
          style={{ animationDelay: '1.5s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-cyan-500/5 to-purple-600/5 blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-none"
        >
          <span className="text-[#e2e8f0]">Mohammed</span>
          <br />
          <span className="gradient-text animate-gradient bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">
            Alkaf
          </span>
        </motion.h1>

        {/* Title */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-lg md:text-xl text-[#94a3b8] font-medium mb-6 font-mono"
        >
          <span className="text-cyan-400">&lt;</span>
          Software Engineering
          <span className="text-cyan-400">&gt;</span>
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeUp(0.4)}
          className="text-[#94a3b8] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10"
        >
          I build practical web applications and software solutions using modern
          technologies, with a focus on clean design, backend development,
          databases, and real-world problem solving.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap justify-center gap-4 mb-14"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 glow-cyan"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-7 py-3 rounded-xl border border-[#2a3347] text-[#e2e8f0] font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200"
          >
            Contact Me
          </a>
          <a
            href="https://github.com/MohammedAlkaf1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-[#2a3347] text-[#94a3b8] font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-alkaf-254551288"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-[#2a3347] text-[#94a3b8] font-semibold text-sm hover:border-purple-400/50 hover:text-purple-400 transition-all duration-200"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-[#64748b]"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
