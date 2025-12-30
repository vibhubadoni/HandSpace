import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { updateStatus } from '../ui/overlay.js';

export const MODELS = [
    { name: 'Default Model', file: 'model.glb' },
    { name: 'Human Skeleton', file: 'free_pack_-_human_skeleton.glb' },
    { name: 'Jet Engine', file: 'jet_engine.glb' },
    { name: 'Beating Heart', file: 'beating-heart.glb' }
];

export class ModelManager {
    constructor(scene) {
        this.scene = scene;
        this.targetModel = null;
        this.initialScale = 1;
    }

    reset() {
        if (this.targetModel) {
            this.targetModel.rotation.set(0, 0, 0);
            this.targetModel.position.set(0, 0, 0);
            this.targetModel.scale.setScalar(this.initialScale);
        }
    }

    scale(factor) {
        if (this.targetModel) {
            this.targetModel.scale.multiplyScalar(factor);
        }
    }

    getTarget() {
        return this.targetModel;
    }

    getAvailableModels() {
        return MODELS;
    }

    load(filename) {
        // Cleanup previous
        if (this.targetModel) {
            this.scene.remove(this.targetModel);

            this.targetModel.traverse((child) => {
                if (child.isMesh) {
                    child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                        else child.material.dispose();
                    }
                }
            });
            this.targetModel = null;
        }

        const loader = new GLTFLoader();
        updateStatus(`Loading ${filename}...`);

        loader.load(`models/${filename}`, (gltf) => {
            const rawModel = gltf.scene;

            // Ensure matrices
            rawModel.updateMatrixWorld(true);
            const box = new THREE.Box3().setFromObject(rawModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            // offset geometry
            rawModel.position.sub(center);

            // Wrapper Group
            this.targetModel = new THREE.Group();
            this.targetModel.add(rawModel);

            // Fit logic
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
                this.initialScale = 2 / maxDim;
                this.targetModel.scale.setScalar(this.initialScale);
            }

            this.scene.add(this.targetModel);
            console.log(`Loaded ${filename}`);
            updateStatus("Ready");
        },
            (xhr) => {
                const percent = Math.round((xhr.loaded / xhr.total) * 100);
                updateStatus(`Loading: ${percent}%`);
            },
            (e) => {
                console.error("Load error", e);
                updateStatus(`Error: ${e.message || 'Failed'}`);
            });
    }
}
