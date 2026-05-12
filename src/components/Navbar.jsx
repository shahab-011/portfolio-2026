import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
]

function AtomLogo() {
  return (
    <div
      className="relative w-8 h-8 flex items-center justify-center"
      style={{ perspective: '200px' }}
    >
      {/* Nucleus */}
      <div
        className="absolute w-2 h-2 rounded-full z-10"
        style={{ background: '#00d9ff', boxShadow: '0 0 6px #00d9ff, 0 0 14px #00d9ff' }}
      />
      {/* Ring 1 */}
      <div
        className="absolute w-8 h-8 rounded-full"
        style={{
          border: '1px solid rgba(0,217,255,0.6)',
          animation: 'atomOrbit1 2.5s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-0.5"
          style={{ background: '#a855f7', boxShadow: '0 0 5px #a855f7' }}
        />
      </div>
      {/* Ring 2 */}
      <div
        className="absolute w-8 h-8 rounded-full"
        style={{
          border: '1px solid rgba(0,217,255,0.5)',
          animation: 'atomOrbit2 3.5s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-0.5"
          style={{ background: '#00d9ff', boxShadow: '0 0 5px #00d9ff' }}
        />
      </div>
      {/* Ring 3 */}
      <div
        className="absolute w-8 h-8 rounded-full"
        style={{
          border: '1px solid rgba(148,66,254,0.5)',
          animation: 'atomOrbit3 4.5s linear infinite',
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-0.5"
          style={{ background: '#f472b6', boxShadow: '0 0 5px #f472b6' }}
        />
      </div>
      <style>{`
        @keyframes atomOrbit1 {
          from { transform: rotateZ(0deg) rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateZ(360deg) rotateX(70deg) rotateZ(-360deg); }
        }
        @keyframes atomOrbit2 {
          from { transform: rotateZ(60deg) rotateX(70deg) rotateZ(-60deg); }
          to   { transform: rotateZ(420deg) rotateX(70deg) rotateZ(-420deg); }
        }
        @keyframes atomOrbit3 {
          from { transform: rotateZ(120deg) rotateX(70deg) rotateZ(-120deg); }
          to   { transform: rotateZ(480deg) rotateX(70deg) rotateZ(-480deg); }
        }
      `}</style>
    </div>
  )
}

export default function Navbar({ darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-5"
    >
      <motion.nav
        animate={{
          background: scrolled
            ? 'rgba(2, 6, 23, 0.22)'
            : 'rgba(2, 6, 23, 0.06)',
          borderColor: scrolled
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(255, 255, 255, 0.05)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)'
            : 'none',
        }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl rounded-2xl px-5 py-3 flex items-center justify-between"
        style={{
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5">
          <AtomLogo />
          <motion.span
            className="font-bold text-base tracking-[0.2em] text-white/90"
            whileHover={{
              background: 'linear-gradient(90deg,#00d9ff,#9442fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            transition={{ duration: 0.25 }}
          >
            SHAHAB
          </motion.span>
        </Link>

        {/* ── Desktop links ── */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = location.pathname === link.path
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <motion.div
                    className="relative px-4 py-1.5 rounded-xl text-sm font-medium cursor-pointer select-none"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {/* Hover background */}
                    <AnimatePresence>
                      {hoveredLink === link.path && !active && (
                        <motion.span
                          layoutId="nav-hover"
                          className="absolute inset-0 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            background: 'rgba(0,217,255,0.07)',
                            border: '1px solid rgba(0,217,255,0.12)',
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active indicator */}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-xl"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        style={{
                          background: 'linear-gradient(135deg,rgba(0,217,255,0.15),rgba(148,66,254,0.15))',
                          border: '1px solid rgba(0,217,255,0.25)',
                        }}
                      />
                    )}

                    {/* Link text */}
                    <motion.span
                      className="relative z-10"
                      animate={{
                        color: active
                          ? '#00d9ff'
                          : hoveredLink === link.path
                          ? 'rgba(255,255,255,0.9)'
                          : 'rgba(255,255,255,0.5)',
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {link.label}
                    </motion.span>

                    {/* Active bottom dot */}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: '#00d9ff', boxShadow: '0 0 4px #00d9ff' }}
                      />
                    )}
                  </motion.div>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <motion.button
            onClick={() => setDarkMode(!darkMode)}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.88 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-cyan-400 transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={darkMode ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-xl text-white/40 hover:text-white transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            onClick={() => setMenuOpen(!menuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={menuOpen ? 'x' : 'menu'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-[72px] left-4 right-4 rounded-2xl p-3 md:hidden"
            style={{
              background: 'rgba(2,6,23,0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            }}
          >
            {navLinks.map((link, i) => {
              const active = location.pathname === link.path
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link to={link.path}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
                      style={
                        active
                          ? {
                              background: 'linear-gradient(135deg,rgba(0,217,255,0.1),rgba(148,66,254,0.1))',
                              border: '1px solid rgba(0,217,255,0.2)',
                              color: '#00d9ff',
                            }
                          : {
                              color: 'rgba(255,255,255,0.5)',
                              border: '1px solid transparent',
                            }
                      }
                    >
                      {active && (
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: '#00d9ff', boxShadow: '0 0 5px #00d9ff' }}
                        />
                      )}
                      {link.label}
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
