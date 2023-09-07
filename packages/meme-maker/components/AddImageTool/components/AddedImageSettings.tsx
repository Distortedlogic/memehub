import React from 'react';
import { GiBigGear } from 'react-icons/gi';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, Input } from 'ui';
import { MemeMakerStore } from '../../../MemeMaker.store';

interface AddedImageSettingsProps {
  idx: number;
}

export const AddedImageSettings: React.FC<AddedImageSettingsProps> = ({ idx }) => {
  const { percent, opacity, rotation } = MemeMakerStore.useStoreState((state) => state.addimagetoolStore.images[idx]);
  const { setOpacity, setPercent, setRotation } = MemeMakerStore.useStoreActions((actions) => actions.addimagetoolStore);

  return (
    <Collapsible>
      <CollapsibleTrigger>
        <GiBigGear className="text-xl" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex items-center">
          <span className="mr-2">Opacity:</span>
          <Input
            type="number"
            defaultValue={opacity * 100}
            value={opacity * 100}
            onChange={(e) => setOpacity({ [idx]: parseInt(e.target.value) / 100 })}
            min="0"
            max="100"
            step="5"
          />
          <span>%</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Rotation:</span>
          <Input
            type="number"
            defaultValue={rotation}
            value={rotation}
            onChange={(e) => setRotation({ [idx]: parseInt(e.target.value) })}
            min="0"
            max="360"
            step="10"
          />
          <span className="ml-1">degrees</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Resize:</span>
          <Input
            type="number"
            defaultValue={percent}
            value={percent}
            onChange={(e) => setPercent({ [idx]: parseInt(e.target.value) })}
            step="10"
            min="10"
            max="200"
          />
          <span>%</span>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
