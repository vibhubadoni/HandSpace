export function applyInteraction(state, currentHandPos, modelManager) {
    const targetModel = modelManager.getTarget();

    if (state.mode !== 'IDLE' && targetModel) {
        const { deltaX, deltaY } = state.getDelta(currentHandPos);

        if (state.mode === 'ROTATING') {
            targetModel.rotation.y += deltaX * 2;
            targetModel.rotation.x += deltaY * 2;
        } else if (state.mode === 'PANNING') {
            targetModel.position.x += deltaX * 2;
            targetModel.position.y += deltaY * 2;
        } else if (state.mode === 'SCALING') {
            const scaleFactor = 1 + (deltaY * 0.5);
            modelManager.scale(Math.max(0.1, scaleFactor));
        }
    }
}
