import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { EFirmPermission } from '../../user/enums/EFirmPermission';
import { ELobbymaticPermission } from '../../user/enums/ELobbymaticPermission';

export class SignupEmailBody {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUUID()
  firmId: string;

  @ApiPropertyOptional({ enum: ELobbymaticPermission })
  @IsOptional()
  @IsEnum(ELobbymaticPermission)
  lobbymaticPermission?: ELobbymaticPermission;

  @ApiPropertyOptional({ enum: EFirmPermission })
  @IsOptional()
  @IsEnum(EFirmPermission)
  firmPermission?: EFirmPermission;
}
