// llmNode.js
// LLM node — two target handles (system, prompt) and one source handle (response).
// No editable fields — just a display node.

import { Position } from 'reactflow';
import BaseNode from './BaseNode';

export const LLMNode = ({ id, data }) => {
  // Define handles: two targets on the left (system + prompt), one source on the right
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];

  return (
    <BaseNode label="LLM" handles={handles}>
      <span>This is a LLM.</span>
    </BaseNode>
  );
};
