import { Action, action, createContextStore, thunk, Thunk, thunkOn, ThunkOn } from "easy-peasy";
import { AddimagetoolStore, IAddimagetoolStore } from "./components/AddImageTool/AddImageTool.store";
import { AddSpacetoolStore, ESvgSpacing, IAddSpacetoolStore } from "./components/AddSpaceTool/AddSpaceTool.store";
import { BaseImageStore, IBaseImageStore } from "./components/BaseImage/BaseImage.store";
import { DrawtoolStore, IDrawtoolStore } from "./components/Drawtool/Drawtool.store";
import { IRootSvgStore, RootSvgStore } from "./components/RootSvg/RootSvg.store";
import { ITextBoxStore, TextBoxStore } from "./components/TextBox/TextBox.store";
import { ISize } from "./interface/svg.bounding";

export enum EToolState {
  Dragging = "Dragging",
  Drawing = "Drawing",
}

const defaultToolState = EToolState.Dragging;

interface ISvgState {
  bounding: ISize | undefined;
  eToolState: EToolState;
}

interface IMemeMakerStore extends ISvgState {
  setBounding: Action<IMemeMakerStore, ISize>;
  onSetBounding: ThunkOn<IMemeMakerStore>;

  toggleActiveTool: Action<IMemeMakerStore, EToolState>;
  onToolUsed: ThunkOn<IMemeMakerStore>;

  setSvgSpacing: Thunk<IMemeMakerStore, { sizePercent: number; eSvgSpacing: ESvgSpacing }>;

  textBoxStore: ITextBoxStore;
  drawtoolStore: IDrawtoolStore;
  baseImageStore: IBaseImageStore;
  addimagetoolStore: IAddimagetoolStore;
  addspacetoolStore: IAddSpacetoolStore;
  rootSvgStore: IRootSvgStore;
}

export const MemeMakerStore = createContextStore<IMemeMakerStore>({
  bounding: undefined,
  setBounding: action((state, bounding) => {
    state.bounding = bounding;
  }),
  onSetBounding: thunkOn(
    (actions) => actions.setBounding,
    (actions, { payload }) => {
      actions.textBoxStore.setBounding(payload);
      actions.addimagetoolStore.setBounding(payload);
      actions.rootSvgStore.setReloadPng();
    }
  ),

  eToolState: EToolState.Dragging,
  toggleActiveTool: action((state, eToolState) => {
    state.eToolState = state.eToolState !== eToolState ? eToolState : defaultToolState;
  }),
  onToolUsed: thunkOn(
    (actions) => [
      actions.addimagetoolStore.addImage,
      actions.addimagetoolStore.remove,
      actions.addimagetoolStore.setOpacity,
      actions.addimagetoolStore.setPercent,
      actions.addimagetoolStore.setPosition,
      actions.addimagetoolStore.setRotation,
      actions.drawtoolStore.addPolylineByPoints,
      actions.drawtoolStore.clear,
      actions.drawtoolStore.undo,
      actions.textBoxStore.addTextBox,
      actions.textBoxStore.remove,
      actions.textBoxStore.setPosition,
      actions.textBoxStore.setText,
      actions.textBoxStore.setTextBoxStyleProps,
    ],
    (actions) => actions.rootSvgStore.setReloadPng()
  ),

  setSvgSpacing: thunk((actions, { eSvgSpacing, sizePercent }, { getState }) => {
    const baseImageSize = getState().baseImageStore.size;
    if (!baseImageSize) return;
    const { width, height } = baseImageSize;
    actions.addspacetoolStore.setPositionUsed(eSvgSpacing);
    actions.addspacetoolStore.setSizePercent(sizePercent);
    const rectHeight = (height * sizePercent) / 100;
    actions.addspacetoolStore.setRectSize({ width, height: rectHeight });
    const origin = { x: 0, y: 0 };
    switch (eSvgSpacing) {
      case ESvgSpacing.Top:
        actions.addspacetoolStore.setPositionTop(origin);
        actions.baseImageStore.setPosition({ x: 0, y: rectHeight });
        actions.setBounding({ width, height: height + rectHeight });
        break;
      case ESvgSpacing.Bottom:
        actions.addspacetoolStore.setPositionTop(origin);
        actions.addspacetoolStore.setPositionBottom({ x: 0, y: height });
        actions.baseImageStore.setPosition(origin);
        actions.setBounding({ width, height: height + rectHeight });
        break;
      case ESvgSpacing.Both:
        actions.addspacetoolStore.setPositionTop(origin);
        actions.addspacetoolStore.setPositionBottom({ x: 0, y: height + rectHeight });
        actions.baseImageStore.setPosition({ x: 0, y: rectHeight });
        actions.setBounding({ width, height: height + rectHeight * 2 });
        break;
      case ESvgSpacing.NoSpacing:
        actions.baseImageStore.setPosition(origin);
        actions.setBounding({ width, height });
        break;
    }
  }),

  textBoxStore: TextBoxStore,
  drawtoolStore: DrawtoolStore,
  baseImageStore: BaseImageStore,
  addimagetoolStore: AddimagetoolStore,
  addspacetoolStore: AddSpacetoolStore,
  rootSvgStore: RootSvgStore,
});
