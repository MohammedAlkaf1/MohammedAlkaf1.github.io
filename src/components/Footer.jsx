import { GithubIcon, LinkedinIcon } from './icons'

export default function Footer() {
  return (
    <footer className="border-t border-[#232327] px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#8a8a92]">
          © {new Date().getFullYear()} Mohammed Alkaf
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/MohammedAlkaf1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#8a8a92] hover:text-[#f2f2f0] transition-colors duration-200"
          >
            <GithubIcon size={14} />
          </a>
          <a
            href="https://www.linkedin.com/in/mohammed-alkaf-254551288"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#8a8a92] hover:text-[#f2f2f0] transition-colors duration-200"
          >
            <LinkedinIcon size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
