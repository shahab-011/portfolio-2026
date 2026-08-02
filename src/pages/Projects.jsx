import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import ParticleCanvas from '../components/ParticleCanvas'
import { projects } from '../data/portfolio'

const filters = ['All', 'Deployed', 'Under Development', 'Completed']

const filterLabels = {
  'All': 'All Work',
  'Under Development': '// In Progress',
  'Completed': 'Completed',
  'Deployed': 'Deployed',
}

const statusConfig = {
  Deployed: {
    bg: 'rgba(244,63,94,0.12)',
    border: 'rgba(244,63,94,0.35)',
    text: '#fb7185',
    dot: '#f43f5e',
    label: '🌐 Deployed',
  },
  Completed: {
    bg: 'rgba(34,197,94,0.1)',
    border: 'rgba(34,197,94,0.3)',
    text: '#4ade80',
    dot: '#22c55e',
    label: '✓ Completed',
  },
  'Under Development': {
    bg: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.3)',
    text: '#fbbf24',
    dot: '#f59e0b',
    label: '⚙ In Progress',
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

/* ── Project Card ────────────────────────────────────────── */
function ProjectCard({ project, onClick }) {
  const status = statusConfig[project.status] || statusConfig['Under Development']

  return (
    <motion.div
      variants={cardVariants}
      onClick={() => onClick(project)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
      style={{
        /* True glassmorphism — particles visible through card */
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      whileHover={{
        y: -6,
        background: 'rgba(255, 255, 255, 0.07)',
        border: '1px solid rgba(0, 217, 255, 0.2)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.3), 0 0 20px rgba(0,217,255,0.05)',
        transition: { duration: 0.2 },
      }}
    >
      {/* Hairline top gradient — very subtle */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
      />

      <div className="relative z-10 p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none">{project.emoji}</span>
            <div>
              <h3 className="text-white font-semibold text-sm leading-snug">{project.title}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{project.type}</p>
            </div>
          </div>
          <ArrowUpRight
            size={15}
            className="text-gray-700 group-hover:text-cyan-400 transition-colors duration-200 flex-shrink-0 mt-0.5"
          />
        </div>

        {/* Status badge */}
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium w-fit mb-3"
          style={{
            background: status.bg,
            border: `1px solid ${status.border}`,
            color: status.text,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: status.dot }}
          />
          {status.label}
        </span>

        {/* Description */}
        <p className="text-gray-400 text-xs leading-relaxed mb-4 flex-1">
          {project.shortDesc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs text-gray-500"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-2 py-0.5 text-xs text-gray-600">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 pt-3 flex-wrap"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <FaGithub size={11} /> Code
            </a>
          )}
          {project.githubBackend && (
            <a
              href={project.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <FaGithub size={11} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-cyan-500 hover:text-cyan-300 transition-colors ml-auto"
            >
              <ExternalLink size={11} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Project Detail ──────────────────────────────────────── */
function ProjectDetail({ project, onBack }) {
  const status = statusConfig[project.status] || statusConfig['Under Development']

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 25, scale: 0.97 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="max-w-4xl mx-auto relative"
    >
      {/* Top Left Floating Back Button */}
      <div className="mb-4 flex items-center justify-between">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-400 hover:text-white transition-all cursor-pointer"
          style={{
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 217, 255, 0.3)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          <ArrowLeft size={13} /> Back to Projects
        </motion.button>
      </div>
      {/* Header */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-5"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.09)',
        }}
      >
        <div className="flex flex-col md:flex-row gap-5 items-start mb-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
            style={{ background: 'rgba(148,66,254,0.12)', border: '1px solid rgba(148,66,254,0.25)' }}
          >
            {project.emoji}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">{project.title}</h2>
            {project.tagline && (
              <p className="text-cyan-400 font-medium text-xs md:text-sm mb-2">{project.tagline}</p>
            )}
            <p className="text-gray-400 text-sm mb-3">{project.shortDesc}</p>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: status.bg, border: `1px solid ${status.border}`, color: status.text }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.dot }} />
                {status.label}
              </span>
              <span
                className="px-3 py-1 rounded-full text-xs text-gray-400"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                {project.type}
              </span>
            </div>
            {project.institution && (
              <p className="text-gray-400 text-xs font-mono mt-1">🎓 {project.institution}</p>
            )}
          </div>
        </div>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg text-xs text-gray-300"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <ArrowLeft size={14} /> Back
          </motion.button>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #fb7185)' }}
            >
              <ExternalLink size={14} /> Live Demo
            </motion.a>
          )}
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <FaGithub size={14} /> View Code
            </motion.a>
          )}
          {project.githubBackend && (
            <motion.a
              href={project.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-300 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <FaGithub size={14} /> View Code
            </motion.a>
          )}
        </div>
      </div>

      {/* Stats */}
      {project.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {project.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-4 text-center"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0,217,255,0.1)',
              }}
            >
              <p className="text-cyan-400 font-bold text-xl">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Unified 3-in-1 Legal Ecosystem Architecture Cards */}
      {project.ecosystemSections && (
        <div
          className="rounded-2xl p-6 md:p-8 mb-5 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(8,13,31,0.95) 0%, rgba(15,23,42,0.95) 100%)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(0, 217, 255, 0.25)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}
        >
          <div className="mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 inline-block mb-3">
              ⚡ Unified 3-in-1 Legal Ecosystem
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              End-to-End Judicial Workflow Architecture
            </h3>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-3xl">
              Engineered as a comprehensive, unified 3-in-1 legal ecosystem connecting three distinct phases of the legal workflow into one continuous platform tailored for the Indian judicial landscape.
            </p>
          </div>

          {/* 3 Section Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.ecosystemSections.map((sec) => (
              <div
                key={sec.phase}
                className="rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: `1px solid ${sec.border}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xl">{sec.num}</span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold"
                      style={{ color: sec.badgeColor, background: `${sec.badgeColor}18`, border: `1px solid ${sec.badgeColor}33` }}
                    >
                      {sec.phase}
                    </span>
                  </div>

                  <h4 className="text-white font-bold text-sm md:text-base mb-1">{sec.title}</h4>
                  <p className="text-cyan-400/90 font-mono text-[11px] mb-4">{sec.subtitle}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-gray-400 font-semibold text-[11px] uppercase tracking-wider mb-1">🎯 Purpose</p>
                      <p className="text-gray-300 text-xs leading-relaxed">{sec.purpose}</p>
                    </div>

                    <div>
                      <p className="text-cyan-400 font-semibold text-[11px] uppercase tracking-wider mb-1">⚙️ Tech Engine</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{sec.techEngine}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-purple-300 font-semibold text-[11px] uppercase tracking-wider mb-1">💡 Key Feature</p>
                  <p className="text-gray-300 text-xs leading-relaxed">{sec.keyFeature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Problem Statement Section */}
      {project.problemStatement && (
        <div
          className="rounded-2xl p-6 md:p-8 mb-5"
          style={{
            background: 'rgba(244,63,94,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(244,63,94,0.15)',
          }}
        >
          <h3 className="text-rose-400 font-semibold text-sm mb-4 flex items-center gap-2 tracking-wide uppercase font-mono">
            ⚠️ The Problem Addressed
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.problemStatement.map((prob, i) => (
              <div
                key={i}
                className="p-4 rounded-xl"
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(244,63,94,0.12)' }}
              >
                <p className="text-rose-300 font-bold text-xs mb-1.5">● {prob.title}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Highlights / Features Grid */}
      {project.highlights && (
        <div
          className="rounded-2xl p-6 md:p-8 mb-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <h3 className="text-cyan-400 font-semibold text-sm mb-4 flex items-center gap-2 tracking-wide uppercase font-mono">
            🚀 Key Features &amp; Capabilities
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="p-4 rounded-xl flex items-start gap-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{h.icon}</span>
                <div>
                  <p className="text-white font-semibold text-xs mb-1">{h.label}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description + Key Decisions */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-5"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <h3 className="text-white font-bold text-sm mb-3">Project Overview</h3>
        <p className="text-gray-300 leading-relaxed mb-6 text-sm whitespace-pre-line">{project.description}</p>

        <h3 className="text-cyan-400 font-semibold text-sm mb-3">Key Decisions</h3>
        <ul className="space-y-2.5 mb-6">
          {project.keyDecisions.map((d, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2.5 text-gray-300 text-sm"
            >
              <span className="text-cyan-500 flex-shrink-0 mt-0.5">▸</span> {d}
            </motion.li>
          ))}
        </ul>

        <h3 className="text-cyan-400 font-semibold text-sm mb-3">Tags &amp; Context</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: 'rgba(244,63,94,0.07)',
                border: '1px solid rgba(244,63,94,0.2)',
                color: '#fb7185',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Dev Log */}
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <h3 className="text-white font-bold text-base mb-5">Development Log</h3>
        <div
          className="rounded-xl p-5"
          style={{ background: 'rgba(148,66,254,0.04)', border: '1px solid rgba(148,66,254,0.1)' }}
        >
          <p className="text-purple-400 font-medium text-xs mb-4 tracking-wide">Dev Log Trail</p>
          <ul className="space-y-4">
            {project.devLog.map((log, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 text-gray-300 text-sm"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                  style={{
                    background: 'radial-gradient(circle, #f472b6, #9442fe)',
                    boxShadow: '0 0 5px rgba(244,114,182,0.4)',
                  }}
                />
                {log}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main ────────────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const handleBack = () => {
    if (window.history.state && window.history.state.projectDetail) {
      window.history.back()
    } else {
      setSelected(null)
    }
  }

  useEffect(() => {
    if (!selected) return

    const handlePopState = () => {
      setSelected(null)
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [selected])

  const openProject = (p) => {
    window.history.pushState({ projectDetail: true }, '')
    setSelected(p)
  }

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.status === activeFilter)

  return (
    <div className="relative min-h-screen" style={{ background: '#020617' }}>
      {/* Particle background — same as home */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ParticleCanvas dotColor="#00d9ff" lineColor="#00d9ff" />
      </div>

      <div className="relative z-10 pt-28 pb-16 px-4 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {selected ? (
            <ProjectDetail key="detail" project={selected} onBack={handleBack} />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >

              {/* Header + filter row */}
              <div className="flex flex-col gap-4 mb-10">
                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-extrabold text-white"
                >
                  Projects
                </motion.h1>

                {/* Filters — left aligned */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2"
                >
                  {filters.map((f) => (
                    <motion.button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={
                        activeFilter === f
                          ? {
                              background: 'rgba(148,66,254,0.25)',
                              border: '1px solid rgba(148,66,254,0.5)',
                              color: '#c084fc',
                            }
                          : {
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid rgba(255,255,255,0.09)',
                              color: '#6b7280',
                            }
                      }
                    >
                      {f === 'Under Development' && <span>⚙</span>}
                      {f === 'Completed' && <span>✓</span>}
                      {f === 'Deployed' && <span>🌐</span>}
                      {filterLabels[f]}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Grid */}
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={openProject} />
                ))}
              </motion.div>

              {filtered.length === 0 && (
                <div className="text-center text-gray-600 py-20 text-sm">
                  No projects match this filter.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
