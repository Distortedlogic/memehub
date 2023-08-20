import { ApiProperty } from '@nestjs/swagger';

class AuthorDTO {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: null })
  url: string | null;

  @ApiProperty({ example: null })
  avatar: string | null;

  @ApiProperty({ example: null })
  email: string | null;
}
export class AdditionalDetailsDTO {
  @ApiProperty({ example: 'en-us' })
  language: string | null;

  @ApiProperty({ type: [String] })
  categories: string[];

  @ApiProperty({ type: [AuthorDTO] })
  authors: AuthorDTO[];

  @ApiProperty({ example: null })
  copyright: string | null;
}
