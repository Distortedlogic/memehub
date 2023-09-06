import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PaginatedArgs } from '../common/args/pagination';
import { EVotable } from './EVotable';
import { EVotableOrder } from './EVotableOrder';

@ArgsType()
export class VotableOrderPaginatedArgs extends PaginatedArgs {
  @Field(() => EVotableOrder)
  eVotableOrder: EVotableOrder;
}

@ArgsType()
export class UserIdVotableOrderPaginatedArgs extends VotableOrderPaginatedArgs {
  @Field()
  @IsUUID()
  userId: string;
}

@ArgsType()
export class VoteArgs {
  @Field()
  @IsUUID()
  votableId: string;

  @Field()
  upvote: boolean;

  @Field(() => EVotable)
  eVotable: EVotable;
}
