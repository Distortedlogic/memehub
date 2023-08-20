import { registerEnumType } from '@nestjs/graphql';

export enum EImageExtension {
  // Image Types
  Jpeg = '.jpeg',
  Jpg = '.jpg',
  Png = '.png',
  Gif = '.gif',
}
registerEnumType(EImageExtension, { name: 'EImageExtension' });
