import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { DataloaderService } from './dataloader.service';

@Module({
  imports: [UserModule],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
