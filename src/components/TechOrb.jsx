import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

/* Central torus knot — the "core" */
function TorusKnot() {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.elapsedTime * 0.22
    ref.current.rotation.y = clock.elapsedTime * 0.38
  })
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.1, 0.32, 220, 24, 2, 3]} />
      <meshStandardMaterial
        color="#00d9ff"
        wireframe
        emissive="#00d9ff"
        emissiveIntensity={0.6}
      />
    </mesh>
  )
}

/* Thin orbital ring */
function Ring({ radius, speed, tiltX, tiltZ, color, opacity }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.elapsedTime * speed
  })
  return (
    <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, 0.012, 16, 140]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  )
}

/* Outer particle shell */
function Particles({ count = 700 }) {
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const cyan   = [0.0, 0.85, 1.0]
    const purple = [0.58, 0.26, 1.0]

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 3.2 + Math.random() * 1.6
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = Math.random() > 0.5 ? cyan : purple
      col[i * 3]     = c[0]
      col[i * 3 + 1] = c[1]
      col[i * 3 + 2] = c[2]
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    ref.current.rotation.y =  clock.elapsedTime * 0.07
    ref.current.rotation.x =  clock.elapsedTime * 0.025
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color"    count={count} array={colors}    itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}

/* Pulsing inner glow sphere */
function GlowCore() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.elapsedTime * 1.8) * 0.07
    ref.current.scale.setScalar(s)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.55, 32, 32]} />
      <meshBasicMaterial color="#9442fe" transparent opacity={0.18} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]}   intensity={3}   color="#00d9ff" />
      <pointLight position={[-5, -5, -3]} intensity={1.5} color="#9442fe" />

      <GlowCore />
      <TorusKnot />

      <Ring radius={2.4} speed={ 0.5}  tiltX={Math.PI / 5}    tiltZ={0}              color="#00d9ff" opacity={0.7} />
      <Ring radius={2.9} speed={-0.35} tiltX={-Math.PI / 3.2} tiltZ={Math.PI / 8}   color="#9442fe" opacity={0.5} />
      <Ring radius={2.1} speed={ 0.7}  tiltX={Math.PI / 2.1}  tiltZ={-Math.PI / 6}  color="#00d9ff" opacity={0.55} />

      <Particles />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.9} />
    </>
  )
}

export default function TechOrb({ size = 420 }) {
  return (
    <div style={{ width: size, height: size, maxWidth: '90vw', flexShrink: 0 }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 55 }} style={{ background: 'transparent' }}>
        <Scene />
      </Canvas>
    </div>
  )
}
