import { registerEnumType } from '@nestjs/graphql';

export enum ES3Folder {
  Documents = 'documents',
  Avatars = 'avatars',
}
registerEnumType(ES3Folder, { name: 'ES3Folder' });
