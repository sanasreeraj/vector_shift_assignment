// submit.js
// Submit button — pulls nodes and edges from the store and posts to the backend.

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [modalData, setModalData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });
            
            const data = await response.json();
            
            setModalData({
                success: true,
                num_nodes: data.num_nodes,
                num_edges: data.num_edges,
                is_dag: data.is_dag
            });
        } catch (error) {
            console.error("Error submitting pipeline:", error);
            setModalData({
                success: false,
                message: "Error submitting pipeline. Make sure the backend is running on http://localhost:8000."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => setModalData(null);

    return (
        <>
            <div className="submit-container">
                <button className="submit-btn" type="button" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
            </div>

            {/* Custom Modal Overlay */}
            {modalData && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className={modalData.success ? 'text-success' : 'text-error'}>
                                {modalData.success ? '✨ Pipeline Parsed Successfully' : '⚠️ Error'}
                            </h2>
                            <button className="modal-close-btn" onClick={closeModal}>×</button>
                        </div>
                        
                        <div className="modal-body">
                            {modalData.success ? (
                                <ul className="modal-stats">
                                    <li>
                                        <span className="stat-label">Number of Nodes:</span>
                                        <span className="stat-value">{modalData.num_nodes}</span>
                                    </li>
                                    <li>
                                        <span className="stat-label">Number of Edges:</span>
                                        <span className="stat-value">{modalData.num_edges}</span>
                                    </li>
                                    <li>
                                        <span className="stat-label">Is a DAG (No cycles):</span>
                                        <span className={`stat-value ${modalData.is_dag ? 'text-success' : 'text-error'}`}>
                                            {modalData.is_dag ? 'True' : 'False'}
                                        </span>
                                    </li>
                                </ul>
                            ) : (
                                <p className="error-message">{modalData.message}</p>
                            )}
                        </div>
                        
                        <div className="modal-footer">
                            <button className="modal-ok-btn" onClick={closeModal}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
