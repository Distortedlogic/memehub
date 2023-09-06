import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID } from 'class-validator';

export class SignupEmailBody {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUUID()
  firmId: string;
}
