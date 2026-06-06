// textNode.js
// Text node — user enters text in a resizable textarea.
// Parses {{ variableName }} patterns to create dynamic input handles on the left.
// One source handle on the right for output.

import { useMemo, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import BaseNode from './BaseNode';
import { useStore } from '../store';

// Regex to match valid JS variable names inside double curly braces
// e.g. {{ input }}, {{myVar}}, {{ data_2 }}
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const TextNode = ({ id, data }) => {
  const currText = data?.text || '{{input}}';
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null);

  // Sync text changes to the Zustand store
  const handleTextChange = (e) => updateNodeField(id, 'text', e.target.value);

  // Extract unique variable names from the text
  const variables = useMemo(() => {
    const matches = [];
    let match;
    while ((match = VARIABLE_REGEX.exec(currText)) !== null) {
      if (!matches.includes(match[1])) {
        matches.push(match[1]);
      }
    }
    return matches;
  }, [currText]);

  // Auto-resize the textarea as the user types
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to measure scrollHeight accurately
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [currText]);

  // Right-side output handle (always present)
  const outputHandles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  return (
    <BaseNode label="Text" handles={outputHandles}>
      <label>
        Text:
        <textarea
          ref={textareaRef}
          className="nodrag"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{
            // Dynamic minWidth forces the parent to grow, but width: 100% from CSS ensures it fills the node perfectly without weird right-side gaps.
            minWidth: `${Math.max(180, Math.min(currText.length * 7 + 40, 400))}px`,
            maxWidth: '400px',
            overflow: 'hidden',
          }}
        />
      </label>

      {/* Render a target handle on the left for each detected {{ variable }} */}
      {variables.map((varName, idx) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{
            // Space handles evenly along the left side
            top: `${((idx + 1) / (variables.length + 1)) * 100}%`,
          }}
        />
      ))}
    </BaseNode>
  );
};
