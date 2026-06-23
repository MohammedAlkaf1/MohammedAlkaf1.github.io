import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronRight, Target, CheckCircle2, Users, Layers,
  Code2, Lightbulb, Award, ArrowRight, Star, Image, ExternalLink,
  Database, Brain, BarChart3, Cloud, Activity,
} from 'lucide-react'

const DEMO_URL = 'https://student-depression-mohammed.streamlit.app/'

const SCREENSHOTS = [
  { src: '/images/projects/depression/app.png', label: 'Risk Detector App', desc: 'Streamlit form — academic & lifestyle inputs → risk prediction', gradient: 'from-teal-600 to-cyan-700', icon: '🧠' },
  { src: '/images/projects/depression/result.png', label: 'Prediction Result', desc: 'Risk label with a probability breakdown', gradient: 'from-cyan-600 to-sky-700', icon: '📈' },
  { src: '/images/projects/depression/confusion.png', label: 'Confusion Matrix', desc: 'Logistic Regression — TN/FP/FN/TP on the 5,581 test set', gradient: 'from-emerald-600 to-teal-700', icon: '🔢' },
  { src: '/images/projects/depression/importance.png', label: 'Feature Importance', desc: 'Strongest predictors of depression risk', gradient: 'from-teal-600 to-green-700', icon: '⭐' },
  { src: '/images/projects/depression/correlation.png', label: 'Correlation Heatmap', desc: 'EDA — feature relationships with the target', gradient: 'from-cyan-600 to-teal-700', icon: '🌡️' },
  { src: '/images/projects/depression/distribution.png', label: 'Class Balance', desc: '16,336 at-risk vs 11,565 not-at-risk students', gradient: 'from-sky-600 to-cyan-700', icon: '📊' },
]

const OBJECTIVES = [
  'Predict a student\'s depression risk early from academic & lifestyle factors',
  'Train and compare two supervised models — Logistic Regression vs Random Forest',
  'Identify the strongest predictors with RFE and feature-importance ranking',
  'Evaluate with a confusion matrix, accuracy, precision, recall and F1',
  'Choose a model that is accurate, interpretable and lightweight for the cloud',
  'Deploy as an accessible web app on desktop and mobile',
]

const PIPELINE = [
  { title: 'Data & EDA', icon: Database, color: 'text-teal-400', bar: 'from-teal-500 to-cyan-600', items: ['27,901 student records · 18 attributes (Kaggle)', 'Median imputation for 3 missing values', 'Distribution, missing-value & correlation analysis', 'Reduced to 11 input features + target'] },
  { title: 'Modelling', icon: Brain, color: 'text-cyan-400', bar: 'from-cyan-500 to-sky-600', items: ['Label encoding + StandardScaler', 'Stratified 80:20 split (random_state 42)', 'Logistic Regression & Random Forest', 'RFE + feature_importances_ selection'] },
  { title: 'Deployment', icon: Cloud, color: 'text-emerald-400', bar: 'from-emerald-500 to-teal-600', items: ['Model serialized with Joblib (3 .pkl artifacts)', 'Interactive Streamlit UI (app.py)', 'Streamlit Community Cloud hosting', 'Responsive on desktop & mobile'] },
]

const MODELS = [
  { metric: 'Accuracy', lr: '84.25%', rf: '83.71%', win: true },
  { metric: 'Precision', lr: '85.52%', rf: '85.18%', win: true },
  { metric: 'Recall', lr: '88.00%', rf: '87.39%', win: true },
  { metric: 'F1-Score', lr: '86.74%', rf: '86.27%', win: true },
]

const PREDICTORS = [
  { name: 'Suicidal-thought history', weight: '0.231', icon: '🚩' },
  { name: 'Academic pressure', weight: '0.170', icon: '📚' },
  { name: 'CGPA', weight: '0.124', icon: '🎓' },
  { name: 'Age', weight: '0.109', icon: '🎂' },
  { name: 'Financial stress', weight: '0.103', icon: '💸' },
]

