import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { FirmModule } from '../firm/firm.module';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [UserModule, FirmModule, WorkspaceModule, ClientModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
