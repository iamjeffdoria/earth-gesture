import { useEffect, useRef } from 'react'
import { interpretGesture } from './GestureEngine'
import { useGestureStore } from '../store/gestureStore'

export default function HandTracker() {
  const videoRef = useRef()
  const setGesture = useGestureStore((s) => s.setGesture)

  useEffect(() => {
    const hands = new window.Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    })

    hands.onResults((results) => {
      const gesture = interpretGesture(results.multiHandLandmarks)
      setGesture(gesture)
    })

    const camera = new window.Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current })
      },
      width: 640,
      height: 480,
    })

    camera.start()

    return () => camera.stop()
  }, [])

  return (
    <video
      ref={videoRef}
      style={{ display: 'none' }}
      playsInline
    />
  )
}