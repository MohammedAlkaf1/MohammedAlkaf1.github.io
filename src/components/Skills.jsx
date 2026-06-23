import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Globe, Server, Database, Wrench, Layers, Smartphone, Brain, Boxes } from 'lucide-react'
import { skillCategories } from '../data/skills'

const iconMap = { Code2, Globe, Server, Database, Wrench, Layers, Smartphone, Brain, Boxes }

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#e2e8f0] font-medium">{name}</span>
        <span className="text-xs text-[#64748b] font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1e2534] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            color === 'cyan'
              ? 'bg-gradient-to-r from-cyan-500 to-cyan-300'
              : 'bg-gradient-to-r from-purple-600 to-purple-400'
          }`}
        />
      </div>
    </div>
  )
}

function CategoryCard({ category, icon, color, skills, cardIndex }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const Icon = iconMap[icon] || Code2

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: cardIndex * 0.08 }}
      className="glass rounded-2xl p-6 card-hover"
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            color === 'cyan' ? 'bg-cyan-400/15 text-cyan-400' : 'bg-purple-500/15 text-purple-400'
          }`}
        >
          <Icon size={18} />
        </div>
        <h3 className="font-semibold text-[#e2e8f0] text-sm">{category}</h3>
      </div>
      <div>
        {skills.map((skill, i) => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
            color={color}
            delay={cardIndex * 0.08 + i * 0.07}
          />
        ))}
      </div>
    </motion.div>
  )
}

const techBadges = [
  // Languages
  'Python', 'JavaScript', 'TypeScript', 'PHP', 'Dart', 'Java', 'C',
  // Frameworks & web
  'Next.js', 'React', 'Laravel', 'Flutter', 'FastAPI', 'Node.js', 'Express', 'Streamlit', 'Tailwind CSS', 'Blade', 'Chart.js', 'HTML', 'CSS',
  // Backend / cloud / data
  'REST API', 'MySQL', 'PostgreSQL', 'Firebase', 'Firestore', 'JWT Auth', 'phpMyAdmin',
  // AI / ML
  'Machine Learning', 'scikit-learn', 'Pandas', 'NumPy', 'NLP', 'TF-IDF',
  // Blockchain
  'Hyperledger Fabric', 'Smart Contracts',
  // Tools
  'Git & GitHub', 'GitHub Actions', 'Vercel', 'Figma', 'Canva', 'Draw.io', 'Cisco',
  // Concepts
  'MVC', 'RBAC', 'GPS / Geolocation', 'Agile / Scrum',
]

export default function Skills() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-24 px-6 bg-[#0a0f1e]/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
            02. Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2e8f0] mt-3">
            Technical Expertise
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto mt-4" />
          <p className="text-[#94a3b8] text-sm mt-4 max-w-lg mx-auto">
            Technologies and tools I work with to build reliable software.
          </p>
        </motion.div>

        {/* Tech badge cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {techBadges.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={titleInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium border border-[#2a3347] text-[#94a3b8] hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-200 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* Skill category grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.category} {...cat} cardIndex={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
