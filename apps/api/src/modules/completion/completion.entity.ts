import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { NodeColumns } from '../abstracts/node.columns';
import { EAiProvider } from './enums/EAiProvider';
import { TAiModel } from './types/TAiModels';

@ObjectType({ isAbstract: true })
export abstract class AbstractCompletionEntity extends NodeColumns {
  @Field(() => EAiProvider)
  @Column({ enum: EAiProvider, type: 'enum' })
  provider: EAiProvider;

  @Field(() => String)
  @Column({ type: 'varchar' })
  model: TAiModel;

  @Field()
  @Column({ name: 'prompt_id' })
  promptId: string;

  @Field()
  @Column({ name: 'system_prompt' })
  systemPrompt: string;

  @Field()
  @Column({ name: 'user_prompt' })
  userPrompt: string;

  @Field()
  @Column({ name: 'user_id' })
  userId: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'client_id' })
  clientId?: string;

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

@ObjectType()
@Entity('completions')
export class CompletionEntity extends AbstractCompletionEntity {
  @Field({ nullable: true })
  @Column({ name: 'display_name', nullable: true })
  displayName?: string;

  @Field()
  @Column({ name: 'user_saved' })
  userSaved: boolean;

  @Field()
  @Column()
  completion: string;
}

@ObjectType()
@Entity('completion_logs')
export class CompletionLogEntity extends AbstractCompletionEntity {
  @Field(() => Int)
  @Column({ type: 'int', name: 'token_count' })
  tokenCount: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  completion?: string;
}
