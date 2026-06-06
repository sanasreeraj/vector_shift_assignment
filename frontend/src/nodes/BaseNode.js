// BaseNode.js
// Shared wrapper component for all pipeline nodes.
// Eliminates boilerplate — each node just provides a label, handles, and inner content.

import { Handle, useNodeId } from 'reactflow';
import { useStore } from '../store';

// BaseNode renders: container → title bar → children → Handles
const BaseNode = ({ label, handles = [], children }) => {
  const nodeId = useNodeId();
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div className="base-node">
      {/* Node title bar */}
      <div className="base-node-header">
        <span className="base-node-title">{label}</span>
        <button 
          className="node-delete-btn" 
          onClick={() => removeNode(nodeId)}
          title="Delete Node"
        >
          ×
        </button>
      </div>

      {/* Node-specific content — nodrag prevents form interactions from dragging the node */}
      <div className="base-node-body nodrag">
        {children}
      </div>

      {/* Render all handles from the config array */}
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={h.style || {}}
        />
      ))}
    </div>
  );
};

export default BaseNode;
