import { motion } from 'framer-motion'
import { Layers, GitBranch, Wrench } from 'lucide-react'

const items = [
  {
    icon: Layers,
    title: 'Full-stack by default',
    desc: 'Comfortable across the whole stack — Laravel and FastAPI on the backend, React and modern JS on the front, MySQL and Firebase underneath.',
  },
  {
    icon: GitBranch,
    title: 'Built for real constraints',
    desc: 'My strongest projects came from group work with production-shaped requirements — role-based access, real review workflows, real data.',
  },
  {
    icon: Wrench,
    title: 'Clean over clever',
    desc: 'I would rather ship a system that still makes sense a year later than one that shows off a framework trend for a week.',
  },
]

export default function Brings() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card card-hover p-7"
            >
              <div className="w-10 h-10 rounded-xl border border-[#313136] bg-[#18181c] flex items-center justify-center mb-6">
                <Icon size={18} className="text-[#6ea8fe]" />
              </div>
              <h3 className="text-[#f2f2f0] font-semibold text-base mb-2.5">{item.title}</h3>
              <p className="text-[#8a8a92] text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
