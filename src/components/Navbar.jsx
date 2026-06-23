import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Learning', href: '#learning' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href) => {
    setMenuOpen(false)
    setActive(href)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-[#2a3347]/50 py-3' : 'py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
          onClick={() => handleNav('#hero')}
        >
          <div className="relative w-9 h-9 rounded-xl p-[1.5px] bg-gradient-to-br from-cyan-400 to-purple-600 group-hover:scale-110 transition-transform duration-200">
            <div className="w-full h-full rounded-[10px] bg-[#0d1117] flex items-center justify-center">
              <span className="text-sm font-extrabold gradient-text tracking-tight">MA</span>
            </div>
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-[#e2e8f0]">Mohammed</span>{' '}
            <span className="gradient-text">Alkaf</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`text-sm font-medium transition-colors duration-200 relative group ${
                  active === link.href ? 'text-cyan-400' : 'text-[#94a3b8] hover:text-[#e2e8f0]'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://github.com/MohammedAlkaf1"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-[#2a3347] text-sm font-medium text-[#94a3b8] hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-200"
        >
          GitHub
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-[#94a3b8] hover:text-white hover:bg-[#1e2534] transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden glass border-t border-[#2a3347]/50"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleNav(link.href)}
                    className="block text-[#94a3b8] hover:text-cyan-400 font-medium transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/MohammedAlkaf1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#94a3b8] hover:text-cyan-400 font-medium transition-colors duration-200"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
