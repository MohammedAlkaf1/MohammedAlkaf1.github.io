import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="eyebrow-pill mb-8">
            <Quote size={12} />
            About
          </div>

          <p className="font-sans text-2xl md:text-3xl font-medium leading-snug text-[#c7c7cc]">
            I care less about following the newest framework and more about
            whether a system still makes sense{' '}
            <span className="emphasis">a year after it ships.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 space-y-5 text-[#8a8a92] text-base leading-relaxed max-w-xl mx-auto"
        >
          <p>
            That instinct comes from academic work that mostly wasn't
            academic in feel — a misinformation-reporting platform built for
            a Malaysian government agency, a resume analyzer that scores
            real documents against real job descriptions, a mental health
            risk model trained on 27,900+ student records. Group projects
            with production-shaped constraints, not toy briefs.
          </p>
          <p>
            Day to day that means Python, Laravel, FastAPI, PHP, and
            JavaScript on the code side, MySQL and Firebase underneath, and
            a habit of asking what a feature is actually for before I start
            building it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="flex justify-center gap-4 mt-9"
        >
          <a
            href="https://github.com/MohammedAlkaf1"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill !text-xs !py-2"
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-alkaf-254551288"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill !text-xs !py-2"
          >
            <LinkedinIcon size={14} />
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
