import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronRight, Target, CheckCircle2, Users, Layers,
  Code2, Lightbulb, Award, ArrowRight, Shield, Star, Image, Lock,
  Wallet, BellRing, Ban, Smartphone, Boxes,
} from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SCREENSHOTS = [
  {
    src: '/images/projects/sams/student-dashboard.png',
    label: 'Student Tuition Ledger',
    desc: 'Total fee, paid amount, and outstanding balance at a glance',
    gradient: 'from-amber-600 to-orange-700',
    icon: '💳',
  },
  {
    src: '/images/projects/sams/fee-itemization.png',
    label: 'Fee Itemization',
    desc: 'Per-item breakdown with paid / unpaid status badges',
    gradient: 'from-orange-600 to-red-700',
    icon: '🧾',
  },
  {
    src: '/images/projects/sams/payment-success.png',
    label: 'Pay & Confirm',
    desc: 'Pay-now dashboard with a payment-recorded confirmation toast',
    gradient: 'from-amber-600 to-yellow-700',
    icon: '✅',
  },
  {
    src: '/images/projects/sams/paid-status.png',
    label: 'Account Clear',
    desc: 'Fully-paid state — RM 0.00 balance and full payment history',
    gradient: 'from-emerald-600 to-teal-700',
    icon: '🟢',
  },
  {
    src: '/images/projects/sams/restriction-notice.png',
    label: 'Access Restricted',
    desc: 'Week-5 academic restriction banner for unpaid accounts',
    gradient: 'from-red-600 to-rose-700',
    icon: '⛔',
  },
  {
    src: '/images/projects/sams/recent-activity.png',
    label: 'Payment Activity',
    desc: 'Chronological feed of attempts, deposits, and invoices',
    gradient: 'from-amber-600 to-orange-700',
    icon: '📜',
  },
  {
    src: '/images/projects/sams/treasury-edit.png',
    label: 'Treasury Update Form',
    desc: 'Verify and post payments with server-side input validation',
    gradient: 'from-orange-600 to-amber-700',
    icon: '🏦',
  },
]

const MODULES = [
  {
    id: 1,
    title: 'Manage Profile',
    owner: 'Allan Tan',
    tag: 'Module 1',
    tagColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
    barColor: 'from-cyan-500 to-blue-600',
    icon: Shield,
    iconColor: 'text-cyan-400',
    features: [
      'Authentication & role-based access for 5 roles',
      'Registrar-only student account creation',
      'View / update contact details and password',
      'Academic data locked from student edits',
    ],
  },
  {
    id: 2,
    title: 'Manage Course Registration',
    owner: 'Aqel Abdulaziz',
    tag: 'Module 2',
    tagColor: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
    barColor: 'from-sky-500 to-blue-600',
    icon: Layers,
    iconColor: 'text-sky-400',
    features: [
      'Search subjects, pick section & lab',
      'Timetable-clash and capacity validation',
      'Notify registrar; approve / reject workflow',
      'Real-time status + drop-subject support',
    ],
  },
  {
    id: 3,
    title: 'Manage Co-curriculum',
    owner: 'Chan Xin Kai',
    tag: 'Module 3',
    tagColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
    barColor: 'from-purple-500 to-violet-600',
    icon: Boxes,
    iconColor: 'text-purple-400',
    features: [
      'Browse & enroll in co-curriculum modules',
      'Mark attendance and upload submissions',
      'Staff CRUD for modules, venue & schedule',
      'Grades, credits, and e-certificates',
    ],
  },
  {
    id: 4,
    title: 'Manage Attendance',
    owner: 'Allan Tan',
    tag: 'Module 4',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
    barColor: 'from-emerald-500 to-teal-600',
    icon: Smartphone,
    iconColor: 'text-emerald-400',
    features: [
      'Lecturer generates a random unique class code',
      'GPS-verified student check-in on campus',
      'Editable end time; delete active codes',
      'Rejects off-campus, invalid, or expired codes',
    ],
  },
  {
    id: 5,
    title: 'Manage Tuition Fee',
    owner: 'Alkaf — me',
    tag: '✦ My Module',
    tagColor: 'text-amber-300 bg-amber-400/10 border-amber-400/40',
    barColor: 'from-amber-500 to-orange-600',
    icon: Wallet,
    iconColor: 'text-amber-300',
    features: [
      'Student fee dashboard: total, paid, outstanding',
      'Treasury payment records, search & filter',
      'Auto status: Paid / Partially Paid / Unpaid',
      'Reminders + Week-5 access restriction',
    ],
  },
]

