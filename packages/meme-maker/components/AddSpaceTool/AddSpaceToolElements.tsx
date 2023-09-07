import { MemeMakerStore } from '../../MemeMaker.store';
import { ESvgSpacing } from './AddSpaceTool.store';

export const AddSpaceElements: React.FC = () => {
  const { color, eSvgSpacing, positionBottom, positionTop, rectSize } = MemeMakerStore.useStoreState((state) => state.addspacetoolStore);
  switch (eSvgSpacing) {
    case ESvgSpacing.Top:
      return <rect {...positionTop} {...rectSize} fill={color} />;
    case ESvgSpacing.Bottom:
      return <rect {...positionBottom} {...rectSize} fill={color} />;
    case ESvgSpacing.Both:
      return (
        <>
          <rect {...positionTop} {...rectSize} fill={color} />
          <rect {...positionBottom} {...rectSize} fill={color} />
        </>
      );
    case ESvgSpacing.NoSpacing:
      return <></>;
  }
};
