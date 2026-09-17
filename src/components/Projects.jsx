import { useState } from 'react'
import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
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

const FEATURED_SLUG = 'rams-fyp'

export default function Projects() {
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const [sebenarnyaOpen, setSebenarnyaOpen] = useState(false)
  const [smartedOpen, setSmartedOpen] = useState(false)
  const [samsOpen, setSamsOpen] = useState(false)
  const [ramsOpen, setRamsOpen] = useState(false)
  const [depressionOpen, setDepressionOpen] = useState(false)
  const [blockchainOpen, setBlockchainOpen] = useState(false)

  const openCaseStudy = (slug) => () => {
    if (slug === 'mypetakom') setCaseStudyOpen(true)
    else if (slug === 'MySebenarnya') setSebenarnyaOpen(true)
    else if (slug === 'smartED') setSmartedOpen(true)
    else if (slug === 'sams') setSamsOpen(true)
    else if (slug === 'rams-fyp') setRamsOpen(true)
    else if (slug === 'student-depression-detection') setDepressionOpen(true)
    else if (slug === 'blockchain-donation-tracking') setBlockchainOpen(true)
  }

  const featured = projects.find((p) => p.slug === FEATURED_SLUG)
  const rest = projects.filter((p) => p.slug !== FEATURED_SLUG)

  return (
    <section id="work" className="relative px-6 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <div className="eyebrow-pill mb-6">
            <Package size={13} />
            Work
          </div>
          <h2 className="section-heading text-3xl md:text-5xl max-w-2xl">
            Nine projects, <span className="emphasis">one recurring interest</span>
          </h2>
          <p className="text-[#8a8a92] text-base mt-4 max-w-lg">
            Systems that hold up under real use — not toy briefs.
          </p>
        </motion.div>

        {/* Featured spread */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="card overflow-hidden mb-6"
          >
            <div className="grid md:grid-cols-2">
              <div className="aspect-[4/3] md:aspect-auto bg-dots flex items-center justify-center border-b md:border-b-0 md:border-r border-[#232327]">
                <span className="text-7xl select-none">{featured.icon}</span>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <span className="idx-num mb-4">Featured — Final Year Project</span>
                <h3 className="font-sans font-bold text-2xl md:text-3xl text-[#f2f2f0] mb-4 leading-tight">
                  {featured.name}
                </h3>
                <p className="text-[#8a8a92] text-sm leading-relaxed mb-5 max-w-md">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featured.tech.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  {featured.github && (
                    <a
                      href={featured.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-sm text-[#c7c7cc] hover:text-[#f2f2f0] inline-flex items-center gap-1.5"
                    >
                      <GithubIcon size={13} />
                      Code
                    </a>
                  )}
                  <button onClick={openCaseStudy(featured.slug)} className="btn-pill-primary">
                    Read the case study
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onViewCaseStudy={project.caseStudy ? openCaseStudy(project.slug) : undefined}
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-14"
        >
          <a
            href="https://github.com/MohammedAlkaf1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill"
          >
            View all repositories
          </a>
        </motion.div>
      </div>
    </section>
  )
}
