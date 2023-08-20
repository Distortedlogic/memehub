import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompletionEntity, CompletionLogEntity } from './completion.entity';
import { CompletionResolver } from './completion.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CompletionEntity, CompletionLogEntity])],
  providers: [CompletionResolver],
  exports: [],
  controllers: [],
})
export class CompletionModule {}
