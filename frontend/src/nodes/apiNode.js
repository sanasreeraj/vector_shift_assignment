// apiNode.js
// API node — calls an external API with a configurable URL and HTTP method.
// One target handle (request body) and one source handle (response).

import { Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data }) => {
  const url = data?.url || '';
  const method = data?.method || 'GET';
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleUrlChange = (e) => updateNodeField(id, 'url', e.target.value);
  const handleMethodChange = (e) => updateNodeField(id, 'method', e.target.value);

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-input` },
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode label="API" handles={handles}>
      <label>
        URL:
        <input type="text" value={url} onChange={handleUrlChange} placeholder="https://..." />
      </label>
      <label>
        Method:
        <select value={method} onChange={handleMethodChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
    </BaseNode>
  );
};
