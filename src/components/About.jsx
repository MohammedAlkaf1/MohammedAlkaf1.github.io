import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Code2, Database, Lightbulb } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

const highlights = [
  {
    icon: GraduationCap,
    color: 'cyan',
    title: 'Software Engineering',
    desc: 'Studying SE principles, system design, and software architecture.',
  },
  {
    icon: Code2,
    color: 'purple',
    title: 'Web & Backend',
    desc: 'Building full-stack web apps with Laravel, FastAPI, and modern JS.',
  },
  {
    icon: Database,
    color: 'cyan',
    title: 'Databases',
    desc: 'Experienced with MySQL and Firebase for data persistence.',
  },
  {
    icon: Lightbulb,
    color: 'purple',
    title: 'Problem Solver',
    desc: 'Focused on clean code, real-world solutions, and continuous learning.',
  },
]

function Card({ icon: Icon, color, title, desc, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-2xl p-5 card-hover"
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
          color === 'cyan'
            ? 'bg-cyan-400/15 text-cyan-400'
            : 'bg-purple-500/15 text-purple-400'
        }`}
      >
        <Icon size={20} />
      </div>
      <h3 className="font-semibold text-[#e2e8f0] mb-1.5">{title}</h3>
      <p className="text-sm text-[#94a3b8] leading-relaxed">{desc}</p>
    </motion.div>
  )
}

export default function About() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
            01. About
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2e8f0] mt-3">
            Who I Am
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-[#94a3b8] text-base leading-relaxed">
              I am a <span className="text-cyan-400 font-medium">Software Engineering </span> with
              a passion for building web applications and backend systems that solve real problems. My
              academic journey has given me a strong foundation in software design, algorithms, and
              full-stack development.
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              I work with technologies like <span className="text-[#e2e8f0] font-medium">Python, Laravel, FastAPI, PHP, JavaScript</span>, and
              databases including <span className="text-[#e2e8f0] font-medium">MySQL and Firebase</span>. I enjoy designing systems that are
              clean, maintainable, and built for real-world use cases rather than theoretical exercises.
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              Outside of code, I am continuously exploring areas like system design, backend architecture,
              and AI-powered applications — driven by the goal of becoming a well-rounded engineer
              ready for professional environments.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com/MohammedAlkaf1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2a3347] text-sm text-[#94a3b8] hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200"
              >
                <GithubIcon size={15} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-alkaf-254551288"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2a3347] text-sm text-[#94a3b8] hover:text-purple-400 hover:border-purple-400/50 transition-all duration-200"
              >
                <LinkedinIcon size={15} />
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <Card key={item.title} {...item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
