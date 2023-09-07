import { Property } from "csstype";
import { Action, action } from "easy-peasy";
import { ISize } from "../../interface/svg.bounding";
import { ICoordinates } from "./../../interface/coordinates.i";

export interface ITextBoxStyles {
  fontFamily: Property.FontFamily;
  fontSize: Property.FontSize;
  textTransform: Property.TextTransform;
  fill: Property.Fill;
  stroke: Property.Stroke;
  strokeWidth: Property.StrokeWidth;
}

export const defaultTextBoxStyles: ITextBoxStyles = {
  fontFamily: "Impact",
  fontSize: "50px",
  textTransform: "uppercase",
  fill: "#FFFFFF",
  stroke: "#000000",
  strokeWidth: "1",
};

export interface ITextBox {
  placeholder: string;
  text: string;
  position: ICoordinates;
  style: ITextBoxStyles;
}

export interface ITextBoxState {
  bounding: ISize;
  textBoxes: ITextBox[];
}

export interface ITextBoxStore extends ITextBoxState {
  addTextBox: Action<ITextBoxStore>;
  remove: Action<ITextBoxStore, number>;
  setBounding: Action<ITextBoxStore, ISize>;
  setText: Action<ITextBoxStore, Record<number, ITextBox["text"]>>;
  setPosition: Action<ITextBoxStore, Record<number, ITextBox["position"]>>;
  setTextBoxStyleProps: Action<ITextBoxStore, Record<number, Partial<ITextBoxStyles>>>;
}

export const TextBoxStore: ITextBoxStore = {
  bounding: { width: 400, height: 400 },
  textBoxes: [],
  addTextBox: action((state) => {
    const placeholder = `Text #${state.textBoxes.length + 1}`;
    state.textBoxes.push({
      text: placeholder,
      placeholder,
      position: { x: Math.round(state.bounding.width / 2), y: Math.round(state.bounding.height / 2) },
      style: defaultTextBoxStyles,
    });
  }),
  remove: action((state, idx) => {
    state.textBoxes = state.textBoxes.filter((_, j) => idx !== j);
  }),
  setBounding: action((state, { width, height }) => {
    state.bounding = { width, height };
    state.textBoxes =
      state.textBoxes.length === 0
        ? [
            { text: "Top Text", position: { x: width / 2, y: 35 }, placeholder: "Top Text", style: defaultTextBoxStyles },
            { text: "Bottom Text", position: { x: width / 2, y: height - 35 }, placeholder: "Bottom Text", style: defaultTextBoxStyles },
          ]
        : state.textBoxes.map((textBox) => ({
            ...textBox,
            position: { x: Math.min(width, textBox.position.x), y: Math.min(height - 35, textBox.position.y) },
          }));
  }),
  setText: action((state, records) => {
    for (const idx in records) state.textBoxes[idx].text = records[idx];
  }),
  setPosition: action((state, records) => {
    for (const idx in records) state.textBoxes[idx].position = records[idx];
  }),
  setTextBoxStyleProps: action((state, records) => {
    for (const idx in records) state.textBoxes[idx].style = { ...state.textBoxes[idx].style, ...records[idx] };
  }),
};
