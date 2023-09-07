import { action, Action } from "easy-peasy";
import { ICoordinates } from "./../../interface/coordinates.i";
import { ISize } from "./../../interface/svg.bounding";

export enum ESvgSpacing {
  Top = "Top",
  Both = "Both",
  Bottom = "Bottom",
  NoSpacing = "NoSpacing",
}

export interface IAddSpacetoolState {
  positionTop: ICoordinates;
  positionBottom: ICoordinates;
  color: string;
  sizePercent: number;
  rectSize: ISize;
  eSvgSpacing: ESvgSpacing;
}

export interface IAddSpacetoolStore extends IAddSpacetoolState {
  setPositionTop: Action<IAddSpacetoolStore, ICoordinates>;
  setPositionBottom: Action<IAddSpacetoolStore, ICoordinates>;
  setColor: Action<IAddSpacetoolStore, string>;
  setSizePercent: Action<IAddSpacetoolStore, number>;
  setRectSize: Action<IAddSpacetoolStore, ISize>;
  setPositionUsed: Action<IAddSpacetoolStore, ESvgSpacing>;
}

export const AddSpacetoolStore: IAddSpacetoolStore = {
  rectSize: { width: 400, height: 400 },
  positionTop: { x: 0, y: 0 },
  positionBottom: { x: 0, y: 0 },
  eSvgSpacing: ESvgSpacing.NoSpacing,
  color: "#ffffff",
  sizePercent: 10,
  setPositionTop: action((state, position) => {
    state.positionTop = position;
  }),
  setPositionBottom: action((state, position) => {
    state.positionBottom = position;
  }),
  setColor: action((state, color) => {
    state.color = color;
  }),
  setSizePercent: action((state, sizePercent) => {
    state.sizePercent = sizePercent;
  }),
  setRectSize: action((state, rectSize) => {
    state.rectSize = rectSize;
  }),
  setPositionUsed: action((state, eSvgSpacing) => {
    state.eSvgSpacing = eSvgSpacing;
  }),
};
