import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../abstracts/node.columns';
import { EFirmPermission } from '../../user/enums/EFirmPermission';
import { ELobbymaticPermission } from '../../user/enums/ELobbymaticPermission';

@ObjectType()
@Entity('register_tokens')
export class RegisterTokenEntity extends NodeColumns {
  @ApiProperty({ enum: ELobbymaticPermission })
  @Field(() => ELobbymaticPermission)
  @Column({ name: 'lobbymatic_permission', type: 'enum', enum: ELobbymaticPermission, nullable: true })
  lobbymaticPermission?: ELobbymaticPermission;

  @ApiProperty({ enum: EFirmPermission })
  @Field(() => EFirmPermission)
  @Column({ name: 'firm_permission', type: 'enum', enum: EFirmPermission, nullable: true })
  firmPermission?: EFirmPermission;

  @ApiProperty()
  @Field()
  @Column()
  email: string;

  @ApiProperty()
  @Field()
  @Column('uuid', { name: 'firm_id' })
  firmId: string;
}
