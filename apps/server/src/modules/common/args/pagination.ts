import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, Max, Min } from 'class-validator';

@ArgsType()
export class TakeArg {
  @Min(0)
  @Max(50)
  @IsInt()
  @Field(() => Int)
  take: number;
}

@ArgsType()
export class PaginatedArgs extends TakeArg {
  @Min(0)
  @IsInt()
  @Field(() => Int)
  skip: number;
}

@ArgsType()
export class PaginatedArgsWithSearch extends PaginatedArgs {
  @Field({ nullable: true })
  search?: string;
}
