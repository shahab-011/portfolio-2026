import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import ParticleCanvas from '../components/ParticleCanvas'
import { projects } from '../data/portfolio'

const filters = ['All', 'Under Development', 'Completed', 'Deployed']

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

/* ── Project Card ────────────────────────────────────────── */
function ProjectCard({ project, index, onClick }) {
  const status = statusConfig[project.status] || statusConfig['Under Development']

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
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
          className="flex items-center gap-4 pt-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-300 transition-colors"
          >
            <FaGithub size={11} /> Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-xs text-cyan-600 hover:text-cyan-400 transition-colors"
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto"
    >
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
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{project.title}</h2>
            <p className="text-gray-400 text-sm mb-3">{project.shortDesc}</p>
            <div className="flex flex-wrap gap-2">
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
        <p className="text-gray-300 leading-relaxed mb-6 text-sm">{project.description}</p>

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
            <ProjectDetail key="detail" project={selected} onBack={() => setSelected(null)} />
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

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
                      {f === 'All' && <span className="opacity-50 text-xs">&lt;/&gt;</span>}
                      {f === 'Under Development' && <span>⚙</span>}
                      {f === 'Completed' && <span>✓</span>}
                      {f === 'Deployed' && <span>🌐</span>}
                      {f}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Grid */}
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} onClick={setSelected} />
                  ))}
                </AnimatePresence>
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
