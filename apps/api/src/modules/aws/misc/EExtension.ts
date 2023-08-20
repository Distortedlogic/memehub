import { registerEnumType } from '@nestjs/graphql';

export enum EExtension {
  // Document Types
  Doc = '.doc',
  Docx = '.docx',
  Ppt = '.ppt',
  Pptx = '.pptx',
  Xls = '.xls',
  Xlsx = '.xlsx',
  Pdf = '.pdf',
  Rtf = '.rtf',
  Txt = '.txt',
  Zip = '.zip',

  // Image Types
  Jpeg = '.jpeg',
  Jpg = '.jpg',
  Png = '.png',
  Gif = '.gif',

  // Audio Types
  Mp3 = '.mp3',
  Wav = '.wav',

  // Video Types
  Mp4 = '.mp4',
  Mpeg = '.mpeg',
  Mpg = '.mpg',
  Mov = '.mov',

  // Application Types
  Odt = '.odt',
  Odp = '.odp',
  Ods = '.ods',
  Rar = '.rar',
  Tar = '.tar',
}

registerEnumType(EExtension, { name: 'EExtension' });
