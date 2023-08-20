import { Field, ObjectType } from '@nestjs/graphql';
import { EAiProvider } from '../enums/EAiProvider';
import { TAiModel } from '../types/TAiModels';

@ObjectType()
export class ModelDTO {
  @Field(() => EAiProvider)
  provider: EAiProvider;

  @Field(() => String)
  model: TAiModel;
}
