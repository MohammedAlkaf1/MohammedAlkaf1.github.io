import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'About', href: '#about' },
  { label: 'Log', href: '#log' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-3xl"
      >
        <div
          className={`flex items-center justify-between gap-4 rounded-full border border-[#232327] px-4 md:px-5 py-2.5 transition-colors duration-300 ${
            scrolled ? 'bg-[#0a0a0d]/90 backdrop-blur-md' : 'bg-[#0a0a0d]/60 backdrop-blur-sm'
          }`}
        >
          <a href="#hero" className="font-serif italic text-lg text-[#f2f2f0] shrink-0">
            Mohammed Alkaf
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[#c7c7cc] hover:text-[#f2f2f0] transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:inline-flex btn-pill !py-1.5 !px-4 !text-xs">
            Get in touch
            <ArrowUpRight size={13} />
          </a>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-1.5 text-[#c7c7cc] hover:text-[#f2f2f0] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0a0a0d] flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#232327]">
              <span className="font-serif italic text-lg text-[#f2f2f0]">Mohammed Alkaf</span>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-[#c7c7cc] hover:text-[#f2f2f0]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 py-10">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="text-3xl font-serif text-[#f2f2f0] py-2.5 border-b border-[#18181c]"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
