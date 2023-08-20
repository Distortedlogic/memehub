import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class CreatedAtColumn {
  @ApiProperty()
  @Field(() => String)
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    nullable: false,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return value.toISOString();
      },
    },
  })
  createdAt: string;
}
