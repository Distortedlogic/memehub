import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CompletionIdArg } from './CompletionIdArg';

@ArgsType()
export class EditCompletionArgs extends CompletionIdArg {
  @Field()
  @IsNotEmpty()
  completion: string;
}
