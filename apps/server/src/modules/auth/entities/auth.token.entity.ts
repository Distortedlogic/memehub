import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../common/columns/node';

export enum EAuthTokenType {
  VerifyEmail = 'VerifyEmail',
  ChangePassword = 'ChangePassword',
}

@ObjectType()
@Entity('auth_tokens')
export class AuthTokenEntity extends NodeColumns {
  @Field(() => EAuthTokenType)
  @Column({ name: 'type', type: 'enum', enum: EAuthTokenType })
  type: EAuthTokenType;

  @Field()
  @Column('uuid', { name: 'firm_id' })
  userId: string;
}
