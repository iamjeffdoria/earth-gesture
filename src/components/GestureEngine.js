export function interpretGesture(landmarks) {
  if (!landmarks || landmarks.length === 0) {
    return { rotateX: 0, rotateY: 0, zoom: 0 }
  }

  const hand = landmarks[0]
  const wrist = hand[0]

  const rotateY = (wrist.x - 0.5) * 4
  const rotateX = 0

  const thumbTip = hand[4]
  const indexTip = hand[8]
  const middleTip = hand[12]
  const ringTip = hand[16]
  const pinkyTip = hand[20]

  const pinchDist = Math.hypot(
    thumbTip.x - indexTip.x,
    thumbTip.y - indexTip.y
  )

  const fingersSpreading = [indexTip, middleTip, ringTip, pinkyTip].every(
    (tip) => Math.hypot(tip.x - wrist.x, tip.y - wrist.y) > 0.3
  )

  const zoom = fingersSpreading ? 0 : pinchDist < 0.05 ? 1 : pinchDist > 0.2 ? -1 : 0

    return { rotateX, rotateY, zoom }
  }