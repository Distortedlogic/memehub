import React, { useEffect, useState } from 'react';
import { useAsync } from 'react-use';
import { srcToPngDataUrl } from 'utils';
import { MemeMakerStore } from '../../MemeMaker.store';
import { ICoordinates } from '../../interface/coordinates.i';

export const BaseImage: React.FC = () => {
  const [dataUrl, setDataUrl] = useState<string>();

  const { setBounding } = MemeMakerStore.useStoreActions((actions) => actions);
  const { size } = MemeMakerStore.useStoreState((state) => state.baseImageStore);
  const { setSize } = MemeMakerStore.useStoreActions((actions) => actions.baseImageStore);
  const { src, rotation, position } = MemeMakerStore.useStoreState((state) => state.baseImageStore);
  const [translate, setTranslate] = useState<ICoordinates>();

  useAsync(async () => {
    const { url, size } = await srcToPngDataUrl(src);
    setSize(size);
    setDataUrl(url);
  }, [src]);

  useEffect(() => {
    if (dataUrl && size) {
      if ([0, 180].includes(rotation)) setTranslate({ x: -size.width / 2, y: -size.height / 2 });
      //TODO why this math?
      else if (rotation === 90) setTranslate({ x: -size.height / 2, y: (size.height - size.width) / 2 });
      else setTranslate({ x: -size.height, y: -size.width / 2 });
    }
  }, [dataUrl, size, rotation]);

  useEffect(() => {
    if (dataUrl && size) {
      if ([0, 180].includes(rotation)) setBounding({ width: size.width, height: size.height });
      else setBounding({ width: size.height, height: size.width });
    }
  }, [dataUrl, translate]);

  return (
    <>
      {size && translate && (
        <image
          transform={`translate(${size.width / 2},${size.height / 2}) rotate(${rotation}) translate(${translate.x},${translate.y})`}
          xlinkHref={dataUrl}
          {...position}
        />
      )}
    </>
  );
};
