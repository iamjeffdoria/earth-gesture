import { useRotateY, useZoom } from '../store/gestureStore'

export default function GestureHUD() {
  const rotateY = useRotateY()
  const zoom = useZoom()

  return (
    <div style={{
      position: 'absolute',
      bottom: 20,
      left: 20,
      color: 'white',
      fontFamily: 'monospace',
      fontSize: 14,
      background: 'rgba(0,0,0,0.5)',
      padding: '10px 16px',
      borderRadius: 8,
    }}>
      <p>✋ Move hand → Rotate</p>
      <p>🤏 Pinch → Zoom</p>
      <p style={{ marginTop: 8, color: '#aaa' }}>Rotate Y: {rotateY.toFixed(2)}</p>
      <p style={{ color: '#aaa' }}>Zoom: {zoom}</p>
    </div>
  )
}