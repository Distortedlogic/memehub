import { Popover, PopoverContent, PopoverTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from 'ui';
import { MemeMakerStore } from '../../../MemeMaker.store';

interface FontMenuProps {
  idx: number;
}

export const FontMenu: React.FC<FontMenuProps> = ({ idx }) => {
  const { setTextBoxStyleProps } = MemeMakerStore.useStoreActions((actions) => actions.textBoxStore);
  return (
    <Popover>
      <PopoverTrigger>
        <p>Font</p>
      </PopoverTrigger>
      <PopoverContent>
        <Select onValueChange={(value) => setTextBoxStyleProps({ [idx]: { fontFamily: value as string } })} defaultValue="impact">
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Impact" className="font-impact">
                Impact
              </SelectItem>
              <SelectItem value="Comic Sans" className="font-sans">
                Comic Sans
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </PopoverContent>
    </Popover>
  );
};
