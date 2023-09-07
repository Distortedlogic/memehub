import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { MemeMakerStore } from '../../MemeMaker.store';
import { AddedImageSettings } from './components/AddedImageSettings';

export const AddedImageTools: React.FC = React.memo(() => {
  const { remove } = MemeMakerStore.useStoreActions((actions) => actions.addimagetoolStore);

  return (
    <div className="grid h-full w-full grid-cols-3 gap-3">
      {MemeMakerStore.useStoreState((state) => state.addimagetoolStore.images).map(({ src }, idx) => (
        <div key={idx}>
          <img src={src} alt={`Image ${idx}`} />
          <div className="flex">
            <button className="text-red-500 hover:cursor-pointer" onClick={() => remove(idx)}>
              <div className="flex items-center">
                <FaTrashAlt />
              </div>
            </button>
            <AddedImageSettings idx={idx} />
          </div>
        </div>
      ))}
    </div>
  );
});
