import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IEnvironments } from '../../config/environment.interface';
import { rssEnvironment } from '../../config/keys/rss.config';
import { PubSubModule } from '../pubsub/pubsub.module';
import { UserEntity } from '../user/entities/user.entity';
import { RssCommand } from './commands/rss';
import { ReconcileCommand } from './commands/subcommands/reconcile';
import { RssSeedCommand } from './commands/subcommands/seed';
import { RssSubscriptionToUserEntity } from './entities/rss-user.entity';
import { RssEntryEntity } from './entities/rss.entry.entity';
import { RssSubscriptionEntity } from './entities/rss.subscription.entity';
import { RssApi } from './rss.api';
import { RssController } from './rss.controller';
import { RssCron } from './rss.cron';
import { RssResolver } from './rss.resolver';
import { RssService } from './rss.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RssSubscriptionEntity, RssEntryEntity, RssSubscriptionToUserEntity, UserEntity]),
    HttpModule.registerAsync({
      imports: [ConfigModule.forRoot({ load: [rssEnvironment] })],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IEnvironments, true>) => ({
        baseURL: `https://api.rssapi.net/v1/header`,
        headers: {
          'X-API-KEY': configService.get('rssEnvironment.rssKey', { infer: true }),
          'Accept-Encoding': 'gzip,deflate,compress',
        },
      }),
    }),
    PubSubModule,
  ],
  providers: [RssApi, RssService, RssCron, RssResolver, RssCommand, ReconcileCommand, RssSeedCommand],
  exports: [RssService],
  controllers: [RssController],
})
export class RssModule {}
