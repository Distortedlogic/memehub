import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { EDraggable } from '../../EDraggable';
import { EToolState, MemeMakerStore } from '../../MemeMaker.store';

interface TextBoxElementsProps {}

export const TextBoxElements: React.FC<TextBoxElementsProps> = React.memo(() => (
  <>
    {MemeMakerStore.useStoreState((state) => state.textBoxStore.textBoxes).map((_, idx) => (
      <TextBox key={idx} idx={idx} />
    ))}
  </>
));

interface TextBoxProps {
  idx: number;
}

export const TextBox: React.FC<TextBoxProps> = React.memo(({ idx }) => {
  const { eToolState } = MemeMakerStore.useStoreState((state) => state);
  const { position, style, text } = MemeMakerStore.useStoreState((state) => state.textBoxStore.textBoxes[idx]);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${EDraggable.TEXT_BOX} ${idx}`,
    disabled: eToolState !== EToolState.Dragging,
    data: { eDraggable: EDraggable.TEXT_BOX, idx },
  });
  return (
    <text
      ref={setNodeRef as any}
      style={{ userSelect: 'none', zIndex: isDragging ? 4 : 1, border: 'none', ...style }}
      x={position.x + (transform?.x ?? 0)}
      y={position.y + (transform?.y ?? 0)}
      textAnchor="middle"
      alignmentBaseline="middle"
      {...attributes}
      {...listeners}
    >
      {text}
    </text>
  );
});
