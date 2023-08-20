import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class PromptIdArg {
  @Field()
  @IsUUID()
  promptId: string;
}
