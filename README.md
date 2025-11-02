# VectorShift Frontend Assessment

React-based pipeline builder with FastAPI backend for the VectorShift technical assessment.

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Runs on `http://localhost:8000`

### Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`

## Features

### Node System
- BaseNode abstraction for easy node creation
- 4 node types: Input, Output, LLM, Text
- Drag and drop interface
- Connect nodes with edges

### Text Node
- Auto-resizing textarea
- Type `{{` for autocomplete dropdown
- Creates handles for variables automatically
- References other nodes in pipeline

### Backend Integration
- Submit pipeline for analysis
- Counts nodes and edges
- Validates DAG structure (no cycles)
- Shows results in modal

## Project Structure
```
frontend/src/
├── nodes/BaseNode.js    # Shared node logic
├── nodes/[type]Node.js  # Individual node types
├── ui.js               # Main canvas
├── toolbar.js          # Node palette
└── submit.js           # Backend communication

backend/
└── main.py             # FastAPI server
```

## How to Test

1. **Basic Pipeline**: Drag Input → LLM → Output, connect and submit
2. **Text Variables**: Add Text node, type `{{input}}` to see handle appear
3. **DAG Validation**: Create cycle (Output → Input) to see validation fail

## Tech Stack
- React + ReactFlow
- Tailwind CSS
- FastAPI + Pydantic
- Zustand for state

## API
`POST /pipelines/parse` - Returns `{num_nodes, num_edges, is_dag}`