const OBJECTIVES = [
  'Unify fragmented campus systems (OR, e-com, cred-B) into one mobile app',
  'Automate GPS-verified class attendance to prevent proxy check-ins',
  'Give students and Treasury a single source of truth for tuition fees',
  'Enforce the university policy of restricting access for unpaid fees by Week 5',
  'Provide role-based dashboards for five distinct user types',
  'Build on a clean MVC structure backed by Firebase for real-time data',
]

const USERS = [
  {
    role: 'Student',
    icon: '👨‍🎓',
    gradient: 'from-amber-500 to-orange-600',
    actions: [
      'View total fee, paid amount, and balance',
      'See itemized fees with paid / unpaid status',
      'Read payment history and reminders',
      'Get notified of restrictions on unpaid fees',
    ],
  },
  {
    role: 'Treasury',
    icon: '🏦',
    gradient: 'from-orange-500 to-red-600',
    actions: [
      'Browse, search & filter all student fee records',
      'Verify and post payment updates',
      'Auto-recalculated balance and payment status',
      'Audit-logged modifications for accountability',
    ],
  },
  {
    role: 'Other Roles',
    icon: '🧑‍🏫',
    gradient: 'from-yellow-500 to-amber-600',
    actions: [
      'Lecturer — generate attendance codes & grade',
      'Faculty Registrar — register students & approvals',
      'Pusat Adab — manage co-curriculum modules',
      'Each routed to a role-specific dashboard',
    ],
  },
]

const TUITION_LOGIC = [
  {
    title: 'View Layer',
    icon: Smartphone,
    color: 'text-amber-400',
    bar: 'from-amber-500 to-orange-600',
    items: [
      'StudentTuitionFeePage — balance, status & reminders',
      'TreasuryTuitionFeePage — searchable record list',
      'EditTuitionFeePage — validated payment form',
      'PaymentHistoryPage — past transactions',
    ],
  },
  {
    title: 'Controller Layer',
    icon: Boxes,
    color: 'text-orange-400',
    bar: 'from-orange-500 to-red-600',
    items: [
      'ManageTuitionFeeController orchestrates all logic',
      'Validates input before any write',
      'Recalculates outstanding balance on each payment',
      'Updates status & triggers notifications',
    ],
  },
  {
    title: 'Model + Firebase',
    icon: Wallet,
    color: 'text-yellow-400',
    bar: 'from-yellow-500 to-amber-600',
    items: [
      'TuitionFeeData entity transfers fee/payment data',
      'Firestore tables: Tuition_Fees, Payment_Records',
      'Notifications & Academic_Restrictions collections',
      'Real-time sync between student and Treasury views',
    ],
  },
]

