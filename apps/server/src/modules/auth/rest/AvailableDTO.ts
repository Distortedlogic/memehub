import { ApiProperty } from '@nestjs/swagger';

export class AvailableDTO {
  @ApiProperty()
  available: boolean;
}
