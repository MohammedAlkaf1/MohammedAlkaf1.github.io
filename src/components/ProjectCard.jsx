import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, ExternalLink } from 'lucide-react'
import { GithubIcon } from './icons'

function ProjectVisual({ project }) {
  const [imgError, setImgError] = useState(false)

  if (project.screenshot && !imgError) {
    return (
      <img
        src={project.screenshot}
        alt={project.name}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
      />
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-dots">
      <span className="text-4xl select-none">{project.icon}</span>
    </div>
  )
}

export default function ProjectCard({ project, index, onViewCaseStudy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.25) }}
      className="group card card-hover overflow-hidden flex flex-col"
    >
      <div className="aspect-[16/10] bg-[#131316] overflow-hidden relative border-b border-[#232327]">
        <ProjectVisual project={project} />
        {project.isPrivate && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0a0a0d]/80 border border-[#313136] text-[#c7c7cc] text-xs backdrop-blur-sm">
            <Lock size={10} />
            Private
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[#f2f2f0] font-semibold text-lg mb-2">{project.name}</h3>
        <p className="text-[#8a8a92] text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-5 text-sm">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[#c7c7cc] hover:text-[#f2f2f0] inline-flex items-center gap-1.5"
            >
              <GithubIcon size={13} />
              Code
            </a>
          ) : (
            <span className="text-[#8a8a92] inline-flex items-center gap-1.5">
              <Lock size={12} />
              Private
            </span>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[#c7c7cc] hover:text-[#f2f2f0] inline-flex items-center gap-1.5"
            >
              <ExternalLink size={13} />
              Demo
            </a>
          )}
          {project.caseStudy && onViewCaseStudy && (
            <button
              onClick={onViewCaseStudy}
              className="link-underline text-[#6ea8fe] ml-auto"
            >
              Case study →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
