// timerNode.js
// Timer node — delays pipeline execution by a user-defined number of seconds.
// One target handle (input) and one source handle (delayed output).

import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const TimerNode = ({ id, data }) => {
  const delay = data?.delay || 1;
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleChange = (e) => updateNodeField(id, 'delay', e.target.value);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode label="Timer" handles={handles}>
      <label>
        Delay (s):
        <input type="number" value={delay} onChange={handleChange} min="0" step="0.5" />
      </label>
    </BaseNode>
  );
};
