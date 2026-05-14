import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GalaxyParticles({ count = 5000, arms = 3 }) {
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const white  = new THREE.Color('#ffffff')
    const cyan   = new THREE.Color('#00d9ff')
    const purple = new THREE.Color('#9442fe')

    for (let i = 0; i < count; i++) {
      const armIndex  = i % arms
      const armAngle  = (armIndex / arms) * Math.PI * 2
      const radius    = Math.pow(Math.random(), 0.6) * 3.8
      const spin      = radius * 2.2
      const angle     = armAngle + spin

      // gaussian-like scatter around each arm
      const scatter = Math.pow(Math.random(), 3) * 0.5
      const sX = (Math.random() - 0.5) * scatter
      const sY = (Math.random() - 0.5) * scatter * 0.4
      const sZ = (Math.random() - 0.5) * scatter

      pos[i * 3]     = Math.cos(angle) * radius + sX
      pos[i * 3 + 1] = sY
      pos[i * 3 + 2] = Math.sin(angle) * radius + sZ

      // color: white center → cyan mid → purple outer
      const t = radius / 3.8
      const c = new THREE.Color()
      if (t < 0.4) {
        c.lerpColors(white, cyan, t / 0.4)
      } else {
        c.lerpColors(cyan, purple, (t - 0.4) / 0.6)
      }

      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return [pos, col]
  }, [count, arms])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.07
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.95}
      />
    </points>
  )
}

/* Bright glowing core at center */
function Core() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.5) * 0.12
    ref.current.scale.setScalar(pulse)
    ref.current.material.opacity = 0.55 + Math.sin(clock.elapsedTime * 2.5) * 0.15
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </mesh>
  )
}

/* Soft wide glow behind core */
function CoreGlow() {
  return (
    <mesh>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshBasicMaterial color="#00d9ff" transparent opacity={0.07} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <GalaxyParticles />
      <Core />
      <CoreGlow />
    </>
  )
}

export default function Galaxy({ size = 420 }) {
  return (
    <div style={{ width: size, height: size, maxWidth: '90vw', flexShrink: 0 }}>
      <Canvas
        camera={{ position: [0, 3.5, 5.5], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
