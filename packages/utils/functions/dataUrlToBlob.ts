import type { EImageType } from 'image-conversion';

export const dataUrlToBlob = (dataUrl: string) => {
  const arr = dataUrl.split(',');
  const mathed = arr[0].match(/:(.*?);/);
  if (!mathed) throw new Error('cant find mime type');
  const [, mime] = mathed;
  const type = mime as EImageType;
  const [, ext] = mime.split('/');
  const byteString = window.atob(arr[1]); // browser only, in node use buffer
  const blob = new Blob([new Uint8Array(Array.from(Array(byteString.length).keys()).map((idx) => byteString.charCodeAt(idx)))]);
  return { blob, type, ext };
};
