import { useState, useEffect } from 'react'

export default function Typewriter({ words = [], speed = 80, deleteSpeed = 50, pause = 1800 }) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const current = words[wordIdx % words.length]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause)
        }
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length - 1 === 0) {
          setIsDeleting(false)
          setWordIdx((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? deleteSpeed : speed)

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIdx, words, speed, deleteSpeed, pause])

  return (
    <span className="typewriter-cursor font-mono" style={{ color: '#00d9ff' }}>
      {text}
    </span>
  )
}
