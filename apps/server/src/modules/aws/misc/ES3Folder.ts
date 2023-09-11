import { registerEnumType } from '@nestjs/graphql';

export enum ES3Folder {
  Memes = 'memes',
  Avatars = 'avatars',
}
registerEnumType(ES3Folder, { name: 'ES3Folder' });
