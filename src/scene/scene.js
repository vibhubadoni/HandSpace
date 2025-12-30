import * as THREE from 'three';

export function initScene(canvasElement) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x424141);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Handle Resize
    window.addEventListener('resize', () => {
        // Camera aspect update is handled in camera module or main loop usually, 
        // but renderer size needs update here or exposed.
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    return { scene, renderer };
}
