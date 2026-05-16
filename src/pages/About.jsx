import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import ParticleCanvas from '../components/ParticleCanvas'
import { personalInfo, skills, certifications, achievements, experience } from '../data/portfolio'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
})

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: hovered ? -10 : 0, scale: hovered ? 1.06 : 1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-3xl cursor-default overflow-hidden"
      style={{
        minHeight: '9rem',
        minWidth: '8rem',
        background: 'rgba(8, 13, 31, 0.7)',
        border: `1px solid ${hovered ? skill.color + '55' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 8px 30px ${skill.color}22` : 'none',
        transition: 'border-color 0.45s ease, box-shadow 0.45s ease',
      }}
    >
      {/* Rotating conic border */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `conic-gradient(${skill.color}, transparent 40%, ${skill.color})`,
          animation: 'rotateBorder 4s linear infinite',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}1a 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      />

      <motion.span
        className="text-3xl relative z-10"
        animate={{ scale: hovered ? 1.18 : 1, rotate: hovered ? 6 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        {skill.icon}
      </motion.span>

      <span
        className="text-sm font-medium text-center relative z-10"
        style={{
          color: hovered ? '#fff' : 'rgba(255,255,255,0.6)',
          transition: 'color 0.35s ease',
        }}
      >
        {skill.name}
      </span>

      <style>{`
        @keyframes rotateBorder {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="relative min-h-screen" style={{ background: '#020617' }}>
      <ParticleCanvas dotColor="#00d9ff" lineColor="#00d9ff" />

      <div className="relative z-10 pt-28 pb-16 px-4 max-w-5xl mx-auto">

        {/* — About Me — */}
        <motion.div {...fadeUp(0)} className="mb-20">
          <p className="text-cyan-400 text-center text-sm font-mono mb-2 tracking-widest">../about</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12">
            About <span className="gradient-text">Me</span>
          </h2>

          <div
            className="rounded-2xl border border-white/10 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center"
            style={{ background: 'rgba(8,13,31,0.7)', backdropFilter: 'blur(8px)' }}
          >
            {/* Profile photo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex-shrink-0"
            >
              <div
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-cyan-400/40"
                style={{ boxShadow: '0 0 30px rgba(0,217,255,0.2)' }}
              >
                <img
                  src="/assets/profile.jpg"
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.style.background = 'linear-gradient(135deg,#9442fe,#00d9ff)'
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl font-bold text-white">SA</div>`
                  }}
                />
              </div>
            </motion.div>

            {/* Bio */}
            <div className="flex-1">
              <h3
                className="text-2xl md:text-3xl font-bold text-white mb-1"
                style={{ textShadow: '0 0 10px rgba(0,217,255,0.3)' }}
              >
                {personalInfo.fullName}
              </h3>
              <p className="text-cyan-400 text-sm font-mono mb-4">Full Stack MERN Developer</p>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                {personalInfo.summary}
              </p>

              {/* Education */}
              <div className="mb-5 p-4 rounded-xl border border-white/10 bg-white/5">
                <p className="text-cyan-400 text-xs font-mono mb-1">🎓 Education</p>
                <p className="text-white font-semibold">{personalInfo.education.degree}</p>
                <p className="text-gray-400 text-sm">{personalInfo.education.college}</p>
                <div className="flex gap-4 mt-1">
                  <span className="text-gray-400 text-xs">{personalInfo.education.duration}</span>
                  <span className="text-cyan-400 text-xs font-semibold">CGPA: {personalInfo.education.cgpa}</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ scale: 1.2, color: '#00d9ff' }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <FaGithub size={24} />
                  </motion.div>
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ scale: 1.2, color: '#00d9ff' }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </motion.div>
                </a>
                <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ scale: 1.2, color: '#00d9ff' }}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <FaInstagram size={24} />
                  </motion.div>
                </a>
                <motion.a
                  href="/assets/resume.pdf"
                  download="Shahab_Alam_Resume.pdf"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="ml-2 px-4 py-1.5 rounded-full text-sm font-medium border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 transition-all"
                >
                  ↑ Resume
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* — Academic History — */}
        <motion.div {...fadeUp(0.1)} className="mb-20">
          <p className="text-cyan-400 text-center text-sm font-mono mb-2 tracking-widest">../education</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-14">
            🎓 Academic <span className="gradient-text">History</span>
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, #00d9ff, #9442fe, #00d9ff)' }}
            />

            {[
              {
                side: 'left',
                icon: '🏛️',
                period: 'Aug 2022 – July 2026',
                school: 'St Thomas College of Engineering & Technology',
                location: 'Kolkata, West Bengal',
                degree: 'B.Tech — Computer Science Engineering',
                details: [
                  'CGPA: 7.10 / 10',
                  'Specialisation in Full Stack Development',
                  'Solved 300+ DSA problems on LeetCode',
                  'Built multiple production-grade MERN projects',
                ],
              },
              {
                side: 'right',
                icon: '🏫',
                period: '2020 – 2022',
                school: 'Karim City College',
                location: 'Jamshedpur, Jharkhand',
                degree: 'Intermediate (Class XII) — Science',
                details: [
                  'Physics, Chemistry, Mathematics',
                  'Jharkhand Academic Council',
                ],
              },
              {
                side: 'left',
                icon: '🏫',
                period: 'Until 2020',
                school: 'St Child English High School',
                location: 'Jamshedpur, Jharkhand',
                degree: 'Matriculation (Class X)',
                details: [
                  'Jharkhand Academic Council',
                  'Foundation in Science & Mathematics',
                ],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === 'left' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-center mb-12 ${item.side === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
              >
                {/* Card */}
                <div className="w-5/12">
                  <div
                    className="rounded-2xl p-5 border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
                    style={{ background: 'rgba(8,13,31,0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
                  >
                    <p className="text-cyan-400 text-xs font-mono mb-1">{item.period}</p>
                    <h3 className="text-white font-bold text-base mb-0.5">{item.school}</h3>
                    <p className="text-gray-500 text-xs mb-2">{item.location}</p>
                    <p className="text-cyan-300/80 text-sm font-medium mb-3">{item.degree}</p>
                    <ul className="space-y-1">
                      {item.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-400 text-xs">
                          <span className="text-cyan-500 mt-0.5 flex-shrink-0">▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Center node */}
                <div className="w-2/12 flex justify-center relative z-10">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 border-cyan-400"
                    style={{ background: '#020617', boxShadow: '0 0 16px rgba(0,217,255,0.5)' }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Empty opposite side */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* — Skills — */}
        <motion.div {...fadeUp(0.1)} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-10">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} />
            ))}
          </div>
        </motion.div>

        {/* — Achievements — */}
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <h2 className="text-3xl font-extrabold text-center text-white mb-8">
            <span className="gradient-text">Achievements</span>
          </h2>
          <div
            className="rounded-2xl border border-white/10 p-6 md:p-8"
            style={{ background: 'rgba(8,13,31,0.7)', backdropFilter: 'blur(8px)' }}
          >
            <ul className="space-y-3">
              {achievements.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="text-cyan-400 mt-1 flex-shrink-0">●</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* — Certifications — */}
        <motion.div {...fadeUp(0.1)} className="mb-16">
          <h2 className="text-3xl font-extrabold text-center text-white mb-8">
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-4 rounded-xl border border-white/10 bg-navy-900/60 flex items-start gap-3"
              >
                <span className="text-xl">🏆</span>
                <span className="text-gray-300 text-sm">{cert}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
