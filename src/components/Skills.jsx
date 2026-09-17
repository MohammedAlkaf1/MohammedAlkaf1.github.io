import { motion } from 'framer-motion'
import { Code2, Globe, Server, Database, Wrench, Layers, Brain, Boxes, Sparkles } from 'lucide-react'
import { skillCategories } from '../data/skills'

const iconMap = { Code2, Globe, Server, Database, Wrench, Layers, Brain, Boxes }

export default function Skills() {
  return (
    <section id="capabilities" className="relative px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <div className="eyebrow-pill mb-6">
            <Sparkles size={13} />
            Capabilities
          </div>
          <h2 className="section-heading text-3xl md:text-5xl max-w-2xl">
            What I actually <span className="emphasis">work with</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Code2
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.3) }}
                className="card card-hover p-6"
              >
                <div className="w-10 h-10 rounded-xl border border-[#313136] bg-[#18181c] flex items-center justify-center mb-5">
                  <Icon size={17} className="text-[#6ea8fe]" />
                </div>
                <h3 className="text-[#f2f2f0] font-semibold text-sm mb-4">{cat.category}</h3>
                <ul className="space-y-1.5">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="text-sm text-[#8a8a92]">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
