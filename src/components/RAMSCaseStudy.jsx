import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronRight, Target, CheckCircle2, Users, Layers,
  Code2, Lightbulb, Award, ArrowRight, Star, Image, Lock,
  FileText, Boxes, Gauge, Search, Sparkles,
} from 'lucide-react'

const SCREENSHOTS = [
  { src: '/images/projects/rams/dashboard.png', label: 'Dashboard', desc: 'Total analyses, average & best score, recent activity', gradient: 'from-violet-600 to-fuchsia-700', icon: '📊' },
  { src: '/images/projects/rams/match.png', label: 'Match Resume', desc: 'Upload a resume + paste a job description to score the fit', gradient: 'from-fuchsia-600 to-purple-700', icon: '🎯' },
  { src: '/images/projects/rams/result.png', label: 'Analysis Result', desc: 'Match score, matched / partial / missing skills & suggestions', gradient: 'from-violet-600 to-indigo-700', icon: '🧩' },
  { src: '/images/projects/rams/discover.png', label: 'AI Job Discovery', desc: 'Auto-generated queries find matching jobs from your resume', gradient: 'from-purple-600 to-fuchsia-700', icon: '🔎' },
  { src: '/images/projects/rams/compare.png', label: 'Compare Jobs', desc: 'One resume vs two job descriptions — which fits better', gradient: 'from-fuchsia-600 to-pink-700', icon: '⚖️' },
  { src: '/images/projects/rams/builder.png', label: 'Resume Builder', desc: 'ATS-aware builder with a 20+ criteria readiness score', gradient: 'from-violet-600 to-fuchsia-700', icon: '🛠️' },
]

