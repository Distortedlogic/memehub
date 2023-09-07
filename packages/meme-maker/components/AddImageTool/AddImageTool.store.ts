import { action, Action } from "easy-peasy";
import { ICoordinates } from "../../interface/coordinates.i";
import { ISize } from "./../../interface/svg.bounding";

export interface IBaseImageData {
  title: string;
  src: string;
  dataUrl: string;
  naturalSize: ISize;
}

export interface IAddedImage extends IBaseImageData {
  position: ICoordinates;
  currentSize: ISize;
  opacity: number;
  rotation: number;
  percent: number;
}

export interface IAddimagetoolState {
  bounding: ISize;
  images: IAddedImage[];
}

export interface IAddimagetoolStore extends IAddimagetoolState {
  setBounding: Action<IAddimagetoolStore, ISize>;
  addImage: Action<IAddimagetoolStore, IBaseImageData>;
  setPosition: Action<IAddimagetoolStore, Record<number, IAddedImage["position"]>>;
  setOpacity: Action<IAddimagetoolStore, Record<number, IAddedImage["opacity"]>>;
  remove: Action<IAddimagetoolStore, number>;
  setRotation: Action<IAddimagetoolStore, Record<number, IAddedImage["rotation"]>>;
  setPercent: Action<IAddimagetoolStore, Record<number, number>>;
}

export const AddimagetoolStore: IAddimagetoolStore = {
  bounding: { height: 0, width: 0 },
  setBounding: action((state, { width, height }) => {
    state.bounding = { width, height };
    if (state.images.length)
      state.images = state.images.map((image) => ({
        ...image,
        position: {
          x: Math.min(width - image.currentSize.width, image.position.x),
          y: Math.min(height - 35 - image.currentSize.height, image.position.y),
        },
      }));
  }),
  images: [],
  setPosition: action((state, records) => {
    for (const idx in records) state.images[idx].position = records[idx];
  }),
  setOpacity: action((state, records) => {
    for (const idx in records) state.images[idx].opacity = records[idx];
  }),
  remove: action((state, idx) => {
    state.images = state.images.filter((_, i) => idx !== i);
  }),
  setRotation: action((state, records) => {
    for (const idx in records) state.images[idx].rotation = records[idx];
  }),
  setPercent: action((state, records) => {
    for (const idx in records) {
      const percent = records[idx];
      const percentAsDecimal = percent / 100;
      const naturalSize = state.images[idx].naturalSize;
      state.images[idx] = {
        ...state.images[idx],
        percent,
        currentSize: {
          width: naturalSize.width * percentAsDecimal,
          height: naturalSize.height * percentAsDecimal,
        },
      };
    }
  }),
  addImage: action((state, { src, dataUrl, naturalSize, title }) => {
    state.images.push({
      title,
      dataUrl,
      position: { x: (state.bounding.width - naturalSize.width) / 2, y: (state.bounding.height - naturalSize.height) / 2 },
      naturalSize,
      currentSize: naturalSize,
      src,
      opacity: 1,
      rotation: 0,
      percent: 100,
    });
  }),
};
