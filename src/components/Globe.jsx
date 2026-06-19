import { useRef } from 'react'
import { useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRotateX, useRotateY, useZoom } from '../store/gestureStore'

export default function Globe() {
  const meshRef = useRef()
  const texture = useLoader(TextureLoader, '/textures/earth.jpg')
  const rotateX = useRotateX()
  const rotateY = useRotateY()
  const zoom = useZoom()
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
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}