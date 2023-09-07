import { DndContext, useDroppable } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import React, { PropsWithChildren } from 'react';
import { MemeMakerStore } from '../../MemeMaker.store';
import { AddImageToolElements } from '../AddImageTool/AddImageToolElements';
import { AddSpaceElements } from '../AddSpaceTool/AddSpaceToolElements';
import { BaseImage } from '../BaseImage/BaseImage';
import { DrawToolElements } from '../Drawtool/DrawToolElements';
import { TextBoxElements } from '../TextBox/TextBoxElements';
import { useSvgDraggables } from './hooks/useSvgDraggables';
import { useSvgListeners } from './hooks/useSvgListeners';
import { useSvgToPng } from './hooks/useSvgToPng';

export const RootSvgDndContainer: React.FC<PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>> = (props) => {
  useSvgDraggables();
  const { setNodeRef } = useDroppable({ id: 'meme' });

  return <div ref={setNodeRef} {...props} />;
};

export const RootSvg: React.FC = React.memo(() => {
  const { bounding } = MemeMakerStore.useStoreState((state) => state);
  const svgToPng = useSvgToPng();
  const { DrawnElements, drawingisteners } = useSvgListeners();

  //TODO replicate restrictToParentElement with rotation fixed
  return (
    <div className="flex items-center justify-center">
      <DndContext modifiers={[restrictToParentElement]}>
        <RootSvgDndContainer className="pb-5">
          <svg
            ref={svgToPng}
            {...bounding}
            {...drawingisteners}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <AddSpaceElements />
            <BaseImage />
            <TextBoxElements />
            <DrawToolElements />
            <AddImageToolElements />
            {DrawnElements}
          </svg>
        </RootSvgDndContainer>
      </DndContext>
    </div>
  );
});
