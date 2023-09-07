import { DOMAttributes, useState } from 'react';
import { useBoolean } from 'react-use';
import { EToolState, MemeMakerStore } from '../../../MemeMaker.store';

export const useSvgListeners = () => {
  const { eToolState } = MemeMakerStore.useStoreState((state) => state);

  const [points, setPoints] = useState('');
  const [isDrawing, setIsDrawing] = useBoolean(false);
  const { stroke, strokeWidth } = MemeMakerStore.useStoreState((state) => state.drawtoolStore);
  const { addPolylineByPoints } = MemeMakerStore.useStoreActions((actions) => actions.drawtoolStore);

  const drawingisteners: Omit<DOMAttributes<SVGSVGElement>, 'children' | 'dangerouslySetInnerHTML'> = {
    onMouseDown: (e) => {
      if (eToolState === EToolState.Drawing && !isDrawing) {
        setIsDrawing(true);
        const svgPosition = e.currentTarget.getBoundingClientRect();
        setPoints(`${e.clientX - svgPosition.left},${e.clientY - svgPosition.top}`);
      }
    },
    onMouseUp: (e) => {
      if (eToolState === EToolState.Drawing && isDrawing) {
        const svgPosition = e.currentTarget.getBoundingClientRect();
        addPolylineByPoints(`${points}, ${e.clientX - svgPosition.left},${e.clientY - svgPosition.top}`);
        setPoints('');
        setIsDrawing(false);
      }
    },
    onMouseMove: (e) => {
      if (eToolState === EToolState.Drawing && isDrawing) {
        const { top, left } = e.currentTarget.getBoundingClientRect();
        setPoints((points) => `${points}, ${e.clientX - left},${e.clientY - top}`);
      }
    },
  };

  return {
    DrawnElements: <>{points && <polyline points={points} fill="none" stroke={stroke} strokeWidth={strokeWidth} />}</>,
    drawingisteners,
  };
};
