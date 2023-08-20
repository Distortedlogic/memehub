import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { CreatedAtColumn } from './created-at.column';

@ObjectType({ isAbstract: true })
export abstract class NodeColumns extends CreatedAtColumn {
  @ApiProperty()
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();
}
