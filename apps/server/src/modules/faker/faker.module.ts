import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { serverEnvironment } from '../config/services/server.config';
import { UserEntity } from '../user/entities/user.entity';
import { DbCommand } from './commands/db';
import { DbSeedCommand } from './commands/subcommands/seed';
import { FakerService } from './faker.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule.forRoot({ load: [serverEnvironment] })],
  providers: [FakerService, DbSeedCommand, DbCommand],
  exports: [],
})
export class FakerModule {}
