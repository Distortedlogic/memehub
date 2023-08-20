import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { EFirmPermission } from '../enums/EFirmPermission';
import { ELobbymaticPermission } from '../enums/ELobbymaticPermission';

@ArgsType()
export class UserArgs {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  firmId: string;

  @Field()
  @IsNotEmpty()
  timezone: string;

  @Field()
  emailVerified: boolean;

  @Field(() => ELobbymaticPermission, { nullable: true })
  lobbymaticPermission?: ELobbymaticPermission;

  @Field(() => EFirmPermission, { nullable: true })
  firmPermission?: EFirmPermission;
}
