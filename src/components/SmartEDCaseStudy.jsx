import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronRight, ExternalLink, Target, CheckCircle2, Users, Layers,
  Code2, Lightbulb, Award, ArrowRight, Shield, LayoutDashboard, Star,
  Wrench, Image, Gauge, ShieldCheck, MousePointerClick, Lock,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCREENSHOTS = [
  {
    src: '/images/projects/smarted/student-grades.png',
    label: 'Student — Course Grades',
    desc: 'Per-course average, graded count, and letter grade with assessment breakdown',
    gradient: 'from-blue-600 to-indigo-700',
    icon: '🎓',
  },
  {
    src: '/images/projects/smarted/final-grade-report.png',
    label: 'Final Grade Report',
    desc: 'Overall GPA, credits earned, academic standing, and printable summary',
    gradient: 'from-indigo-600 to-violet-700',
    icon: '📄',
  },
  {
    src: '/images/projects/smarted/course-breakdown.png',
    label: 'Assessment Breakdown',
    desc: 'Quizzes, exams, and homework listed with percentages per enrolled course',
    gradient: 'from-cyan-600 to-blue-700',
    icon: '📈',
  },
  {
    src: '/images/projects/smarted/teacher-grades.png',
    label: 'Teacher — Grade Management',
    desc: 'Searchable, filterable table of all grades with totals and pending reviews',
    gradient: 'from-violet-600 to-purple-700',
    icon: '🧑‍🏫',
  },
  {
    src: '/images/projects/smarted/create-grade.png',
    label: 'Create Grade Entry',
    desc: 'Record new grades with auto-calculated percentage, letter grade, and feedback',
    gradient: 'from-blue-600 to-violet-700',
    icon: '➕',
  },
  {
    src: '/images/projects/smarted/update-grade.png',
    label: 'Update Grade Entry',
    desc: 'Edit points and feedback with optional email notification to the student',
    gradient: 'from-sky-600 to-blue-700',
    icon: '✏️',
  },
  {
    src: '/images/projects/smarted/class-progress.png',
    label: 'Class Progress Dashboard',
    desc: 'Class average, highest/lowest grades, and grade-distribution chart',
    gradient: 'from-indigo-600 to-blue-700',
    icon: '📊',
  },
  {
    src: '/images/projects/smarted/performance-analytics.png',
    label: 'Performance Analytics',
    desc: 'Grade distribution by type and trends, flagging students needing attention',
    gradient: 'from-purple-600 to-violet-700',
    icon: '🧭',
  },
  {
    src: '/images/projects/smarted/admin-grades.png',
    label: 'Admin — Grades Management',
    desc: 'System-wide grade distribution, performance overview, and recent updates log',
    gradient: 'from-violet-600 to-indigo-700',
    icon: '🛡️',
  },
  {
    src: '/images/projects/smarted/transcript.png',
    label: 'Official Transcript',
    desc: 'Auto-generated transcript with cumulative GPA and total credits',
    gradient: 'from-blue-600 to-cyan-700',
    icon: '🧾',
  },
  {
    src: '/images/projects/smarted/grade-settings.png',
    label: 'Grade Settings',
    desc: 'Grading scale, GPA bands, and weight policies for assignments/quizzes/exams',
    gradient: 'from-indigo-600 to-purple-700',
    icon: '⚙️',
  },
]

const MODULES = [
  {
    id: 1,
    title: 'Manage Profile',
    owner: 'Alhamed',
    tag: 'Module 1',
    tagColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    barColor: 'from-cyan-500 to-blue-600',
    icon: Shield,
    iconColor: 'text-cyan-400',
    features: [
      'Admin-created accounts with temporary passwords',
      'Secure login & authentication for every role',
      'View / update personal and professional details',
      'Role-based access control and password reset',
    ],
  },
  {
    id: 2,
    title: 'Manage Course Registration',
    owner: 'Hilmi',
    tag: 'Module 2',
    tagColor: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
    barColor: 'from-sky-500 to-blue-600',
    icon: LayoutDashboard,
    iconColor: 'text-sky-400',
    features: [
      'Browse available courses and enroll by preference',
      'Drop courses and confirm registered subjects',
      'Teacher enrollment approval and capacity limits',
      'Edit course details and view teaching schedule',
    ],
  },
  {
    id: 3,
    title: 'Manage Assignment & Submission',
    owner: 'Aina',
    tag: 'Module 3',
    tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    barColor: 'from-purple-500 to-violet-600',
    icon: Layers,
    iconColor: 'text-purple-400',
    features: [
      'Teachers create assignments with file rules & marks',
      'Students upload, resubmit, and submit before deadline',
      'Submission status: pending, submitted, or graded',
      'Teacher view of who has / hasn’t submitted',
    ],
  },
  {
    id: 4,
    title: 'Manage Progress & Grades',
    owner: 'Alkaf — me',
    tag: '✦ My Module',
    tagColor: 'text-violet-300 bg-violet-400/10 border-violet-400/40',
    barColor: 'from-blue-500 to-violet-600',
    icon: Award,
    iconColor: 'text-violet-300',
    features: [
      'Grade entry, feedback, and CRUD for assessments',
      'Auto-calculated totals, GPA, and progress dashboards',
      'Class analytics and student performance tracking',
      'Official transcripts and admin grade-policy settings',
    ],
  },
]

