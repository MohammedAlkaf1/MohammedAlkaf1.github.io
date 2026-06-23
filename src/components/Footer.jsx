import { motion } from 'framer-motion'
import { Mail, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './icons'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Learning', href: '#learning' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  {
    icon: GithubIcon,
    href: 'https://github.com/MohammedAlkaf1',
    label: 'GitHub',
  },
  {
    icon: LinkedinIcon,
    href: 'https://www.linkedin.com/in/mohammed-alkaf-254551288',
    label: 'LinkedIn',
  },
  {
    icon: Mail,
    href: 'mailto:m.alkaf2002@gmail.com',
    label: 'Email',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#2a3347]/50 bg-[#0a0f1e]/80">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 rounded-xl p-[1.5px] bg-gradient-to-br from-cyan-400 to-purple-600">
                <div className="w-full h-full rounded-[9px] bg-[#0a0f1e] flex items-center justify-center">
                  <span className="text-xs font-extrabold gradient-text tracking-tight">MA</span>
                </div>
              </div>
              <span className="font-bold text-[#e2e8f0]">
                Mohammed <span className="gradient-text">Alkaf</span>
              </span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed max-w-xs">
              Software Engineering . Building practical software
              solutions with modern technologies.
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#64748b] hover:text-cyan-400 transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-[#64748b] hover:text-cyan-400 transition-colors duration-200 group"
                  >
                    <Icon size={15} className="group-hover:scale-110 transition-transform" />
                    {s.label}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2a3347]/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4a5568]">
            © {new Date().getFullYear()} Mohammed Alkaf. All rights reserved.
          </p>
          <p className="text-xs text-[#4a5568] flex items-center gap-1.5">
            Built with React, Vite & Tailwind CSS
            <Heart size={11} className="text-purple-400" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  )
}
