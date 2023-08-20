import { ApiProperty } from '@nestjs/swagger';

export class ValidateRssFeedDTO {
  @ApiProperty()
  valid_feed: boolean;

  @ApiProperty()
  feed_type: string;
}
