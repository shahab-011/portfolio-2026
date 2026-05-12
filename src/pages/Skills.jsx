import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleCanvas from '../components/ParticleCanvas'
import { skills } from '../data/portfolio'

/* ── Skill card ──────────────────────────────────────────── */
function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      animate={{ y: hovered ? -10 : 0, scale: hovered ? 1.06 : 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col items-center justify-center gap-2 p-4 rounded-3xl cursor-default overflow-hidden"
      style={{
        minHeight: '9rem',
        minWidth: '8rem',
        background: 'rgba(8, 13, 31, 0.7)',
        border: `1px solid ${hovered ? skill.color + '55' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 8px 30px ${skill.color}22, 0 0 0 0px ${skill.color}` : 'none',
        transition: 'border-color 0.45s ease, box-shadow 0.45s ease',
      }}
    >
      {/* Rotating conic border — fades in smoothly */}
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

      {/* Radial glow behind icon */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}1a 0%, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      />

      {/* Icon */}
      <motion.span
        className="text-3xl relative z-10"
        animate={{ scale: hovered ? 1.18 : 1, rotate: hovered ? 6 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        {skill.icon}
      </motion.span>

      {/* Label */}
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

/* ── Category grouping ───────────────────────────────────── */
const categories = [
  {
    label: 'Languages',
    skills: ['JavaScript', 'C / C++', 'Java', 'HTML & CSS'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    label: 'Database',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    label: 'DevOps & Cloud',
    skills: ['AWS', 'Docker', 'Git & GitHub'],
  },
  {
    label: 'Core',
    skills: ['DSA', 'TypeScript'],
  },
]

function Section({ label, skillNames, allSkills, baseIndex }) {
  const sectionSkills = allSkills.filter((s) => skillNames.includes(s.name))
  if (!sectionSkills.length) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: '#00d9ff' }}
        >
          {label}
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: 'linear-gradient(to right, rgba(0,217,255,0.3), transparent)' }}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {sectionSkills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={baseIndex + i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  return (
    <div className="relative min-h-screen" style={{ background: '#020617' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ParticleCanvas dotColor="#00d9ff" lineColor="#00d9ff" />
      </div>

      <div className="relative z-10 pt-28 pb-16 px-4 max-w-5xl mx-auto">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="text-cyan-400 text-xs font-mono tracking-widest mb-2 uppercase">
            ../skills
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            My{' '}
            <span
              style={{
                background: 'linear-gradient(90deg,#00d9ff,#9442fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Skills
            </span>
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Technologies and tools I work with — from frontend to cloud.
          </p>
        </motion.div>

        {/* Categorised skill sections */}
        {categories.map((cat, ci) => (
          <Section
            key={cat.label}
            label={cat.label}
            skillNames={cat.skills}
            allSkills={skills}
            baseIndex={ci * 4}
          />
        ))}

        {/* All skills fallback — anything not in a category */}
        {(() => {
          const categorised = categories.flatMap((c) => c.skills)
          const rest = skills.filter((s) => !categorised.includes(s.name))
          if (!rest.length) return null
          return (
            <Section
              label="Other"
              skillNames={rest.map((s) => s.name)}
              allSkills={skills}
              baseIndex={100}
            />
          )
        })()}
      </div>
    </div>
  )
}
