import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { CompletionEntity, CompletionLogEntity } from '../completion/completion.entity';
import { FirmEntity } from '../firm/entities/firm.entity';
import { UserEntity } from '../user/entities/user.entity';
import { WorkspaceEntity } from '../workspace/workspace.entity';
import { StatsResolver } from './stats.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FirmEntity, WorkspaceEntity, ClientEntity, CompletionEntity, CompletionLogEntity])],
  providers: [StatsResolver],
  exports: [],
  controllers: [],
})
export class StatsModule {}
