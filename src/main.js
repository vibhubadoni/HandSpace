import * as THREE from 'three';
import { initScene } from './scene/scene.js';
import { initCamera } from './scene/camera.js';
import { initLights } from './scene/lighting.js';
import { initPlane } from './scene/plane.js';
import { ModelManager, MODELS } from './models/modelLoader.js';
import { initHandTracker } from './hand/handTracker.js';
import { detectGesture } from './hand/gestures.js';
import { HandVisualizer } from './hand/landmarks.js';
import { InteractionState } from './interaction/stateMachine.js';
import { applyInteraction } from './interaction/mapper.js';
import { updateStatus } from './ui/overlay.js';
import { initControls } from './ui/controls.js';

// --- CONFIGURATION ---
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];

// --- APP STATE ---
let scene, renderer, camera, controls;
let modelManager, handVisualizer, interactionState;

function init() {
    // 1. Scene Setup
    ({ scene, renderer } = initScene(canvasElement));
    ({ camera, controls } = initCamera(renderer));

    // Add camera to scene for hand viz attachment
    scene.add(camera);

    initLights(scene);
    initPlane(scene);

    // 2. Managers
    modelManager = new ModelManager(scene);
    handVisualizer = new HandVisualizer(camera);
    interactionState = new InteractionState();

    // 3. UI
    initControls(modelManager, controls);

    // 4. Load Default
    modelManager.load(MODELS[0].file);

    // 5. Hand Tracking
    initHandTracker(videoElement, onHandResults);

    // 6. Start Loop
    animate();
}

function onHandResults(results) {
    handVisualizer.hide();

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];

        // 1. Detect Gesture
        const gestureMode = detectGesture(landmarks);

        // 2. Update State & UI
        const wrist = landmarks[0];
        const currentHandPos = new THREE.Vector3(wrist.x, wrist.y, 0);

        const { changed, mode } = interactionState.update(gestureMode, currentHandPos);
        if (changed) {
            updateStatus(`State: ${mode}`);
        }

        // 3. Apply Interaction
        applyInteraction(interactionState, currentHandPos, modelManager, controls);

        // 4. Update Visuals
        handVisualizer.update(landmarks, mode);
    }
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Start
window.onload = init;
