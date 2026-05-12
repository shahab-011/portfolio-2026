import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  return (
    <footer
      className="relative z-10 py-6 px-4 border-t border-white/10"
      style={{ background: 'rgba(8,13,31,0.9)' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          {[
            { icon: <FaGithub size={20} />, href: personalInfo.github },
            { icon: <FaLinkedin size={20} />, href: personalInfo.linkedin },
            { icon: <FaInstagram size={20} />, href: personalInfo.instagram },
          ].map(({ icon, href }, i) => (
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

          <motion.a
            href="/assets/resume.pdf"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all"
          >
            ↑ Resume
          </motion.a>
        </div>

        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
