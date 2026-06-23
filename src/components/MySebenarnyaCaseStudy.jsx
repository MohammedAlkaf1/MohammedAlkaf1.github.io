import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ExternalLink, Shield, Search, FileText, BarChart2,
  Users, Database, Code2, Layers, CheckCircle2,
  AlertTriangle, Globe, ArrowRight,
} from 'lucide-react'
import { GithubIcon } from './icons'

const SCREENSHOTS = [
  { src: '/images/projects/mysebenarnya/login.png', label: 'Login & Registration', emoji: '🔐' },
  { src: '/images/projects/mysebenarnya/inquiry-submission.png', label: 'Inquiry Submission Form', emoji: '📝' },
  { src: '/images/projects/mysebenarnya/user-dashboard.png', label: 'Public User Dashboard', emoji: '👤' },
  { src: '/images/projects/mysebenarnya/mcmc-dashboard.png', label: 'MCMC Staff Dashboard', emoji: '📊' },
  { src: '/images/projects/mysebenarnya/inquiry-review.png', label: 'Inquiry Review & Categorization', emoji: '🔍' },
  { src: '/images/projects/mysebenarnya/inquiry-assignment.png', label: 'Inquiry Assignment to Agency', emoji: '📋' },
  { src: '/images/projects/mysebenarnya/agency-dashboard.png', label: 'Agency Staff Dashboard', emoji: '🏛️' },
  { src: '/images/projects/mysebenarnya/status-tracking.png', label: 'Real-time Status Tracking', emoji: '📡' },
  { src: '/images/projects/mysebenarnya/reports.png', label: 'Analytics & Reports', emoji: '📈' },
]

const OBJECTIVES = [
  'Provide a centralized platform for public users to submit news-authenticity inquiries with supporting evidence',
  'Enable MCMC staff to review, categorize, and prioritize incoming inquiries efficiently',
  'Implement structured inquiry assignment to appropriate government agencies based on content category',
  'Allow public users to track their inquiry status in real time throughout the entire lifecycle',
  'Generate actionable analytics dashboards and performance reports for MCMC management',
  'Enforce secure, role-based access control across all three distinct user categories',
]

const USERS = [
  {
    icon: Globe,
    label: 'Public Users',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    description:
      'Malaysian citizens who submit news-related inquiries with supporting evidence (URLs, files) and track the investigation status.',
  },
  {
    icon: Shield,
    label: 'MCMC Staff',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
    description:
      'Communications commission personnel who review inquiries, categorize them, and route them to the appropriate government agencies.',
  },
  {
    icon: Users,
    label: 'Agency Staff',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
    description:
      'Government agency personnel who investigate assigned inquiries, update statuses, and resolve or escalate as needed.',
  },
]

const MODULES = [
  {
    icon: Shield,
    title: 'User Management',
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Multi-role registration (Public, Agency, MCMC)',
      'Secure login with bcrypt-hashed passwords',
      'Profile management and account settings',
      'Password recovery via email',
      'Admin user management and reports',
    ],
  },
  {
    icon: FileText,
    title: 'Inquiry Form Submission',
    color: 'from-rose-500 to-pink-600',
    features: [
      'Submit inquiries with evidence (URLs, file uploads)',
      'Categorization and priority assignment by MCMC',
      'Acknowledgement and reference number generation',
      'Status notifications to submitting user',
      'Inquiry history and search',
    ],
  },
  {
    icon: ArrowRight,
    title: 'Inquiry Assignment to Agency',
    color: 'from-amber-500 to-orange-600',
    features: [
      'MCMC forwards inquiries to relevant government agencies',
      'Agencies accept, investigate, or rebounce with justification',
      'Full assignment audit trail and timeline',
      'Deadline tracking and escalation alerts',
      'Assignment performance reports per agency',
    ],
  },
  {
    icon: BarChart2,
    title: 'Inquiry Progress Tracking',
    color: 'from-emerald-500 to-teal-600',
    features: [
      'Real-time status updates visible to public users',
      'MCMC monitoring dashboard with analytics',
      'Agency performance metrics (resolution time, counts)',
      'Activity log and complete inquiry history',
      'Export reports to PDF, Excel, or CSV',
    ],
  },
]

