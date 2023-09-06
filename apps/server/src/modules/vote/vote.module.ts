import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteEntity } from './vote.entity';
import { VoteDataloaderService } from './vote.loader';
import { VoteResolver } from './vote.resolver';
import { VoteService } from './vote.service';
import { VoteSubscriber } from './vote.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([VoteEntity])],
  providers: [VoteService, VoteResolver, VoteDataloaderService, VoteSubscriber],
  exports: [VoteService, VoteDataloaderService],
})
export class VoteModule {}
