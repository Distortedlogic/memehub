import { action, Action } from "easy-peasy";

export interface PolylinePath {
  points: string;
  fill: string;
  strokeWidth: number;
  stroke: string;
}

export interface IDrawtoolState {
  stroke: string;
  strokeWidth: number;
  polylines: PolylinePath[];
}

export interface IDrawtoolStore extends IDrawtoolState {
  setStroke: Action<IDrawtoolStore, string>;
  setStrokeWidth: Action<IDrawtoolStore, number>;
  undo: Action<IDrawtoolStore>;
  clear: Action<IDrawtoolStore>;
  addPolylineByPoints: Action<IDrawtoolStore, string>;
}

export const DrawtoolStore: IDrawtoolStore = {
  stroke: "#fff",
  strokeWidth: 5,
  polylines: [],
  setStroke: action((state, stroke) => {
    state.stroke = stroke;
  }),
  setStrokeWidth: action((state, strokeWidth) => {
    state.strokeWidth = strokeWidth;
  }),
  undo: action((state) => {
    state.polylines = state.polylines.slice(0, -1);
  }),
  clear: action((state) => {
    state.polylines = [];
  }),
  addPolylineByPoints: action((state, points) => {
    state.polylines.push({ points, fill: "none", stroke: state.stroke, strokeWidth: state.strokeWidth });
  }),
};
