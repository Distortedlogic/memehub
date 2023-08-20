import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatsDTO {
  @Field()
  id: string;

  @Field(() => Int)
  firmCount: number;

  @Field(() => Int)
  workspaceCount: number;

  @Field(() => Int)
  clientCount: number;

  @Field(() => Int)
  userCount: number;

  @Field(() => Int)
  completions: number;

  @Field(() => Int)
  userSavedCompletions: number;

  @Field(() => Int)
  openAiTokens: number;

  @Field(() => Float)
  openAiCost: number;

  @Field(() => Int)
  anthropicTokens: number;

  @Field(() => Float)
  anthropicCost: number;
}
