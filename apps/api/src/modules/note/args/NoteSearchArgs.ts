import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PaginatedArgs } from '../../../generics/pagination.g';

@ArgsType()
export class NoteSearchArgs extends PaginatedArgs {
  @Field()
  search: string;
  @Field()
  @IsUUID()
  clientId: string;
}
