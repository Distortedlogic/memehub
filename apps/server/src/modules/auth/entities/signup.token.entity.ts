import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../../common/columns/node';

@ObjectType()
@Entity('register_tokens')
export class RegisterTokenEntity extends NodeColumns {
  @ApiProperty()
  @Field()
  @Column()
  email: string;
}
