import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class TimezoneDTO {
  @Field()
  @ApiProperty()
  value: string;

  @Field()
  @ApiProperty()
  label: string;

  @Field()
  @ApiProperty()
  abbrev: string;

  @Field()
  @ApiProperty()
  altName: string;

  @Field(() => Int)
  @ApiProperty()
  offset: number;
}
