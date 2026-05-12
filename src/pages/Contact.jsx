import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa'
import ParticleCanvas from '../components/ParticleCanvas'
import { personalInfo } from '../data/portfolio'

const EMAILJS_SERVICE_ID  = 'service_yy2gp1i'
const EMAILJS_TEMPLATE_ID = 'template_6jmnaov'
const EMAILJS_PUBLIC_KEY  = '7OkDpEJfoISNlM9QB'

emailjs.init(EMAILJS_PUBLIC_KEY)

function ContactCard({ icon, label, value, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: '0 0 20px rgba(0,217,255,0.15)' }}
      className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 transition-all cursor-pointer"
      style={{ background: 'rgba(8,13,31,0.7)', backdropFilter: 'blur(8px)' }}
    >
      <span className="text-cyan-400 mt-0.5 flex-shrink-0" style={{ fontSize: '1.4rem' }}>
        {icon}
      </span>
      <div>
        <p className="text-white font-semibold text-base mb-0.5">{label}</p>
        <p className="text-gray-400 text-sm">{value}</p>
      </div>
    </motion.a>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'success' | 'error'
  const [focused, setFocused] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY
      )
      console.log('EmailJS success:', result)
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const inputClass = (field) =>
    `w-full bg-transparent border rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-200 placeholder-gray-600 ${
      focused === field
        ? 'border-cyan-400 shadow-[0_0_12px_rgba(0,217,255,0.2)]'
        : 'border-white/10 hover:border-white/20'
    }`

  const buttonLabel = {
    idle: 'Send Message →',
    sending: 'Sending...',
    success: '✓ Message Sent!',
    error: '✗ Failed — Try Again',
  }

  const buttonStyle = {
    idle: { background: 'linear-gradient(135deg, #9442fe, #00d9ff)' },
    sending: { background: 'rgba(148,66,254,0.4)' },
    success: { background: 'linear-gradient(135deg, #22c55e, #16a34a)' },
    error: { background: 'linear-gradient(135deg, #ef4444, #b91c1c)' },
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#020617' }}>
      <ParticleCanvas dotColor="#00d9ff" lineColor="#00d9ff" />

      <div className="relative z-10 pt-28 pb-16 px-4 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-cyan-400 text-sm font-mono mb-2 tracking-widest">../contact</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-4xl">✉️</span>
            <h1 className="text-4xl md:text-5xl font-extrabold gradient-text">Get In Touch</h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Looking for a hardworking, authentic developer always up for a challenge?
            Let&apos;s connect — fill the form and I&apos;ll get back to you directly.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <ContactCard
            icon={<FaEnvelope />}
            label="Email"
            value={personalInfo.email}
            href={`mailto:${personalInfo.email}`}
          />
          <ContactCard
            icon={<FaLinkedin />}
            label="LinkedIn"
            value="shahab-alam01"
            href={personalInfo.linkedin}
          />
          <ContactCard
            icon={<FaGithub />}
            label="GitHub"
            value="shahab-011"
            href={personalInfo.github}
          />
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 p-6 md:p-10"
          style={{ background: 'rgba(8,13,31,0.7)', backdropFilter: 'blur(8px)' }}
        >
          <h3 className="text-white font-bold text-xl mb-2">Send a Message</h3>
          <p className="text-gray-500 text-sm mb-8">
            I reply within 24 hours — straight to my inbox.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-400 text-xs mb-1.5 font-medium">Your Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  placeholder="Shahab Alam"
                  required
                  className={inputClass('name')}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-1.5 font-medium">Your Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  placeholder="you@example.com"
                  required
                  className={inputClass('email')}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-xs mb-1.5 font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                placeholder="Tell me about your project or opportunity..."
                required
                rows={5}
                className={inputClass('message')}
                style={{ resize: 'vertical', minHeight: '130px' }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 0 24px rgba(0,217,255,0.3)' } : {}}
              whileTap={status === 'idle' ? { scale: 0.97 } : {}}
              animate={buttonStyle[status]}
              transition={{ duration: 0.3 }}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all border border-white/10"
              style={{ cursor: status === 'sending' ? 'not-allowed' : 'pointer' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {buttonLabel[status]}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
