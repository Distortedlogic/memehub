import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Matches, MaxLength, MinLength } from 'class-validator';
import { MatchFields } from '../../../validators/matchField';

export class RegistrationBody {
  @ApiProperty()
  @IsUUID()
  tokenId: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, {
    message: 'Password must contain at least 8 characters, one uppercase, one number and one special case character',
  })
  password: string;

  @ApiProperty()
  @MatchFields(['password'])
  passwordConfirm: string;
}
