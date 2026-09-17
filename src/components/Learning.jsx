import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

const learningItems = [
  {
    status: 'Active',
    title: 'Software Engineering Concepts',
    desc: 'Deep-diving into software design patterns, SOLID principles, clean architecture, and engineering best practices used in production systems.',
  },
  {
    status: 'Active',
    title: 'Advanced Web Development',
    desc: 'Expanding skills in modern full-stack development — from React component architecture to server-side rendering and API design.',
  },
  {
    status: 'Active',
    title: 'Firebase & Cloud Services',
    desc: 'Building real-time applications using Firebase Authentication, Firestore, and cloud functions for scalable backend services.',
  },
  {
    status: 'Active',
    title: 'Backend Development',
    desc: 'Strengthening expertise in FastAPI and Laravel for building RESTful APIs, middleware, authentication systems, and scalable backends.',
  },
  {
    status: 'In Progress',
    title: 'System Design',
    desc: 'Learning to design scalable distributed systems — covering databases, caching, load balancing, microservices, and real-world architectural patterns.',
  },
  {
    status: 'Ongoing',
    title: 'Clean Code Practices',
    desc: 'Studying clean code principles, meaningful naming, refactoring techniques, and how to write code that is easy to read, test, and maintain.',
  },
]

export default function Learning() {
  return (
    <section id="log" className="relative px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <div className="eyebrow-pill mb-6">
            <Activity size={12} />
            Log
          </div>
          <h2 className="section-heading text-3xl md:text-4xl">
            Currently <span className="emphasis">in progress</span>
          </h2>
        </motion.div>

        <div>
          {learningItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
              className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_1fr] gap-6 py-6 border-t border-[#232327] last:border-b"
            >
              <span className="idx-num pt-0.5">{item.status}</span>
              <div>
                <h3 className="text-[#f2f2f0] font-medium mb-1.5">{item.title}</h3>
                <p className="text-sm text-[#8a8a92] leading-relaxed max-w-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
