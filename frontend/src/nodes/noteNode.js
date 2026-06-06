// noteNode.js
// Note node — a sticky note for documentation / comments in the pipeline.
// No handles — purely informational, not part of the data flow.

import BaseNode from './BaseNode';
import { useStore } from '../store';

export const NoteNode = ({ id, data }) => {
  const note = data?.note || '';
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleChange = (e) => updateNodeField(id, 'note', e.target.value);

  // No handles — this node is just for documentation
  return (
    <BaseNode label="Note" handles={[]}>
      <label>
        Note:
        <textarea value={note} onChange={handleChange} placeholder="Add a note..." rows={3} />
      </label>
    </BaseNode>
  );
};
