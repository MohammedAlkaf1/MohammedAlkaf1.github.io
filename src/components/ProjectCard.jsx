import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Lock, BookOpen } from 'lucide-react'
import { GithubIcon } from './icons'

function ProjectImage({ project, index }) {
  const [imgError, setImgError] = useState(false)

  if (project.screenshot && !imgError) {
    return (
      <div className="h-44 relative overflow-hidden bg-[#0a0f1e]">
        <img
          src={project.screenshot}
          alt={project.name}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* dark overlay on hover for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 via-transparent to-transparent" />
        {/* Shine sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>
    )
  }

  // Fallback: gradient + icon
  return (
    <div
      className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <span
        className="text-5xl z-10 animate-float select-none"
        style={{ animationDelay: `${index * 0.3}s` }}
      >
        {project.icon}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
    </div>
  )
}

export default function ProjectCard({ project, index, onViewCaseStudy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass rounded-2xl overflow-hidden card-hover flex flex-col"
    >
      {/* Private badge */}
      {project.isPrivate && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0d1117]/70 border border-[#2a3347] text-[#94a3b8] text-xs font-medium backdrop-blur-sm">
            <Lock size={10} />
            Private
          </span>
        </div>
      )}

      <ProjectImage project={project} index={index} />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-[#e2e8f0] mb-2 group-hover:text-cyan-400 transition-colors duration-200">
          {project.name}
        </h3>
        <p className="text-[#94a3b8] text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#1e2534] border border-[#2a3347] text-[#94a3b8]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex gap-3">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#2a3347] text-sm text-[#94a3b8] hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200 font-medium"
            >
              <GithubIcon size={14} />
              Code
            </a>
          ) : (
            <span className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[#2a3347] text-sm text-[#64748b] font-medium cursor-default">
              <Lock size={14} />
              Private Repo
            </span>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 text-sm text-cyan-400 hover:from-cyan-500/30 hover:to-purple-600/30 transition-all duration-200 font-medium"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.caseStudy && onViewCaseStudy && (
            <button
              onClick={onViewCaseStudy}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 text-sm text-emerald-400 hover:from-emerald-500/30 hover:to-teal-600/30 hover:border-emerald-500/50 transition-all duration-200 font-medium"
            >
              <BookOpen size={14} />
              Case Study
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
