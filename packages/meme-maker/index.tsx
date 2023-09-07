import React from 'react';
import { MemeMakerStore } from './MemeMaker.store';
import { AddImageSelectorModal } from './components/AddImageTool/AddImageSelectorModal';
import { AddedImageTools } from './components/AddImageTool/AddedImageTools';
import { AddSpaceCollapse } from './components/AddSpaceTool/AddSpaceTool';
import { RotateBaseImageButton } from './components/BaseImage/RotateBaseImageButton';
import { DrawToolCollapse } from './components/Drawtool/DrawTool';
import { DrawToolButton } from './components/Drawtool/DrawToolButton';
import { FinalImageModal } from './components/RootSvg/FinalImageModal';
import { RootSvg } from './components/RootSvg/RootSvg';
import { AddTextBoxButton, TextBoxTools } from './components/TextBox/TextBoxTool';

export const MemeMaker: React.FC = () => (
  <MemeMakerStore.Provider>
    <div className="flex w-full">
      <div className="w-2/3">
        <RootSvg />
      </div>
      <div className="w-1/3 p-5">
        <div className="flex space-x-4">
          <AddImageSelectorModal />
          <AddTextBoxButton />
          <RotateBaseImageButton />
          <DrawToolButton />
        </div>
        <AddSpaceCollapse />
        <DrawToolCollapse />
        <TextBoxTools />
        <AddedImageTools />
        <FinalImageModal />
      </div>
    </div>
  </MemeMakerStore.Provider>
);
