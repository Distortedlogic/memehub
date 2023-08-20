import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class CreateSubscriptionArgs {
  @Field()
  @IsNotEmpty()
  url: string;
}
