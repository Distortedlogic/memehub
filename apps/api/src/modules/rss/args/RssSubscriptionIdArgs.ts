import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class RssSubscriptionIdArgs {
  @Field()
  @IsNotEmpty()
  subscription_id: string;
}
