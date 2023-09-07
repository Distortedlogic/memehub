import React from 'react';
import { BsArrowClockwise } from 'react-icons/bs';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui';
import { MemeMakerStore } from '../../MemeMaker.store';

export const RotateBaseImageButton: React.FC = React.memo(() => {
  const { rotate } = MemeMakerStore.useStoreActions((actions) => actions.baseImageStore);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>
            <BsArrowClockwise onClick={() => rotate()} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="p-3">Rotate 90 degrees clockwise</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
