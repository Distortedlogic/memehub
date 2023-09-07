import { action, Action } from 'easy-peasy';
import { ICoordinates } from './../../interface/coordinates.i';
import { ISize } from './../../interface/svg.bounding';

export interface IBaseImageState {
  src: string;
  rotation: number;
  position: ICoordinates;
  size: ISize | undefined;
}

export interface IBaseImageStore extends IBaseImageState {
  rotate: Action<IBaseImageStore>;
  setPosition: Action<IBaseImageState, ICoordinates>;
  setSize: Action<IBaseImageState, ISize>;
}

export const BaseImageStore: IBaseImageStore = {
  src: '/test-meme.png',
  size: undefined,
  rotation: 0,
  position: { x: 0, y: 0 },
  rotate: action((state) => {
    //TODO handle polylines under rotation, maybe alert user that will erase then erase if too complex
    state.rotation = (state.rotation + 90) % 360;
  }),
  setPosition: action((state, position) => {
    state.position = position;
  }),
  setSize: action((state, size) => {
    state.size = size;
  }),
};
