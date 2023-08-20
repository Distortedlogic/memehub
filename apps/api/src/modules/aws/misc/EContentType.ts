import { registerEnumType } from '@nestjs/graphql';

export enum EContentType {
  // Document Types
  Doc = 'application/msword',
  Docx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  Ppt = 'application/vnd.ms-powerpoint',
  Pptx = 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  Xls = 'application/vnd.ms-excel',
  Xlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  Pdf = 'application/pdf',
  Rtf = 'application/rtf',
  Txt = 'text/plain',
  Zip = 'application/zip',

  // Image Types
  Jpeg = 'image/jpeg',
  Png = 'image/png',
  Gif = 'image/gif',

  // Audio Types
  Mp3 = 'audio/mpeg',
  Wav = 'audio/wav',

  // Video Types
  Mp4 = 'video/mp4',
  Mpeg = 'video/mpeg',
  Quicktime = 'video/quicktime',

  // Application Types
  Odt = 'application/vnd.oasis.opendocument.text',
  Odp = 'application/vnd.oasis.opendocument.presentation',
  Ods = 'application/vnd.oasis.opendocument.spreadsheet',
  Rar = 'application/x-rar-compressed',
  Tar = 'application/x-tar',
}

registerEnumType(EContentType, { name: 'EContentType' });
