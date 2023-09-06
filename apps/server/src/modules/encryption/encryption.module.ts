import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { serverEnvironment } from '../config/services/server.config';
import { EncryptionService } from './encryption.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [serverEnvironment] })],
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class EncryptionModule {}
