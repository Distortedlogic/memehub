import async from 'async';
import { useState } from 'react';
import { useAsync } from 'react-use';
import { srcToPngDataUrl } from 'utils';
import { IBaseImageData } from '../AddImageTool.store';

//TODO remove title throughout tool since never used for anything
const addableImagesBaseData = [
  { src: '/clipart/chat_bubble.png', title: 'Chat Bubble' },
  { src: '/clipart/body.png', title: 'Body' },
  { src: '/clipart/hat.png', title: 'Hat' },
  { src: '/clipart/goggle.png', title: 'Goggle' },
  { src: '/clipart/arrow_up.png', title: 'Arrow Up' },
  { src: '/clipart/arrow_down.png', title: 'Arrow Down' },
];

export const useAddableImages = () => {
  const [addableImageList, setAddableImageList] = useState<IBaseImageData[]>([]);

  useAsync(async () => {
    setAddableImageList(
      await async.map(Array.from(Array(addableImagesBaseData.length).keys()), async (idx: number, callback) => {
        const { src, title } = addableImagesBaseData[idx];
        const { size, url } = await srcToPngDataUrl(src);
        callback(null, { src, title, naturalSize: size, dataUrl: url });
      }),
    );
  }, []);

  return { addableImageList };
};
