import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginatedArgsWithSearch } from '../../../generics/pagination.g';

@ArgsType()
export class GetClientArgs extends PaginatedArgsWithSearch {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  firmId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  workspaceId?: string;
}
