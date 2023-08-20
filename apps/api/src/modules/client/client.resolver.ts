import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ILike } from 'typeorm';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { ClientCreateArgs } from './args/ClientCreateArgs';
import { ClientIdArg } from './args/ClientIdArg';
import { ClientUpdateArgs } from './args/ClientUpdateArgs';
import { GetClientArgs } from './args/GetClientArgs';
import { ClientEntity } from './client.entity';
import { ClientService } from './client.service';

@Resolver(ClientEntity)
@UseGuards(BasicAuthGuard)
export class ClientResolver {
  constructor(private readonly service: ClientService) {}

  @Query(() => [ClientEntity])
  getClients(@Args() { take, skip, workspaceId, firmId, search }: GetClientArgs): Promise<ClientEntity[]> {
    if (workspaceId && firmId) {
      return this.service.repo.find({ take, skip, where: { firmId, workspaceId, name: search ? ILike(`%${search}%`) : undefined } });
    }
    return this.service.repo.find({ take, skip, where: { name: search ? ILike(`%${search}%`) : undefined } });
  }

  @Query(() => ClientEntity)
  getClient(@Args() { clientId }: ClientIdArg): Promise<ClientEntity> {
    return this.service.repo.findOneByOrFail({ id: clientId });
  }

  @Mutation(() => ClientEntity)
  createClient(@Args() args: ClientCreateArgs): Promise<ClientEntity> {
    return this.service.createClient(args);
  }

  @Mutation(() => String)
  async deleteClient(@Args() { clientId }: ClientIdArg): Promise<string> {
    await this.service.repo.delete(clientId);
    return clientId;
  }

  @Mutation(() => ClientEntity)
  updateClient(@Args() args: ClientUpdateArgs): Promise<ClientEntity> {
    return this.service.updateClient(args);
  }
}
