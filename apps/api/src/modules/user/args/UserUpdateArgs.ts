import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { EFirmPermission } from '../enums/EFirmPermission';
import { ELobbymaticPermission } from '../enums/ELobbymaticPermission';

@ArgsType()
export class UserUpdateArgs {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => ELobbymaticPermission, { nullable: true })
  lobbymaticPermission?: ELobbymaticPermission;

  @Field(() => EFirmPermission, { nullable: true })
  firmPermission?: EFirmPermission;
}
