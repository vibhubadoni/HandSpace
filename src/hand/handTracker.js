export function initHandTracker(videoElement, onResultsCallback) {
    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });

    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    hands.onResults(onResultsCallback);

    const cameraUtils = new Camera(videoElement, {
        onFrame: async () => await hands.send({ image: videoElement }),
        width: 640, height: 480
    });

    cameraUtils.start();
}
