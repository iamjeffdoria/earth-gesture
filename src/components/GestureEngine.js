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

  // PIP joints (middle knuckles)
  const indexPIP  = hand[6]
  const middlePIP = hand[10]
  const ringPIP   = hand[14]
  const pinkyPIP  = hand[18]

  // Curled = tip is below its own PIP joint (pinch keeps index tip UP toward thumb)
  const indexCurled  = indexTip.y  > indexPIP.y  + 0.02
  const middleCurled = middleTip.y > middlePIP.y + 0.02
  const ringCurled   = ringTip.y   > ringPIP.y   + 0.02
  const pinkyCurled  = pinkyTip.y  > pinkyPIP.y  + 0.02

  const notPinching = pinchDist > 0.08

  const explode = indexCurled && middleCurled && ringCurled && pinkyCurled && notPinching

  return { rotateX, rotateY, zoom, explode }
}