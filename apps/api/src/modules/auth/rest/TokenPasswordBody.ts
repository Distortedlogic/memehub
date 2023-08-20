import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';
import { MatchFields } from '../../../validators/matchField';

export class TokenIdPasswordBody {
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

  @ApiProperty()
  @IsUUID()
  tokenId: string;
}

export class EmailBody {
  @ApiProperty()
  @IsEmail()
  email: string;
}