const TECH_STACK = [
  { name: 'Flutter', badge: 'bg-sky-500/15 border-sky-400/30 text-sky-300' },
  { name: 'Dart', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' },
  { name: 'Firebase Auth', badge: 'bg-amber-500/15 border-amber-400/30 text-amber-300' },
  { name: 'Cloud Firestore', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300' },
  { name: 'Cloud Messaging', badge: 'bg-red-500/15 border-red-400/30 text-red-300' },
  { name: 'MVC Architecture', badge: 'bg-violet-500/15 border-violet-400/30 text-violet-300' },
  { name: 'Figma', badge: 'bg-pink-500/15 border-pink-400/30 text-pink-300' },
  { name: 'Geolocation / GPS', badge: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300' },
  { name: 'Agile / Scrum', badge: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300' },
]

const CHALLENGES = [
  {
    title: 'Keeping the Balance Correct on Every Payment',
    solution:
      'The controller validates the Treasury input, then recalculates outstanding_balance = total − paid and clamps it at zero, deriving Paid / Partially Paid / Unpaid from the result — so the student and Treasury views never disagree.',
    icon: Wallet,
    color: 'text-amber-400',
  },
  {
    title: 'Automating the Week-5 Access Restriction',
    solution:
      'Encoded the university policy as logic: if a fee is still unpaid at or after Week 5, the system writes an Academic_Restrictions record, flips academic_access_status to Restricted, and surfaces a restriction banner — no manual intervention needed.',
    icon: Ban,
    color: 'text-red-400',
  },
  {
    title: 'Timely Reminders Without Spamming',
    solution:
      'Payment events generate the right notification type (Reminder, Payment Success, or Restriction Notice) via Cloud Messaging, and fully-paid accounts are explicitly excluded from reminder generation.',
    icon: BellRing,
    color: 'text-orange-400',
  },
  {
    title: 'A Clean Module That Slots Into a 5-Person App',
    solution:
      'Structured the module strictly into View / Controller / Model layers over Firestore, with a shared Users schema and SRS/SDD traceability IDs so my work integrated cleanly with the other four modules.',
    icon: Boxes,
    color: 'text-yellow-400',
  },
]

const SKILLS = [
  'Flutter / Dart Development',
  'Mobile UI Engineering',
  'Firebase Auth & Firestore',
  'Cloud Messaging (Push Notifications)',
  'MVC Architecture',
  'Payment / Ledger Logic',
  'Automated Business Rules',
  'Role-Based Access Control',
  'Requirements Engineering (SRS)',
  'Software Design Documentation (SDD)',
  'Requirement Traceability',
  'Agile / Group Coordination',
]

const MY_MODULE_SUBS = [
  'Built the student fee dashboard — total, paid, outstanding, deadline & status',
  'Created the Treasury record list with search and payment-status filters',
  'Implemented the validated payment-update form and history view',
  'Automated balance recalculation and Paid / Partially Paid / Unpaid status',
  'Generated reminder & success notifications via Cloud Messaging',
  'Enforced Week-5 academic access restriction for unpaid fees',
  'Authored the SRS & SDD sections for the Manage Tuition Fee module',
]

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ icon: Icon, label, color = 'text-amber-400' }) {
  return (
    <div className={`flex items-center gap-2 mb-6 ${color}`}>
      <Icon size={17} />
      <span className="text-xs font-mono uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-[#2a3347] ml-2" />
    </div>
  )
}

// Phone-shaped card: portrait mockups shown fully via object-contain.
function ScreenshotCard({ shot, index }) {
  const [imgError, setImgError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group rounded-xl overflow-hidden border border-[#2a3347] hover:border-amber-500/40 transition-all duration-300"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-b from-[#0a0f1e] to-[#141a2b] flex items-center justify-center p-3">
        {!imgError ? (
          <>
            <img
              src={shot.src}
              alt={shot.label}
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
              className={`max-h-full max-w-full object-contain rounded-md shadow-lg shadow-black/40 transition-all duration-500 group-hover:scale-[1.03] ${
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
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      </div>
      <div className="p-3 bg-[#161b27]">
        <p className="text-sm font-semibold text-[#e2e8f0]">{shot.label}</p>
        <p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{shot.desc}</p>
      </div>
    </motion.div>
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────

export default function SAMSCaseStudy({ isOpen, onClose }) {
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
              <span className="text-amber-300 font-medium">SAMS</span>
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
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 p-8 md:p-12">
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 50%, #f59e0b 1px, transparent 1px), radial-gradient(circle at 80% 20%, #ea580c 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-400/15 border border-amber-400/30 text-amber-300 mb-5">
                    Software Engineering Practices · UMPSA · Group 14 · 2026
                  </span>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="text-5xl select-none">💳</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#e2e8f0]">SAMS</h1>
                  </div>
                  <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                    A cross-platform mobile app that unifies UMPSA's academic admin into one place —
                    profiles, course registration, co-curriculum, GPS attendance, and fees. My
                    contribution, the{' '}
                    <span className="text-[#e2e8f0] font-medium">Manage Tuition Fee</span> module,
                    drives real-time fee dashboards and automated payment &amp; restriction logic.
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2a3347] bg-[#0d1117]/40 text-[#94a3b8] text-sm font-medium">
                    <Lock size={15} />
                    Private academic repository · Group 14
                  </span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {[
                  { value: '5', label: 'Modules', icon: '🔧' },
                  { value: '5', label: 'User Roles', icon: '👥' },
                  { value: 'Flutter', label: 'Mobile', icon: '📱' },
                  { value: 'Firebase', label: 'Backend', icon: '🔥' },
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
                  UMPSA students juggle{' '}
                  <span className="text-[#e2e8f0] font-medium">several disconnected systems</span> —
                  Open Registration for courses, an e-com portal for fees, and cred-B for
                  co-curriculum — while class attendance is still taken manually. That fragmentation
                  is{' '}
                  <span className="text-[#e2e8f0] font-medium">
                    slow, error-prone, and confusing for new students
                  </span>
                  . SAMS replaces it with a single mobile app, and the Manage Tuition Fee module
                  makes fee status, payments, reminders, and access restrictions accurate and
                  automatic.
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
              <SectionTitle icon={Target} label="Project Objectives" color="text-amber-400" />
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
                    <CheckCircle2 size={15} className="text-amber-400 mt-0.5 shrink-0" />
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
              <SectionTitle icon={Users} label="Target Users" color="text-orange-400" />
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
              <SectionTitle icon={Layers} label="System Modules" color="text-amber-400" />
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

            {/* How I Built It — Tuition architecture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-14"
            >
              <SectionTitle icon={Boxes} label="How I Built It — Manage Tuition Fee" color="text-amber-400" />
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-5 max-w-3xl">
                The module follows a clean{' '}
                <span className="text-[#e2e8f0] font-medium">MVC structure over Firebase</span> —
                the UI never touches business rules directly; everything flows through a single
                controller that keeps the ledger consistent.
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {TUITION_LOGIC.map((q, i) => {
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
                        <ul className="space-y-2 border-t border-[#2a3347] pt-3">
                          {q.items.map((t) => (
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
              <SectionTitle icon={Image} label="Screenshots" color="text-amber-400" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {SCREENSHOTS.map((shot, i) => (
                  <ScreenshotCard key={shot.label} shot={shot} index={i} />
                ))}
              </div>
              <p className="text-xs text-[#4a5568] text-center mt-4 font-mono">
                Mobile mockups from the Manage Tuition Fee module · UMPSA · Group 14
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
              <SectionTitle icon={Star} label="My Role" color="text-amber-400" />
              <div className="glass rounded-2xl p-7 border border-amber-500/20">
                <div className="flex flex-wrap items-start gap-4 mb-5">
                  <span className="text-3xl select-none">👨‍💻</span>
                  <div>
                    <h3 className="font-bold text-[#e2e8f0] text-base">
                      Module 5 — Manage Tuition Fee
                    </h3>
                    <p className="text-xs text-[#94a3b8] mt-0.5">
                      Student ID: CB22162 · Software Engineering Practices · Group 14
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">
                  I owned the{' '}
                  <span className="text-[#e2e8f0] font-medium">Manage Tuition Fee</span> module
                  end-to-end — the student and Treasury experiences, the payment and restriction
                  logic behind them, and the SRS/SDD documentation that specifies it.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {MY_MODULE_SUBS.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-amber-400 mt-0.5 shrink-0" />
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
              <SectionTitle icon={Award} label="Skills Demonstrated" color="text-orange-400" />
              <div className="flex flex-wrap gap-2.5">
                {SKILLS.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#161b27] border border-[#2a3347] text-[#94a3b8] hover:text-amber-300 hover:border-amber-400/30 transition-colors duration-200 cursor-default"
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
              <div className="glass rounded-2xl p-8 border border-amber-500/20 text-center">
                <p className="text-sm text-[#94a3b8] mb-5">
                  A group mobile-engineering project at UMPSA. The repository is private, but the
                  module design, screens, and logic are summarized above.
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
