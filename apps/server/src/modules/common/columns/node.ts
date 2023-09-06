import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { v4 } from 'uuid';
import { CreatedAtColumn, ICreatedAtColumn } from './created-at';

export interface INodeColumns extends ICreatedAtColumn {
  id: string;
}

@ObjectType({ isAbstract: true })
export abstract class NodeColumns extends CreatedAtColumn implements INodeColumns {
  @ApiProperty()
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string = v4();
}
