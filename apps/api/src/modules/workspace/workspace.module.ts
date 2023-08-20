import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { WorkspaceToUserEntity } from '../joins/workspace-user.entity';
import { UserEntity } from '../user/entities/user.entity';
import { WorkspaceEntity } from './workspace.entity';
import { WorkspaceDataloader } from './workspace.loader';
import { WorkspaceResolver } from './workspace.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity, WorkspaceToUserEntity, UserEntity, ClientEntity])],
  providers: [WorkspaceResolver, WorkspaceDataloader],
  exports: [WorkspaceDataloader],
})
export class WorkspaceModule {}
