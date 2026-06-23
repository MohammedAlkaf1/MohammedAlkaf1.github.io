import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronRight, Target, CheckCircle2, Users, Layers,
  Code2, Lightbulb, Award, ArrowRight, Star, Image, Lock,
  Link2, Boxes, ShieldCheck, FileCode, Network,
} from 'lucide-react'

const SCREENSHOTS = [
  { src: '/images/projects/blockchain/create.png', label: 'Create Donation', desc: 'Charity (Org1) records a new pledge on the ledger', gradient: 'from-yellow-600 to-amber-700', icon: '🪙' },
  { src: '/images/projects/blockchain/query.png', label: 'Query Donation', desc: 'Read-only lookup of a donation by ID', gradient: 'from-amber-600 to-orange-700', icon: '🔍' },
  { src: '/images/projects/blockchain/verify.png', label: 'Auditor Verify', desc: 'Org2 independently verifies authenticity & audit trail', gradient: 'from-yellow-600 to-lime-700', icon: '✅' },
  { src: '/images/projects/blockchain/viewall.png', label: 'Ledger Explorer', desc: 'World state + immutable transaction history', gradient: 'from-orange-600 to-amber-700', icon: '📒' },
  { src: '/images/projects/blockchain/refund.png', label: 'Refund Donation', desc: 'Reverse a pledged/received donation with a reason', gradient: 'from-red-600 to-orange-700', icon: '↩️' },
  { src: '/images/projects/blockchain/access.png', label: 'Access Control', desc: 'Org2 correctly denied from createDonation()', gradient: 'from-amber-600 to-yellow-700', icon: '🚫' },
]

const OBJECTIVES = [
  'Simulate a permissioned Hyperledger Fabric network for charitable donations',
  'Enforce the full donation lifecycle with a JavaScript smart contract (chaincode)',
  'Give every transaction an immutable, traceable record with cryptographic hashes',
  'Separate roles — Charity (Org1) acts, Auditor (Org2) independently verifies',
  'Reject invalid state transitions and unauthorized actions at the contract layer',
  'Expose it all through a clean web UI backed by a Node/Express SDK gateway',
]

const STAKEHOLDERS = [
  { role: 'Charity — Org1', icon: '🏛️', gradient: 'from-yellow-500 to-amber-600', actions: ['Create, confirm & allocate donations', 'Distribute funds to beneficiaries', 'Refund pledged/received donations', 'The only issuing/acting organisation'] },
  { role: 'Auditor — Org2', icon: '🔎', gradient: 'from-amber-500 to-orange-600', actions: ['Independently verify any record', 'Query donations (read-only)', 'View full immutable transaction log', 'Cannot modify the ledger'] },
  { role: 'Donors & Beneficiaries', icon: '🤝', gradient: 'from-orange-500 to-red-600', actions: ['Donors get a tamper-proof pledge record', 'Trace funds pledge → distribution', 'Beneficiaries receive transparent payouts', 'End-to-end accountability for all'] },
]

const LIFECYCLE = [
  { state: 'PLEDGED', desc: 'createDonation() — a new donation is recorded', color: 'text-amber-300 border-amber-400/40 bg-amber-400/10' },
  { state: 'RECEIVED', desc: 'confirmDonation() — funds confirmed received', color: 'text-sky-300 border-sky-400/40 bg-sky-400/10' },
  { state: 'ALLOCATED', desc: 'allocateDonation() — assigned to a beneficiary', color: 'text-violet-300 border-violet-400/40 bg-violet-400/10' },
  { state: 'DISTRIBUTED', desc: 'distributeDonation() — paid out with proof hash', color: 'text-emerald-300 border-emerald-400/40 bg-emerald-400/10' },
  { state: 'REFUNDED', desc: 'refundDonation() — reversed from PLEDGED/RECEIVED', color: 'text-rose-300 border-rose-400/40 bg-rose-400/10' },
]

const FUNCTIONS = [
  { title: 'Lifecycle Functions', icon: Boxes, color: 'text-amber-400', bar: 'from-amber-500 to-orange-600', items: ['createDonation() · Org1', 'confirmDonation() · Org1', 'allocateDonation() · Org1', 'distributeDonation() · Org1', 'refundDonation() · Org1'] },
  { title: 'Audit & Query', icon: ShieldCheck, color: 'text-yellow-400', bar: 'from-yellow-500 to-amber-600', items: ['queryDonation() · Org1 + Org2', 'verifyDonation() · Org2 only', 'getAllDonations() · both', 'getTransactionHistory() · both', 'Read-only — no ledger change'] },
  { title: 'Ledger & Integrity', icon: FileCode, color: 'text-orange-400', bar: 'from-orange-500 to-red-600', items: ['File-based ledger (ledger.json)', 'worldState.donations snapshot', 'Append-only transactions[] log', 'crypto txID + txHash per action', 'Distribution proof hashing (sha256)'] },
]

