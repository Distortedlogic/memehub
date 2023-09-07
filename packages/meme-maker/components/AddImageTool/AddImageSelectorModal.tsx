import React from 'react';
import { AiFillFileImage } from 'react-icons/ai';
import { Button, Dialog, DialogContent, DialogTrigger } from 'ui';
import { MemeMakerStore } from '../../MemeMaker.store';
import { useAddableImages } from './hooks/useAddableImages';

export const AddImageSelectorModal: React.FC = React.memo(() => {
  const { addImage } = MemeMakerStore.useStoreActions((actions) => actions.addimagetoolStore);
  const { addableImageList } = useAddableImages();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <AiFillFileImage />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2>Add Image</h2>
        {addableImageList?.map((imageData, idx) => (
          <DialogTrigger asChild>
            <Button key={idx} onClick={() => addImage(imageData)}>
              <img src={imageData.src} alt={`Image ${idx}`} />
            </Button>
          </DialogTrigger>
        ))}
      </DialogContent>
    </Dialog>
  );
});
