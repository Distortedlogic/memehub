import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptionModule } from '../encryption/encryption.module';
import { FirmEntity } from '../firm/entities/firm.entity';
import { WorkspaceEntity } from '../workspace/workspace.entity';
import { ClientEntity } from './client.entity';
import { ClientResolver } from './client.resolver';
import { ClientService } from './client.service';
import { ClientSubscriber } from './client.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, FirmEntity, WorkspaceEntity]), EncryptionModule],
  providers: [ClientService, ClientResolver, ClientSubscriber],
  exports: [ClientService],
})
export class ClientModule {}
