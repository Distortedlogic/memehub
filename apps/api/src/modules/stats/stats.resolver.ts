import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { round } from 'lodash';
import { Repository } from 'typeorm';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { ClientEntity } from '../client/client.entity';
import { CompletionEntity, CompletionLogEntity } from '../completion/completion.entity';
import { EAiProvider } from '../completion/enums/EAiProvider';
import { getAiCost } from '../completion/functions/getPricePerMillionToken';
import { FirmEntity } from '../firm/entities/firm.entity';
import { LOBBY_MATIC_DUMMY_FIRM_ID, UserEntity } from '../user/entities/user.entity';
import { WorkspaceEntity } from '../workspace/workspace.entity';
import { StatsDTO } from './DTOs/StatsDTO';

@Resolver()
@UseGuards(BasicAuthGuard)
export class StatsResolver {
  constructor(
    @InjectRepository(FirmEntity)
    private readonly firmRepo: Repository<FirmEntity>,
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepo: Repository<WorkspaceEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(CompletionEntity)
    private readonly completionRepo: Repository<CompletionEntity>,
    @InjectRepository(CompletionLogEntity)
    private readonly completionLogRepo: Repository<CompletionLogEntity>,
  ) {}

  @Query(() => StatsDTO)
  async getStats(): Promise<StatsDTO> {
    const openAiTokens =
      (await this.completionLogRepo.sum('token_count' as any, { provider: EAiProvider.OpenAi, model: 'gpt-3.5-turbo' })) ?? 0;
    const anthropicTokens =
      (await this.completionLogRepo.sum('token_count' as any, { provider: EAiProvider.Anthropic, model: 'claude-v1' })) ?? 0;
    return {
      id: LOBBY_MATIC_DUMMY_FIRM_ID,
      firmCount: await this.firmRepo.count(),
      workspaceCount: await this.workspaceRepo.count(),
      clientCount: await this.clientRepo.count(),
      userCount: await this.userRepo.count(),
      completions: await this.completionLogRepo.count(),
      userSavedCompletions: await this.completionRepo.count(),
      openAiTokens,
      openAiCost: round(getAiCost(openAiTokens, EAiProvider.OpenAi, 'gpt-3.5-turbo') / 1_000_000, 2),
      anthropicTokens,
      anthropicCost: round(getAiCost(openAiTokens, EAiProvider.Anthropic, 'claude-v1') / 1_000_000, 2),
    };
  }
}
