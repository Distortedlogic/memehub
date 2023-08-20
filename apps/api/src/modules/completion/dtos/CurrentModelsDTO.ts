import { Field, ObjectType } from '@nestjs/graphql';
import { ModelDTO } from './ModelDTO';

@ObjectType()
export class CurrentModelsDTO {
  @Field(() => ModelDTO)
  smallToken: ModelDTO;

  @Field(() => ModelDTO)
  largeToken: ModelDTO;
}
