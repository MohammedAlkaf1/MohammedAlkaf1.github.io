import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronRight, ExternalLink, Target, CheckCircle2, Users, Layers,
  Code2, Lightbulb, Award, ArrowRight, Shield, LayoutDashboard, Star,
  Wrench, Image,
} from 'lucide-react'
import { GithubIcon } from './icons'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCREENSHOTS = [
  {
    src: '/images/projects/mypetakom/login.png',
    label: 'Login System',
    desc: 'Role-based authentication — Student, Advisor, or Coordinator',
    gradient: 'from-blue-600 to-indigo-700',
    icon: '🔐',
  },
  {
    src: '/images/projects/mypetakom/membership.png',
    label: 'Membership Management',
    desc: 'Admin approves or rejects membership applications with one click',
    gradient: 'from-emerald-600 to-teal-700',
    icon: '👥',
  },
  {
    src: '/images/projects/mypetakom/advisor-dashboard.png',
    label: 'Advisor Dashboard',
    desc: 'Pie charts visualizing events by status and academic level',
    gradient: 'from-purple-600 to-violet-700',
    icon: '📊',
  },
  {
    src: '/images/projects/mypetakom/manage-events.png',
    label: 'Event Management',
    desc: 'Create events, generate QR codes, assign committees',
    gradient: 'from-cyan-600 to-blue-700',
    icon: '📅',
  },
  {
    src: '/images/projects/mypetakom/attendance.png',
    label: 'Attendance Records',
    desc: 'Staff manages and reviews attendance records per event',
    gradient: 'from-orange-600 to-amber-700',
    icon: '✅',
  },
  {
    src: '/images/projects/mypetakom/student-qr-scan.png',
    label: 'QR Scan + Geolocation',
    desc: 'Students mark attendance by scanning QR; location verified in real-time',
    gradient: 'from-pink-600 to-rose-700',
    icon: '📱',
  },
  {
    src: '/images/projects/mypetakom/admin-dashboard.png',
    label: 'Admin Dashboard',
    desc: 'Coordinator view with bar chart of event attendance statistics',
    gradient: 'from-teal-600 to-green-700',
    icon: '🏛️',
  },
  {
    src: '/images/projects/mypetakom/merit-dashboard.png',
    label: 'Merit Dashboard',
    desc: 'Student merit points tracker with donut & bar charts',
    gradient: 'from-yellow-600 to-orange-700',
    icon: '🏆',
  },
  {
    src: '/images/projects/mypetakom/merit-qr.png',
    label: 'Merit QR Verification',
    desc: 'Printable QR card for verifying student merit points',
    gradient: 'from-indigo-600 to-purple-700',
    icon: '🎖️',
  },
]

const MODULES = [
  {
    id: 1,
    title: 'Login & Membership Management',
    tag: '✦ My Module',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    barColor: 'from-emerald-500 to-teal-600',
    icon: Shield,
    iconColor: 'text-emerald-400',
    features: [
      'Secure login with role-based session management',
      'Membership application and approval workflow',
      'User profile management and editing',
      'Admin-level user registration and management',
    ],
  },
  {
    id: 2,
    title: 'Event Registration & Management',
    tag: 'Module 2',
    tagColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    barColor: 'from-cyan-500 to-blue-600',
    icon: LayoutDashboard,
    iconColor: 'text-cyan-400',
    features: [
      'Create, update, and delete events with full detail forms',
      'Assign committee members per event',
      'QR code generation for each event',
      'Merit applications and advisor analytics dashboard with charts',
    ],
  },
  {
    id: 3,
    title: 'Event Attendance Management',
    tag: 'Module 3',
    tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    barColor: 'from-purple-500 to-violet-600',
    icon: Star,
    iconColor: 'text-purple-400',
    features: [
      'QR-code-based attendance recording per event',
      'Geolocation verification to confirm physical presence',
      'Define time-based attendance slots per event',
      'Staff view for complete attendance records',
    ],
  },
  {
    id: 4,
    title: 'Merit Management',
    tag: 'Module 4',
    tagColor: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
    barColor: 'from-orange-500 to-amber-600',
    icon: Award,
    iconColor: 'text-orange-400',
    features: [
      'Merit points dashboard with visual charts',
      'View awarded merits and complete history',
      'Apply for missing or uncredited merit claims',
      'QR code generation for merit point verification',
    ],
  },
]

