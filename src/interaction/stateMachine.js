import * as THREE from 'three';

export class InteractionState {
    constructor() {
        this.mode = 'IDLE'; // IDLE, ROTATING, PANNING, SCALING
        this.lastHandPos = new THREE.Vector3();
    }

    update(gestureMode, currentHandPos) {
        let newMode = gestureMode; // Direct mapping usually fine for this simple logic
        let changed = false;

        if (this.mode !== newMode) {
            this.mode = newMode;
            changed = true;
            this.lastHandPos.copy(currentHandPos);
        }

        return { changed, mode: this.mode };
    }

    getDelta(currentHandPos) {
        const deltaX = (currentHandPos.x - this.lastHandPos.x) * 10;
        const deltaY = (this.lastHandPos.y - currentHandPos.y) * 10;

        this.lastHandPos.copy(currentHandPos);

        return { deltaX, deltaY };
    }
}
