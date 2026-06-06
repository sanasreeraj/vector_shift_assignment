# VectorShift Frontend Technical Assessment

A full-stack node-based pipeline builder application. This project features a React frontend utilizing **ReactFlow** and **Zustand** for state management, paired with a **Python/FastAPI** backend for graph processing and Directed Acyclic Graph (DAG) validation.

## ✨ Features Implemented

### 1. Node Abstraction
* Created a highly reusable `BaseNode` component that eliminates boilerplate code.
* Refactored the original 4 nodes (Input, Output, LLM, Text) to use the new abstraction and correctly sync with the global Zustand store.
* Added **5 new demonstration nodes**: `Filter`, `Merger`, `Timer`, `API`, and `Note`.
* Added a universal **Delete Node** button directly into the `BaseNode` header to easily remove nodes from the canvas.

### 2. Custom Styling
* Built a custom **Earthy Minimalist Theme** from the ground up using pure CSS.
* Features clean, rounded node cards, a polished toolbar, draggable chips, and a premium Submit button with subtle interactive hover animations.
* Integrated a custom, draggable **MiniMap** overlay to easily navigate large pipelines.

### 3. Dynamic Text Node Logic
* **Auto-Resizing:** The Text node uses a `<textarea>` that dynamically expands in both height and width as the user types.
* **Variable Parsing:** Typing valid JavaScript variables wrapped in double curly braces (e.g., `{{ input_data }}`) automatically parses the text and generates perfectly-spaced target Handles on the left side of the node.

### 4. Backend Integration
* **API Communication:** The frontend collects all `nodes` and `edges` from the global store and sends a `POST` request to the backend.
* **DAG Validation:** The FastAPI backend implements Kahn's Algorithm (Topological Sort) to detect cycles and verify if the pipeline is a valid Directed Acyclic Graph (DAG).
* Returns `num_nodes`, `num_edges`, and `is_dag` to the frontend, which is displayed in a clean user alert.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v14 or higher)
* Python (3.8 or higher)

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will be available at `http://localhost:3000`.*

### Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the required Python packages (FastAPI, Uvicorn, Pydantic):
   ```bash
   pip install fastapi uvicorn pydantic
   ```
3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be available at `http://localhost:8000`.*

---

## 🛠️ Tech Stack
* **Frontend:** React, ReactFlow, Zustand, Vanilla CSS
* **Backend:** Python, FastAPI, Uvicorn
