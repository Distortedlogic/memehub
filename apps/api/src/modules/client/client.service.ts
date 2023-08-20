import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FirmEntity } from '../firm/entities/firm.entity';
import { WorkspaceEntity } from '../workspace/workspace.entity';
import { ClientCreateArgs } from './args/ClientCreateArgs';
import { ClientUpdateArgs } from './args/ClientUpdateArgs';
import { ClientEntity } from './client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity) public readonly repo: Repository<ClientEntity>,
    @InjectRepository(FirmEntity) private readonly firmRepo: Repository<FirmEntity>,
    @InjectRepository(WorkspaceEntity) private readonly workspaceRepo: Repository<WorkspaceEntity>,
  ) {}

  async createClient(args: ClientCreateArgs) {
    await this.firmRepo.findOneByOrFail({ id: args.firmId });
    await this.workspaceRepo.findOneByOrFail({ id: args.workspaceId });
    return this.repo.save(args);
  }

  async updateClient(args: ClientUpdateArgs) {
    await this.workspaceRepo.findOneByOrFail({ id: args.workspaceId });
    await this.repo.save(args);
    return this.repo.findOneByOrFail({ id: args.id });
  }
}
