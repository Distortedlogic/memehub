import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';
import { EFirmPermission } from '../enums/EFirmPermission';
import { ELobbymaticPermission } from '../enums/ELobbymaticPermission';

export const LOBBY_MATIC_DUMMY_FIRM_ID = 'c5e9a4a7-49d9-4f5f-91dd-b477e7633039';

@ObjectType()
@Entity('users')
export class UserEntity extends NodeColumns {
  @Field(() => ELobbymaticPermission, { nullable: true })
  @Column({ name: 'lobbymatic_permissions', type: 'enum', enum: ELobbymaticPermission, nullable: true })
  lobbymaticPermission?: ELobbymaticPermission;

  @Field(() => EFirmPermission, { nullable: true })
  @Column({ name: 'firm_permission', type: 'enum', enum: EFirmPermission, nullable: true })
  firmPermission?: EFirmPermission;

  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field()
  @Column({ name: 'last_name' })
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field(() => Boolean)
  @Column({ default: false, name: 'email_verified' })
  emailVerified: boolean;

  @Column()
  password: string;

  @Field()
  @Column()
  timezone: string;

  @Field(() => String)
  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP', name: 'last_login' })
  lastLogin: Date;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @Field()
  @Column('uuid', { name: 'firm_id' })
  firmId: string;

  @Field({ nullable: true })
  @Column('uuid', { name: 'avatar_id', nullable: true })
  avatarId?: string;
}
