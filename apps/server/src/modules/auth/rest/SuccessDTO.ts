import { ApiProperty } from '@nestjs/swagger';

export class SuccessDTO {
  @ApiProperty()
  success: boolean;
}
