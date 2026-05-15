import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ParticleCanvas from '../components/ParticleCanvas'
import GeodesicSphere from '../components/GeodesicSphere'
import Typewriter from '../components/Typewriter'
import { personalInfo } from '../data/portfolio'

/* Animated shimmer border button */
function GlowButton({ children, onClick, href, to, variant = 'outline', delay = 0 }) {
  const inner = (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover="hover"
      whileTap={{ scale: 0.94 }}
      className="relative group overflow-hidden rounded-2xl px-7 py-3 font-semibold text-sm tracking-wide"
      style={
        variant === 'solid'
          ? {
              background: 'linear-gradient(135deg, #00d9ff 0%, #9442fe 100%)',
              color: '#fff',
              border: 'none',
            }
          : {
              background: 'rgba(0,217,255,0.06)',
              color: '#00d9ff',
              border: '1px solid rgba(0,217,255,0.35)',
            }
      }
    >
      {/* Animated shimmer sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            variant === 'solid'
              ? 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)'
              : 'linear-gradient(120deg, transparent 30%, rgba(0,217,255,0.18) 50%, transparent 70%)',
          backgroundSize: '200% 100%',
        }}
        variants={{
          hover: {
            backgroundPosition: ['200% center', '-200% center'],
            transition: { duration: 0.6, ease: 'easeInOut' },
          },
        }}
      />

      {/* Glow pulse on hover */}
      <motion.span
        className="absolute inset-0 rounded-2xl pointer-events-none"
        variants={{
          hover: {
            boxShadow:
              variant === 'solid'
                ? '0 0 28px rgba(0,217,255,0.45), 0 0 60px rgba(148,66,254,0.25)'
                : '0 0 20px rgba(0,217,255,0.3)',
          },
        }}
        transition={{ duration: 0.25 }}
      />

      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )

  if (to) return <Link to={to}>{inner}</Link>
  if (href) return <a href={href}>{inner}</a>
  return <span onClick={onClick}>{inner}</span>
}

export default function Home() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{ background: '#020617' }}
    >
      {/* Particle background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ParticleCanvas dotColor="#00d9ff" lineColor="#00d9ff" />
      </div>

      {/* ── Main hero row ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center pt-20 md:pt-0 px-6 md:px-16 lg:px-24">
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-0">

          {/* LEFT — sphere (order-2 on mobile so text shows first) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="flex-shrink-0 flex items-center justify-center md:justify-start order-2 md:order-1"
          >
            {/* Soft glow behind sphere */}
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)',
                  transform: 'scale(1.2)',
                }}
              />
              {/* Smaller on mobile, full size on desktop */}
              <div className="block md:hidden"><GeodesicSphere size={220} /></div>
              <div className="hidden md:block"><GeodesicSphere size={380} /></div>
            </div>
          </motion.div>

          {/* RIGHT — text content (order-1 on mobile so text shows first) */}
          <div className="flex-1 md:pl-10 lg:pl-16 text-center md:text-left order-1 md:order-2">

            {/* Subtle label */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-cyan-400 text-xs font-mono tracking-widest mb-4 uppercase"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-none mb-3"
              style={{ letterSpacing: '-1px' }}
            >
              {personalInfo.fullName}
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl font-semibold mb-4"
              style={{
                background: 'linear-gradient(90deg, #00d9ff, #9442fe)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="text-base md:text-lg text-gray-400 mb-3 h-7"
            >
              <Typewriter words={personalInfo.roles} speed={75} deleteSpeed={45} pause={2200} />
            </motion.div>

            {/* Welcome line */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-gray-500 text-sm mb-10"
            >
              {personalInfo.welcome}
            </motion.p>

            {/* Buttons */}
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
              <GlowButton to="/contact" variant="outline" delay={0.85}>
                Hire Me
                {/* Blinking dot */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#00d9ff', display: 'inline-block' }}
                />
              </GlowButton>

              <GlowButton to="/projects" variant="solid" delay={1.0}>
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
                Project
              </GlowButton>
            </div>

            {/* Social links row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex items-center gap-5 mt-8 justify-center md:justify-start"
            >
              {[
                { label: 'GitHub', href: personalInfo.github },
                { label: 'LinkedIn', href: personalInfo.linkedin },
                { label: 'Email', href: `mailto:${personalInfo.email}` },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-600 hover:text-cyan-400 transition-colors tracking-wider font-mono"
                  whileHover={{ y: -2 }}
                >
                  {label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-gray-700 text-xs font-mono tracking-widest">scroll</span>
          <div
            className="w-px h-8"
            style={{ background: 'linear-gradient(to bottom, rgba(0,217,255,0.5), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