const TECH_STACK = [
  { name: 'Python', badge: 'bg-amber-500/15 border-amber-400/30 text-amber-300' },
  { name: 'Streamlit', badge: 'bg-red-500/15 border-red-400/30 text-red-300' },
  { name: 'scikit-learn', badge: 'bg-orange-500/15 border-orange-400/30 text-orange-300' },
  { name: 'Pandas', badge: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300' },
  { name: 'NumPy', badge: 'bg-sky-500/15 border-sky-400/30 text-sky-300' },
  { name: 'Matplotlib', badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300' },
  { name: 'Seaborn', badge: 'bg-teal-500/15 border-teal-400/30 text-teal-300' },
  { name: 'Joblib', badge: 'bg-violet-500/15 border-violet-400/30 text-violet-300' },
  { name: 'Logistic Regression', badge: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300' },
  { name: 'Streamlit Cloud', badge: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300' },
]

const CHALLENGES = [
  { title: 'Recall Matters Most Here', solution: 'A false negative — an at-risk student the model misses — is the worst outcome. I prioritised recall (88%) over raw accuracy when comparing models, since early detection is the whole point of a screening tool.', icon: Activity, color: 'text-teal-400' },
  { title: 'Simple Model Beat the Ensemble', solution: 'Logistic Regression slightly out-performed Random Forest on every metric, showing the signal is mostly linear. I chose LR for its higher accuracy, interpretable coefficients (useful for counsellors) and a tiny model file that fits free-tier hosting.', icon: Brain, color: 'text-cyan-400' },
  { title: 'Clean, Honest Data Prep', solution: 'Used median imputation (robust to outliers), label encoding and standardisation, then verified zero remaining nulls before training — and dropped leakage-prone columns like City, Profession and Degree.', icon: Database, color: 'text-emerald-400' },
  { title: 'From Notebook to Live App', solution: 'Serialized the trained model, scaler and encoders with Joblib so the Streamlit app applies the exact same preprocessing without retraining, then deployed it publicly on Streamlit Community Cloud.', icon: Cloud, color: 'text-sky-400' },
]

const SKILLS = [
  'Machine Learning', 'Classification', 'Logistic Regression', 'Random Forest',
  'Feature Engineering', 'RFE / Feature Selection', 'EDA & Visualization', 'Model Evaluation',
  'Pandas / NumPy', 'scikit-learn', 'Streamlit', 'Cloud Deployment',
]

const MY_ROLE_SUBS = [
  'Sourced & cleaned the 27,901-record student dataset',
  'Ran full EDA — distributions, missing values, correlations',
  'Engineered features and built the preprocessing pipeline',
  'Trained & compared Logistic Regression and Random Forest',
  'Selected predictors via RFE and feature importance',
  'Built and deployed the interactive Streamlit web app',
]

function SectionTitle({ icon: Icon, label, color = 'text-teal-400' }) {
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
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group rounded-xl overflow-hidden border border-[#2a3347] hover:border-teal-500/40 transition-all duration-300">
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

export default function DepressionCaseStudy({ isOpen, onClose }) {
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
              <span className="text-teal-300 font-medium">Depression Detector</span>
              <span className="hidden sm:inline text-[#2a3347] mx-1">—</span>
              <span className="hidden sm:inline">Case Study</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg border border-[#2a3347] text-[#94a3b8] hover:text-[#e2e8f0] hover:border-[#4a5568] transition-all duration-200" aria-label="Close case study"><X size={16} /></button>
          </div>

          <div className="max-w-5xl mx-auto px-6 py-12 pb-28">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-14">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-teal-500/10 to-cyan-600/10 border border-teal-500/20 p-8 md:p-12">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #14b8a6 1px, transparent 1px), radial-gradient(circle at 80% 20%, #06b6d4 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-400/15 border border-teal-400/30 text-teal-300 mb-5">Machine Learning Applications · BCI3333 · UMPSA · 2026</span>
                  <div className="flex items-center gap-4 mb-5"><span className="text-5xl select-none">🧠</span><h1 className="text-3xl md:text-4xl font-bold text-[#e2e8f0]">Student Depression Detector</h1></div>
                  <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mb-7">
                    A <span className="text-[#e2e8f0] font-medium">Smart Campus mental-health early-detection</span> tool. A Logistic Regression
                    model — trained on 27,900+ student records — predicts a student&apos;s depression risk from academic and lifestyle factors,
                    served through an interactive Streamlit web app.
                  </p>
                  <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-sm font-medium hover:opacity-90 transition-opacity duration-200">
                    <ExternalLink size={15} /> Try the live app
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {[
                  { value: '84.25%', label: 'Accuracy', icon: '🎯' },
                  { value: '88%', label: 'Recall', icon: '🩺' },
                  { value: '27,901', label: 'Records', icon: '🗂️' },
                  { value: 'Streamlit', label: 'Live App', icon: '🚀' },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-xl p-4 text-center border border-[#2a3347]"><div className="text-2xl mb-1 select-none">{stat.icon}</div><div className="text-xl font-bold text-[#e2e8f0]">{stat.value}</div><div className="text-xs text-[#94a3b8]">{stat.label}</div></div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Target} label="Problem Statement" color="text-red-400" />
              <div className="glass rounded-2xl p-7 border border-[#2a3347]">
                <p className="text-[#94a3b8] leading-relaxed">
                  University students face academic pressure, financial stress, poor sleep and isolation — yet campuses have
                  <span className="text-[#e2e8f0] font-medium"> limited counselling capacity</span>, so at-risk students are often only identified
                  once a situation becomes critical. This project applies machine learning on a smart campus to
                  <span className="text-[#e2e8f0] font-medium"> flag depression risk early</span> from academic and lifestyle signals, giving
                  counsellors and management a chance to intervene sooner.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Target} label="Project Objectives" color="text-teal-400" />
              <div className="grid sm:grid-cols-2 gap-3">
                {OBJECTIVES.map((obj, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.07 }} className="flex items-start gap-3 glass rounded-xl p-4 border border-[#2a3347]"><CheckCircle2 size={15} className="text-teal-400 mt-0.5 shrink-0" /><p className="text-sm text-[#94a3b8] leading-relaxed">{obj}</p></motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Layers} label="ML Pipeline" color="text-teal-400" />
              <div className="grid md:grid-cols-3 gap-5">
                {PIPELINE.map((q, i) => {
                  const Icon = q.icon
                  return (
                    <motion.div key={q.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="glass rounded-2xl overflow-hidden border border-[#2a3347]">
                      <div className={`h-1 bg-gradient-to-r ${q.bar}`} />
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3"><div className={`p-2 rounded-lg bg-[#1e2534] ${q.color}`}><Icon size={17} /></div><h3 className="font-bold text-[#e2e8f0] text-sm">{q.title}</h3></div>
                        <ul className="space-y-2 border-t border-[#2a3347] pt-3">{q.items.map((t) => (<li key={t} className="flex items-start gap-2"><ChevronRight size={12} className={`${q.color} mt-0.5 shrink-0`} /><span className="text-xs text-[#94a3b8] leading-relaxed">{t}</span></li>))}</ul>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={BarChart3} label="Model Comparison" color="text-cyan-400" />
              <div className="glass rounded-2xl overflow-hidden border border-[#2a3347]">
                <div className="grid grid-cols-3 text-xs font-mono uppercase tracking-wider text-[#64748b] border-b border-[#2a3347] px-6 py-3">
                  <span>Metric</span><span className="text-center text-teal-300">Logistic Regression</span><span className="text-center">Random Forest</span>
                </div>
                {MODELS.map((m, i) => (
                  <div key={m.metric} className={`grid grid-cols-3 items-center px-6 py-3.5 text-sm ${i < MODELS.length - 1 ? 'border-b border-[#1e2534]' : ''}`}>
                    <span className="text-[#94a3b8]">{m.metric}</span>
                    <span className="text-center font-semibold text-teal-300 flex items-center justify-center gap-1.5">{m.lr}{m.win && <CheckCircle2 size={12} className="text-teal-400" />}</span>
                    <span className="text-center text-[#94a3b8]">{m.rf}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#4a5568] mt-3">Logistic Regression won on every metric — chosen for deployment for its accuracy, interpretability and small footprint.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Star} label="Strongest Predictors" color="text-emerald-400" />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PREDICTORS.map((p, i) => (
                  <motion.div key={p.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.06 }} className="glass rounded-xl p-4 border border-[#2a3347] flex items-center gap-3">
                    <span className="text-2xl select-none">{p.icon}</span>
                    <div className="flex-1"><p className="text-sm text-[#e2e8f0] font-medium leading-tight">{p.name}</p><p className="text-xs text-[#64748b] font-mono mt-0.5">importance {p.weight}</p></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Code2} label="Technologies Used" color="text-cyan-400" />
              <div className="glass rounded-2xl p-6 border border-[#2a3347]"><div className="flex flex-wrap gap-3">{TECH_STACK.map((t) => (<span key={t.name} className={`px-4 py-2 rounded-xl text-sm font-medium border ${t.badge}`}>{t.name}</span>))}</div></div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Image} label="Screenshots" color="text-teal-400" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{SCREENSHOTS.map((shot, i) => (<ScreenshotCard key={shot.label} shot={shot} index={i} />))}</div>
              <p className="text-xs text-[#4a5568] text-center mt-4 font-mono">App screens & analysis figures · BCI3333 Final Project</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Users} label="My Role" color="text-teal-400" />
              <div className="glass rounded-2xl p-7 border border-teal-500/20">
                <div className="flex flex-wrap items-start gap-4 mb-5"><span className="text-3xl select-none">👨‍🔬</span><div><h3 className="font-bold text-[#e2e8f0] text-base">Solo ML Project</h3><p className="text-xs text-[#94a3b8] mt-0.5">CB22162 · Machine Learning Applications · UMPSA</p></div></div>
                <div className="grid sm:grid-cols-2 gap-3">{MY_ROLE_SUBS.map((item) => (<div key={item} className="flex items-start gap-2"><CheckCircle2 size={13} className="text-teal-400 mt-0.5 shrink-0" /><span className="text-xs text-[#94a3b8] leading-relaxed">{item}</span></div>))}</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-14">
              <SectionTitle icon={Lightbulb} label="Challenges &amp; Solutions" color="text-cyan-400" />
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
              <SectionTitle icon={Award} label="Skills Demonstrated" color="text-emerald-400" />
              <div className="flex flex-wrap gap-2.5">{SKILLS.map((skill, i) => (<motion.span key={skill} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: i * 0.04 }} className="px-3.5 py-1.5 rounded-lg text-sm font-medium bg-[#161b27] border border-[#2a3347] text-[#94a3b8] hover:text-teal-300 hover:border-teal-400/30 transition-colors duration-200 cursor-default">{skill}</motion.span>))}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="glass rounded-2xl p-8 border border-teal-500/20 text-center">
                <p className="text-sm text-[#94a3b8] mb-2">Built for educational purposes — not a clinical diagnosis.</p>
                <p className="text-xs text-[#64748b] mb-5">The app is live on Streamlit Community Cloud and the code is on GitHub.</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium text-sm hover:opacity-90 transition-opacity duration-200"><ExternalLink size={15} /> Live Demo</a>
                  <a href="https://github.com/MohammedAlkaf1/student-depression-detection" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#2a3347] text-[#94a3b8] font-medium text-sm hover:text-[#e2e8f0] hover:border-[#4a5568] transition-all duration-200"><Code2 size={15} /> View Code</a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