const TECH_STACK = [
  { label: 'Laravel 10', desc: 'MVC framework, routing, middleware, Eloquent ORM' },
  { label: 'PHP 8', desc: 'Server-side logic and controller actions' },
  { label: 'MySQL', desc: '6-table relational schema with foreign key constraints' },
  { label: 'Blade', desc: 'Server-side templating with layouts and reusable components' },
  { label: 'Bootstrap 5', desc: 'Responsive UI grid, components, and utilities' },
  { label: 'Chart.js', desc: 'Interactive pie and bar charts for analytics dashboards' },
  { label: 'bcrypt', desc: 'Password hashing via Laravel Hash::make / Hash::check' },
  { label: 'Eloquent', desc: 'ORM for models, relationships, and database migrations' },
  { label: 'CSRF Protection', desc: 'Laravel built-in token validation on all form submissions' },
]

const CHALLENGES = [
  {
    icon: Shield,
    title: 'Multi-Role Access Control',
    problem:
      'Three distinct user types (Public, MCMC, Agency) required isolated feature sets, routes, and views — with zero permission bleed between roles.',
    solution:
      'Implemented Laravel middleware groups and role checks at both the controller and route level, ensuring each session type could only access its designated feature subset.',
  },
  {
    icon: ArrowRight,
    title: 'Complex Inquiry State Machine',
    problem:
      'An inquiry passes through multiple states (Submitted → Under Review → Assigned → Investigating → Resolved/Closed) with branching paths such as rebouncing back to MCMC.',
    solution:
      'Modeled all transitions in InquiryStatusHistory, enforced valid state changes in controller logic, and surfaced the full timeline to all stakeholders in the UI.',
  },
  {
    icon: Search,
    title: 'Dynamic Agency Routing',
    problem:
      'MCMC needed to route inquiries to the most relevant government agency based on content category, with the ability to rebounce back if misrouted.',
    solution:
      'Built an assignment workflow with mandatory justification fields and rebounce handling, giving MCMC full visibility of agency acceptance rates via the analytics dashboard.',
  },
  {
    icon: CheckCircle2,
    title: 'QA Coverage Across State Transitions',
    problem:
      'As SQA, designing tests that cover all valid and invalid state transitions across three roles without duplicating effort was a significant challenge.',
    solution:
      'Built a Requirements Traceability Matrix (RTM) mapping each SDD requirement to specific test cases, ensuring complete coverage while keeping tests focused and maintainable.',
  },
]

const SKILLS = [
  'Laravel MVC Architecture',
  'Eloquent ORM & Migrations',
  'Role-Based Access Control',
  'Software Quality Assurance',
  'Test Case Design',
  'Requirements Traceability',
  'Blade Templating',
  'State Machine Design',
  'Chart.js Data Visualization',
  'Collaborative Development',
  'Database Normalization',
  'Technical Documentation',
]

function SectionTitle({ children }) {
  return (
    <h2 className="text-xl font-bold text-[#e2e8f0] mb-6 flex items-center gap-3">
      <span className="w-1 h-6 rounded-full bg-gradient-to-b from-rose-500 to-pink-600 shrink-0" />
      {children}
    </h2>
  )
}

function ScreenshotCard({ src, label, emoji }) {
  const [imgError, setImgError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (imgError) {
    return (
      <div className="rounded-xl overflow-hidden border border-[#2a3347] bg-[#0d1420]">
        <div className="h-40 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-500/10 to-pink-600/10">
          <span className="text-3xl">{emoji}</span>
          <span className="text-xs text-[#64748b]">Screenshot coming soon</span>
        </div>
        <div className="px-3 py-2 text-xs text-[#94a3b8] text-center">{label}</div>
      </div>
    )
  }

  return (
    <div className="rounded-xl overflow-hidden border border-[#2a3347] bg-[#0d1420] group cursor-pointer">
      <div className="h-40 relative overflow-hidden bg-[#080c15]">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-500/10 to-pink-600/10">
            <span className="text-3xl animate-pulse">{emoji}</span>
          </div>
        )}
        <img
          src={src}
          alt={label}
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="px-3 py-2 text-xs text-[#94a3b8] text-center">{label}</div>
    </div>
  )
}

