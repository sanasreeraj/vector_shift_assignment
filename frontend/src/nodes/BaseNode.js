// BaseNode.js
// Shared wrapper component for all pipeline nodes.
// Eliminates boilerplate — each node just provides a label, handles, and inner content.

import { Handle } from 'reactflow';

// BaseNode renders: container → title bar → children → Handles
const BaseNode = ({ label, handles = [], children }) => {
  return (
    <div className="base-node">
      {/* Node title bar */}
      <div className="base-node-header">
        <span className="base-node-title">{label}</span>
      </div>

      {/* Node-specific content (fields, selects, etc.) */}
      <div className="base-node-body">
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
