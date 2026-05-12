import { useEffect, useRef } from 'react'

export default function ParticleCanvas({ dotColor = '#00d9ff', lineColor = '#00d9ff' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animId
    let particles = []
    let mouseX = canvas.offsetWidth / 2
    let mouseY = canvas.offsetHeight / 2

    const options = {
      minSpeedX: 0.1,
      maxSpeedX: 0.55,
      minSpeedY: 0.1,
      maxSpeedY: 0.55,
      density: 10000,        // one particle per N pixels of canvas area
      particleRadius: 5,
      lineWidth: 0.8,
      proximity: 110,        // px — particles closer than this get connected
      parallax: true,
      parallaxMultiplier: 5, // lower = more dramatic parallax
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min
    }

    function randSign() {
      return Math.random() < 0.5 ? 1 : -1
    }

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      mouseX = canvas.width / 2
      mouseY = canvas.height / 2
      init()
    }

    function init() {
      particles = []
      const count = Math.round((canvas.width * canvas.height) / options.density)
      for (let i = 0; i < count; i++) {
        const layer = Math.ceil(Math.random() * 4) // depth layer 1–4
        particles.push({
          x: rand(0, canvas.width),
          y: rand(0, canvas.height),
          vx: randSign() * rand(options.minSpeedX, options.maxSpeedX),
          vy: randSign() * rand(options.minSpeedY, options.maxSpeedY),
          r: options.particleRadius / 2,
          layer,
          parallaxOffsetX: 0,
          parallaxOffsetY: 0,
          parallaxTargX: 0,
          parallaxTargY: 0,
        })
      }
    }

    function updateParticle(p) {
      // Eased parallax offset — exactly like particleground
      if (options.parallax) {
        p.parallaxTargX = (mouseX - canvas.width / 2) / (options.parallaxMultiplier * p.layer)
        p.parallaxOffsetX += (p.parallaxTargX - p.parallaxOffsetX) / 10

        p.parallaxTargY = (mouseY - canvas.height / 2) / (options.parallaxMultiplier * p.layer)
        p.parallaxOffsetY += (p.parallaxTargY - p.parallaxOffsetY) / 10
      }

      // Move
      p.x += p.vx
      p.y += p.vy

      // Bounce off edges
      if (p.x < 0) { p.x = 0; p.vx *= -1 }
      if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1 }
      if (p.y < 0) { p.y = 0; p.vy *= -1 }
      if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1 }
    }

    function drawParticle(p) {
      const px = p.x + p.parallaxOffsetX
      const py = p.y + p.parallaxOffsetY

      ctx.beginPath()
      ctx.arc(px, py, p.r, 0, Math.PI * 2)
      ctx.fillStyle = dotColor
      ctx.shadowBlur = 6
      ctx.shadowColor = dotColor
      ctx.fill()
      ctx.shadowBlur = 0
    }

    function drawConnections(p, stackPos) {
      const px = p.x + p.parallaxOffsetX
      const py = p.y + p.parallaxOffsetY

      ctx.beginPath()
      // Only connect to particles higher in the stack (avoids duplicate lines)
      for (let i = particles.length - 1; i > stackPos; i--) {
        const q = particles[i]
        const qx = q.x + q.parallaxOffsetX
        const qy = q.y + q.parallaxOffsetY

        const dx = px - qx
        const dy = py - qy
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < options.proximity) {
          const alpha = (1 - dist / options.proximity) * 0.55
          ctx.moveTo(px, py)
          ctx.lineTo(qx, qy)
          ctx.strokeStyle = `rgba(0,217,255,${alpha})`
          ctx.lineWidth = options.lineWidth
          ctx.stroke()
          ctx.beginPath()
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i])
      }
      for (let i = 0; i < particles.length; i++) {
        drawParticle(particles[i])
        drawConnections(particles[i], i)
      }

      animId = requestAnimationFrame(tick)
    }

    // Mouse tracking — use pageX/pageY like the original
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', resize)

    resize()
    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [dotColor, lineColor])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // mouse tracking via window listener, not canvas
        zIndex: 0,
      }}
    />
  )
}