export default function MySebenarnyaCaseStudy({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[#080c15]/97 backdrop-blur-md overflow-y-auto"
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-10 bg-[#080c15]/90 backdrop-blur-md border-b border-[#1e2534]">
            <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
              <nav className="flex items-center gap-2 text-sm text-[#64748b]">
                <button onClick={onClose} className="hover:text-[#94a3b8] transition-colors">
                  Projects
                </button>
                <span>/</span>
                <span className="text-rose-400 font-medium">MySebenarnya</span>
              </nav>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e2534] transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="max-w-4xl mx-auto px-6 py-12 pb-24"
          >
            {/* Hero */}
            <div className="mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-medium mb-4">
                <Search size={12} />
                MCMC Inquiry Management System
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#e2e8f0] mb-4 leading-tight">
                MySebenarnya
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 text-2xl md:text-3xl mt-1">
                  Combating Misinformation with a Structured Inquiry Platform
                </span>
              </h1>
              <p className="text-[#94a3b8] text-lg leading-relaxed max-w-3xl mb-8">
                A collaborative full-stack web system built for the Malaysian Communications and Multimedia
                Commission (MCMC) to receive, route, and resolve public inquiries about news authenticity —
                featuring structured workflows for three distinct user roles and real-time progress tracking
                throughout the inquiry lifecycle.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '4', label: 'System Modules' },
                  { value: '3', label: 'User Roles' },
                  { value: '6', label: 'DB Tables' },
                  { value: 'SQA', label: 'My Role' },
                ].map(({ value, label }) => (
                  <div key={label} className="rounded-xl border border-[#1e2534] bg-[#0d1420] p-4 text-center">
                    <div className="text-2xl font-bold text-rose-400 mb-1">{value}</div>
                    <div className="text-xs text-[#64748b]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Problem Statement */}
            <div className="mb-14">
              <SectionTitle>Problem Statement</SectionTitle>
              <div className="rounded-2xl border border-[#1e2534] bg-[#0d1420] p-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="text-rose-400" size={18} />
                  </div>
                  <div>
                    <p className="text-[#94a3b8] leading-relaxed mb-4">
                      The rise of digital misinformation in Malaysia has created an urgent need for a formal,
                      traceable channel through which the public can flag potentially false news and have
                      those reports investigated by the appropriate authorities.
                    </p>
                    <p className="text-[#94a3b8] leading-relaxed">
                      Without a structured system, MCMC lacked the ability to efficiently triage incoming
                      reports, route them to relevant government agencies, monitor resolution progress, or
                      generate performance data — leading to delayed responses and no public accountability
                      on report outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="mb-14">
              <SectionTitle>Project Objectives</SectionTitle>
              <div className="grid md:grid-cols-2 gap-3">
                {OBJECTIVES.map((obj, i) => (
                  <div key={i} className="flex gap-3 rounded-xl border border-[#1e2534] bg-[#0d1420] p-4">
                    <CheckCircle2 className="text-rose-400 shrink-0 mt-0.5" size={16} />
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Users */}
            <div className="mb-14">
              <SectionTitle>Target Users</SectionTitle>
              <div className="grid md:grid-cols-3 gap-4">
                {USERS.map(({ icon: Icon, label, color, bg, description }) => (
                  <div key={label} className={`rounded-2xl border p-5 ${bg}`}>
                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                      <Icon className={color} size={20} />
                    </div>
                    <h3 className={`font-semibold mb-2 ${color}`}>{label}</h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System Modules */}
            <div className="mb-14">
              <SectionTitle>System Modules</SectionTitle>
              <div className="grid md:grid-cols-2 gap-5">
                {MODULES.map(({ icon: Icon, title, color, features }) => (
                  <div key={title} className="rounded-2xl border border-[#1e2534] bg-[#0d1420] p-5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                      <Icon className="text-white" size={18} />
                    </div>
                    <h3 className="font-semibold text-[#e2e8f0] mb-3">{title}</h3>
                    <ul className="space-y-2">
                      {features.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-[#94a3b8]">
                          <span className="text-rose-400 shrink-0 mt-0.5">›</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* My Role */}
            <div className="mb-14">
              <SectionTitle>My Role — Software Quality Assurance</SectionTitle>
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white" size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-rose-400 mb-1">
                      Software Quality Assurance (CB22162)
                    </h3>
                    <p className="text-xs text-[#64748b] mb-4">
                      BCS2343 Software Design Workshop — Team Section 2A, Group 5
                    </p>
                    <div className="space-y-2">
                      {[
                        'Designed and executed functional test cases covering all four system modules',
                        'Built the Requirements Traceability Matrix (RTM) mapping all SDD requirements to specific tests',
                        'Verified that module implementations matched the approved software design specifications',
                        'Identified and documented defects, tracking them to resolution before final submission',
                        'Collaborated with the Chief Developer to validate controller and routing logic',
                        'Ensured role-based access control behaved correctly across all three user types',
                      ].map((item) => (
                        <div key={item} className="flex gap-2 text-sm text-[#94a3b8]">
                          <CheckCircle2 className="text-rose-400 shrink-0 mt-0.5" size={14} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-14">
              <SectionTitle>Technologies Used</SectionTitle>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TECH_STACK.map(({ label, desc }) => (
                  <div key={label} className="rounded-xl border border-[#1e2534] bg-[#0d1420] p-4">
                    <div className="font-semibold text-[#e2e8f0] text-sm mb-1">{label}</div>
                    <div className="text-xs text-[#64748b] leading-relaxed">{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Screenshots */}
            <div className="mb-14">
              <SectionTitle>Screenshots</SectionTitle>
              <p className="text-sm text-[#64748b] mb-5">
                Application screenshots will appear here once added to{' '}
                <code className="text-rose-400/80 bg-rose-500/10 px-1.5 py-0.5 rounded text-xs">
                  public/images/projects/mysebenarnya/
                </code>
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SCREENSHOTS.map(({ src, label, emoji }) => (
                  <ScreenshotCard key={src} src={src} label={label} emoji={emoji} />
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="mb-14">
              <SectionTitle>System Architecture</SectionTitle>
              <div className="rounded-2xl border border-[#1e2534] bg-[#0d1420] p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-md bg-blue-500/20 flex items-center justify-center">
                        <Database className="text-blue-400" size={12} />
                      </div>
                      <span className="text-sm font-semibold text-[#e2e8f0]">Models (6)</span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#64748b]">
                      {['PublicUser', 'MCMC', 'Agency', 'Inquiry', 'InquiryAssignment', 'InquiryStatusHistory'].map((m) => (
                        <li key={m} className="flex gap-1.5">
                          <span className="text-rose-500">›</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-md bg-rose-500/20 flex items-center justify-center">
                        <Code2 className="text-rose-400" size={12} />
                      </div>
                      <span className="text-sm font-semibold text-[#e2e8f0]">Controllers (7)</span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#64748b]">
                      {[
                        'UserAuthController',
                        'RegisterAgencyController',
                        'InquiryController',
                        'MCMCController',
                        'AgencyController',
                        'ReportController',
                        'ProfileController',
                      ].map((c) => (
                        <li key={c} className="flex gap-1.5">
                          <span className="text-rose-500">›</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center">
                        <Layers className="text-emerald-400" size={12} />
                      </div>
                      <span className="text-sm font-semibold text-[#e2e8f0]">Patterns</span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#64748b]">
                      {[
                        'MVC (Laravel)',
                        'Eloquent ORM',
                        'Blade Templates',
                        'Route Groups',
                        'Auth Middleware',
                        'CSRF Protection',
                        'Role-based Guards',
                      ].map((p) => (
                        <li key={p} className="flex gap-1.5">
                          <span className="text-emerald-500">›</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenges */}
            <div className="mb-14">
              <SectionTitle>Challenges &amp; Solutions</SectionTitle>
              <div className="space-y-4">
                {CHALLENGES.map(({ icon: Icon, title, problem, solution }) => (
                  <div key={title} className="rounded-2xl border border-[#1e2534] bg-[#0d1420] p-5">
                    <div className="flex gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                        <Icon className="text-rose-400" size={15} />
                      </div>
                      <h3 className="font-semibold text-[#e2e8f0] self-center">{title}</h3>
                    </div>
                    <div className="pl-11 space-y-2">
                      <div>
                        <span className="text-xs font-medium text-rose-400 uppercase tracking-wider">Challenge</span>
                        <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">{problem}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Solution</span>
                        <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">{solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="mb-14">
              <SectionTitle>Skills Demonstrated</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm font-medium border border-rose-500/30 bg-rose-500/10 text-rose-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub CTA */}
            <div className="rounded-2xl border border-[#1e2534] bg-gradient-to-br from-rose-500/5 to-pink-600/5 p-8 text-center">
              <h3 className="text-lg font-bold text-[#e2e8f0] mb-2">View the Source Code</h3>
              <p className="text-sm text-[#64748b] mb-6 max-w-md mx-auto">
                Browse the full Laravel MVC codebase, Blade templates, and database migrations on GitHub.
              </p>
              <a
                href="https://github.com/azizmatari/MySebenarnya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500/20 to-pink-600/20 border border-rose-500/30 text-rose-400 font-medium text-sm hover:from-rose-500/30 hover:to-pink-600/30 hover:border-rose-500/50 transition-all duration-200"
              >
                <GithubIcon size={16} />
                github.com/azizmatari/MySebenarnya
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
