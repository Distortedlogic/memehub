import { GiBigGear } from 'react-icons/gi';
import { Checkbox, Input, Popover, PopoverContent, PopoverTrigger } from 'ui';
import { MemeMakerStore } from '../../../MemeMaker.store';
import { FontMenu } from './FontMenu';

interface TextSettingsProps {
  idx: number;
}

export const TextSettings: React.FC<TextSettingsProps> = ({ idx }) => {
  const { textTransform, strokeWidth } = MemeMakerStore.useStoreState((state) => state.textBoxStore.textBoxes[idx].style);
  const { setTextBoxStyleProps } = MemeMakerStore.useStoreActions((actions) => actions.textBoxStore);
  return (
    <Popover>
      <PopoverTrigger>
        <GiBigGear />
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col space-y-2">
          <FontMenu idx={idx} />
          <div className="flex items-center">
            <span className="mr-2">Stroke Width:</span>
            <Input
              className="w-20 rounded border px-2 py-1 focus:border-blue-500 focus:outline-none"
              type="number"
              value={Number(strokeWidth)}
              defaultValue={1}
              onChange={(e) => setTextBoxStyleProps({ [idx]: { strokeWidth: e.target.value.toString() } })}
              min="0"
              max="20"
              step="1"
            />
          </div>
          <div className="flex space-x-2">
            <Checkbox
              defaultChecked={true}
              checked={Boolean(textTransform)}
              onChange={() => setTextBoxStyleProps({ [idx]: { textTransform: !textTransform ? 'uppercase' : undefined } })}
              value="uppercase"
            >
              ALL CAPS
            </Checkbox>
            <Checkbox value="bold" className="font-bold">
              Bold
            </Checkbox>
            <Checkbox value="italic" className="font-italic">
              Italic
            </Checkbox>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
