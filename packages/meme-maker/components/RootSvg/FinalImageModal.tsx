import { useCopyToClipboard } from 'react-use';
import { Button, Dialog, DialogContent, DialogTrigger } from 'ui';
import { MemeMakerStore } from '../../MemeMaker.store';

export const FinalImageModal: React.FC = () => {
  const { pngFile } = MemeMakerStore.useStoreState((state) => state.rootSvgStore);
  const dataUrl = pngFile ? URL.createObjectURL(pngFile) : '';
  const [{ noUserInteraction }, copyToClipboard] = useCopyToClipboard();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Make Meme!</Button>
      </DialogTrigger>
      <DialogContent>
        <p>Your Meme</p>
        <div className="p-4">
          <img src={dataUrl} alt="Meme" className="max-w-full" />
          <Button onClick={() => copyToClipboard(dataUrl)}>{noUserInteraction ? 'Copy' : 'Copied'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
