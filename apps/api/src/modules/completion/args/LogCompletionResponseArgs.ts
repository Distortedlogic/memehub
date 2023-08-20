import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@ArgsType()
export class LogCompletionResponseArgs {
  @Field()
  @IsUUID()
  completionId: string;

  @Field()
  @IsNotEmpty()
  completion: string;
}
