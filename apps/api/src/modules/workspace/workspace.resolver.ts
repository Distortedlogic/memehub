import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { DataLoaders } from '../../decorators/dataLoaders';
import { UserPassport } from '../../decorators/userPassport';
import { PaginatedArgsWithSearch } from '../../generics/pagination.g';
import { BasicAuthGuard } from '../../guards/BasicAuthGuard';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { ClientEntity } from '../client/client.entity';
import { IDataLoaders } from '../dataloader/dataloader.service';
import { WorkspaceToUserEntity } from '../joins/workspace-user.entity';
import { UserEntity } from '../user/entities/user.entity';
import { EFirmPermission } from '../user/enums/EFirmPermission';
import { ELobbymaticPermission } from '../user/enums/ELobbymaticPermission';
import { WorkspaceArgs } from './args/WorkspaceArgs';
import { WorkspaceIdArg } from './args/WorkspaceIdArg';
import { WorkspaceUpdateArgs } from './args/WorkspaceUpdateArgs';
import { WorkspaceEntity } from './workspace.entity';

@Resolver(WorkspaceEntity)
@UseGuards(BasicAuthGuard)
export class WorkspaceResolver {
  constructor(@InjectRepository(WorkspaceEntity) public readonly repo: Repository<WorkspaceEntity>) {}

  @ResolveField(() => [UserEntity])
  users(@Parent() { id }: WorkspaceEntity, @DataLoaders() { workspace }: IDataLoaders) {
    return workspace.usersByWorkspaceId.load(id);
  }

  @ResolveField(() => [ClientEntity])
  clients(@Parent() { id }: WorkspaceEntity, @DataLoaders() { workspace }: IDataLoaders) {
    return workspace.clientsByWorkspaceId.load(id);
  }

  @Query(() => [WorkspaceEntity])
  @UseGuards(BasicAuthGuard)
  async getWorkspaces(
    @Args() { take, skip, search }: PaginatedArgsWithSearch,
    @UserPassport() { userId, firmId, lobbymaticPermission, firmPermission }: IUserPassport,
  ): Promise<WorkspaceEntity[]> {
    if (lobbymaticPermission === ELobbymaticPermission.Admin)
      return this.repo.find({ take, skip, where: { name: search ? ILike(`%${search}%`) : undefined } });
    if (firmPermission === EFirmPermission.Admin) {
      return this.repo.find({ take, skip, where: { firmId, name: search ? ILike(`%${search}%`) : undefined } });
    }
    return this.repo
      .createQueryBuilder('workspace')
      .where(search ? 'workspace.name ilike :name' : 'true', { name: `%${search}%` })
      .limit(take)
      .offset(skip)
      .innerJoin(
        WorkspaceToUserEntity,
        'join_entity',
        'workspace.id = join_entity.workspace_id AND join_entity.userId = :userId AND join_entity.firmId = :firmId',
        { userId, firmId },
      )
      .getMany();
  }

  @Query(() => WorkspaceEntity)
  getWorkspace(@Args() { workspaceId }: WorkspaceIdArg): Promise<WorkspaceEntity> {
    return this.repo.findOneByOrFail({ id: workspaceId });
  }

  @Mutation(() => WorkspaceEntity)
  createWorkspace(@Args() args: WorkspaceArgs): Promise<WorkspaceEntity> {
    return this.repo.save(this.repo.create(args));
  }

  @Mutation(() => String)
  async deleteWorkspace(@Args() { workspaceId }: WorkspaceIdArg): Promise<string> {
    await this.repo.delete(workspaceId);
    return workspaceId;
  }

  @Mutation(() => WorkspaceEntity)
  async updateWorkspace(@Args() args: WorkspaceUpdateArgs): Promise<WorkspaceEntity> {
    await this.repo.save(args);
    return this.repo.findOneByOrFail({ id: args.id });
  }
}
