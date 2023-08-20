import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../client/client.entity';
import { FirmEntity } from '../firm/entities/firm.entity';
import { PromptEntity } from './prompt.entity';
import { PromptResolver } from './prompt.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PromptEntity, ClientEntity, FirmEntity])],
  providers: [PromptResolver],
  exports: [],
  controllers: [],
})
export class PromptModule {}