const TECH_STACK = [
  { name: 'Hyperledger Fabric', badge: 'bg-slate-500/15 border-slate-400/30 text-slate-200' },
  { name: 'JavaScript', badge: 'bg-yellow-500/15 border-yellow-400/30 text-yellow-300' },
  { name: 'Node.js', badge: 'bg-green-500/15 border-green-400/30 text-green-300' },
  { name: 'Express', badge: 'bg-zinc-500/15 border-zinc-400/30 text-zinc-200' },
  { name: 'Chaincode (Smart Contract)', badge: 'bg-amber-500/15 border-amber-400/30 text-amber-300' },
  { name: 'HTML5', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300' },
  { name: 'CSS3', badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300' },
  { name: 'REST API', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' },
  { name: 'crypto (hashing)', badge: 'bg-violet-500/15 border-violet-400/30 text-violet-300' },
  { name: 'RBAC', badge: 'bg-red-500/15 border-red-400/30 text-red-300' },
]

const CHALLENGES = [
  { title: 'Enforcing a Strict State Machine', solution: 'Donations must move PLEDGED → RECEIVED → ALLOCATED → DISTRIBUTED in order. Each function guards its transition — e.g. only PLEDGED can be confirmed — and rejects illegal jumps with a descriptive error, so the ledger can never reach an invalid state.', icon: Boxes, color: 'text-amber-400' },
  { title: 'Role-Based Access Control', solution: 'A centralised ACCESS_RULES map ties every function to authorised orgs, checked as the first line of each call. Org2 (Auditor) attempting createDonation() is cleanly denied — proving permissions are enforced at the contract, not the UI.', icon: ShieldCheck, color: 'text-yellow-400' },
  { title: 'Immutability Without a Real Network', solution: 'I simulated Fabric with a file-based ledger that separates current world state from an append-only transaction log, each entry carrying a crypto txID and txHash — mirroring how real Fabric keeps state and history distinct.', icon: FileCode, color: 'text-orange-400' },
  { title: 'Clean Three-Layer Architecture', solution: 'A web UI talks to a Node/Express backend acting as a Fabric SDK gateway, which invokes the chaincode — so the browser never touches blockchain internals and each layer can be reasoned about independently.', icon: Network, color: 'text-red-400' },
]

const SKILLS = [
  'Blockchain Fundamentals', 'Hyperledger Fabric', 'Smart Contracts / Chaincode', 'JavaScript',
  'Node.js / Express', 'REST API Design', 'RBAC / Access Control', 'State Machine Design',
  'Cryptographic Hashing', 'System Architecture', 'Frontend (HTML/CSS/JS)', 'Software Testing',
]

const MY_ROLE_SUBS = [
  'Designed the donation lifecycle, entities & state-transition rules',
  'Wrote the DonationContract chaincode (9 functions) in JavaScript',
  'Built the Node/Express backend as a simulated Fabric SDK gateway',
  'Implemented the file-based ledger with world state + tx history',
  'Built the LedgerAid web UI with an org selector & output panel',
  'Tested all 8 lifecycle steps + 11 validation cases (all passed)',
]

function SectionTitle({ icon: Icon, label, color = 'text-amber-400' }) {
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
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group rounded-xl overflow-hidden border border-[#2a3347] hover:border-amber-500/40 transition-all duration-300">
      <div className="aspect-video relative overflow-hidden bg-[#0a0f1e]">
        {!imgError ? (
          <>
            <img src={shot.src} alt={shot.label} onLoad={() => setLoaded(true)} onError={() => setImgError(true)} className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
            {!loaded && <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} flex items-center justify-center`}><span className="text-4xl">{shot.icon}</span></div>}
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${shot.gradient} flex flex-col items-center justify-center gap-2`}><span className="text-4xl">{shot.icon}</span><span className="text-white/50 text-xs font-mono">{shot.label}</span></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
      </div>
      <div className="p-3 bg-[#161b27]"><p className="text-sm font-semibold text-[#e2e8f0]">{shot.label}</p><p className="text-xs text-[#94a3b8] mt-0.5 leading-relaxed">{shot.desc}</p></div>
    </motion.div>
  )
}

export default function BlockchainCaseStudy({ isOpen, onClose }) {
  useEffect(() => { if (isOpen) document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [isOpen])
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-50 bg-[#080c15]/97 backdrop-blur-md overflow-y-auto">
          <div className="sticky top-0 z-10 bg-[#0d1117]/90 backdrop-blur-sm border-b border-[#2a3347] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
              <button onClick={onClose} className="hover:text-[#e2e8f0] transition-colors duration-200">Projects</button>
              <ChevronRight size={14} />
              <span className="text-amber-300 font-medium">Donation Tracking</span>
              <span className="hidden sm:inline text-[#2a3347] mx-1">—</span>
              <span className="hidden sm:inline">Case Study</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg border border-[#2a3347] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-[#4a5568] transition-all duration-200" aria-label="Close case study"><X size={16} /></button>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-12 pb-28">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-14">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-yellow-500/10 to-amber-600/10 border border-amber-500/20 p-8 md:p-12">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #eab308 1px, transparent 1px), radial-gradient(circle at 80% 20%, #f59e0b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-400/15 border border-amber-400/30 text-amber-300 mb-5">Blockchain Technology · BCI3353 · UMPSA · 2025/2026</span>
                  <div className="flex items-center gap-4 mb-5"><span className="text-5xl select-none">🔗</span><h1 className="text-3xl md:text-4xl font-bold text-[#e2e8f0]">Donation Tracking</h1></div>
                  <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                    A <span className="text-[#e2e8f0] font-medium">blockchain-based donation tracking system</span> that simulates a Hyperledger
                    Fabric network in Node.js/Express. A JavaScript smart contract drives each donation through its full on-chain lifecycle on an
                    append-only ledger, with cryptographic transaction hashes and dual Charity/Auditor roles.
                  </p>
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#2a3347] bg-[#0d1117]/40 text-[#94a3b8] text-sm font-medium"><Lock size={15} /> Individual Final Assessment · public source repo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {[
                  { value: '9', label: 'Contract Functions', icon: '⚙️' },
                  { value: '5', label: 'Lifecycle States', icon: '🔄' },
                  { value: '2', label: 'Organisations', icon: '🏢' },
                  { value: 'Fabric', label: 'Simulated', icon: '🔗' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center border border-[#2a3347]"><div className="text-2xl mb-1 select-none">{stat.icon}</div><div className="text-xl font-bold text-[#e2e8f0]">{stat.value}</div><div className="text-xs text-[#94a3b8]">{stat.label}</div></div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Target} label="Problem Statement" color="text-red-400" />
              <div className="glass rounded-2xl p-7 border border-[#2a3347]">
                <p className="text-[#94a3b8] leading-relaxed">
                  Traditional donation platforms run on <span className="text-[#e2e8f0] font-medium">centralised databases</span> controlled by the
                  charity itself — leaving room for fraud, altered records and a single point of failure, while donors and auditors get no
                  tamper-proof trail to follow the money. This project replaces that trust gap with a
                  <span className="text-[#e2e8f0] font-medium"> permissioned blockchain</span> where every step of a donation is immutable,
                  traceable and independently verifiable.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Target} label="Project Objectives" color="text-amber-400" />
              <div className="grid sm:grid-cols-2 gap-3">
                {OBJECTIVES.map((obj, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.07 }} className="flex items-start gap-3 glass rounded-xl p-4 border border-[#2a3347]"><CheckCircle2 size={15} className="text-amber-400 mt-0.5 shrink-0" /><p className="text-sm text-[#94a3b8] leading-relaxed">{obj}</p></motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Users} label="Stakeholders & Roles" color="text-orange-400" />
              <div className="grid md:grid-cols-3 gap-5">
                {STAKEHOLDERS.map((user, i) => (
                  <motion.div key={user.role} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden border border-[#2a3347]">
                    <div className={`h-1.5 bg-gradient-to-r ${user.gradient}`} />
                    <div className="p-6"><div className="text-3xl mb-3 select-none">{user.icon}</div><h3 className="font-bold text-[#e2e8f0] mb-4 text-sm">{user.role}</h3><ul className="space-y-2">{user.actions.map((a) => (<li key={a} className="flex items-start gap-2"><ArrowRight size={11} className="text-[#4a5568] mt-1 shrink-0" /><span className="text-xs text-[#94a3b8] leading-relaxed">{a}</span></li>))}</ul></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Link2} label="Donation Lifecycle" color="text-amber-400" />
              <div className="glass rounded-2xl p-6 border border-[#2a3347]">
                <div className="flex flex-col gap-3">
                  {LIFECYCLE.map((s, i) => (
                    <motion.div key={s.state} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-center gap-4">
                      <span className={`text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border w-32 text-center shrink-0 ${s.color}`}>{s.state}</span>
                      <ChevronRight size={14} className="text-[#4a5568] shrink-0" />
                      <span className="text-sm text-[#94a3b8] leading-relaxed">{s.desc}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Boxes} label="Smart Contract — DonationContract" color="text-amber-400" />
              <p className="text-sm text-[#94a3b8] leading-relaxed mb-5 max-w-3xl">Nine chaincode functions enforce <span className="text-[#e2e8f0] font-medium">access control first, then state validation</span>, and only then update the ledger — so unauthorized or invalid operations are rejected before anything is written.</p>
              <div className="grid md:grid-cols-3 gap-5">
                {FUNCTIONS.map((q, i) => {
                  const Icon = q.icon
                  return (
                    <motion.div key={q.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden border border-[#2a3347]">
                      <div className={`h-1 bg-gradient-to-r ${q.bar}`} />
                      <div className="p-6"><div className="flex items-center gap-3 mb-3"><div className={`p-2 rounded-lg bg-[#1e2534] ${q.color}`}><Icon size={17} /></div><h3 className="font-bold text-[#e2e8f0] text-sm">{q.title}</h3></div><ul className="space-y-2 border-t border-[#2a3347] pt-3">{q.items.map((t) => (<li key={t} className="flex items-start gap-2"><ChevronRight size={12} className={`${q.color} mt-0.5 shrink-0`} /><span className="text-xs text-[#94a3b8] leading-relaxed font-mono">{t}</span></li>))}</ul></div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Code2} label="Technologies Used" color="text-yellow-400" />
              <div className="glass rounded-2xl p-6 border border-[#2a3347]"><div className="flex flex-wrap gap-3">{TECH_STACK.map((t) => (<span key={t.name} className={`px-4 py-2 rounded-xl text-sm font-medium border ${t.badge}`}>{t.name}</span>))}</div></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Image} label="Screenshots" color="text-amber-400" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{SCREENSHOTS.map((shot, i) => (<ScreenshotCard key={shot.label} shot={shot} index={i} />))}</div>
              <p className="text-xs text-[#4a5568] text-center mt-4 font-mono">LedgerAid web interface · BCI3353 Final Assessment</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Star} label="My Role" color="text-amber-400" />
              <div className="glass rounded-2xl p-7 border border-amber-500/20">
                <div className="flex flex-wrap items-start gap-4 mb-5"><span className="text-3xl select-none">👨‍💻</span><div><h3 className="font-bold text-[#e2e8f0] text-base">Individual Final Assessment (45%)</h3><p className="text-xs text-[#94a3b8] mt-0.5">CB22162 · Blockchain Technology · UMPSA</p></div></div>
                <div className="grid sm:grid-cols-2 gap-3">{MY_ROLE_SUBS.map((item) => (<div key={item} className="flex items-start gap-2"><CheckCircle2 size={13} className="text-amber-400 mt-0.5 shrink-0" /><span className="text-xs text-[#94a3b8] leading-relaxed">{item}</span></div>))}</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Lightbulb} label="Challenges &amp; Solutions" color="text-orange-400" />
              <div className="space-y-4">
                {CHALLENGES.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass rounded-xl p-6 border border-[#2a3347]">
                      <div className="flex items-start gap-4"><div className={`p-2 rounded-lg bg-[#1e2534] ${item.color} shrink-0 mt-0.5`}><Icon size={15} /></div><div><h4 className="font-semibold text-[#e2e8f0] mb-2 text-sm">{item.title}</h4><p className="text-xs text-[#94a3b8] leading-relaxed">{item.solution}</p></div></div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Award} label="Skills Demonstrated" color="text-orange-400" />
              <div className="flex flex-wrap gap-2.5">{SKILLS.map((skill, i) => (<motion.span key={skill} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.04 }} className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#161b27] border border-[#2a3347] text-[#94a3b8] hover:text-amber-300 hover:border-amber-400/30 transition-colors duration-200 cursor-default">{skill}</motion.span>))}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="glass rounded-2xl p-8 border border-amber-500/20 text-center">
                <p className="text-sm text-[#94a3b8] mb-5">An individual blockchain final assessment at UMPSA. The full source — chaincode, backend and UI — is public on GitHub.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="https://github.com/MohammedAlkaf1/blockchain-donation-tracking" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-medium text-sm hover:opacity-90 transition-opacity duration-200"><Code2 size={15} /> View Code</a>
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
