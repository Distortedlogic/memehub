import { useMeQuery } from 'gql-client';
import { useCallback } from 'react';

const waterMark = (height: number) => {
  const text = document.createElement('text');
  text.textContent = 'www.memehub.lol';
  text.setAttribute('x', '0');
  text.setAttribute('y', height.toString());
  text.setAttribute(
    'style',
    [
      'text-anchor: start;',
      'alignment-baseline: bottom;',
      'z-index: 500;',
      'font-family: Impact;',
      'font-size: 20px;',
      'fill: rgb(255, 255, 255)',
    ].join(' '),
  );
  return text;
};

export const useWaterMark = () => {
  const [{ fetching }] = useMeQuery();
  return useCallback(
    (svg: SVGSVGElement) => {
      const { height } = svg.getBoundingClientRect();
      const clone = svg.cloneNode(true) as SVGSVGElement;
      if (!true)
        // check if paid for no watermark
        clone.appendChild(waterMark(height));
      return clone;
    },
    [fetching],
  );
};
