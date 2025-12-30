# HandSpace 🖐️🌐

**HandSpace** is an interactive web-based prototype that allows users to manipulate 3D models using real-time hand gestures. Built with **Three.js** and **MediaPipe Hands**, it demonstrates a lightweight, browser-native approach to spatial interaction without requiring specialized hardware like VR/AR headsets.

![img ALT](https://github.com/vibhubadoni/HandSpace/blob/bc9e5c81fea375d5e98d3ce9638a53147ca98924/Screenshot%202025-12-30%20142950.png)

## ✨ Features

-   **Real-Time Hand Tracking**: Uses Google MediaPipe to track 21 hand landmarks directly in the browser.
-   **Gesture-Based Control**:
    -   👌 **Rotate**: Pinch Index Finger + Thumb.
    -   ✋ **Pan**: Pinch Middle Finger + Thumb.
    -   🤏 **Scale**: Pinch Pinky + Thumb.
-   **3D Model Support**: Load and visualize GLTF/GLB models.
-   **Modular Architecture**: Clean, vanilla JavaScript structure separated into Scenes, Models, and Interaction logic.
-   **Zero Backend**: Runs entirely client-side (requires a static file server).

## 🚀 Getting Started

### Prerequisites
-   A modern web browser (Chrome, Edge, Firefox) with WebGL support.
-   A webcam.
-   A local static file server (e.g., VS Code Live Server, Python `http.server`, Node `http-server`).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/HandSpace.git
    cd HandSpace
    ```

2.  **Add 3D Models**:
    -   Place your `.glb` files in the `models/` directory.
    -   Update `src/models/modelLoader.js` to include your new files in the `MODELS` array.
    -   *Note: A fallback model (blue cube) appears if files are missing.*

3.  **Run Locally**:
    -   **VS Code**: Right-click `index.html` -> "Open with Live Server".
    -   **Python**:
        ```bash
        python -m http.server 8000
        ```
    -   **Node**:
        ```bash
        npx http-server .
        ```

4.  **Open in Browser**:
    -   Navigate to `http://localhost:8000`.
    -   Allow camera access when prompted.

## 🎮 Controls

### Hand Gestures
| Gesture | Action | Description |
| :--- | :--- | :--- |
| **Index Pinch** | **Rotate** | Pinch thumb & index finger, then move hand to rotate the object. |
| **Middle Pinch** | **Pan** | Pinch thumb & middle finger, then move hand to drag the object. |
| **Pinky Pinch** | **Scale** | Pinch thumb & pinky, move up to scale up, down to scale down. |

### Mouse/Keyboard
-   **Left Drag**: Rotate Camera (Orbit).
-   **Right Drag**: Pan Camera.
-   **Scroll**: Zoom Camera.
-   **UI Buttons**: Use on-screen buttons to Reset view or change Scale manually.

## 📂 Project Structure

```
HandSpace/
├── index.html          # Entry point
├── style.css           # Global styles
├── models/             # 3D assets (.glb files)
└── src/
    ├── main.js         # App entry point
    ├── scene/          # Three.js setup (Scene, Camera, Lights, Plane)
    ├── models/         # GLTF Loader & Model Manager
    ├── hand/           # MediaPipe setup & Gesture detection
    ├── interaction/    # State machine & Gesture-to-Action mapper
    └── ui/             # UI controls & overlay logic
```

## 🛠️ Built With

-   [Three.js](https://threejs.org/) - 3D Library
-   [MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker) - Hand Tracking
-   Vanilla HTML5/CSS/JS

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
