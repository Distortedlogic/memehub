import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { PaginatedArgs } from '../../../generics/pagination.g';

@ArgsType()
export class GetAddressArgs extends PaginatedArgs {
  @Field()
  @IsNotEmpty()
  addressType: string;
}
