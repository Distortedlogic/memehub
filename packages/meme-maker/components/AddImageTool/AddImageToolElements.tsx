import { useDraggable } from '@dnd-kit/core';
import React from 'react';
import { EDraggable } from '../../EDraggable';
import { EToolState, MemeMakerStore } from '../../MemeMaker.store';

interface AddedImageElementProps {
  idx: number;
}

export const AddedImageElement: React.FC<AddedImageElementProps> = React.memo(({ idx }) => {
  const { eToolState } = MemeMakerStore.useStoreState((state) => state);
  const { dataUrl, opacity, position, currentSize, rotation } = MemeMakerStore.useStoreState(
    (state) => state.addimagetoolStore.images[idx],
  );
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `${EDraggable.IMAGE} ${idx}`,
    disabled: eToolState !== EToolState.Dragging,
    data: { eDraggable: EDraggable.IMAGE, idx },
  });

  return (
    <image
      ref={setNodeRef as any}
      opacity={opacity}
      cursor="move"
      transform={`rotate(${rotation})`}
      style={{ transformOrigin: '50% 50%', zIndex: isDragging ? 4 : 1 }}
      x={position.x + (transform?.x ?? 0)}
      y={position.y + (transform?.y ?? 0)}
      xlinkHref={dataUrl}
      {...currentSize}
      {...attributes}
      {...listeners}
    />
  );
});

export const AddImageToolElements: React.FC = React.memo(() => (
  <>
    {MemeMakerStore.useStoreState((state) => state.addimagetoolStore.images).map(({}, idx) => (
      <AddedImageElement key={idx} idx={idx} />
    ))}
  </>
));
