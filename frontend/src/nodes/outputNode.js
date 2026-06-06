// outputNode.js
// Output node — user sets a name and type (Text/Image). One target handle on the left.
// Uses BaseNode abstraction and syncs field values to the Zustand store.

import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  // Read values from store data, with sensible defaults
  const currName = data?.outputName || id.replace('customOutput-', 'output_');
  const outputType = data?.outputType || 'Text';
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync changes back to the Zustand store
  const handleNameChange = (e) => updateNodeField(id, 'outputName', e.target.value);
  const handleTypeChange = (e) => updateNodeField(id, 'outputType', e.target.value);

  // Define handles: one target on the left
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` },
  ];

  return (
    <BaseNode label="Output" handles={handles}>
      <label>
        Name:
        <input type="text" value={currName} onChange={handleNameChange} />
      </label>
      <label>
        Type:
        <select value={outputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
