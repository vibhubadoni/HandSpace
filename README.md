# HandSpace 🖐️🌐

**HandSpace** is an interactive web-based prototype that allows users to manipulate 3D models using real-time hand gestures. Built with **Three.js** and **MediaPipe Hands**, it demonstrates a lightweight, browser-native approach to spatial interaction without requiring specialized hardware like VR/AR headsets.
**💡 Why HandSpace?**
Many classroom concepts are easier to understand when they are shown in 3D rather than explained using flat images.yet they are often taught using flat images and static diagrams. As a student, I often wondered how much easier learning would be if teachers could simply show concepts in 3D instead of describing them from a single viewpoint.

Whether it was understanding the angles of a cube, visualizing the human brain, or seeing the Earth from different perspectives, 2D images often limited spatial understanding.

HandSpace was built to make interactive 3D learning accessible.
Using only a webcam and a web browser, it allows students and educators to explore and manipulate 3D models through natural hand gestures—without expensive VR/AR hardware.

By focusing on education, HandSpace aims to improve spatial understanding, support better classroom demonstrations, and make interactive 3D tools available in everyday learning environments. 



## ✨ Features

-   **Real-Time Hand Tracking**: Uses Google MediaPipe to track 21 hand landmarks directly in the browser.
-   **Gesture-Based Control**:
    -   � **Rotate Model**: Index finger pinch
    -   🖐️ **Pan Model**: Middle finger pinch
    -   📏 **Scale Model**: Pinky finger pinch
    -   🎥 **Camera Vertical**: Ring finger pinch
    -   🔍 **Zoom Camera**: Two-hand pinch
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
    -   **Windows (Automated)**: Double-click `run.bat`.
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
| **Index Pinch** | **Rotate Model** | Pinch thumb & index finger, move hand to orbit the model. |
| **Middle Pinch** | **Pan Model** | Pinch thumb & middle finger, move hand to drag the model. |
| **Pinky Pinch** | **Scale Model** | Pinch thumb & pinky, move up to enlarge, down to shrink. |
| **Ring Pinch** | **Camera Vertical** | Pinch thumb & ring finger, move up/down to adjust camera height. |
| **Two-Hand Pinch** | **Zoom Camera** | Pinch both hands (thumb & index), move apart to zoom in, together to zoom out. |

> 📖 **Detailed Instructions**: See [GESTURE_INSTRUCTIONS.md](GESTURE_INSTRUCTIONS.md) for comprehensive gesture guides.
## 🎥 Demo

▶️ **Video Demo**:https://www.youtube.com/watch?v=WLLimAwa0aY

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

## � Technical Architecture

For a detailed technical overview including system architecture diagrams, data flow, state machines, and module breakdowns, see:

📐 **[TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)**

This document includes:
- System architecture diagram
- Data flow sequence diagram
- State machine visualization
- Gesture detection algorithm flowchart
- Module-by-module breakdown
- Performance considerations

## �🛠️ Built With

-   [Three.js](https://threejs.org/) - 3D Library
-   [MediaPipe Hands](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker) - Hand Tracking
-   Vanilla HTML5/CSS/JS

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
