import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { CompletionIdArg } from './args/CompletionIdArg';
import { CreateCompletionArgs } from './args/CreateCompletionArgs';
import { EditCompletionArgs } from './args/EditCompletionArgs';
import { GetCompletionArgs } from './args/GetCompletionArgs';
import { LogCompletionArgs } from './args/LogCompletionArgs';
import { LogCompletionResponseArgs } from './args/LogCompletionResponseArgs';
import { CompletionEntity, CompletionLogEntity } from './completion.entity';
import { CurrentModelsDTO } from './dtos/CurrentModelsDTO';
import { EAiProvider } from './enums/EAiProvider';

@Resolver()
@UseGuards(BasicAuthGuard)
export class CompletionResolver {
  constructor(
    @InjectRepository(CompletionEntity)
    public readonly completionRepo: Repository<CompletionEntity>,
    @InjectRepository(CompletionLogEntity)
    public readonly completionLogRepo: Repository<CompletionLogEntity>,
  ) {}

  @Query(() => CurrentModelsDTO)
  getCurrentModels(): CurrentModelsDTO {
    return {
      smallToken: { provider: EAiProvider.OpenAi, model: 'gpt-3.5-turbo' },
      largeToken: { provider: EAiProvider.Anthropic, model: 'claude-v1' },
    };
  }

  @Query(() => [CompletionEntity])
  getCompletions(@Args() { promptId, skip, take }: GetCompletionArgs) {
    return this.completionRepo.find({ where: { promptId, userSaved: true }, order: { createdAt: 'DESC' }, skip, take });
  }

  @Mutation(() => CompletionEntity)
  saveCompletion(@UserPassport() { userId }: IUserPassport, @Args() args: CreateCompletionArgs) {
    return this.completionRepo.save({ userId, ...args, userSaved: true });
  }

  @Mutation(() => String)
  async unsaveCompletion(@Args() { completionId }: CompletionIdArg) {
    await this.completionRepo.update(completionId, { userSaved: false });
    return completionId;
  }

  @Mutation(() => CompletionEntity)
  async editCompletion(@Args() { completionId, completion }: EditCompletionArgs) {
    const completionEntity = await this.completionRepo.findOneByOrFail({ id: completionId });
    completionEntity.completion = completion;
    await this.completionRepo.save(completionEntity);
    return completionEntity;
  }

  @Mutation(() => String)
  async logCompletion(
    @UserPassport() { firmId, userId }: IUserPassport,
    @Args() { promptId, systemPrompt, userPrompt, clientId, model, provider }: LogCompletionArgs,
  ) {
    const { id } = await this.completionLogRepo.save({
      firmId,
      userId,
      clientId,
      promptId,
      systemPrompt,
      model,
      provider,
      userPrompt,
      tokenCount: Math.ceil((systemPrompt + userPrompt).length / 4),
    });
    return id;
  }

  @Mutation(() => Boolean)
  async logCompletionResponse(@Args() { completionId, completion }: LogCompletionResponseArgs) {
    const completionLog = await this.completionLogRepo.findOneByOrFail({ id: completionId });
    completionLog.completion = completion;
    completionLog.tokenCount += Math.ceil(completion.length / 4);
    await this.completionLogRepo.save(completionLog);
    return true;
  }
}
