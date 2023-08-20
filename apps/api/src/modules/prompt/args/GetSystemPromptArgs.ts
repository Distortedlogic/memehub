import { ArgsType, Field } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PromptIdArg } from './PromptIdArg';

@ArgsType()
export class GetSystemPromptArgs extends PromptIdArg {
  @Field()
  @IsUUID()
  clientId: string;
}
