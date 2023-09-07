export const svgElementToBlobDataUrl = (svg: SVGSVGElement) =>
  URL.createObjectURL(new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' }));
