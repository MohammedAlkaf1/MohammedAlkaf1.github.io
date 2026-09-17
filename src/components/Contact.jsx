import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, MapPin, MessageCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

export default function Contact() {
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
    },
    {
      icon: LinkedinIcon,
      label: 'LinkedIn',
      value: 'Mohammed Alkaf',
      href: 'https://www.linkedin.com/in/mohammed-alkaf-254551288',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'm.alkaf2002@gmail.com',
      href: 'mailto:m.alkaf2002@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Available remotely',
      href: null,
    },
  ]

  const fieldClass =
    'w-full bg-[#18181c] border border-[#232327] rounded-xl px-4 py-3 text-sm text-[#f2f2f0] placeholder-[#8a8a92] focus:outline-none focus:border-[#6ea8fe]/60 transition-colors'

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="eyebrow-pill mb-6">
            <MessageCircle size={12} />
            Contact
          </div>
          <h2 className="section-heading text-3xl md:text-5xl max-w-xl">
            Let's <span className="emphasis">build something.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="card p-2"
          >
            {contactLinks.map((link) => {
              const Icon = link.icon
              const content = (
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#18181c] transition-colors group">
                  <div className="w-9 h-9 rounded-lg border border-[#313136] bg-[#18181c] flex items-center justify-center shrink-0">
                    <Icon size={15} className="text-[#8a8a92] group-hover:text-[#6ea8fe] transition-colors" />
                  </div>
                  <div className="min-w-0">
                    <div className="idx-num">{link.label}</div>
                    <div className="text-sm text-[#f2f2f0] truncate">{link.value}</div>
                  </div>
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="card p-7"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-10">
                <div className="w-12 h-12 rounded-full border border-[#313136] bg-[#18181c] flex items-center justify-center mb-4">
                  <Send size={18} className="text-[#6ea8fe]" />
                </div>
                <h3 className="font-semibold text-lg text-[#f2f2f0] mb-2">Message sent.</h3>
                <p className="text-[#8a8a92] text-sm">
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="idx-num block mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label className="idx-num block mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className={fieldClass}
                    />
                  </div>
                </div>
                <div>
                  <label className="idx-num block mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about the opportunity or project..."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
                <button type="submit" className="btn-pill-primary w-full">
                  <Send size={15} />
                  Send message
                </button>
                <p className="text-xs text-[#8a8a92] text-center">
                  To enable email delivery, connect a service like EmailJS or Formspree.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
