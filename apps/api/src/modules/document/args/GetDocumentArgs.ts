import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PaginatedArgs } from '../../../generics/pagination.g';

@ArgsType()
export class GetDocumentArgs extends PaginatedArgs {
  @Field()
  @IsUUID()
  workspaceId: string;

  @Field()
  @IsUUID()
  clientId: string;
}
