import { action, Action } from "easy-peasy";

export interface IRootSvgState {
  pngFile: File | undefined;
  reloadPng: boolean;
}

export interface IRootSvgStore extends IRootSvgState {
  setPngFile: Action<IRootSvgStore, File>;
  setReloadPng: Action<IRootSvgStore>;
  doneReloadingPng: Action<IRootSvgStore>;
}

export const RootSvgStore: IRootSvgStore = {
  pngFile: undefined,
  reloadPng: false,
  setPngFile: action((state, pngFile) => {
    state.pngFile = pngFile;
  }),
  setReloadPng: action((state) => {
    state.reloadPng = true;
  }),
  doneReloadingPng: action((state) => {
    state.reloadPng = false;
  }),
};
