import * as THREE from 'three';

const HAND_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8], // Index
    [0, 9], [9, 10], [10, 11], [11, 12], // Middle
    [0, 13], [13, 14], [14, 15], [15, 16], // Ring
    [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
    [5, 9], [9, 13], [13, 17] // Palm
];

export class HandVisualizer {
    constructor(camera) {
        this.camera = camera;
        this.handGroup = new THREE.Group();
        this.handPoints = [];
        this.handLines = [];

        // Attach to camera so it stays fixed in view
        this.camera.add(this.handGroup);

        this._initMesh();
    }

    _initMesh() {
        // Pool points
        const sphereGeo = new THREE.SphereGeometry(0.015, 8, 8);
        const sphereMat = new THREE.MeshBasicMaterial({ color: 0xff0000, depthTest: false, transparent: true });

        for (let i = 0; i < 21; i++) {
            const p = new THREE.Mesh(sphereGeo, sphereMat);
            p.visible = false;
            p.renderOrder = 999;
            this.handGroup.add(p);
            this.handPoints.push(p);
        }

        // Pool lines
        const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff00, depthTest: false, transparent: true });
        for (let i = 0; i < HAND_CONNECTIONS.length; i++) {
            const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]), lineMat);
            line.visible = false;
            line.renderOrder = 999;
            this.handGroup.add(line);
            this.handLines.push(line);
        }
    }

    update(landmarks, mode) {
        // Project to Camera Space
        const handDepth = 2; // Fixed depth
        const vFOV = THREE.MathUtils.degToRad(this.camera.fov);
        const planeHeight = 2 * Math.tan(vFOV / 2) * handDepth;
        const planeWidth = planeHeight * this.camera.aspect;

        const pointsLocal = landmarks.map(lm => {
            const x = (0.5 - lm.x) * planeWidth;
            const y = (0.5 - lm.y) * planeHeight;
            const z = -handDepth;
            return new THREE.Vector3(x, y, z);
        });

        // Update Viz Positions
        pointsLocal.forEach((p, i) => {
            this.handPoints[i].position.copy(p);
            this.handPoints[i].visible = true;
        });

        // Update Lines
        HAND_CONNECTIONS.forEach((pair, i) => {
            this.handLines[i].geometry.setFromPoints([pointsLocal[pair[0]], pointsLocal[pair[1]]]);
            this.handLines[i].visible = true;
        });

        // Update Colors based on Mode
        this._updateColors(mode);
    }

    _updateColors(mode) {
        // Reset defaults
        const defaultColor = 0xff0000;
        this.handPoints.forEach(p => p.material.color.setHex(defaultColor));

        if (mode === 'ROTATING') {
            this.handPoints[4].material.color.setHex(0xffff00);
            this.handPoints[8].material.color.setHex(0xffff00);
        } else if (mode === 'PANNING') {
            this.handPoints[4].material.color.setHex(0x00ffff);
            this.handPoints[12].material.color.setHex(0x00ffff);
        } else if (mode === 'SCALING') {
            this.handPoints[4].material.color.setHex(0xff00ff);
            this.handPoints[20].material.color.setHex(0xff00ff);
        }
    }

    hide() {
        this.handPoints.forEach(p => p.visible = false);
        this.handLines.forEach(l => l.visible = false);
    }
}
