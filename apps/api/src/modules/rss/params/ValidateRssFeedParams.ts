import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ValidateRssFeedParams {
  @ApiProperty()
  @IsUrl()
  url: string;
}
