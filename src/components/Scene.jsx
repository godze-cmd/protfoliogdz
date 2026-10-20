import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const isMobile = () => window.innerWidth < 768
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Shared input state (window listeners; canvas has pointer-events:none)
const input = { x: 0, y: 0, scroll: 0 }
if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    input.x = (e.clientX / window.innerWidth) * 2 - 1
    input.y = -((e.clientY / window.innerHeight) * 2 - 1)
  }, { passive: true })
  window.addEventListener('scroll', () => {
    input.scroll = Math.min(window.scrollY / (window.innerHeight * 3), 1)
  }, { passive: true })
}

function Sculpture({ mobile, still }) {
  const group = useRef()
  const core = useRef()
  const ringA = useRef()
  const ringB = useRef()
  const seg = mobile ? 1 : 3

  useFrame((state, dt) => {
    const k = still ? 0 : 1
    const t = state.clock.elapsedTime * k
    const g = group.current
    // ease toward pointer, shift composition with scroll
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, input.x * 0.5 * k + input.scroll * 2, 3, dt)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -input.y * 0.3 * k, 3, dt)
    g.position.x = THREE.MathUtils.damp(g.position.x, (mobile ? 0 : 1.9) - input.scroll * 2.5, 2.5, dt)
    g.position.y = THREE.MathUtils.damp(g.position.y, input.scroll * 1.2, 2.5, dt)
    core.current.rotation.x = t * 0.25
    core.current.rotation.y = t * 0.35
    ringA.current.rotation.z = t * 0.3
    ringB.current.rotation.x = t * 0.22
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 7 + input.scroll * 2, 2, dt)
  })

  return (
    <group ref={group} scale={mobile ? 0.8 : 1}>
      <Float speed={still ? 0 : 1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.35, seg]} />
          <meshPhysicalMaterial color="#8b8cf5" metalness={1} roughness={0.12} clearcoat={1} flatShading envMapIntensity={1.4} />
        </mesh>
        <mesh ref={ringA} rotation={[1.2, 0, 0]}>
          <torusGeometry args={[2.1, 0.05, 16, mobile ? 64 : 160]} />
          <meshStandardMaterial color="#c9ccff" metalness={1} roughness={0.2} />
        </mesh>
        <mesh ref={ringB} rotation={[0.3, 0.8, 0]}>
          <torusGeometry args={[2.6, 0.03, 16, mobile ? 64 : 160]} />
          <meshStandardMaterial color="#6d5bf0" metalness={1} roughness={0.25} emissive="#3a2fa0" emissiveIntensity={0.4} />
        </mesh>
      </Float>
      <Float speed={still ? 0 : 2} floatIntensity={1.5}>
        <mesh position={[-2.6, 1.6, -1]}>
          <sphereGeometry args={[0.28, 32, 32]} />
          <meshPhysicalMaterial color="#3b82f6" metalness={0.9} roughness={0.15} clearcoat={1} />
        </mesh>
        <mesh position={[2.9, -1.7, -1.5]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial color="#a78bfa" metalness={0.9} roughness={0.2} />
        </mesh>
      </Float>
    </group>
  )
}

export default function Scene() {
  const mobile = useMemo(isMobile, [])
  const still = useMemo(reduced, [])
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: !mobile, powerPreference: 'high-performance', alpha: true }}
      frameloop={still ? 'demand' : 'always'}
    >
      <fog attach="fog" args={['#0b0d1a', 8, 18]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 5, 3]} intensity={1.6} color="#b8b4ff" />
      <pointLight position={[-5, -2, 2]} intensity={25} color="#3b82f6" />
      <Environment resolution={mobile ? 64 : 256}>
        {/* Procedural lights: no network request needed */}
        <Lightformer form="rect" intensity={4} position={[0, 5, -6]} scale={[12, 4, 1]} color="#8b8cff" />
        <Lightformer form="ring" intensity={3} position={[-5, 1, -2]} scale={4} color="#3b82f6" />
        <Lightformer form="rect" intensity={2} position={[6, -2, 1]} scale={[3, 6, 1]} color="#c4b5fd" />
      </Environment>
      <Sculpture mobile={mobile} still={still} />
      {!still && <Sparkles count={mobile ? 25 : 70} scale={[14, 8, 6]} size={2} speed={0.3} opacity={0.6} color="#b9b8ff" />}
    </Canvas>
  )
}
