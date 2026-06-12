import { useRef } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRotateX, useRotateY, useZoom, useExplode } from '../store/gestureStore'

export default function Globe() {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, '/textures/earth.jpg')
  const rotateX = useRotateX()
  const rotateY = useRotateY()
  const zoom = useZoom()
  const explode = useExplode()
  const explodeProgress = useRef(0) 
  const { camera } = useThree()

  const prevWristX = useRef(null)
  const targetZ = useRef(5)

  useFrame(() => {
    if (!meshRef.current) return

    if (prevWristX.current !== null) {
      const delta = rotateY - prevWristX.current
      meshRef.current.rotation.y += delta * 3
    }
    prevWristX.current = rotateY

    if (zoom !== 0) targetZ.current -= zoom * 0.4
    targetZ.current = Math.max(3, Math.min(10, targetZ.current))
    camera.position.z += (targetZ.current - camera.position.z) * 0.1

    // Explode: scale up and fade out, then reset
    if (explode) {
      explodeProgress.current = Math.min(explodeProgress.current + 0.04, 1)
    } else {
      explodeProgress.current = Math.max(explodeProgress.current - 0.03, 0)
    }
    const s = 1 + explodeProgress.current * 2.5   // grows to 3.5x
    meshRef.current.scale.set(s, s, s)
    meshRef.current.material.opacity = 1 - explodeProgress.current * 0.85
    meshRef.current.material.transparent = true
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}