import { SketchPicker } from 'react-color';
import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'ui';
import { MemeMakerStore } from '../../MemeMaker.store';
import { ESvgSpacing } from './AddSpaceTool.store';

export const AddSpaceCollapse: React.FC = () => {
  const { color, eSvgSpacing, sizePercent } = MemeMakerStore.useStoreState((state) => state.addspacetoolStore);
  const { setColor } = MemeMakerStore.useStoreActions((actions) => actions.addspacetoolStore);
  const { setSvgSpacing } = MemeMakerStore.useStoreActions((actions) => actions);

  return (
    <div className="flex w-full">
      <Select onValueChange={(eSvgSpacing) => setSvgSpacing({ eSvgSpacing: eSvgSpacing as ESvgSpacing, sizePercent })}>
        <SelectTrigger>
          <SelectValue placeholder="Select a spacing" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Object.values(ESvgSpacing).map((eSvgSpacing) => (
              <SelectItem key={eSvgSpacing} value={eSvgSpacing}>
                {eSvgSpacing}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex items-center">
        <span className="mr-2">Size:</span>
        <Input
          className="w-20 rounded border px-2 py-1 focus:border-blue-500 focus:outline-none"
          type="number"
          value={sizePercent}
          onChange={(e) => setSvgSpacing({ eSvgSpacing, sizePercent: parseInt(e.target.value) })}
          min="5"
          max="200"
          step="5"
        />
        <span>%</span>
      </div>
      <Popover>
        <PopoverTrigger>
          <div className={`h-8 w-full rounded-md bg-[${color}] transition duration-300 ease-in-out hover:bg-gray-400`} />
        </PopoverTrigger>
        <PopoverContent>
          <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
        </PopoverContent>
      </Popover>
    </div>
  );
};
