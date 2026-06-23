import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GithubIcon } from './icons'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import MyPetakomCaseStudy from './MyPetakomCaseStudy'
import MySebenarnyaCaseStudy from './MySebenarnyaCaseStudy'
import SmartEDCaseStudy from './SmartEDCaseStudy'
import SAMSCaseStudy from './SAMSCaseStudy'
import RAMSCaseStudy from './RAMSCaseStudy'
import DepressionCaseStudy from './DepressionCaseStudy'
import BlockchainCaseStudy from './BlockchainCaseStudy'

const filters = ['All', 'Featured', 'Python', 'PHP', 'JavaScript', 'TypeScript', 'Laravel', 'Flutter', 'Firebase']

export default function Projects() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })
  const [activeFilter, setActiveFilter] = useState('All')
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const [sebenarnyaOpen, setSebenarnyaOpen] = useState(false)
  const [smartedOpen, setSmartedOpen] = useState(false)
  const [samsOpen, setSamsOpen] = useState(false)
  const [ramsOpen, setRamsOpen] = useState(false)
  const [depressionOpen, setDepressionOpen] = useState(false)
  const [blockchainOpen, setBlockchainOpen] = useState(false)

  const filtered = projects.filter((p) => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Featured') return p.featured
    return p.tech.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
  })

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
            03. Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2e8f0] mt-3">
            What I've Built
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto mt-4" />
          <p className="text-[#94a3b8] text-sm mt-4 max-w-lg mx-auto">
            A selection of projects I've developed as a Software Engineering student, ranging from
            AI-powered tools to full-stack web applications.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white'
                  : 'border border-[#2a3347] text-[#94a3b8] hover:border-cyan-400/50 hover:text-cyan-400'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              featured={project.featured}
              onViewCaseStudy={
                project.caseStudy
                  ? () => {
                      if (project.slug === 'mypetakom') setCaseStudyOpen(true)
                      else if (project.slug === 'MySebenarnya') setSebenarnyaOpen(true)
                      else if (project.slug === 'smartED') setSmartedOpen(true)
                      else if (project.slug === 'sams') setSamsOpen(true)
                      else if (project.slug === 'rams-fyp') setRamsOpen(true)
                      else if (project.slug === 'student-depression-detection') setDepressionOpen(true)
                      else if (project.slug === 'blockchain-donation-tracking') setBlockchainOpen(true)
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <MyPetakomCaseStudy isOpen={caseStudyOpen} onClose={() => setCaseStudyOpen(false)} />
        <MySebenarnyaCaseStudy isOpen={sebenarnyaOpen} onClose={() => setSebenarnyaOpen(false)} />
        <SmartEDCaseStudy isOpen={smartedOpen} onClose={() => setSmartedOpen(false)} />
        <SAMSCaseStudy isOpen={samsOpen} onClose={() => setSamsOpen(false)} />
        <RAMSCaseStudy isOpen={ramsOpen} onClose={() => setRamsOpen(false)} />
        <DepressionCaseStudy isOpen={depressionOpen} onClose={() => setDepressionOpen(false)} />
        <BlockchainCaseStudy isOpen={blockchainOpen} onClose={() => setBlockchainOpen(false)} />

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-[#94a3b8] text-sm mb-4">
            Want to see more of my work?
          </p>
          <a
            href="https://github.com/MohammedAlkaf1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a3347] text-[#94a3b8] font-medium text-sm hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200"
          >
            <GithubIcon size={16} />
            View All Repositories
          </a>
        </motion.div>
      </div>
    </section>
  )
}
