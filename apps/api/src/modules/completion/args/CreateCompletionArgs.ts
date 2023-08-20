import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { EAiProvider } from '../enums/EAiProvider';
import { TAiModel, aiModelValues } from '../types/TAiModels';

@ArgsType()
export class CreateCompletionArgs {
  @Field()
  displayName: string;

  @Field(() => EAiProvider)
  provider: EAiProvider;

  @Field(() => String)
  @IsIn(aiModelValues)
  model: TAiModel;

  @Field()
  @IsUUID()
  promptId: string;

  @Field()
  @IsNotEmpty()
  systemPrompt: string;

  @Field()
  @IsNotEmpty()
  userPrompt: string;

  @Field()
  @IsNotEmpty()
  completion: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  clientId?: string;
}
