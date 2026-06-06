// textNode.js
// Text node — user enters text in a text field. One source handle on the right.
// Uses BaseNode abstraction and syncs text to the Zustand store.
// (Part 3 will add auto-resize and variable-handle parsing later.)

import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  // Read text value from store data
  const currText = data?.text || '{{input}}';
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync text changes to the Zustand store
  const handleTextChange = (e) => updateNodeField(id, 'text', e.target.value);

  // Define handles: one source on the right
  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode label="Text" handles={handles}>
      <label>
        Text:
        <input type="text" value={currText} onChange={handleTextChange} />
      </label>
    </BaseNode>
  );
};
