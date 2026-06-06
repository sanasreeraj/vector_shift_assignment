// DraggableMiniMap.js
// A MiniMap wrapped in a draggable container so users can reposition it anywhere on the canvas.

import { useState, useRef, useCallback } from 'react';
import { MiniMap } from 'reactflow';

export const DraggableMiniMap = () => {
  // Initial position: bottom-right corner
  const [position, setPosition] = useState({ x: null, y: null });
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Start dragging — capture the offset between mouse and container top-left
  const onMouseDown = useCallback((e) => {
    // Only drag from our invisible handle area to allow panning inside the minimap
    if (!e.target.classList.contains('minimap-drag-handle')) return;
    const rect = dragRef.current.getBoundingClientRect();
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    const onMouseMove = (moveEvent) => {
      setPosition({
        x: moveEvent.clientX - offsetRef.current.x,
        y: moveEvent.clientY - offsetRef.current.y,
      });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  // Default position: bottom-right when not yet dragged
  const style = position.x !== null
    ? { position: 'fixed', left: position.x, top: position.y, zIndex: 50 }
    : { position: 'absolute', bottom: 12, right: 12, zIndex: 50 };

  return (
    <div ref={dragRef} className="draggable-minimap" style={style} onMouseDown={onMouseDown}>
      {/* Invisible drag handle at the top */}
      <div className="minimap-drag-handle" title="Drag to move minimap"></div>
      <MiniMap pannable zoomable nodeStrokeWidth={3} />
    </div>
  );
};
