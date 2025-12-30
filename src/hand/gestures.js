export const PINCH_THRESHOLD = 0.05;

// Pure function to calculate distance
function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

export function detectGesture(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const pinkyTip = landmarks[20];

    const distIndex = getDistance(thumbTip, indexTip);
    const distMiddle = getDistance(thumbTip, middleTip);
    const distPinky = getDistance(thumbTip, pinkyTip);

    if (distIndex < PINCH_THRESHOLD) {
        return 'ROTATING';
    } else if (distMiddle < PINCH_THRESHOLD) {
        return 'PANNING';
    } else if (distPinky < PINCH_THRESHOLD) {
        return 'SCALING';
    }

    return 'IDLE';
}
