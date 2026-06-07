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
  // Fix 1: Use `??` instead of `||` so an empty string `""` isn't replaced by '{{input}}' when backspacing.
  const currText = data?.text ?? '{{input}}';
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null);

  // Sync text changes to the Zustand store
  const handleTextChange = (e) => updateNodeField(id, 'text', e.target.value);

  // Extract unique variable names from the text
  const variables = useMemo(() => {
    const matches = [];
    let match;
    // Fix 2: Reset the global regex lastIndex before executing, so it doesn't miss matches after pasting.
    VARIABLE_REGEX.lastIndex = 0;
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
      // Fix 3: Ensure height never shrinks below the actual scrollHeight content.
      textarea.style.height = 'auto';
      textarea.style.minHeight = '0px'; // Temporarily reset to get true scrollHeight
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = scrollHeight + 'px';
      textarea.style.minHeight = scrollHeight + 'px'; // Lock minHeight so drag&extend can't hide text
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
            // Fix 4: Use `width` instead of `minWidth/maxWidth` lock.
            // This allows the user to drag&extend to reduce the width without it getting permanently stuck at 400px.
            width: `${Math.max(200, Math.min(currText.length * 8 + 40, 400))}px`,
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
