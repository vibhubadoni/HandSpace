import * as THREE from 'three';

export function initPlane(scene) {
    const floorGroup = new THREE.Group();
    scene.add(floorGroup);

    // 1. Solid Plane for contrast
    const planeGeometry = new THREE.PlaneGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222, // Dark floor
        roughness: 0.8,
        metalness: 0.2,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Flat on ground
    plane.position.y = -0.01; // Slightly below
    plane.receiveShadow = true;
    floorGroup.add(plane);

    // 2. Grid Helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
    floorGroup.add(gridHelper);
}
