import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn } from 'typeorm';

export interface ICreatedAtColumn {
  createdAt: string;
}

@ObjectType({ isAbstract: true })
export abstract class CreatedAtColumn implements ICreatedAtColumn {
  @ApiProperty()
  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
  })
  createdAt: string;
}
