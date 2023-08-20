import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class CompletionIdArg {
  @Field()
  @IsUUID()
  completionId: string;
}