const OBJECTIVES = [
  'Design and implement a seamless, well-integrated teaching & learning platform — "SmartED"',
  'Establish a robust software quality assurance framework for security, reliability, and performance',
  'Centralize profiles, registration, assignments, and grades into one role-based system',
  'Replace fragmented spreadsheets and paper forms with consistent, real-time data',
  'Evaluate user acceptance and satisfaction to guide continuous improvement',
  'Validate non-functional quality goals through scenario-based testing and metrics',
]

const USERS = [
  {
    role: 'Student',
    icon: '👨‍🎓',
    gradient: 'from-blue-500 to-indigo-600',
    actions: [
      'View grades and detailed teacher feedback',
      'Monitor overall progress per registered course',
      'Read the final compiled grade report & GPA',
      'Print an official transcript for documentation',
    ],
  },
  {
    role: 'Teacher / Lecturer',
    icon: '🧑‍🏫',
    gradient: 'from-violet-500 to-purple-600',
    actions: [
      'Create and save grades with structured feedback',
      'Monitor class performance via dashboards',
      'Update or delete grade entries for re-evaluation',
      'Notify students of updated results by email',
    ],
  },
  {
    role: 'Administrator',
    icon: '🛡️',
    gradient: 'from-indigo-500 to-blue-600',
    actions: [
      'Access progress & grade reports for all students',
      'Finalize and correct grade records system-wide',
      'Generate official academic transcripts in bulk',
      'Manage grading scale, GPA bands, and weight policies',
    ],
  },
]

const QUALITY = [
  {
    title: 'Performance',
    icon: Gauge,
    color: 'text-blue-400',
    bar: 'from-blue-500 to-indigo-600',
    metric: '95% of dashboard requests ≤ 2s @ 200 concurrent users',
    result: '97% measured',
    tactics: [
      'Indexed query optimization (student / course / semester)',
      'Cache derived GPA & course totals; recompute only on change',
      'Pagination & lazy-loading for charts and long grade histories',
    ],
  },
  {
    title: 'Reliability',
    icon: ShieldCheck,
    color: 'text-violet-400',
    bar: 'from-violet-500 to-purple-600',
    metric: '0 partial commits · 100% correctness · full audit trail',
    result: '98% transaction success',
    tactics: [
      'Atomic transactional grade updates — all-or-nothing',
      'Server + client validation and DB constraints',
      'Audit logging (who / when / old / new) and safe retry on failure',
    ],
  },
  {
    title: 'Usability',
    icon: MousePointerClick,
    color: 'text-cyan-400',
    bar: 'from-cyan-500 to-blue-600',
    metric: '90% of first-time users find their result in ≤ 30s',
    result: '95% task success',
    tactics: [
      'Consistent layout and meaningful labels across tabs',
      'Visual progress indicators (colour codes, progress bars)',
      'Inline validation and clear save / error feedback messages',
    ],
  },
]

