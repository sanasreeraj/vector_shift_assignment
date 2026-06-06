// submit.js
// Submit button — pulls nodes and edges from the store and posts to the backend.

import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });
            
            const data = await response.json();
            
            // Format the alert nicely
            alert(`Pipeline Parsed Successfully!\n\nNumber of Nodes: ${data.num_nodes}\nNumber of Edges: ${data.num_edges}\nIs a DAG (No cycles): ${data.is_dag}`);
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            alert("Error submitting pipeline. Make sure the backend is running on http://localhost:8000.");
        }
    };

    return (
        <div className="submit-container">
            <button className="submit-btn" type="button" onClick={handleSubmit}>Submit</button>
        </div>
    );
}