const OBJECTIVES = [
  'Replace paper-based workflows with a fully digital management system',
  'Implement secure role-based access for Students, Advisors, and Coordinators',
  'Automate event registration, committee assignment, and merit tracking',
  'Enable real-time attendance verification via QR code and geolocation',
  'Provide analytics dashboards for data-driven decision-making',
  'Ensure data integrity through normalized database design (1NF → 3NF)',
]

const USERS = [
  {
    role: 'Student',
    icon: '👨‍🎓',
    gradient: 'from-cyan-500 to-blue-600',
    actions: [
      'Apply for and manage Petakom membership',
      'Register for upcoming events',
      'Mark attendance by scanning event QR code',
      'View merit points, history, and submit claims',
    ],
  },
  {
    role: 'Event Advisor',
    icon: '👨‍💼',
    gradient: 'from-purple-500 to-violet-600',
    actions: [
      'Create and manage events with full details',
      'Assign committee members and generate QR codes',
      'Review and approve or reject merit claims',
      'Access analytics dashboard with event charts',
    ],
  },
  {
    role: 'Petakom Coordinator',
    icon: '🏛️',
    gradient: 'from-emerald-500 to-teal-600',
    actions: [
      'Approve or reject student membership applications',
      'Manage all registered users in the system',
      'System-wide reports and event oversight',
      'Full admin dashboard with attendance statistics',
    ],
  },
]

