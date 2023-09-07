import { MemeMakerStore } from '../../MemeMaker.store';

export const DrawToolElements: React.FC = () => (
  <>
    {MemeMakerStore.useStoreState((state) => state.drawtoolStore.polylines).map(({ points, fill, strokeWidth, stroke }, idx) => (
      <polyline key={idx} points={points} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    ))}
  </>
);
