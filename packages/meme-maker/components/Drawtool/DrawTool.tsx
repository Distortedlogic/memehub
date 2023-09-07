import cx from 'classnames';
import { SketchPicker } from 'react-color';
import { useBoolean } from 'react-use';
import { Button, Popover, PopoverContent, PopoverTrigger, Slider } from 'ui';
import { EToolState, MemeMakerStore } from '../../MemeMaker.store';

const StrokeWidthSlider = () => {
  const [showTooltip, toggle] = useBoolean(false);
  const { strokeWidth } = MemeMakerStore.useStoreState((state) => state.drawtoolStore);
  const { setStrokeWidth } = MemeMakerStore.useStoreActions((actions) => actions.drawtoolStore);

  return (
    <>
      <Slider
        id="slider"
        defaultValue={[5]}
        min={0}
        max={24}
        onValueChange={(e) => setStrokeWidth(e[0])}
        onMouseEnter={() => toggle(true)}
        onMouseLeave={() => toggle(false)}
        className="w-full"
      />
      <div
        className={cx(
          'bg-brand-light absolute -top-8 left-1/2 w-20 rounded-lg text-white opacity-0 shadow-lg transition-opacity duration-300 ease-in-out',
          { 'opacity-100': showTooltip },
        )}
      >
        {strokeWidth}
      </div>
    </>
  );
};

export const DrawToolCollapse: React.FC = () => {
  const { eToolState } = MemeMakerStore.useStoreState((state) => state);
  const { stroke } = MemeMakerStore.useStoreState((state) => state.drawtoolStore);
  const { undo, clear, setStroke } = MemeMakerStore.useStoreActions((actions) => actions.drawtoolStore);

  return (
    <div className={`w-full ${eToolState === EToolState.Drawing ? '' : 'hidden'}`}>
      <div className="flex w-full">
        <Button onClick={() => undo()}>Undo</Button>
        <Button onClick={() => clear()}>Clear</Button>
        <StrokeWidthSlider />
        <Popover>
          <PopoverTrigger>
            <div className={`bg-[${stroke}]`} />
          </PopoverTrigger>
          <PopoverContent>
            <SketchPicker color={stroke} onChangeComplete={(color) => setStroke(color.hex)} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
