// inputNode.js
// Input node — user sets a name and type (Text/File). One source handle on the right.
// Uses BaseNode abstraction and syncs field values to the Zustand store.

import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  // Read values from store data, with sensible defaults
  const currName = data?.inputName || id.replace('customInput-', 'input_');
  const inputType = data?.inputType || 'Text';
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync changes back to the Zustand store (not local state)
  const handleNameChange = (e) => updateNodeField(id, 'inputName', e.target.value);
  const handleTypeChange = (e) => updateNodeField(id, 'inputType', e.target.value);

  // Define handles: one source on the right
  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` },
  ];

  return (
    <BaseNode label="Input" handles={handles}>
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
