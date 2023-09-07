import { useDndMonitor } from '@dnd-kit/core';
import { EDraggable } from '../../../EDraggable';
import { MemeMakerStore } from '../../../MemeMaker.store';

export const useSvgDraggables = () => {
  const { images } = MemeMakerStore.useStoreState((state) => state.addimagetoolStore);
  const { setPosition: setAddedImagePosition } = MemeMakerStore.useStoreActions((actions) => actions.addimagetoolStore);
  const { textBoxes } = MemeMakerStore.useStoreState((state) => state.textBoxStore);
  const { setPosition: setTextBoxPosition } = MemeMakerStore.useStoreActions((actions) => actions.textBoxStore);

  useDndMonitor({
    onDragEnd: ({ delta, active: { data } }) => {
      const { eDraggable, idx } = data.current as { eDraggable: EDraggable; idx: number };
      if (eDraggable === EDraggable.IMAGE) {
        const { position } = images[idx];
        setAddedImagePosition({ [idx]: { x: position.x + delta.x, y: position.y + delta.y } });
      } else if (eDraggable === EDraggable.TEXT_BOX) {
        const { position } = textBoxes[idx];
        setTextBoxPosition({ [idx]: { x: position.x + delta.x, y: position.y + delta.y } });
      }
    },
  });
};
