// toolbar.js
// Toolbar with draggable node chips for all 9 node types.

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {/* Original 4 nodes */}
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />

                {/* 5 new nodes added for Part 1 */}
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='merger' label='Merger' />
                <DraggableNode type='timer' label='Timer' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='note' label='Note' />
            </div>
        </div>
    );
};
