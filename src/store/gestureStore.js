import { create } from 'zustand'

export const useGestureStore = create((set) => ({
  rotateX: 0,
  rotateY: 0,
  zoom: 0,
  explode: false,        // add this
  setGesture: (data) => set(data),
}))

export const useExplode = () => useGestureStore((s) => s.explode)  // add this

export const useRotateX = () => useGestureStore((s) => s.rotateX)
export const useRotateY = () => useGestureStore((s) => s.rotateY)
export const useZoom = () => useGestureStore((s) => s.zoom)