const TECH_STACK = [
  { name: 'PHP', badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300' },
  { name: 'MySQL', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300' },
  { name: 'HTML5', badge: 'bg-red-500/15 border-red-400/30 text-red-300' },
  { name: 'CSS3', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' },
  { name: 'JavaScript', badge: 'bg-yellow-500/15 border-yellow-400/30 text-yellow-300' },
  { name: 'Bootstrap', badge: 'bg-purple-500/15 border-purple-400/30 text-purple-300' },
  { name: 'phpMyAdmin', badge: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300' },
  { name: 'Linux Server', badge: 'bg-green-500/15 border-green-400/30 text-green-300' },
  { name: 'Agile / Scrum', badge: 'bg-pink-500/15 border-pink-400/30 text-pink-300' },
]

const CHALLENGES = [
  {
    title: 'Role-Based Access Across 3 User Types',
    solution:
      'Built a session-based PHP middleware layer that checks the user role on every protected page load, automatically redirecting unauthorized requests back to the login page.',
    icon: Shield,
    color: 'text-emerald-400',
  },
  {
    title: 'QR Attendance with Real-Time Location Verification',
    solution:
      "Generated unique per-event QR codes server-side, validated scan tokens against the database in real-time, and used the browser Geolocation API to confirm students were physically within the event venue radius before marking attendance.",
    icon: Star,
    color: 'text-cyan-400',
  },
  {
    title: 'Normalizing a Complex Relational Schema',
    solution:
      'Applied full normalization from 1NF through 3NF across 15+ tables — separating users, events, memberships, attendance slots, and merit records — eliminating redundancy and update anomalies.',
    icon: Wrench,
    color: 'text-purple-400',
  },
  {
    title: 'Coordinating a 4-Module Group Project',
    solution:
      'Adopted Agile sprints with defined inter-module API contracts so each module team could develop independently. A shared normalized schema kept data consistent across all four modules.',
    icon: Users,
    color: 'text-orange-400',
  },
]

const SKILLS = [
  'PHP Backend Development',
  'Role-Based Access Control',
  'MySQL & Database Design',
  'Database Normalization (3NF)',
  'QR Code Generation & Validation',
  'Geolocation API Integration',
  'Bootstrap / Responsive Design',
  'Session Management & Security',
  'CRUD Operations',
  'Data Visualization (Charts)',
  'Agile / Sprint Planning',
  'Group Project Coordination',
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ icon: Icon, label, color = 'text-cyan-400' }) {
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
      className="group rounded-xl overflow-hidden border border-[#2a3347] hover:border-emerald-500/40 transition-all duration-300"
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

export default function MyPetakomCaseStudy({ isOpen, onClose }) {
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
              <span className="text-emerald-400 font-medium">MyPetakom</span>
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
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 p-8 md:p-12">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 50%, #10b981 1px, transparent 1px), radial-gradient(circle at 80% 20%, #0d9488 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 mb-5">
                    Web Engineering · BCS2243 · UMPSA · Semester II 2024/2025
                  </span>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl select-none">🏛️</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#e2e8f0]">MyPetakom</h1>
                  </div>
                  <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                    A full-stack, role-based web platform that digitizes the Petakom student
                    association at UMPSA's Faculty of Computing — covering membership management,
                    event registration, QR-based attendance with geolocation, and merit tracking
                    across three user roles.
                  </p>
                  <a
                    href="https://github.com/MohammedAlkaf1/mypetakom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200"
                  >
                    <GithubIcon size={16} />
                    View Repository
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {[
                  { value: '4', label: 'Modules', icon: '🔧' },
                  { value: '3', label: 'User Roles', icon: '👥' },
                  { value: '15+', label: 'DB Tables', icon: '🗃️' },
                  { value: 'Agile', label: 'Methodology', icon: '🚀' },
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
                  The Petakom student association at UMPSA's Faculty of Computing relied on{' '}
                  <span className="text-[#e2e8f0] font-medium">
                    manual, paper-based processes
                  </span>{' '}
                  for managing memberships, organizing events, tracking attendance, and recording
                  student merit points. This caused{' '}
                  <span className="text-[#e2e8f0] font-medium">
                    inefficiencies, data errors, and delayed reporting
                  </span>{' '}
                  for both students and administrators. The goal was to design and build a unified
                  digital platform to handle all workflows securely across multiple user roles —
                  eliminating manual overhead and providing real-time visibility into association
                  activities.
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
              <SectionTitle icon={Target} label="Project Objectives" color="text-cyan-400" />
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
                    <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
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
              <SectionTitle icon={Layers} label="System Modules" color="text-emerald-400" />
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
                            <h3 className="font-bold text-[#e2e8f0] text-sm">{mod.title}</h3>
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
              <SectionTitle icon={Image} label="Screenshots" color="text-cyan-400" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SCREENSHOTS.map((shot, i) => (
                  <ScreenshotCard key={shot.label} shot={shot} index={i} />
                ))}
              </div>
              <p className="text-xs text-[#4a5568] text-center mt-4 font-mono">
                Screenshots extracted from the project documentation · UMPSA Faculty of Computing
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
              <SectionTitle icon={Star} label="My Role" color="text-emerald-400" />
              <div className="glass rounded-2xl p-7 border border-emerald-500/20">
                <div className="flex flex-wrap items-start gap-4 mb-5">
                  <span className="text-3xl select-none">👨‍💻</span>
                  <div>
                    <h3 className="font-bold text-[#e2e8f0] text-base">
                      Module 1 — Login &amp; Membership Management
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-0.5">
                      Student ID: CB22162 · Web Engineering (BCS2243) · Group 1B1
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">
                  I was responsible for designing and implementing{' '}
                  <span className="text-[#e2e8f0] font-medium">Module 1</span> — the foundation of
                  the entire platform. My module provides authentication and the user management
                  layer that every other module depends on.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Designed the login form with PHP session authentication',
                    'Built role-checking middleware protecting every route',
                    'Implemented the membership request and approval pipeline',
                    'Created admin user management (register, edit, delete)',
                    'Built user profile pages with edit and update functionality',
                    'Contributed to the shared MySQL database schema design',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-emerald-400 mt-0.5 shrink-0" />
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
                    className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#161b27] border border-[#2a3347] text-[#94a3b8] hover:text-cyan-400 hover:border-cyan-400/30 transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* GitHub CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass rounded-2xl p-8 border border-emerald-500/20 text-center">
                <p className="text-sm text-[#94a3b8] mb-5">Interested in exploring the source code?</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="https://github.com/MohammedAlkaf1/mypetakom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium text-sm hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-200"
                  >
                    <GithubIcon size={16} />
                    View on GitHub
                    <ExternalLink size={13} />
                  </a>
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