const TECH_STACK = [
  { name: 'PHP', badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300' },
  { name: 'Firebase Auth', badge: 'bg-amber-500/15 border-amber-400/30 text-amber-300' },
  { name: 'Firestore', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300' },
  { name: 'Cloud Storage', badge: 'bg-yellow-500/15 border-yellow-400/30 text-yellow-300' },
  { name: 'Cloud Functions', badge: 'bg-red-500/15 border-red-400/30 text-red-300' },
  { name: 'JavaScript', badge: 'bg-yellow-500/15 border-yellow-400/30 text-yellow-300' },
  { name: 'HTML5 / CSS3', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' },
  { name: 'RBAC', badge: 'bg-violet-500/15 border-violet-400/30 text-violet-300' },
  { name: 'GitHub Actions', badge: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300' },
  { name: 'Figma', badge: 'bg-pink-500/15 border-pink-400/30 text-pink-300' },
  { name: 'Agile / Scrum', badge: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300' },
]

const CHALLENGES = [
  {
    title: 'Keeping Grades Consistent Under Concurrent Edits',
    solution:
      'Wrapped multi-student grade updates in atomic transactions so a save either fully commits or rolls back — no partial writes. Totals and progress summaries recalculate immediately, and an audit log records every change for traceability.',
    icon: ShieldCheck,
    color: 'text-violet-400',
  },
  {
    title: 'Fast Dashboards During Result-Release Spikes',
    solution:
      'Profiled the result-release peak as the worst case, then indexed hot columns, cached derived GPA/course totals, and lazy-loaded charts so the dashboard stays responsive (97% of requests under 2s) even with many students online at once.',
    icon: Gauge,
    color: 'text-blue-400',
  },
  {
    title: 'Making Academic Standing Understandable at a Glance',
    solution:
      'Designed consistent labels, colour-coded status (green = safe, red = at risk), and progress bars so a first-time student can locate their overall result in under 30 seconds without any training — validated in usability sessions.',
    icon: MousePointerClick,
    color: 'text-cyan-400',
  },
  {
    title: 'Engineering for Measurable Quality, Not Just Features',
    solution:
      'Drove the module from SQAP/Quality-Architecture scenarios — defining Performance, Reliability, and Usability targets up front, then validating each with scenario-based test cases and quality metrics before sign-off.',
    icon: Award,
    color: 'text-indigo-400',
  },
]

const SKILLS = [
  'Software Quality Assurance (SQA)',
  'ISO/IEC 25010 Quality Attributes',
  'Quality Attribute Scenarios & Tactics',
  'Performance / Load Considerations',
  'Transactional Data Integrity',
  'Audit Logging & Traceability',
  'Firebase (Auth / Firestore / Functions)',
  'Role-Based Access Control',
  'GPA & Grade Calculation Logic',
  'Data Visualization (Dashboards)',
  'Scenario-Based Test Cases & Metrics',
  'Agile / Sprint Coordination',
]

const MY_MODULE_SUBS = [
  'Built the Student grade views — feedback, overall progress, and final report',
  'Implemented Teacher CRUD for grades with auto percentage & letter grade',
  'Created class-progress dashboards and per-student performance tracking',
  'Added Admin tools: all-progress reports, transcripts, and grade settings',
  'Enforced validation, atomic updates, and an audit trail for every change',
  'Authored the SQAP, Quality Architecture, and test/validation documentation',
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ icon: Icon, label, color = 'text-blue-400' }) {
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
            <img
              src={shot.src}
              alt={shot.label}
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!loaded && (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} flex items-center justify-center`}
              >
                <span className="text-4xl">{shot.icon}</span>
              </div>
            )}
          </>
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} flex flex-col items-center justify-center gap-2`}
          >
            <span className="text-4xl">{shot.icon}</span>
            <span className="text-white/50 text-xs font-mono">screenshot pending</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      </div>
      <div className="p-3 bg-[#161b27]">
        <p className="text-sm font-semibold text-[#e2e8f0]">{shot.label}</p>
        <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{shot.desc}</p>
      </div>
    </motion.div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function SmartEDCaseStudy({ isOpen, onClose }) {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-[#080c15]/97 backdrop-blur-md overflow-y-auto"
        >
          {/* ── Sticky header ── */}
          <div className="sticky top-0 z-10 bg-[#0d1117]/90 backdrop-blur-sm border-b border-[#2a3347] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <button
                onClick={onClose}
                className="hover:text-[#e2e8f0] transition-colors duration-200"
              >
                Projects
              </button>
              <ChevronRight size={14} />
              <span className="text-violet-300 font-medium">SmartED</span>
              <span className="hidden sm:inline text-[#2a3347] mx-1">—</span>
              <span className="hidden sm:inline">Case Study</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg border border-[#2a3347] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-[#4a5568] transition-all duration-200"
              aria-label="Close case study"
            >
              <X size={16} />
            </button>
          </div>

          {/* ── Main content ── */}
          <div className="max-w-5xl mx-auto px-6 py-12 pb-28">

            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-14"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-violet-600/10 border border-violet-500/20 p-8 md:p-12">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 50%, #6366f1 1px, transparent 1px), radial-gradient(circle at 80% 20%, #8b5cf6 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-400/15 border border-violet-400/30 text-violet-300 mb-5">
                    Software Quality Assurance · BCS3263 · UMPSA · Semester 1 2025/2026
                  </span>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl select-none">🎓</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#e2e8f0]">SmartED</h1>
                  </div>
                  <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                    A role-based learning management platform that centralizes profiles, course
                    registration, assignments, and grades into one system. My contribution —{' '}
                    <span className="text-[#e2e8f0] font-medium">Manage Progress &amp; Grades</span> —
                    was engineered against measurable quality goals for performance, reliability,
                    and usability.
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2a3347] bg-[#0d1117]/40 text-[#94a3b8] text-sm font-medium">
                    <Lock size={15} />
                    Private academic repository · Group 1BG9
                  </span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {[
                  { value: '4', label: 'Modules', icon: '🔧' },
                  { value: '3', label: 'User Roles', icon: '👥' },
                  { value: 'Firebase', label: 'Backend', icon: '🔥' },
                  { value: '3', label: 'Quality Attributes', icon: '✅' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-xl p-4 text-center border border-[#2a3347]"
                  >
                    <div className="text-2xl mb-1 select-none">{stat.icon}</div>
                    <div className="text-xl font-bold text-[#e2e8f0]">{stat.value}</div>
                    <div className="text-xs text-[#94a3b8]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Problem Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Target} label="Problem Statement" color="text-red-400" />
              <div className="glass rounded-2xl p-7 border border-[#2a3347]">
                <p className="text-[#94a3b8] leading-relaxed">
                  Many institutions still manage academic work across{' '}
                  <span className="text-[#e2e8f0] font-medium">
                    paper forms, spreadsheets, and disconnected tools
                  </span>
                  , causing duplicated records, slow communication, and{' '}
                  <span className="text-[#e2e8f0] font-medium">
                    no reliable, real-time view of progress
                  </span>
                  . Grades update slowly and inconsistently, making it hard for students to gauge
                  where they stand and for teachers to spot who needs help. SmartED replaces this
                  fragmented approach with a single role-based platform — and the Manage Progress &amp;
                  Grades module makes academic results accurate, fast, and easy to understand.
                </p>
              </div>
            </motion.div>

            {/* Objectives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Target} label="Project Objectives" color="text-blue-400" />
              <div className="grid sm:grid-cols-2 gap-3">
                {OBJECTIVES.map((obj, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex items-start gap-3 glass rounded-xl p-4 border border-[#2a3347]"
                  >
                    <CheckCircle2 size={15} className="text-violet-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{obj}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Target Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Users} label="Target Users" color="text-purple-400" />
              <div className="grid md:grid-cols-3 gap-5">
                {USERS.map((user, i) => (
                  <motion.div
                    key={user.role}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass rounded-2xl overflow-hidden border border-[#2a3347]"
                  >
                    <div className={`h-1.5 bg-gradient-to-r ${user.gradient}`} />
                    <div className="p-6">
                      <div className="text-3xl mb-3 select-none">{user.icon}</div>
                      <h3 className="font-bold text-[#e2e8f0] mb-4 text-sm">{user.role}</h3>
                      <ul className="space-y-2">
                        {user.actions.map((action) => (
                          <li key={action} className="flex items-start gap-2">
                            <ArrowRight size={11} className="text-[#4a5568] mt-1 shrink-0" />
                            <span className="text-xs text-[#94a3b8] leading-relaxed">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* System Modules */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Layers} label="System Modules" color="text-violet-400" />
              <div className="grid md:grid-cols-2 gap-5">
                {MODULES.map((mod, i) => {
                  const Icon = mod.icon
                  return (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="glass rounded-2xl overflow-hidden border border-[#2a3347]"
                    >
                      <div className={`h-1 bg-gradient-to-r ${mod.barColor}`} />
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-[#1e2534] ${mod.iconColor}`}>
                              <Icon size={17} />
                            </div>
                            <div>
                              <h3 className="font-bold text-[#e2e8f0] text-sm">{mod.title}</h3>
                              <p className="text-[11px] text-[#64748b] mt-0.5">{mod.owner}</p>
                            </div>
                          </div>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ml-3 ${mod.tagColor}`}
                          >
                            {mod.tag}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {mod.features.map((feat) => (
                            <li key={feat} className="flex items-start gap-2">
                              <ChevronRight size={12} className={`${mod.iconColor} mt-0.5 shrink-0`} />
                              <span className="text-xs text-[#94a3b8] leading-relaxed">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Quality Engineering (SQA) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Award} label="Quality Engineering (SQA)" color="text-violet-400" />
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-5 max-w-3xl">
                As a Software Quality Assurance project, Module 4 was driven by{' '}
                <span className="text-[#e2e8f0] font-medium">ISO/IEC 25010</span> quality attributes.
                Each attribute has a measurable scenario, architectural tactics, and a verified
                result from scenario-based testing.
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {QUALITY.map((q, i) => {
                  const Icon = q.icon
                  return (
                    <motion.div
                      key={q.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className="glass rounded-2xl overflow-hidden border border-[#2a3347]"
                    >
                      <div className={`h-1 bg-gradient-to-r ${q.bar}`} />
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 rounded-lg bg-[#1e2534] ${q.color}`}>
                            <Icon size={17} />
                          </div>
                          <h3 className="font-bold text-[#e2e8f0] text-sm">{q.title}</h3>
                        </div>
                        <p className="text-xs text-[#94a3b8] leading-relaxed mb-2">
                          <span className="text-[#64748b]">Target:</span> {q.metric}
                        </p>
                        <span className={`inline-block text-xs font-semibold ${q.color} mb-4`}>
                          ✓ {q.result}
                        </span>
                        <ul className="space-y-2 border-t border-[#2a3347] pt-3">
                          {q.tactics.map((t) => (
                            <li key={t} className="flex items-start gap-2">
                              <ChevronRight size={12} className={`${q.color} mt-0.5 shrink-0`} />
                              <span className="text-xs text-[#94a3b8] leading-relaxed">{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Code2} label="Technologies Used" color="text-yellow-400" />
              <div className="glass rounded-2xl p-6 border border-[#2a3347]">
                <div className="flex flex-wrap gap-3">
                  {TECH_STACK.map((tech) => (
                    <span
                      key={tech.name}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border ${tech.badge}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Screenshots */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Image} label="Screenshots" color="text-blue-400" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SCREENSHOTS.map((shot, i) => (
                  <ScreenshotCard key={shot.label} shot={shot} index={i} />
                ))}
              </div>
              <p className="text-xs text-[#4a5568] text-center mt-4 font-mono">
                Screenshots from the Manage Progress &amp; Grades module · UMPSA Faculty of Computing
              </p>
            </motion.div>

            {/* My Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Star} label="My Role" color="text-violet-400" />
              <div className="glass rounded-2xl p-7 border border-violet-500/20">
                <div className="flex flex-wrap items-start gap-4 mb-5">
                  <span className="text-3xl select-none">👨‍💻</span>
                  <div>
                    <h3 className="font-bold text-[#e2e8f0] text-base">
                      Module 4 — Manage Progress &amp; Grades
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-0.5">
                      Student ID: CB22162 · Software Quality Assurance (BCS3263) · Group 1BG9
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">
                  I owned the{' '}
                  <span className="text-[#e2e8f0] font-medium">Manage Progress &amp; Grades</span>{' '}
                  module end-to-end — building the student, teacher, and admin grade experiences,
                  and writing the SQA documentation (SQAP, Quality Architecture, and
                  testing/validation) that holds the module to measurable quality targets.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {MY_MODULE_SUBS.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-violet-400 mt-0.5 shrink-0" />
                      <span className="text-xs text-[#94a3b8] leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Challenges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Lightbulb} label="Challenges &amp; Solutions" color="text-orange-400" />
              <div className="space-y-4">
                {CHALLENGES.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className="glass rounded-xl p-6 border border-[#2a3347]"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg bg-[#1e2534] ${item.color} shrink-0 mt-0.5`}>
                          <Icon size={15} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#e2e8f0] mb-2 text-sm">{item.title}</h4>
                          <p className="text-xs text-[#94a3b8] leading-relaxed">{item.solution}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Award} label="Skills Demonstrated" color="text-purple-400" />
              <div className="flex flex-wrap gap-2.5">
                {SKILLS.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#161b27] border border-[#2a3347] text-[#94a3b8] hover:text-violet-300 hover:border-violet-400/30 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-8 border border-violet-500/20 text-center">
                <p className="text-sm text-[#94a3b8] mb-5">
                  A group SQA project at UMPSA. The repository is private, but the full quality
                  documentation and module results are summarized above.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a3347] text-[#94a3b8] font-medium text-sm hover:text-[#e2e8f0] hover:border-[#4a5568] transition-all duration-200"
                  >
                    <X size={14} />
                    Close
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
