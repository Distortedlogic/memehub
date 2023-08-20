import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { In, Repository } from 'typeorm';
import { BaseDataloaderService, IBaseDataLoaders } from '../../generics/base.loader.g';
import { IUserPassport } from '../../interfaces/IUserPassport';
import { ClientEntity } from '../client/client.entity';
import { WorkspaceToUserEntity } from '../joins/workspace-user.entity';
import { UserEntity } from '../user/entities/user.entity';
import { WorkspaceEntity } from './workspace.entity';

export interface IWorkspaceDataloader extends IBaseDataLoaders<WorkspaceEntity> {
  usersByWorkspaceId: DataLoader<string, UserEntity[]>;
  clientsByWorkspaceId: DataLoader<string, ClientEntity[]>;
}

@Injectable()
export class WorkspaceDataloader extends BaseDataloaderService<WorkspaceEntity> {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepo: Repository<UserEntity>,
    @InjectRepository(WorkspaceToUserEntity)
    readonly joinRepo: Repository<WorkspaceToUserEntity>,
    @InjectRepository(ClientEntity)
    readonly clientRepo: Repository<ClientEntity>,
    @InjectRepository(WorkspaceEntity)
    readonly workspaceRepo: Repository<WorkspaceEntity>,
  ) {
    super(workspaceRepo);
  }

  dataloaders(userPassport?: IUserPassport): IWorkspaceDataloader {
    return {
      ...this.baseDataloaders(userPassport),
      usersByWorkspaceId: new DataLoader<string, UserEntity[]>(async (ids) => {
        const usersQuery = await this.userRepo
          .createQueryBuilder('user')
          .leftJoin(WorkspaceToUserEntity, 'join_entity', 'user.id = join_entity.userId', {})
          .where('join_entity.workspaceId IN(:...ids)', { ids })
          .select('user.createdAt', 'createdAt')
          .addSelect('user.id', 'id')
          .addSelect('user.lobbymaticPermission', 'lobbymaticPermission')
          .addSelect('user.firmPermission', 'firmPermission')
          .addSelect('user.firstName', 'firstName')
          .addSelect('user.lastName', 'lastName')
          .addSelect('user.email', 'email')
          .addSelect('user.emailVerified', 'emailVerified')
          .addSelect('user.password', 'password')
          .addSelect('user.lastLogin', 'lastLogin')
          .addSelect('user.firmId', 'firmId')
          .addSelect('user.avatarId', 'avatarId')
          .addSelect('join_entity.workspaceId', 'workspaceId')
          .getRawMany<UserEntity & { workspaceId: string }>();
        const idToRawUsers = usersQuery.reduce<Record<string, UserEntity[]>>((prev, entity) => {
          if (!prev[entity.workspaceId]) {
            prev[entity.workspaceId] = [];
          }
          prev[entity.workspaceId].push(entity);
          return prev;
        }, {});
        return ids.map((id) => idToRawUsers[id]);
      }),
      clientsByWorkspaceId: new DataLoader<string, ClientEntity[]>(async (ids) => {
        const results = await this.clientRepo.findBy({ workspaceId: In(ids) });
        const idToResults = results.reduce<Record<string, ClientEntity[]>>((prev, entity) => {
          if (!prev[entity.workspaceId]) {
            prev[entity.workspaceId] = [];
          }
          prev[entity.workspaceId].push(entity);
          return prev;
        }, {});
        return ids.map((id) => idToResults[id]);
      }),
    };
  }
}
