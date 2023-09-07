import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui';
import { EToolState, MemeMakerStore } from '../../MemeMaker.store';

export const DrawToolButton: React.FC = () => {
  const { toggleActiveTool } = MemeMakerStore.useStoreActions((actions) => actions);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HiOutlinePencilAlt onClick={() => toggleActiveTool(EToolState.Drawing)} />
        </TooltipTrigger>
        <TooltipContent>
          <p>Draw Tool</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
