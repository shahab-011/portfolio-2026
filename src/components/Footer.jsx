import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const socialLinks = [
    { icon: <FaLinkedin size={20} />, href: personalInfo.linkedin },
    { icon: <FaFacebook size={20} />, href: personalInfo.facebook },
    { icon: <FaInstagram size={20} />, href: personalInfo.instagram },
    { icon: <FaGithub size={20} />, href: personalInfo.github },
  ]

  return (
    <footer
      className="relative z-10 py-6 px-8 border-t border-white/10"
      style={{ background: 'rgba(8,13,31,0.9)' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="/assets/resume.pdf"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-cyan-400 border border-cyan-400/50 hover:bg-cyan-400/10 transition-all"
            style={{ transform: 'skewX(-10deg)', display: 'inline-flex' }}
          >
            <span style={{ transform: 'skewX(10deg)' }}>↓ Resume</span>
          </motion.a>

          <div className="flex items-center gap-6">
            {socialLinks.map(({ icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#00d9ff' }}
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

        <p className="text-gray-500 text-sm text-center">
          Pixels, logic, and a bit of obsession. —{' '}
          <span className="text-cyan-400/70">{personalInfo.fullName}</span>
        </p>
      </div>
    </footer>
  )
}
