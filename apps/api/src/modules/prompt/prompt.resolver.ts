import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import template from 'es6-template-string';
import { Repository } from 'typeorm';
import { UserPassport } from '../../decorators/userPassport';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { ClientEntity } from '../client/client.entity';
import { FirmEntity } from '../firm/entities/firm.entity';
import { LOBBY_MATIC_DUMMY_FIRM_ID } from '../user/entities/user.entity';
import { GetSystemPromptArgs } from './args/GetSystemPromptArgs';
import { PromptIdArg } from './args/PromptIdArg';
import { PromptEntity } from './prompt.entity';

@Resolver()
@UseGuards(BasicAuthGuard)
export class PromptResolver {
  constructor(
    @InjectRepository(PromptEntity)
    public readonly repo: Repository<PromptEntity>,
    @InjectRepository(FirmEntity)
    private readonly firmRepo: Repository<FirmEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepo: Repository<ClientEntity>,
  ) {}

  @Query(() => [PromptEntity])
  getPrompts() {
    return this.repo.find({});
  }

  @Query(() => PromptEntity)
  getPrompt(@Args() { promptId }: PromptIdArg) {
    return this.repo.findOneByOrFail({ id: promptId });
  }

  @Query(() => String)
  async getSystemPrompt(@UserPassport() passport: IUserPassport, @Args() { clientId, promptId }: GetSystemPromptArgs) {
    const client = await this.clientRepo.findOneOrFail({ select: ['name', 'description', 'objective'], where: { id: clientId } });
    const prompt = await this.repo.findOneOrFail({ select: ['value'], where: { id: promptId } });
    const firm =
      passport.firmId === LOBBY_MATIC_DUMMY_FIRM_ID
        ? { name: 'lobbymatic' }
        : await this.firmRepo.findOneOrFail({ select: ['name'], where: { id: passport.firmId } });
    return template(prompt.value, {
      firmName: firm.name,
      firstName: passport.firstName,
      lastName: passport.lastName,
      clientName: client.name,
      clientDescription: client.description,
      clientObjective: client.objective,
    });
  }
}