const MODULES = [
  { title: 'Match Resume', tag: '✦ Core', tagColor: 'text-fuchsia-300 bg-fuchsia-400/10 border-fuchsia-400/40', barColor: 'from-fuchsia-500 to-purple-600', icon: Target, iconColor: 'text-fuchsia-300', features: ['Upload PDF / DOCX resume', 'Paste or template a job description', 'Match score with matched & missing skills', 'Evidence-backed improvement suggestions'] },
  { title: 'AI Job Discovery', tag: 'Module', tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/30', barColor: 'from-violet-500 to-indigo-600', icon: Search, iconColor: 'text-violet-400', features: ['Builds search queries from the resume', 'Ranks discovered jobs by match %', 'Per-job skill breakdown', 'Save jobs for later review'] },
  { title: 'Compare & History', tag: 'Module', tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30', barColor: 'from-purple-500 to-violet-600', icon: Layers, iconColor: 'text-purple-400', features: ['Compare a resume against two roles', 'Stored analysis history with search/sort', 'Score trend analytics (Recharts)', 'Re-open any past result'] },
  { title: 'Resume Builder', tag: 'Module', tagColor: 'text-pink-400 bg-pink-400/10 border-pink-400/30', barColor: 'from-pink-500 to-fuchsia-600', icon: FileText, iconColor: 'text-pink-400', features: ['Structured sections + live preview', 'ATS score over 20+ criteria', 'Completeness meter & writing hints', 'Export to formatted PDF'] },
]

const OBJECTIVES = [
  'Build a web app to upload resumes, analyse job descriptions, discover jobs, compare roles & manage results',
  'Design an interpretable Match Score from skill matching, semantic similarity & keyword overlap',
  'Evaluate the AI matching approach through functional, integration & user-acceptance testing',
  'Make scoring transparent — show matched, partial & missing skills, not just a number',
  'Give students and fresh graduates an accessible, ATS-aware way to improve resumes',
  'Back the platform with a clean service-layer architecture (Next.js + FastAPI + PostgreSQL)',
]

const USERS = [
  { role: 'Students & Fresh Grads', icon: '🎓', gradient: 'from-violet-500 to-fuchsia-600', actions: ['Check resume fit before applying', 'See exactly which skills are missing', 'Build an ATS-friendly resume', 'Track score improvements over time'] },
  { role: 'Active Job Seekers', icon: '💼', gradient: 'from-fuchsia-500 to-purple-600', actions: ['Discover roles that match the resume', 'Compare two job offers side by side', 'Save and organise opportunities', 'Get AI improvement suggestions'] },
  { role: 'Career Advisors', icon: '🧭', gradient: 'from-purple-500 to-indigo-600', actions: ['Give guidance from measurable scores', 'Point to concrete skill gaps', 'Recommend what to learn next', 'Support internship & graduate prep'] },
]

const SCORING = [
  { title: 'Skill Matching · 55%', icon: Boxes, color: 'text-fuchsia-400', bar: 'from-fuchsia-500 to-purple-600', items: ['Skill ontology + alias mapping', 'Exact, alias, fuzzy & semantic matches', 'Full / strong-partial / weak-partial / missing', 'Highest weight — drives suitability'] },
  { title: 'Semantic Similarity · 30%', icon: Sparkles, color: 'text-violet-400', bar: 'from-violet-500 to-indigo-600', items: ['Sentence-transformer embeddings', 'Cosine similarity on meaning', 'Catches differently-worded experience', 'Evidence sentence extraction'] },
  { title: 'TF-IDF Overlap · 15%', icon: Gauge, color: 'text-purple-400', bar: 'from-purple-500 to-violet-600', items: ['scikit-learn TF-IDF vectors', 'Keyword-level cosine similarity', 'Grounds the score in shared terms', 'Fused into one 0–100 Match Score'] },
]

const TECH_STACK = [
  { name: 'Next.js', badge: 'bg-slate-500/15 border-slate-400/30 text-slate-200' },
  { name: 'React', badge: 'bg-sky-500/15 border-sky-400/30 text-sky-300' },
  { name: 'TypeScript', badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300' },
  { name: 'Tailwind CSS', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' },
  { name: 'FastAPI', badge: 'bg-teal-500/15 border-teal-400/30 text-teal-300' },
  { name: 'Python', badge: 'bg-amber-500/15 border-amber-400/30 text-amber-300' },
  { name: 'PostgreSQL', badge: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300' },
  { name: 'SQLAlchemy', badge: 'bg-red-500/15 border-red-400/30 text-red-300' },
  { name: 'scikit-learn', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300' },
  { name: 'RapidFuzz', badge: 'bg-violet-500/15 border-violet-400/30 text-violet-300' },
  { name: 'sentence-transformers', badge: 'bg-fuchsia-500/15 border-fuchsia-400/30 text-fuchsia-300' },
  { name: 'Google Gemini', badge: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300' },
  { name: 'JWT + bcrypt', badge: 'bg-rose-500/15 border-rose-400/30 text-rose-300' },
  { name: 'Recharts', badge: 'bg-pink-500/15 border-pink-400/30 text-pink-300' },
]

const CHALLENGES = [
  { title: 'Matching Beyond Keywords', solution: 'ATS tools fail when a resume says "JS" and the job says "JavaScript". I combined a skill ontology + alias map, RapidFuzz fuzzy matching and sentence-transformer semantics so exact, partial and meaning-level matches are all caught.', icon: Boxes, color: 'text-fuchsia-400' },
  { title: 'Making the Score Explainable', solution: 'A bare percentage is not actionable. The final score fuses three signals (0.55 skill · 0.30 semantic · 0.15 TF-IDF) and the UI surfaces matched, partial and missing skills plus the resume sentence that supports each match.', icon: Gauge, color: 'text-violet-400' },
  { title: 'Reliable Document Parsing', solution: 'Resumes arrive as messy PDF/DOCX files. I built a parsing + preprocessing pipeline (tokenise, lowercase, stop-word removal, lemmatise) with graceful handling so malformed files never crash the analysis.', icon: FileText, color: 'text-purple-400' },
  { title: 'Production-Grade Quality', solution: 'Structured the backend into service / repository layers over FastAPI + PostgreSQL, secured it with JWT + bcrypt, and validated it with 42+ pytest tests plus Playwright end-to-end flows.', icon: CheckCircle2, color: 'text-pink-400' },
]

const SKILLS = [
  'Full-Stack Development', 'Next.js / React', 'TypeScript', 'FastAPI / Python',
  'NLP (TF-IDF · Semantic)', 'Fuzzy Matching', 'PostgreSQL / SQLAlchemy', 'JWT Auth',
  'AI Integration (Gemini)', 'Agile / Scrum', 'Requirements Engineering', 'Software Testing (pytest · Playwright)',
]

const MY_ROLE_SUBS = [
  'Designed and built the entire system end-to-end as my Final Year Project',
  'Implemented the hybrid NLP matching pipeline and weighted Match Score',
  'Built all 10 frontend modules in Next.js + TypeScript + Tailwind',
  'Developed the FastAPI backend, PostgreSQL schema and JWT auth',
  'Integrated Google Gemini for contextual improvement suggestions',
  'Authored the full PSM thesis (problem, design, methodology, results)',
  'Validated with functional, integration and User Acceptance Testing',
]

function SectionTitle({ icon: Icon, label, color = 'text-violet-400' }) {
  return (
    <div className={`flex items-center gap-2 mb-6 ${color}`}>
      <Icon size={17} />
      <span className="text-xs font-mono uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-[#2a3347] ml-2" />
    </div>
  )
}

function ScreenshotCard({ shot, index }) {
  const [imgError, setImgError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group rounded-xl overflow-hidden border border-[#2a3347] hover:border-violet-500/40 transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden bg-[#0a0f1e]">
        {!imgError ? (
          <>
            <img src={shot.src} alt={shot.label} onLoad={() => setLoaded(true)} onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
            {!loaded && <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} flex items-center justify-center`}><span className="text-4xl">{shot.icon}</span></div>}
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} flex flex-col items-center justify-center gap-2`}>
            <span className="text-4xl">{shot.icon}</span>
            <span className="text-white/50 text-xs font-mono">{shot.label}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      </div>
      <div className="p-3 bg-[#161b27]">
        <p className="text-sm font-semibold text-[#e2e8f0]">{shot.label}</p>
        <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{shot.desc}</p>
      </div>
    </motion.div>
  )
}

export default function RAMSCaseStudy({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#080c15]/97 backdrop-blur-md overflow-y-auto">
          <div className="sticky top-0 z-10 bg-[#0d1117]/90 backdrop-blur-sm border-b border-[#2a3347] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <button onClick={onClose} className="hover:text-[#e2e8f0] transition-colors duration-200">Projects</button>
              <ChevronRight size={14} />
              <span className="text-fuchsia-300 font-medium">RAMS</span>
              <span className="hidden sm:inline text-[#2a3347] mx-1">—</span>
              <span className="hidden sm:inline">Final Year Project</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg border border-[#2a3347] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-[#4a5568] transition-all duration-200" aria-label="Close case study"><X size={16} /></button>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-12 pb-28">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-14">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-violet-500/10 to-fuchsia-600/10 border border-violet-500/20 p-8 md:p-12">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #8b5cf6 1px, transparent 1px), radial-gradient(circle at 80% 20%, #d946ef 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-400/15 border border-violet-400/30 text-violet-300 mb-5">
                    Final Year Project · BSc Software Engineering · UMPSA · 2025/2026
                  </span>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl select-none">📄</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#e2e8f0]">RAMS</h1>
                  </div>
                  <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                    An <span className="text-[#e2e8f0] font-medium">AI-powered Resume Analysis &amp; Skill Matching System</span> that
                    scores a resume against a job description using hybrid NLP — skill matching, semantic similarity and TF-IDF — then
                    explains the gap with matched, partial and missing skills, AI suggestions, job discovery and an ATS resume builder.
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2a3347] bg-[#0d1117]/40 text-[#94a3b8] text-sm font-medium">
                    <Lock size={15} /> Restricted academic thesis · public source repo
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {[
                  { value: '10', label: 'Modules', icon: '🧩' },
                  { value: 'Hybrid', label: 'NLP Matching', icon: '🧠' },
                  { value: 'Next.js', label: '+ FastAPI', icon: '⚙️' },
                  { value: 'PSM', label: 'Final Year', icon: '🎓' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center border border-[#2a3347]">
                    <div className="text-2xl mb-1 select-none">{stat.icon}</div>
                    <div className="text-xl font-bold text-[#e2e8f0]">{stat.value}</div>
                    <div className="text-xs text-[#94a3b8]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Target} label="Problem Statement" color="text-red-400" />
              <div className="glass rounded-2xl p-7 border border-[#2a3347]">
                <p className="text-[#94a3b8] leading-relaxed">
                  Recruiters skim each resume in seconds, and the <span className="text-[#e2e8f0] font-medium">Applicant Tracking Systems</span> that
                  filter them lean on rigid keyword matching — so a strong candidate using different wording gets dropped, and the scoring is a
                  black box. Job seekers, especially students, get <span className="text-[#e2e8f0] font-medium">no transparent feedback</span> on
                  whether their resume fits a role or what to improve. RAMS replaces that with a single, explainable platform: an interpretable
                  Match Score, clear skill-gap feedback, job discovery and an ATS-aware resume builder.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Target} label="Project Objectives" color="text-violet-400" />
              <div className="grid sm:grid-cols-2 gap-3">
                {OBJECTIVES.map((obj, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.07 }} className="flex items-start gap-3 glass rounded-xl p-4 border border-[#2a3347]">
                    <CheckCircle2 size={15} className="text-violet-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{obj}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Users} label="Who It's For" color="text-fuchsia-400" />
              <div className="grid md:grid-cols-3 gap-5">
                {USERS.map((user, i) => (
                  <motion.div key={user.role} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden border border-[#2a3347]">
                    <div className={`h-1.5 bg-gradient-to-r ${user.gradient}`} />
                    <div className="p-6">
                      <div className="text-3xl mb-3 select-none">{user.icon}</div>
                      <h3 className="font-bold text-[#e2e8f0] mb-4 text-sm">{user.role}</h3>
                      <ul className="space-y-2">
                        {user.actions.map((a) => (<li key={a} className="flex items-start gap-2"><ArrowRight size={11} className="text-[#4a5568] mt-1 shrink-0" /><span className="text-xs text-[#94a3b8] leading-relaxed">{a}</span></li>))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Layers} label="Key Modules" color="text-violet-400" />
              <div className="grid md:grid-cols-2 gap-5">
                {MODULES.map((mod, i) => {
                  const Icon = mod.icon
                  return (
                    <motion.div key={mod.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass rounded-2xl overflow-hidden border border-[#2a3347]">
                      <div className={`h-1 bg-gradient-to-r ${mod.barColor}`} />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-[#1e2534] ${mod.iconColor}`}><Icon size={17} /></div>
                            <h3 className="font-bold text-[#e2e8f0] text-sm">{mod.title}</h3>
                          </div>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ml-3 ${mod.tagColor}`}>{mod.tag}</span>
                        </div>
                        <ul className="space-y-2">
                          {mod.features.map((f) => (<li key={f} className="flex items-start gap-2"><ChevronRight size={12} className={`${mod.iconColor} mt-0.5 shrink-0`} /><span className="text-xs text-[#94a3b8] leading-relaxed">{f}</span></li>))}
                        </ul>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Gauge} label="How the Match Score Works" color="text-fuchsia-400" />
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-5 max-w-3xl">
                The final score is a <span className="text-[#e2e8f0] font-medium">weighted fusion of three signals</span> rather than a single
                similarity measure, so it balances explicit skills, contextual meaning and keyword overlap into one 0–100 result.
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {SCORING.map((q, i) => {
                  const Icon = q.icon
                  return (
                    <motion.div key={q.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden border border-[#2a3347]">
                      <div className={`h-1 bg-gradient-to-r ${q.bar}`} />
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3"><div className={`p-2 rounded-lg bg-[#1e2534] ${q.color}`}><Icon size={17} /></div><h3 className="font-bold text-[#e2e8f0] text-sm">{q.title}</h3></div>
                        <ul className="space-y-2 border-t border-[#2a3347] pt-3">
                          {q.items.map((t) => (<li key={t} className="flex items-start gap-2"><ChevronRight size={12} className={`${q.color} mt-0.5 shrink-0`} /><span className="text-xs text-[#94a3b8] leading-relaxed">{t}</span></li>))}
                        </ul>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Code2} label="Technologies Used" color="text-purple-400" />
              <div className="glass rounded-2xl p-6 border border-[#2a3347]">
                <div className="flex flex-wrap gap-3">
                  {TECH_STACK.map((t) => (<span key={t.name} className={`px-4 py-2 rounded-xl text-sm font-medium border ${t.badge}`}>{t.name}</span>))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Image} label="Screenshots" color="text-violet-400" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SCREENSHOTS.map((shot, i) => (<ScreenshotCard key={shot.label} shot={shot} index={i} />))}
              </div>
              <p className="text-xs text-[#4a5568] text-center mt-4 font-mono">Screens from the RAMS web app · UMPSA Final Year Project</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Star} label="My Role" color="text-fuchsia-400" />
              <div className="glass rounded-2xl p-7 border border-violet-500/20">
                <div className="flex flex-wrap items-start gap-4 mb-5">
                  <span className="text-3xl select-none">👨‍💻</span>
                  <div>
                    <h3 className="font-bold text-[#e2e8f0] text-base">Solo Final Year Project</h3>
                    <p className="text-xs text-[#94a3b8] mt-0.5">CB22162 · Supervisor: TS. Dr. Abdul Sahli bin Fakharudin · UMPSA</p>
                  </div>
                </div>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">I designed, built and documented RAMS end-to-end — the frontend, the FastAPI backend, the hybrid NLP matching engine and the thesis itself.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {MY_ROLE_SUBS.map((item) => (<div key={item} className="flex items-start gap-2"><CheckCircle2 size={13} className="text-violet-400 mt-0.5 shrink-0" /><span className="text-xs text-[#94a3b8] leading-relaxed">{item}</span></div>))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Lightbulb} label="Challenges &amp; Solutions" color="text-fuchsia-400" />
              <div className="space-y-4">
                {CHALLENGES.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass rounded-xl p-6 border border-[#2a3347]">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg bg-[#1e2534] ${item.color} shrink-0 mt-0.5`}><Icon size={15} /></div>
                        <div><h4 className="font-semibold text-[#e2e8f0] mb-2 text-sm">{item.title}</h4><p className="text-xs text-[#94a3b8] leading-relaxed">{item.solution}</p></div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Award} label="Skills Demonstrated" color="text-purple-400" />
              <div className="flex flex-wrap gap-2.5">
                {SKILLS.map((skill, i) => (
                  <motion.span key={skill} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.04 }} className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#161b27] border border-[#2a3347] text-[#94a3b8] hover:text-fuchsia-300 hover:border-fuchsia-400/30 transition-colors duration-200 cursor-default">{skill}</motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="glass rounded-2xl p-8 border border-violet-500/20 text-center">
                <p className="text-sm text-[#94a3b8] mb-5">My Final Year Project at UMPSA. The thesis is restricted, but the source code is public on GitHub.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="https://github.com/MohammedAlkaf1/MyFYP" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white font-medium text-sm hover:opacity-90 transition-opacity duration-200">
                    <Code2 size={15} /> View Code
                  </a>
                  <button onClick={onClose} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a3347] text-[#94a3b8] font-medium text-sm hover:text-[#e2e8f0] hover:border-[#4a5568] transition-all duration-200"><X size={14} /> Close</button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
