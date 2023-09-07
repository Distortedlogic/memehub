import React from 'react';
import { Color, SketchPicker } from 'react-color';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'ui';
import { MemeMakerStore } from '../../MemeMaker.store';
import { TextSettings } from './components/TextSetting';

export const AddTextBoxButton: React.FC = React.memo(() => {
  const { addTextBox } = MemeMakerStore.useStoreActions((actions) => actions.textBoxStore);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={() => addTextBox()}>
            <FaPlus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add New Text Box</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

export const TextBoxTools: React.FC = React.memo(() => {
  return (
    <>
      {MemeMakerStore.useStoreState((state) => state.textBoxStore.textBoxes).map((_, idx) => (
        <TextBoxTool key={idx} idx={idx} />
      ))}
    </>
  );
});

interface TextBoxToolProps {
  idx: number;
}

export const TextBoxTool: React.FC<TextBoxToolProps> = React.memo(({ idx }) => {
  const {
    style: { fill, stroke },
    placeholder,
  } = MemeMakerStore.useStoreState((state) => state.textBoxStore.textBoxes[idx]);
  const { setText, setTextBoxStyleProps, remove } = MemeMakerStore.useStoreActions((actions) => actions.textBoxStore);
  return (
    <div className="flex">
      <Button onClick={() => remove(idx)}>
        <FaTrashAlt />
      </Button>
      <Input type="text" placeholder={placeholder} onChange={(e) => setText({ [idx]: e.target.value })} />
      <div className="flex items-center justify-center">
        <Popover>
          <PopoverTrigger>
            <div className={`bg-[${fill}]`} />
          </PopoverTrigger>
          <PopoverContent>
            <SketchPicker color={fill as Color} onChangeComplete={(color) => setTextBoxStyleProps({ [idx]: { fill: color.hex } })} />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <div className={`bg-[${stroke}]`} />
          </PopoverTrigger>
          <PopoverContent>
            <SketchPicker color={stroke as Color} onChangeComplete={(color) => setTextBoxStyleProps({ [idx]: { stroke: color.hex } })} />
          </PopoverContent>
        </Popover>
        <TextSettings idx={idx} />
      </div>
    </div>
  );
});
