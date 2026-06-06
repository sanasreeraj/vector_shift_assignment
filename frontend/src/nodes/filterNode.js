// filterNode.js
// Filter node — filters data based on a user-defined condition.
// One target handle (input data) and one source handle (filtered output).

import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data }) => {
  const condition = data?.condition || '';
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleChange = (e) => updateNodeField(id, 'condition', e.target.value);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode label="Filter" handles={handles}>
      <label>
        Condition:
        <input type="text" value={condition} onChange={handleChange} placeholder="e.g. x > 10" />
      </label>
    </BaseNode>
  );
};
