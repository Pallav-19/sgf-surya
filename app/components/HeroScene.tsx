'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingShape({
  geometry,
  position,
  color,
  speed = 1,
  distort = 0.3,
  scale = 1,
  wireframe = false,
}: {
  geometry: 'torus' | 'icosahedron' | 'octahedron' | 'torusKnot' | 'sphere' | 'dodecahedron'
  position: [number, number, number]
  color: string
  speed?: number
  distort?: number
  scale?: number
  wireframe?: boolean
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
  })

  const renderGeometry = () => {
    switch (geometry) {
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 64]} />
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 1]} />
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'torusKnot':
        return <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
      case 'sphere':
        return <sphereGeometry args={[1, 64, 64]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
    }
  }

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {renderGeometry()}
        {wireframe ? (
          <meshStandardMaterial color={color} wireframe transparent opacity={0.2} />
        ) : (
          <MeshDistortMaterial
            color={color}
            roughness={0.15}
            metalness={0.8}
            distort={distort}
            speed={2}
            transparent
            opacity={0.75}
          />
        )}
      </mesh>
    </Float>
  )
}

function Particles() {
  const count = 60
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return pos
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.008
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#10B981" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />
      <directionalLight position={[-3, -3, 2]} intensity={0.3} color="#10B981" />
      <pointLight position={[0, 0, 4]} intensity={0.4} color="#34D399" />

      <FloatingShape
        geometry="torusKnot"
        position={[-4.5, 1.5, -2]}
        color="#10B981"
        speed={0.7}
        scale={0.65}
        distort={0.2}
      />
      <FloatingShape
        geometry="icosahedron"
        position={[4.5, -1.2, -3]}
        color="#059669"
        speed={1.1}
        scale={0.85}
        distort={0.15}
      />
      <FloatingShape
        geometry="octahedron"
        position={[-2.5, -2.8, -1]}
        color="#34D399"
        speed={0.5}
        scale={0.55}
        wireframe
      />
      <FloatingShape
        geometry="torus"
        position={[3, 2.8, -4]}
        color="#10B981"
        speed={0.9}
        scale={0.5}
        distort={0.25}
      />
      <FloatingShape
        geometry="dodecahedron"
        position={[0.5, 3.5, -5]}
        color="#14B8A6"
        speed={0.6}
        scale={0.4}
        wireframe
      />
      <FloatingShape
        geometry="sphere"
        position={[-5.5, -0.5, -4]}
        color="#7DA899"
        speed={0.4}
        scale={0.3}
        distort={0.4}
      />
      <FloatingShape
        geometry="icosahedron"
        position={[6, 0.5, -2.5]}
        color="#34D399"
        speed={0.8}
        scale={0.35}
        wireframe
      />
      <FloatingShape
        geometry="torusKnot"
        position={[1.5, -3.5, -6]}
        color="#059669"
        speed={0.3}
        scale={0.45}
        distort={0.1}
      />

      <Particles />
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  )
}
