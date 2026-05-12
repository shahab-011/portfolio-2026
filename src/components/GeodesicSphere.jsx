import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Sphere() {
  const meshRef = useRef()
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.18
      meshRef.current.rotation.x += delta * 0.06
    }
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.0, 2]} />
      <meshBasicMaterial color="#c8b97a" wireframe transparent opacity={0.55} />
    </mesh>
  )
}

export default function GeodesicSphere({ size = 420 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        maxWidth: '90vw',
        flexShrink: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Sphere />
      </Canvas>
    </div>
  )
}
