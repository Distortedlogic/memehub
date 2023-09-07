export const srcToPngDataUrl = async (src: string) => {
  const image = new Image();
  const pngDataUrl: { url: string; size: { width: number; height: number } } = await new Promise((resolve, reject) => {
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        resolve({ url: canvas.toDataURL(), size: { width: image.width, height: image.height } });
      }
      reject();
    };
    image.onerror = reject;
    image.src = src;
  });
  return pngDataUrl;
};
