import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, MapPin, ArrowRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

export default function Contact() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production: connect to EmailJS, Formspree, or a backend endpoint
    setSubmitted(true)
  }

  const contactLinks = [
    {
      icon: GithubIcon,
      label: 'GitHub',
      value: 'github.com/MohammedAlkaf1',
      href: 'https://github.com/MohammedAlkaf1',
      color: 'cyan',
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'Mohammed Alkaf',
      href: 'https://www.linkedin.com/in/mohammed-alkaf-254551288',
      color: 'purple',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'm.alkaf2002@gmail.com',
      href: 'mailto:m.alkaf2002@gmail.com',
      color: 'cyan',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Available Remotely',
      href: null,
      color: 'purple',
    },
  ]

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
            05. Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2e8f0] mt-3">
            Let's Work Together
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mx-auto mt-4" />
          <p className="text-[#94a3b8] text-sm mt-4 max-w-lg mx-auto">
            I'm currently open to internship opportunities, freelance projects, and collaborations.
            Feel free to reach out — I'd love to connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-[#e2e8f0] mb-6">Get in Touch</h3>
            {contactLinks.map((link) => {
              const Icon = link.icon
              const content = (
                <div
                  className={`glass rounded-xl p-4 flex items-center gap-4 transition-all duration-200 group ${
                    link.href ? 'hover:border-cyan-400/30 cursor-pointer card-hover' : 'opacity-80'
                  } border border-transparent`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      link.color === 'cyan'
                        ? 'bg-cyan-400/15 text-cyan-400'
                        : 'bg-purple-500/15 text-purple-400'
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-[#64748b] uppercase tracking-wide">{link.label}</div>
                    <div className="text-[#e2e8f0] text-sm font-medium truncate group-hover:text-cyan-400 transition-colors">
                      {link.value}
                    </div>
                  </div>
                  {link.href && (
                    <ArrowRight
                      size={14}
                      className="ml-auto text-[#64748b] group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0"
                    />
                  )}
                </div>
              )
              return link.href ? (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                <div key={link.label}>{content}</div>
              )
            })}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? (
              <div className="glass rounded-2xl p-10 text-center flex flex-col items-center justify-center h-full min-h-64 border border-emerald-500/20">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                  <Send size={24} className="text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#e2e8f0] mb-2">Message Sent!</h3>
                <p className="text-[#94a3b8] text-sm">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-7 space-y-4">
                <h3 className="text-lg font-semibold text-[#e2e8f0] mb-2">Send a Message</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#64748b] uppercase tracking-wide mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-[#1e2534] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-[#e2e8f0] placeholder-[#4a5568] focus:outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#64748b] uppercase tracking-wide mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-[#1e2534] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-[#e2e8f0] placeholder-[#4a5568] focus:outline-none focus:border-cyan-400/60 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#64748b] uppercase tracking-wide mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    className="w-full bg-[#1e2534] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-[#e2e8f0] placeholder-[#4a5568] focus:outline-none focus:border-cyan-400/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#64748b] uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about the opportunity or project..."
                    className="w-full bg-[#1e2534] border border-[#2a3347] rounded-lg px-4 py-2.5 text-sm text-[#e2e8f0] placeholder-[#4a5568] focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-200 glow-cyan"
                >
                  <Send size={15} />
                  Send Message
                </button>
                <p className="text-xs text-[#4a5568] text-center">
                  To enable email delivery, connect a service like{' '}
                  <span className="text-[#64748b]">EmailJS</span> or{' '}
                  <span className="text-[#64748b]">Formspree</span>.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
