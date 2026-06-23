import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Cpu,
  Globe,
  Flame,
  Server,
  LayoutDashboard,
  Pen,
} from 'lucide-react'

const learningItems = [
  {
    icon: LayoutDashboard,
    color: 'cyan',
    title: 'Software Engineering Concepts',
    desc: 'Deep-diving into software design patterns, SOLID principles, clean architecture, and engineering best practices used in production systems.',
    status: 'Active',
  },
  {
    icon: Globe,
    color: 'purple',
    title: 'Advanced Web Development',
    desc: 'Expanding skills in modern full-stack development — from React component architecture to server-side rendering and API design.',
    status: 'Active',
  },
  {
    icon: Flame,
    color: 'cyan',
    title: 'Firebase & Cloud Services',
    desc: 'Building real-time applications using Firebase Authentication, Firestore, and cloud functions for scalable backend services.',
    status: 'Active',
  },
  {
    icon: Server,
    color: 'purple',
    title: 'Backend Development',
    desc: 'Strengthening expertise in FastAPI and Laravel for building RESTful APIs, middleware, authentication systems, and scalable backends.',
    status: 'Active',
  },
  {
    icon: Cpu,
    color: 'cyan',
    title: 'System Design',
    desc: 'Learning to design scalable distributed systems — covering databases, caching, load balancing, microservices, and real-world architectural patterns.',
    status: 'In Progress',
  },
  {
    icon: Pen,
    color: 'purple',
    title: 'Clean Code Practices',
    desc: 'Studying clean code principles, meaningful naming, refactoring techniques, and how to write code that is easy to read, test, and maintain.',
    status: 'Ongoing',
  },
]

export default function Learning() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="learning" className="py-24 px-6 bg-[#0a0f1e]/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
            04. Growth
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2e8f0] mt-3">
            What I'm Currently Learning
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto mt-4" />
          <p className="text-[#94a3b8] text-sm mt-4 max-w-lg mx-auto">
            I believe in continuous improvement. Here are the areas I'm actively exploring and deepening.
          </p>
        </motion.div>

        {/* Learning cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20">
          {learningItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 card-hover relative overflow-hidden group"
              >
                {/* Subtle glow on hover */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    item.color === 'cyan'
                      ? 'bg-gradient-to-br from-cyan-400/5 to-transparent'
                      : 'bg-gradient-to-br from-purple-500/5 to-transparent'
                  }`}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        item.color === 'cyan'
                          ? 'bg-cyan-400/15 text-cyan-400'
                          : 'bg-purple-500/15 text-purple-400'
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.status === 'Active'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#e2e8f0] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
