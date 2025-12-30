export function initControls(modelManager, orbitControls) {
    // Scale buttons
    const btnScaleUp = document.getElementById('btn-scale-up');
    const btnScaleDown = document.getElementById('btn-scale-down');
    const btnReset = document.getElementById('btn-reset');
    const modelListContainer = document.getElementById('model-list');

    if (btnScaleUp) {
        btnScaleUp.onclick = () => modelManager.scale(1.1);
    }
    if (btnScaleDown) {
        btnScaleDown.onclick = () => modelManager.scale(0.9);
    }
    if (btnReset) {
        btnReset.onclick = () => {
            modelManager.reset();
            if (orbitControls) orbitControls.reset();
        };
    }

    // Model Menu implementation
    if (modelListContainer) {
        modelListContainer.innerHTML = '';
        const models = modelManager.getAvailableModels();

        models.forEach((model, index) => {
            const btn = document.createElement('button');
            btn.className = 'model-btn';
            btn.innerText = model.name;
            btn.onclick = () => {
                document.querySelectorAll('.model-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                modelManager.load(model.file);
            };
            if (index === 0) btn.classList.add('active');
            modelListContainer.appendChild(btn);
        });
    }
}
