import { compress } from 'image-conversion';
import { RefCallback, useCallback } from 'react';
import { dataUrlToBlob, hashBlob, srcToPngDataUrl, svgElementToBlobDataUrl } from 'utils';
import { MemeMakerStore } from '../../../MemeMaker.store';
import { useWaterMark } from './useWaterMark';

export const useSvgToPng = () => {
  const addWaterMark = useWaterMark();
  const { reloadPng } = MemeMakerStore.useStoreState((state) => state.rootSvgStore);
  const { setPngFile, doneReloadingPng } = MemeMakerStore.useStoreActions((actions) => actions.rootSvgStore);
  return useCallback<RefCallback<SVGSVGElement>>(
    async (svg) => {
      if (!svg || !reloadPng) return;
      const blobUrl = svgElementToBlobDataUrl(addWaterMark(svg));
      const { url: pngUrl } = await srcToPngDataUrl(blobUrl);
      const { blob: pngBlob, type, ext } = dataUrlToBlob(pngUrl);
      const blob = await compress(pngBlob, { quality: 0.8, type });
      const hash = await hashBlob(blob);
      setPngFile(new File([blob], `${hash}.${ext}`, { type }));
      doneReloadingPng();
    },
    [addWaterMark, reloadPng],
  );
};
