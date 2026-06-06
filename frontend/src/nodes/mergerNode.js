// mergerNode.js
// Merger node — merges two inputs into one output.
// Two target handles on the left, one source handle on the right. No editable fields.

import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const MergerNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input-a`, style: { top: '33%' } },
    { type: 'target', position: Position.Left, id: `${id}-input-b`, style: { top: '66%' } },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode label="Merger" handles={handles}>
      <span>Merges two inputs into one.</span>
    </BaseNode>
  );
};
