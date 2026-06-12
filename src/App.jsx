import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import Globe from './components/Globe'
import HandTracker from './components/HandTracker'
import GestureHUD from './components/GestureHUD'

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} />
        <Globe />
      </Canvas>
      <HandTracker />
      <GestureHUD />
    </div>
  )
}