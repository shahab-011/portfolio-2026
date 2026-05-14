import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'
import { HiDownload } from 'react-icons/hi'
import { personalInfo } from '../data/portfolio'

export default function Footer() {
  const socialLinks = [
    { icon: <FaLinkedin size={19} />, href: personalInfo.linkedin },
    { icon: <FaFacebook size={19} />, href: personalInfo.facebook },
    { icon: <FaInstagram size={19} />, href: personalInfo.instagram },
    { icon: <FaGithub size={19} />, href: personalInfo.github },
  ]

  return (
    <footer
      className="relative z-10 py-5 px-8 border-t border-white/10"
      style={{ background: 'rgba(8,13,31,0.9)' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-3">

        {/* Icons + Resume in one tight row */}
        <div className="flex items-center gap-5">
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

          {/* Divider */}
          <span className="w-px h-4 bg-white/15" />

          {/* Professional Resume button */}
          <motion.a
            href="/assets/resume.pdf"
            download="Shahab_Alam_Resume.pdf"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-white rounded-sm transition-all"
            style={{
              background: 'linear-gradient(135deg, #00d9ff22, #9442fe22)',
              border: '1px solid rgba(0,217,255,0.3)',
              letterSpacing: '0.1em',
            }}
          >
            <HiDownload size={13} />
            Resume
          </motion.a>
        </div>

        {/* Message */}
        <p className="text-gray-600 text-xs text-center tracking-wide">
          Pixels, logic, and a bit of obsession. —{' '}
          <span className="text-cyan-500/60">@Shahab</span>
        </p>
      </div>
    </footer>
  )
}
