export const statusText = document.getElementById('status-text');

export function updateStatus(text) {
    if (statusText) {
        statusText.innerText = text;
    }
}
