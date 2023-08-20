import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PaginatedArgs } from '../../../generics/pagination.g';

@ArgsType()
export class GetCompletionArgs extends PaginatedArgs {
  @Field()
  @IsUUID()
  promptId: string;
}
